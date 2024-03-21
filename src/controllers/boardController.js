import { StatusCodes } from 'http-status-codes'
import ApiError from '~/utils/ApiError'
import { boardServices } from '~/services/boardService'

const createNew = async (req, res, next) => {
  try {
    // điều hướng dữ liệu sang tầng service
    const createdBoard = await boardServices.createNew(req.body)

    // có kết quả thì trả về client
    res.status(StatusCodes.CREATED).json(createdBoard)
  } catch (error) {
    next(error)
  }
}

export const boardController ={
  createNew
}