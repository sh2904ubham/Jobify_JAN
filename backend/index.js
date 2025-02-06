import express from 'express';
import cookieParser from 'cookie-parser';
import cors from 'cors';
import dotenv from "dotenv";

import { connect } from 'mongoose';
import  connectDB  from './utils/db.js';
import userRoute from "./routes/user.route.js"
const app=express();


app.use(express.json);
app.use(express.urlencoded({extended:true}));
app.use(cookieParser());

const corsOptions={
    origin:["http://localhost:3000"],
    credentials:true,
};
app.use(cors(corsOptions));
const PORT=3000;
//api's
app.use("/api/v1/user",userRoute);
app.listen(PORT,()=>{
    connectDB();
    console.log(`server is listening at port ${PORT}`);
    
})

