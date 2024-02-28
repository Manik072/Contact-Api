const mongoose = require('mongoose')

const connectDb = async () => {
  try {
    const connect = await mongoose.connect(
      'mongodb+srv://manikgujral25:admin123@contactapi.lq3u8kv.mongodb.net/'
    )
    console.log(
      'Database Connected',
      connect.connection.host,
      connect.connection.name
    )
  } catch (err) {
    console.log(err)
  }
}

module.exports = connectDb
