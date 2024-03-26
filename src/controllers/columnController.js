import { StatusCodes } from 'http-status-codes'
import { columnService } from '~/services/columnService'

const createNew = async (req, res, next) => {
  try {
    const newBoard = await columnService.createNew(req.body)

    res.status(StatusCodes.CREATED).json(newBoard)
  } catch (error) {
    next(error)
  }
}

export const columnController = {
  createNew
}