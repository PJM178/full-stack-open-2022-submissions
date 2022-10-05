require('dotenv').config()

const PORT = process.env.PORT

// const MONGODB_URI = process.env.NODE_ENV === 'test'
//   ? process.env.TEST_MONGODB_URI
//   : process.env.MONGODB_URI

let MONGODB_URI = process.env.NODE_ENV

if (MONGODB_URI === 'testt') {
  MONGODB_URI = process.env.TEST_MONGODB_URI
} else {
  MONGODB_URI = process.env.MONGODB_URI
}

module.exports = {
  MONGODB_URI,
  PORT
}