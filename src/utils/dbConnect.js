import { connect } from 'mongoose'

global.dbConnection = null

const dbConnect = async () => {
  if (dbConnection) return dbConnection
  const db = await connect(process.env.MONGODB_URI, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
  })
  dbConnection = db
  return dbConnection
}

export default dbConnect