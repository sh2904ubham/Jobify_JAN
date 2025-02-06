import  {User} from "../models/user.model.js"
import bcrypt from "bcryptjs";
import jwt from "jsonwebtoken";
 import getDataUri from "../utils/datauri.js";
 import cloudinary from "../utils/cloudinary.js";
import { asyncHandler } from "../utils/asyncHandler.js";
import {ApiError} from "../utils/ApiError.js";
import {ApiResponse} from "../utils/ApiResponse.js";

 export const register=asyncHandler( async(req,res)=>{
    try {
        const { fullName, email,password, phoneNumber,role}=req.body;
        if (
            [fullName, email,password, phoneNumber, role].some((field) => field?.trim() === "")
        ) {
            throw new ApiError(400, "All fields are required")
        }

        const user= await User.findOne({email});
        if(user) {
            throw new ApiError(400, "Email Already exist")
        }
    //     const file=req.file;
    //    // const file=req.file;
    //    console.log("Received File:", req.file); // Debugging
    //     console.log("Request Body:", req.body);

    //     if(!file)
    //     {
    //         throw new ApiError(400, "Profile Image is required")
    //     }

    //     const fileUri=getDataUri(file);
    //     const cloudResponse= await cloudinary.uploader.upload(fileUri.content);
        const hashedPassword=await bcrypt.hash(password,10);
        const newUser= new User (
            {
                fullName,
                email,
                phoneNumber,
                
                password:hashedPassword,
                role,
                // profile: {
                //     profilePhoto: cloudResponse.secure_url,
                    
                // },

            }
        );

        await newUser.save();
        return res.status(201).json(
            new ApiResponse(200, newUser, "User registered Successfully")
        )

    }
    catch (error) {
        throw new ApiError(400, error.message,"insdfgh")
    
    };


 })

 export const login = asyncHandler( async(req,res)=>{
    
    try {
        const { email, password, role}=req.body;
        if (
            [email, password, role].some((field) => field?.trim() === "")
        ) {
            throw new ApiError(400, "All fields are required")
        }

        const user= await User.findOne({email});
        if(!user) {
            throw new ApiError(400, "Invalid Credentials")
        }

        const isMatch= await bcrypt.compare(password, user.password);
        if(!isMatch) {
            throw new ApiError(400, "Incorrect email or password")
        }

        if(user.role !== role)
        {
            throw new ApiError(400, "Invalid Credentials")
        }
        const tokenData={
            userId:user._id,
        };
        const token =jwt.sign(tokenData,process.env.JWT_SECRET,{
            expiresIn: "1d",
        });
        const sanitizedUser = {
            _id: user._id,
            //fullname: user.fullname,
            fullName:user.fullName,
            email: user.email,
            phoneNumber: user.phoneNumber,
            //adharcard: user.adharcard,
            //pancard: user.pancard,
            role: user.role,
            profile: user.profile,
          };
      
          return res
            .status(200)
            .cookie("token", token, {
              maxAge: 24 * 60 * 60 * 1000,
              httpOnly: true,
              sameSite: "Strict",
            })
            .json({
              message: `Welcome back ${user.fullName}`,
              user: sanitizedUser,
              success: true,
            });

    }
    catch (error) {
        throw new ApiError(400, error.message,"server failed to connect")
    
    };
} );
export const logout =asyncHandler( async(req,res)=>{
    try {
        return res.status(200).cookie("token","",{maxAge:0}).json({
        message:"Logged out successfully",
        success:true,
        });  
    }
    catch(error){
        throw new ApiError(500,error,"Server Error Logging Out");
    }
} );

export const updateProfile =asyncHandler( async(req,res)=>{
    try {
        const {fullName,email,phoneNumber,bio,skills}=req.body;
    const file=req.file;


        const userId=req.id;
        const user=await User.findById(userId);

        if(!user)
        {
            throw new ApiError(400,"User not found")
        }

        if (fullName) user.fullName = fullName;
    if (email) user.email = email;
    if (phoneNumber) user.phoneNumber = phoneNumber;
    if (bio) user.profile.bio = bio;
    if (skills) user.profile.skills = skills.split(",");

    if (file) {
      const fileUri = getDataUri(file);
      const cloudResponse = await cloudinary.uploader.upload(fileUri.content);
      user.profile.resume = cloudResponse.secure_url;
      user.profile.resumeOriginalName = file.originalname;
    }
    // 
    await user.save();

    const upDatedUser={
        id: user._id,
        fullName: user.fullName,
        email: user.email,
        phoneNumber: user.phoneNumber,
        role: user.role,
        profile: user.profile, 
    }

    return res.status(200).json(
        new ApiResponse(200, upDatedUser, "Profile Updated Successfully"))

    } catch (error) {
        throw new ApiError(500, error.message,"Server Error updating profile")
    }
} )