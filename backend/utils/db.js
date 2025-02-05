import mongoose from "mongoose";
import { DB_NAME } from "../constants.js"
import dotenv from "dotenv";
dotenv.config();

const connectDB=async()=>{
    try{
        const conncetionInstance=await mongoose.connect(`${process.env.MONGO_URI}/${DB_NAME}`);
        console.log(`\n MondoDB conncetion ! ! DB HOST: ${conncetionInstance.connection.host}`);

    }
    catch(error)
    {
        console.log("MongoDB connection failed) ",error);
        process.exit(1);
    
    }
}

export default connectDB;