import jwt from "jsonwebtoken";

// import { asyncHandler } from "../utils/asyncHandler";
 import {ApiError} from "../utils/ApiError.js"

const authenticateToken = (req,res,next)=>{
try {
    const token=req.cookies.token;
    if(!token) {
        throw new ApiError(401,"No token provide");

    }
    const decoded =jwt.verify(token,process.env.JWT_SECRET);
    if(!decoded){
        throw new ApiError(401,"Invalid token")
    }
    req.id=decoded.userId;
    next();
}
    catch(error)
    {
        throw new ApiError(401,"iNVALID TOKEN");
    }
}
export default authenticateToken;