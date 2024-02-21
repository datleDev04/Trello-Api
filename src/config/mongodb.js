import { env } from './environment'

const { MongoClient, ServerApiVersion } = require('mongodb')

let trelloDatabaseInstance = null

const mongoClientInstance = new MongoClient(env.MONGODB_URI, {
  // dành cho mongodb server 5.0 or later
  // là 1 sự lựa chọn optional
  // đảm bảo tính tương thích và duy trì ổn định khi MongoDb được cập nhật lên các phiên bản mới
  serverApi: {
    version: ServerApiVersion.v1,
    strict: true,
    deprecationErrors: true
  }
})

// kết nối với database
export const CONNECT_DB = async () => {
  // kết nối với mongodb Atlas
  await mongoClientInstance.connect()
  // lưu giá trị của database DATABASE_NAME cho biến trelloDatabaseInstance
  trelloDatabaseInstance = mongoClientInstance.db(env.DATABASE_NAME)
}

// Hủy kết nối với mongoDB
export const CLOSE_DB = async () => {
  await mongoClientInstance.close()
}

// export là trelloDatabaseInstance sau khi connect thành công
export const GET_DB = () => {
  if (!trelloDatabaseInstance) throw new Error('Must connect to mongodb first')
  return trelloDatabaseInstance
}