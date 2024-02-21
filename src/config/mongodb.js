const MONGODB_URI = 'mongodb+srv://letiendat040904:<password>@trello-api.per40n5.mongodb.net/?retryWrites=true&w=majority'

const DATABASE_NAME = 'Trello-API'

const { MongoClient, ServerApiVersion } = require('mongodb')

let trelloDatabaseInstance = null

const clientDatabaseInstance = new MongoClient(MONGODB_URI, {
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
  await clientDatabaseInstance.connect()
  // lưu giá trị của database DATABASE_NAME cho biến trelloDatabaseInstance
  trelloDatabaseInstance = clientDatabaseInstance.db(DATABASE_NAME)
}

// export là trelloDatabaseInstance sau khi connect thành công
export const GET_DB = () => {
  if (!trelloDatabaseInstance) throw new Error('Must connect to mongodb first')
  return trelloDatabaseInstance
}