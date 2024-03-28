import { StatusCodes } from 'http-status-codes'
import { cloneDeep } from 'lodash'
import { boardModel } from '~/models/boardModel'
import { cardModel } from '~/models/cardModel'
import { columnModel } from '~/models/columnModel'
import ApiError from '~/utils/ApiError'
import { slugify } from '~/utils/slug'

const createNew = async (reqBody) => {
  try {
    // throw new ApiError(404, 'test')
    const newBoard = {
      ...reqBody,
      slug: slugify(reqBody.title)
    }

    const createdBoard = await boardModel.createNew(newBoard)
    // console.log(createdBoard)

    const getNewBoard = await boardModel.findOneById(createdBoard.insertedId)


    // trả kết quả về, trong service luôn phải có return
    // tránh lỗi chạy mãi
    return getNewBoard
  } catch (error) {
    throw error
  }
}
const getDetails = async (id) => {
  try {

    const board = await boardModel.getDetails(id)
    // console.log(board)
    if (!board || board === null) {
      throw new ApiError(StatusCodes.NOT_FOUND, 'Board Not Found')
    }

    const resBoard = cloneDeep(board)

    resBoard.columns.forEach(column => {
      column.cards = resBoard.cards.filter(card => card.columnId.equals(column._id))
      // column.cards = resBoard.cards.filter(card => card.columnId.toString() === column._id.toString())
    })

    delete resBoard.cards

    return resBoard
  } catch (error) {
    throw error
  }
}
const updateBoard = async (id, reqBody) => {
  try {
    const updateData = {
      ...reqBody,
      updatedAt: Date().now
    }

    const updatedBoard = await boardModel.update(id, updateData)

    return updatedBoard
  } catch (error) {
    throw error
  }
}

const moveCardToDiffCol = async ( reqBody) => {
  try {
    // cập nhật column bị kéo đi
    await columnModel.update( reqBody.preColumndId, {
      cardOrderIds: reqBody.preCardOrderIds,
      updatedAt: Date.now()
    })

    // cập nhật column được kéo đến
    await columnModel.update( reqBody.nextColumnId, {
      cardOrderIds: reqBody.nextCardOrderIds,
      updatedAt: Date.now()
    })

    await cardModel.update( reqBody.currentCardId, {
      columnId: reqBody.nextColumnId
    })

    return {
      updateResult : 'Successfully'
    }
  } catch (error) {
    throw error
  }
}

export const boardServices = {
  createNew,
  getDetails,
  updateBoard,
  moveCardToDiffCol
}