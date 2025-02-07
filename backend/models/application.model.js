import mongoose from "mongoose";

const applicationSchema = new mongoose.Schema(
    {
        job: {
            type: mongoose.Schema.Types.ObjectId,
            ref: "Job",
            required: true
        },
        user: {  // ✅ Changed from "applicant" to "user" (more common)
            type: mongoose.Schema.Types.ObjectId,
            ref: "User",
            required: true
        },
        status: {
            type: String,
            enum: ["Pending", "Accepted", "Rejected"],  // ✅ Capitalized for consistency
            default: "Pending"
        },
        appliedAt: {
            type: Date,
            default: Date.now  // ✅ Explicitly defining applied date
        }
    },
    { timestamps: true }  // ✅ Keeps createdAt & updatedAt fields automatically
);

export const Application = mongoose.model("Application", applicationSchema);
