import mongoose from "mongoose";
const userSchema=new mongoose.Schema(
    {
        fullName:{
            type:String,
            required:true
        },
        email:
        {
            type:String,
            required:true,
            unique:true,
        },
        phoneNumber:
        {
            type:String,
            required:true,
            
        },
        password:
        {
            type:String,
            required:true
        },
        role:
        {
            type:String,
            enum:["JobSeeker","Recruiter"],
            default:"JobSeeker",
            
        },
        profile: {
            bio:{
                type:String
            },
            skills:
                [{type:String}],
               
            resume:
            {
                type:String//URL to resume file
            },
            resumeOriginalName: {
                type:String,//original name of file
            },
            company: {
                type: mongoose.Schema.Types.ObjectId,
                ref: "Company"
            },
            profilePhoto: {
                type:String, //URL to profile pic
                default: "",
            },

        },
}, {timestamps:true})

export const User=mongoose.model("User",userSchema);