import Job from "../models/job.model.js";
import { asyncHandler } from "../utils/asyncHandler.js";
import { ApiError } from "../utils/ApiError.js";
import { ApiResponse} from "../utils/ApiResponse.js";

//Admin Job Posting

export const Job = asyncHandler( async(req,res)=>{
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
        const userId= req.id;

        if (
            [title, description,requirements, salary, location, jobType, experience, position, companyId].some((field) => field?.trim() === "")
        ) {
            throw new ApiError(400, "All fields are required")
        }

        const job = await job.create({
            title,
            description,
            requirements: requirements.split(","),
            salary: Number(salary),
            location,
            jobType,
            experienceLevel: experience,
            position,
            company: companyId,
            created_by: userId,
        });

        res.status(201).json(
            new ApiResponse(201, job, "Job posted successfully"),
        )

    } catch (error) {
        throw new ApiError(500, error.message,"Server Error Posting Job)");
    
    }
} );

//users 
export const getAllJobs = asyncHandler ( async(req,res)=> {
    try {
        const keyword = req.query.keyword || "";
        const query= {
            $or: [
                { title: { $regex: keyword, $options: "i" } },
                { description: { $regex: keyword, $options: "i" } },
                ],
        } ;
        const jobs = await Job.find(query).populate({
            path: "company",
        }). sort({ createdAt: -1 })

        if(!jobs){
            throw new ApiError(404, "No jobs found");
        }
        return res.status(200).json(
            new ApiResponse(200, jobs, "Jobs fetched successfully"),
        )

    } catch (error) {
        throw new ApiError(500,error.message,"Server Error Fetching Jobs")
    }
} );

//users

export const getjobById= asyncHandler( async(req,res)=> {
    try {
        const jobId = req.params.id;

        const job = await Job.findById(jobId).populate({
            path: "applications",
        });

        if(!job){
            throw new ApiError(404, "Job not found");
        }
        return res.status(200).json(
            new ApiResponse(200, job, "Job fetched successfully"),
        )
    } catch (error) {
        throw new ApiError(500,error.message,"Server Error Fetching Job")
    
    }
} );

//Admin job created

export const getAdminJobs = asyncHandler( async(req,res)=> {
    try {
        const adminId= req.id;

        const jobs = await Job.find({ created_by: adminId }).populate({
            path: "company",
            sort: { createdAt: -1 },
        });

        if(!jobs){
            throw new ApiError(404, "No jobs found");
        }
        return res.status(200).json
        (
            new ApiResponse(200, jobs, "Jobs fetched successfully"),
        )
    } catch (error) {
        throw new ApiError(500,error.message,"Server Error")
    
    
    }
})