/* eslint-disable no-console */


import express from 'express'
import { CONNECT_DB, GET_DB } from './config/mongodb'

const START_SERVER = () => {
  const app = express()

  const hostname = 'localhost'
  const port = 8017

  app.get('/', (req, res) => {
    res.end('<h1>Hello World!</h1><hr>')
  })

  app.listen(port, hostname, () => {
    // eslint-disable-next-line no-console
    console.log(`Hello Trung Quan Dev, I am running at ${ hostname }:${ port }/`)
  })
}

(async () => {
  try {
    console.log('Connecting to mongodb...')
    await CONNECT_DB()
    console.log('Connected to mongodb...')
    START_SERVER()
  } catch (error) {
    console.log(error)
    process.exit(0)
  }

})()
