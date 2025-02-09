import { Application } from "../models/application.model.js";
import { Job } from "../models/job.model.js";
import { asyncHandler } from "../utils/asyncHandler.js";
import { ApiError } from "../utils/ApiError.js";
import { ApiResponse } from "../utils/ApiResponse.js";

/**
 * 📝 Apply for a job
 * Possible Errors:
 * - Job ID not provided
 * - User already applied
 * - Job does not exist
 */
export const applyJob = asyncHandler(async (req, res) => {
    const userId = req.id;
    const jobId = req.params.id;

    if (!jobId) {
        throw new ApiError(400, "Job Id is required");
    }

    const existingApplication = await Application.findOne({ user: userId, job: jobId });
    if (existingApplication) {
        throw new ApiError(400, "You have already applied for this job");
    }

    const job = await Job.findById(jobId);
    if (!job) {
        throw new ApiError(404, "Job not found");
    }

    const newApplication = await Application.create({ user: userId, job: jobId });

    job.applications.push(newApplication._id);
    await job.save();

    return res.status(201).json(new ApiResponse(201, newApplication, "Application submitted successfully"));
});

/**
 * 📝 Get all jobs a user has applied for
 * Possible Errors:
 * - No applications found for the user
 */
export const getAppliedJobs = asyncHandler(async (req, res) => {
    const userId = req.id;

    const applications = await Application.find({ user: userId })
        .sort({ createdAt: -1 })
        .populate({
            path: "job",
            options: { sort: { createdAt: -1 } },
            populate: { path: "company", options: { sort: { createdAt: -1 } } },
        });

    if (!applications || applications.length === 0) {
        throw new ApiError(404, "No applications found");
    }

    return res.status(200).json(new ApiResponse(200, applications, "Applications fetched successfully"));
});

/**
 * 📝 Get all applicants for a job
 * Possible Errors:
 * - Job does not exist
 * - No applicants for the job
 */
export const getApplicants = asyncHandler(async (req, res) => {
    const jobId = req.params.id;

    const jobDetails = await Job.findById(jobId).populate({
        path: "applications",
        select: "user createdAt status",
        populate: { path: "user", select: "name email" },
    });

    // ✅ Debugging log (remove in production)
    //console.log("🔍 Job Details:", jobDetails);
    //console.log("📌 Applications:", jobDetails?.applications);

    if (!jobDetails) {
        throw new ApiError(404, "Job not found");
    }

    if (!jobDetails.applications || jobDetails.applications.length === 0) {
        throw new ApiError(404, "No applicants found for this job");
    }

    return res.status(200).json(new ApiResponse(200, jobDetails.applications, "Applicants fetched successfully"));
});

/**
 * 📝 Update application status
 * Possible Errors:
 * - Application not found
 * - Status not provided
 */
export const updateStatus = asyncHandler(async (req, res) => {
    const { status } = req.body;
    const applicationId = req.params.id;

    if (!status) {
        throw new ApiError(400, "Status is required");
    }

    const application = await Application.findByIdAndUpdate(applicationId, { status }, { new: true });

    if (!application) {
        throw new ApiError(404, "Application not found");
    }

    return res.status(200).json(new ApiResponse(200, application, "Status updated successfully"));
});
