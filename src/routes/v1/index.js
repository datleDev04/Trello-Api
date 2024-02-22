import express from 'express'
import { StatusCodes } from 'http-status-codes'

import { boardRoute } from './boardRoute'

const Router = express.Router()

// Check API v1/status
Router.get('/status', (req, res) => {
  res.status(StatusCodes.OK).json({ message: 'API is ready to use' })
})

// Board route
Router.use('/board', boardRoute)

export const APIs_V1 = Router