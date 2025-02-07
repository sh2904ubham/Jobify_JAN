import { Job } from "../models/job.model.js";
import { asyncHandler } from "../utils/asyncHandler.js";
import { ApiError } from "../utils/ApiError.js";
import { ApiResponse } from "../utils/ApiResponse.js";
import { Application } from "../models/application.model.js";
// Admin Job Posting
export const postJob = asyncHandler(async (req, res) => {
    try {
        const {
            title,
            description,
            requirements,
            salary,
            location,
            jobType,
            experience,
            position,
            companyId,
        } = req.body;

        const userId = req.id;

        // Validate required fields
        if ([title, description, requirements, salary, location, jobType, experience, position, companyId].some(field => !field || field.toString().trim() === "")) {
            throw new ApiError(400, "All fields are required");
        }

        // Convert salary properly (supports 'LPA' format)
        let parsedSalary;
        if (typeof salary === "string" && salary.toUpperCase().includes("LPA")) {
            parsedSalary = parseFloat(salary) * 100000; // Convert LPA to absolute number
        } else {
            parsedSalary = parseFloat(salary);
        }

        if (isNaN(parsedSalary) || parsedSalary < 0) {
            throw new ApiError(400, "Invalid salary value. Provide a valid number (e.g., '20 LPA' or '2000000').");
        }

        // Create job
        const job = await Job.create({
            title,
            description,
            requirements: requirements.split(","),
            salary: parsedSalary, // Use validated salary
            location,
            jobType,
            experienceLevel: experience,
            position,
            company: companyId,
            created_by: userId,
        });

        res.status(201).json(new ApiResponse(201, job, "Job posted successfully"));
    } catch (error) {
        throw new ApiError(500, error.message, "Server Error Posting Job");
    }
});

// Get All Jobs (for users)
export const getAllJobs = asyncHandler(async (req, res) => {
    try {
        const keyword = req.query.keyword || "";
        const query = {
            $or: [
                { title: { $regex: keyword, $options: "i" } },
                { description: { $regex: keyword, $options: "i" } },
            ],
        };

        const jobs = await Job.find(query)
            .populate({ path: "company" })
            .sort({ createdAt: -1 });

        if (!jobs || jobs.length === 0) {
            throw new ApiError(404, "No jobs found");
        }

        res.status(200).json(new ApiResponse(200, jobs, "Jobs fetched successfully"));
    } catch (error) {
        throw new ApiError(500, error.message, "Server Error Fetching Jobs");
    }
});

// Get Job by ID (for users)
export const getJobById = asyncHandler(async (req, res) => {
    try {
        const jobId = req.params.id;

        const job = await Job.findById(jobId).populate({ path: "applications" });

        if (!job) {
            throw new ApiError(404, "Job not found");
        }

        res.status(200).json(new ApiResponse(200, job, "Job fetched successfully"));
    } catch (error) {
        throw new ApiError(500, error.message, "Server Error Fetching Job");
    }
});

// Get Admin's Posted Jobs
export const getAdminJobs = asyncHandler(async (req, res) => {
    try {
        const adminId = req.id;

        const jobs = await Job.find({ created_by: adminId })
            .populate({ path: "company" })
            .sort({ createdAt: -1 });

        if (!jobs || jobs.length === 0) {
            throw new ApiError(404, "No jobs found");
        }

        res.status(200).json(new ApiResponse(200, jobs, "Jobs fetched successfully"));
    } catch (error) {
        throw new ApiError(500, error.message, "Server Error Fetching Jobs");
    }
});
