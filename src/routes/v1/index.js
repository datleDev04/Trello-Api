import express from 'express'
import { StatusCodes } from 'http-status-codes'

import { boardRoute } from './boardRoute'
import columnRoute from './columnRoute'
import cardRoute from './cardRoute'

const Router = express.Router()

// Check API v1/status
Router.get('/status', (req, res) => {
  res.status(StatusCodes.OK).json({ message: 'API is ready to use' })
})

// Board route
Router.use('/board', boardRoute)

// column route
Router.use('/column', columnRoute)

// card route
Router.use('/card', cardRoute)

export const APIs_V1 = Router