import { StatusCodes } from 'http-status-codes'
import { boardServices } from '~/services/boardService'

const createNew = async (req, res, next) => {
  try {
    // throw new ApiError(401, 'erroe in controller')
    // điều hướng dữ liệu sang tầng service
    const createdBoard = await boardServices.createNew(req.body)

    // có kết quả thì trả về client
    res.status(StatusCodes.CREATED).json(createdBoard)
  } catch (error) {
    next(error)
  }
}

const getDetails = async (req, res, next) => {
  try {
    const id = req.params.id
    const boardDetails = await boardServices.getDetails(id)

    res.status(StatusCodes.CREATED).json(boardDetails)
  } catch (error) {
    next(error)
  }
}
const updateBoard = async (req, res, next) => {
  try {
    const id = req.params.id
    const updatedBoard = await boardServices.updateBoard(id, req.body)

    res.status(StatusCodes.CREATED).json(updatedBoard)
  } catch (error) {
    next(error)
  }
}
const moveCardToDiffCol = async (req, res, next) => {
  try {
    const result = await boardServices.moveCardToDiffCol(req.body)

    res.status(StatusCodes.CREATED).json(result)
  } catch (error) {
    next(error)
  }
}

export const boardController ={
  createNew,
  getDetails,
  updateBoard,
  moveCardToDiffCol
}