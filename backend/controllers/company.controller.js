import { Company } from "../models/company.models.js";
import Jwt from "jsonwebtoken";
import getDataUri from "../utils/datauri.js";
import cloudinary from "../utils/cloudinary.js";
import { asyncHandler } from "../utils/asyncHandler.js";
import { ApiError } from "../utils/ApiError.js";
import { ApiResponse } from "../utils/ApiResponse.js";

export const registerCompany = asyncHandler(async (req, res) => {
    try {
        const { companyName } = req.body;

        if (!companyName) {
            throw new ApiError(401, "Company name is required");
        }

        let company = await Company.findOne({ name: companyName });
        if (company) {
            throw new ApiError(401, "Company already exists");
        }

        company = await Company.create({
            name: companyName,
            userId: req.id,
        });

        return res.status(200).json({
            ...new ApiResponse(200, company, "Company registered Successfully"),
        });

    } catch (error) {
        throw new ApiError(400, error.message);
    }
});

export const getAllCompanies = asyncHandler(async (req, res) => {
    try {
        const userId = req.id;
        const companies = await Company.find({ userId });

        if (companies.length === 0) {
            throw new ApiError(404, "No companies found");
        }

        return res.status(200).json({
            ...new ApiResponse(200, companies, "Companies fetched Successfully"),
        });

    } catch (error) {
        throw new ApiError(400, error.message);
    }
});

export const getCompanyById = asyncHandler(async (req, res) => {
    try {
        const companyId = req.params.id;
        const company = await Company.findById(companyId);
        if (!company) {
            throw new ApiError(404, "Company not found");
        }

        return res.status(200).json({
            ...new ApiResponse(200, company, "Company fetched Successfully"),
        });

    } catch (error) {
        throw new ApiError(400, error.message);
    }
});

// Update company details
export const updateCompany = asyncHandler(async (req, res) => {
    try {
        const { name, description, website, location } = req.body;
        const file = req.file;

        let logo;
        if (file) {
            const fileUri = getDataUri(file);
            const cloudResponse = await cloudinary.uploader.upload(fileUri.content);
            logo = cloudResponse.secure_url;
        }

        const updateData = { name, description, website, location };
        if (logo) updateData.logo = logo;

        const company = await Company.findByIdAndUpdate(req.params.id, updateData, {
            new: true,
        });

        if (!company) {
            throw new ApiError(404, "Company not found");
        }

        return res.status(200).json({
            ...new ApiResponse(200, company, "Company updated Successfully"),
        });

    } catch (error) {
        throw new ApiError(400, error.message);
    }
});
