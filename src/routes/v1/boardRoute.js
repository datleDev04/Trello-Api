import express from 'express'
import { StatusCodes } from 'http-status-codes'
import { boardValidation } from '~/validations/boardValidation'

import { boardController } from '~/controllers/boardController'

const Router = express.Router()

Router.route('/')
  .get((req, res) => {
    res.status(StatusCodes.OK).json({ message: 'GET: get all board data' })
  })
  .post( boardValidation.createNew, boardController.createNew )

Router.route('/:id')
  .get(boardController.getDetails)
  .put( boardValidation.updateBoard, boardController.updateBoard)

// api support di chuyển card giữa các col khác nhau
Router.route('/supports/moving_card')
  .put( boardValidation.moveCardToDiffCol, boardController.moveCardToDiffCol)

export const boardRoute = Router