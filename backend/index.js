import express from 'express';
import cookieParser from 'cookie-parser';
import cors from 'cors';
import { connect } from 'mongoose';
import  connectDB  from './utils/db.js';

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

app.get('/',()=>{
    console.log('hello');
})
app.listen(PORT,()=>{
    connectDB();
    console.log(`server is listening at port ${PORT}`);
    
})

