import { ObjectId } from 'mongodb'
import { boardModel } from '~/models/boardModel'
import { columnModel } from '~/models/columnModel'

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

export const columnService = {
  createNew,
  updateColumn
}