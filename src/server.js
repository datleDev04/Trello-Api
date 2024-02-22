/* eslint-disable no-console */

import express from 'express'
// xử lí clearup trước khi exit nodejs
import exitHook from 'async-exit-hook'

import { env } from '~/config/environment'
import { CONNECT_DB, CLOSE_DB } from '~/config/mongodb'

import { APIs_V1 } from './routes/v1'


const START_SERVER = () => {
  const app = express()

  // xử lí req.body bị undefind
  // enable req.body json data
  app.use(express.json())

  // user Routes v1
  app.use('/v1', APIs_V1)

  app.listen(env.APP_PORT, env.APP_HOST, async () => {
    console.log(`Hello ${env.AUTHOR}, I am running at ${ env.APP_HOST }:${ env.APP_PORT }`)
  })

  // hook exitHook của async-exit-hook
  // xử lí cleanup action trước khi nodejs exits
  // docs : https://stackoverflow.com/questions/14031763/doing-a-cleanup-action-just-before-node-js-exits
  exitHook(() => {
    CLOSE_DB()
    console.log('Closed DB')
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
