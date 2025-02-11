import { User } from "../models/user.model.js";
import bcrypt from "bcryptjs";
import jwt from "jsonwebtoken";
import getDataUri from "../utils/datauri.js";
import cloudinary from "../utils/cloudinary.js";
import { asyncHandler } from "../utils/asyncHandler.js";
import { ApiError } from "../utils/ApiError.js";
import { ApiResponse } from "../utils/ApiResponse.js";

export const register = asyncHandler(async (req, res) => {
    const { fullName, email, password, phoneNumber, role } = req.body;

    if (![fullName, email, password, phoneNumber, role].every(Boolean)) {
        throw new ApiError(400, "All fields are required");
    }

    const existingUser = await User.findOne({ email });
    if (existingUser) {
        throw new ApiError(400, "Email already exists");
    }

    const hashedPassword = await bcrypt.hash(password, 10);
    const newUser = new User({
        fullName,
        email,
        phoneNumber,
        password: hashedPassword,
        role
    });

    await newUser.save();
    return res.status(201).json(
        new ApiResponse(201, newUser, "User registered successfully")
    );
});

export const login = asyncHandler(async (req, res) => {
    const { email, password, role } = req.body;

    if (![email, password, role].every(Boolean)) {
        throw new ApiError(400, "All fields are required");
    }

    const user = await User.findOne({ email });
    if (!user) {
        throw new ApiError(400, "Invalid email or password");
    }

    const isMatch = await bcrypt.compare(password, user.password);
    if (!isMatch) {
        throw new ApiError(400, "Invalid email or password");
    }

    if (user.role !== role) {
        throw new ApiError(400, "Invalid role selection");
    }

    const tokenData = { userId: user._id };
    const token = jwt.sign(tokenData, process.env.JWT_SECRET, { expiresIn: "1d" });

    const sanitizedUser = {
        _id: user._id,
        fullName: user.fullName,
        email: user.email,
        phoneNumber: user.phoneNumber,
        role: user.role,
        profile: user.profile,
    };

    return res.status(200)
        .cookie("token", token, {
            maxAge: 24 * 60 * 60 * 1000,
            httpOnly: true,
            sameSite: "Strict",
        })
        .json(new ApiResponse(200, sanitizedUser, `Welcome back, ${user.fullName}`));
});

export const logout = asyncHandler(async (req, res) => {
    return res.status(200)
        .cookie("token", "", { maxAge: 0 })
        .json(new ApiResponse(200, null, "Logged out successfully"));
});

export const updateProfile = asyncHandler(async (req, res) => {
    const { fullName, email, phoneNumber, bio, skills } = req.body;
    const file = req.file;
    const userId = req.user?.id; // Ensure authentication middleware sets req.user

    const user = await User.findById(userId);
    if (!user) {
        throw new ApiError(404, "User not found");
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

    await user.save();
    return res.status(200).json(
        new ApiResponse(200, user, "Profile updated successfully")
    );
});
