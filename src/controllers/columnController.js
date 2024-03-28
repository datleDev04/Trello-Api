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

const updateColumn = async (req, res, next) => {
  try {
    const id = req.params.id
    const updatedColumn = await columnService.updateColumn(id, req.body)

    res.status(StatusCodes.CREATED).json(updatedColumn)
  } catch (error) {
    next(error)
  }
}

const deleteColumn = async (req, res, next) => {
  try {
    const id = req.params.id
    const result = await columnService.deleteColumn(id)

    res.status(StatusCodes.CREATED).json(result)
  } catch (error) {
    next(error)
  }
}

export const columnController = {
  createNew,
  updateColumn,
  deleteColumn
}