import mongoose from 'mongoose';

const jobSchema = new mongoose.Schema(
    {
        title: {
            type: String,
            required: true
        },
        description: {
            type: String,
            required: true
        },
        requirements: [{ type: String }],  // ✅ Fixed array format
        salary: {
            type: Number,
            required: true,
            min: 0  // ✅ Ensures salary is not negative
        },
        location: {
            type: String,
            required: true
        },
        experienceLevel: {
            type: String,
            required: true
        },
        jobType: {
            type: String,
            required: true,
            enum: ["Full-time", "Part-time", "Contract", "Internship"], // ✅ Optional enum
        },
        company: {
            type: mongoose.Schema.Types.ObjectId,
            ref: "Company",
            required: true
        },
        created_by: {
            type: mongoose.Schema.Types.ObjectId,
            ref: "User",
            required: true
        },
        applications: [{  // ✅ Corrected field name (plural)
            type: mongoose.Schema.Types.ObjectId,
            ref: "Application",
        }],
    },
    { timestamps: true }
);

export const Job = mongoose.model("Job", jobSchema);
