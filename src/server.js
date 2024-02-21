/* eslint-disable no-console */


import express from 'express'
import { CONNECT_DB, GET_DB } from './config/mongodb'

const START_SERVER = () => {
  const app = express()

  const hostname = 'localhost'
  const port = 8017

  app.get('/', async (req, res) => {
    res.end('<h1>hêlllo</h1><hr>')
  })

  app.listen(port, hostname, async () => {
    console.log(await GET_DB().listCollections().toArray())
    console.log(`Hello Trung Quan Dev, I am running at ${ hostname }:${ port }/`)
  })
}

// chỉ khi kết nối thành công mới start server
(async () => {
  try {
    console.log('Connecting to mongodb...')
    await CONNECT_DB()
    console.log('Connected to mongodb')

    START_SERVER()
  } catch (error) {
    console.log(error)
    process.exit(0)
  }

})()
