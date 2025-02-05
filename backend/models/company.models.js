import mongoose from "mongoose";

const comapnySchema=new mongoose.Schema({
    name:{
        type:String,
        required:true
    },
    description:{
        type:String,
      
    },
    website:{
        type: String
    },
    logo:{
        type:String// url to logo of company
    },
    userId:
    {
        type:mongoose.Schema.Types.ObjectId,
        ref:"User",
        required:true
    },
},{timestamps:true});

export const Company=mongoose.model("Company",comapnySchema);


