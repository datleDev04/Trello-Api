import Joi from 'joi'
import { ObjectId } from 'mongodb'
import { GET_DB } from '~/config/mongodb'
import { OBJECT_ID_RULE, OBJECT_ID_RULE_MESSAGE, validateBeforeCreate } from '~/utils/validators'

// Define Collection (name & schema)
const COLUMN_COLLECTION_NAME = 'columns'
const COLUMN_COLLECTION_SCHEMA = Joi.object({
  boardId: Joi.string().required().pattern(OBJECT_ID_RULE).message(OBJECT_ID_RULE_MESSAGE),
  title: Joi.string().required().min(3).max(50).trim().strict(),

  cardOrderIds: Joi.array().items(
    Joi.string().pattern(OBJECT_ID_RULE).message(OBJECT_ID_RULE_MESSAGE)
  ).default([]),

  createdAt: Joi.date().timestamp('javascript').default(Date.now),
  updatedAt: Joi.date().timestamp('javascript').default(null),
  _destroy: Joi.boolean().default(false)
})

const INVALID_UPDATE_FILEDS = ['_id', 'createdAt', 'boardId']

const createNew = async (data) => {
  try {
    const validData = await validateBeforeCreate(COLUMN_COLLECTION_SCHEMA, data)

    const columnDataToAdd = {
      ...validData,
      boardId: new ObjectId(validData.boardId)
    }

    if (validData) {
      return await GET_DB().collection(COLUMN_COLLECTION_NAME).insertOne(columnDataToAdd)
    }
  } catch (error) {
    throw new Error(error)
  }
}
const findById = async (id) => {
  try {
    return await GET_DB().collection(COLUMN_COLLECTION_NAME).findOne({
      _id: new ObjectId(id)
    })
  } catch (error) {
    throw new Error(error)
  }
}

const pushCardOrderIds = async (card) => {
  try {
    await GET_DB().collection(COLUMN_COLLECTION_NAME).findOneAndUpdate({
      _id: new ObjectId(card.columnId)
    }, {
      $push: {
        cardOrderIds: new ObjectId(card._id)
      }
    }, {
      returnNewDocument: true
    })

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
    if (updateData.cardOrderIds) {
      updateData.cardOrderIds = updateData.cardOrderIds.map(_id => new ObjectId(_id))
    }

    await GET_DB().collection(COLUMN_COLLECTION_NAME).findOneAndUpdate({
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

const deleteOneById = async (id) => {
  try {
    return await GET_DB().collection(COLUMN_COLLECTION_NAME).deleteOne({
      _id: new ObjectId(id)
    })
  } catch (error) {
    throw new Error(error)
  }
}

export const columnModel = {
  COLUMN_COLLECTION_NAME,
  COLUMN_COLLECTION_SCHEMA,
  createNew,
  findById,
  pushCardOrderIds,
  update,
  deleteOneById
}