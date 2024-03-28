import { StatusCodes } from 'http-status-codes'
import { ObjectId } from 'mongodb'
import { boardModel } from '~/models/boardModel'
import { cardModel } from '~/models/cardModel'
import { columnModel } from '~/models/columnModel'
import ApiError from '~/utils/ApiError'

const createNew = async (reqBody) => {
  try {
    const newColumn = {
      ...reqBody
    }

    const createdColumn = await columnModel.createNew(newColumn)

    const getNewColumn = await columnModel.findById(createdColumn.insertedId)

    if (getNewColumn) {
      // set mảng card trong column là rỗng- vì là column mới
      getNewColumn.cards = []

      // thêm cột vào listColumn của Board
      await boardModel.pushColumnOrderIds(getNewColumn)
    }

    return getNewColumn
  } catch (error) {
    throw error
  }
}

const updateColumn = async (id, reqBody) => {
  try {
    const updateData = {
      ...reqBody,
      updatedAt: Date().now
    }

    if (updateData.columnId) {
      updateData.columnId = new ObjectId(updateData.columnId)
    }

    const updatedColumn = await columnModel.update(id, updateData)

    return updatedColumn
  } catch (error) {
    throw error
  }
}
const deleteColumn = async (id) => {
  try {
    const targetColumn = await columnModel.findById(id)

    console.log(targetColumn)
    if (!targetColumn) {
      throw new ApiError(StatusCodes.NOT_FOUND, 'Column Not Found')
    }


    // xoá column
    await columnModel.deleteOneById(id)
    // xóa toàn bộ cards trong columns
    await cardModel.deleteManyByColumnId(id)


    // xóa coulumnId trong columnOrderIds
    await boardModel.pullColumnOrderIds(targetColumn)

    return { deleteResult: 'Deleted successfully' }
  } catch (error) {
    throw error
  }
}

export const columnService = {
  createNew,
  updateColumn,
  deleteColumn
}