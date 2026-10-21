import 'dotenv/config'
import mongoose from 'mongoose'

const connectDB = async () => {
    const mongoUrl = process.env.MONGO_DB_URL
    if (!mongoUrl) {
        throw new Error('La variable MONGO_DB_URL est obligatoire')
    }

    await mongoose.connect(mongoUrl)
}

export default connectDB
