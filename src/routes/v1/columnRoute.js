import express from 'express'
import { columnController } from '~/controllers/columnController'
import { columnValidation } from '~/validations/columnValidation'

const columnRoute = express.Router()

columnRoute.route('/')
  .post( columnValidation.createNew, columnController.createNew )

export default columnRoute