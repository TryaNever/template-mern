import "dotenv/config";
import mongoose from "mongoose";
const mongoDB = process.env.MONGO_DB_URL;


const connectDB = async () => {
    await mongoose.connect(mongoDB);
}

export default connectDB;