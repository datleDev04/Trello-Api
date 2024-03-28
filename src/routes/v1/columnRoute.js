import express from 'express'
import { columnController } from '~/controllers/columnController'
import { columnValidation } from '~/validations/columnValidation'

const columnRoute = express.Router()

columnRoute.route('/')
  .post( columnValidation.createNew, columnController.createNew )


columnRoute.route('/:id')
  .put( columnValidation.updateColumn, columnController.updateColumn)
  .delete( columnValidation.deleteColumn, columnController.deleteColumn)

export default columnRoute