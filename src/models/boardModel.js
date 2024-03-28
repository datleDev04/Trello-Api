import Joi from 'joi'
import { ObjectId } from 'mongodb'
import { GET_DB } from '~/config/mongodb'
import { BOARD_TYPES } from '~/utils/constants'
import { OBJECT_ID_RULE, OBJECT_ID_RULE_MESSAGE } from '~/utils/validators'
import { columnModel } from './columnModel'
import { cardModel } from './cardModel'
import { validateBeforeCreate } from '~/utils/validators.js'

const BOARD_COLLECTION_NAME = 'Boards'
const BOARD_COLLECTION_SCHEMA = Joi.object({
  title: Joi.string().required().min(3).max(50).trim().strict(),
  slug: Joi.string().required().min(3).trim().strict(),
  description: Joi.string().required().min(3).max(256).trim().strict(),
  type: Joi.string().valid(BOARD_TYPES.PUBLIC, BOARD_TYPES.PRIVATE).required(),

  columnOrderIds: Joi.array().items(
    Joi.string().required().pattern(OBJECT_ID_RULE).message(OBJECT_ID_RULE_MESSAGE)
  ).default([]),
  createdAt: Joi.date().timestamp('javascript').default(Date.now),
  updatedAt: Joi.date().timestamp('javascript').default(null),
  _destroy: Joi.boolean().default(false)
})

const INVALID_UPDATE_FILEDS = ['_id', 'createdAt']


const createNew = async (data) => {
  try {
    const validData = await validateBeforeCreate(BOARD_COLLECTION_SCHEMA, data)
    if (validData) {
      return await GET_DB().collection(BOARD_COLLECTION_NAME).insertOne(validData)
    }

  } catch (error) {
    throw new Error(error)
  }
}

const findOneById = async (id) => {
  try {
    return await GET_DB().collection(BOARD_COLLECTION_NAME).findOne({
      _id: new ObjectId(id)
    })
  } catch (error) {
    throw new Error(error)
  }
}

const getDetails = async (id) => {
  try {
    const result = await GET_DB().collection(BOARD_COLLECTION_NAME).aggregate([
      // tìm board
      { $match : {
        _id : new ObjectId(id),
        _destroy : false
      } },
      { $lookup: {
        from: columnModel.COLUMN_COLLECTION_NAME,
        localField: '_id',
        foreignField: 'boardId',
        as: 'columns'
      } },
      { $lookup: {
        from: cardModel.CARD_COLLECTION_NAME,
        localField: '_id',
        foreignField: 'boardId',
        as: 'cards'
      } }
    ]).toArray()

    return result[0] || null
  } catch (error) {
    throw new Error(error)
  }
}

const pushColumnOrderIds = async (column) => {
  try {
    await GET_DB().collection(BOARD_COLLECTION_NAME).findOneAndUpdate({
      _id: new ObjectId(column.boardId)
    }, {
      $push: {
        columnOrderIds: new ObjectId(column._id)
      }
    }, {
      returnNewDocument: true
    })

  } catch (error) {
    throw new Error(error)
  }
}

// lấy 1 phần tử ra khỏi mảng
const pullColumnOrderIds = async (column) => {
  try {
    const result = await GET_DB().collection(BOARD_COLLECTION_NAME).findOneAndUpdate({
      _id: new ObjectId(column.boardId)
    }, {
      $pull: {
        columnOrderIds: new ObjectId(column._id)
      }
    }, {
      returnNewDocument: true
    })

    return result

  } catch (error) {
    throw new Error(error)
  }
}

const update = async (id, updateData) => {
  try {
    // lọc các file không được cập nhật
    Object.keys(updateData).forEach(fieldName => {
      if (INVALID_UPDATE_FILEDS.includes(fieldName)) {
        delete updateData[fieldName]
      }
    })

    if (updateData.columnOrderIds) {
      updateData.columnOrderIds = updateData.columnOrderIds.map(_id => new ObjectId(_id))
    }

    await GET_DB().collection(BOARD_COLLECTION_NAME).findOneAndUpdate({
      _id: new ObjectId(id)
    }, {
      $set : updateData
    }, {
      returnNewDocument: true
    })

  } catch (error) {
    throw new Error(error)
  }
}


export const boardModel ={
  BOARD_COLLECTION_NAME,
  BOARD_COLLECTION_SCHEMA,
  createNew,
  findOneById,
  getDetails,
  pushColumnOrderIds,
  update,
  pullColumnOrderIds
}