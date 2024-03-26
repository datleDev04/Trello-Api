import express from 'express'
import { cardController } from '~/controllers/cardController'
import { cardValidation } from '~/validations/cardValidation'

const cardRoute = express.Router()

cardRoute.route('/')
  .post( cardValidation.createNew, cardController.createNew )

export default cardRoute