import { StatusCodes } from 'http-status-codes'
import ApiError from '~/utils/ApiError'

const createNew = async (req, res, next) => {
  try {
    // throw new ApiError(StatusCodes.BAD_REQUEST, 'ahihia đồ ngốc')
    // console.log('req.body: ', req.body)
    res.status(StatusCodes.CREATED).json({ message: 'POST: controller :created a new board' })
  } catch (error) {
    next(error)
  }
}

export const boardController ={
  createNew
}