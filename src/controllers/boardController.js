import { StatusCodes } from 'http-status-codes'

const createNew = async (req, res, next) => {
  try {
    console.log('req.body: ', req.body)
    res.status(StatusCodes.CREATED).json({ message: 'POST: controller :created a new board' })
    next()
  } catch (error) {
    console.log(error)
    res.status(StatusCodes.INTERNAL_SERVER_ERROR).json({
      error: new Error(error).message
    })
  }
}

export const boardController ={
  createNew
}