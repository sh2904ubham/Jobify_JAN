import express from "express";

import authenticateToken from "../middleware/isAuthenticated.js";

import {
    getAdminJobs,
    getJobById,
    getAllJobs,
    postJob,

} from "../controllers/job.controller.js";

const router =express.Router();

router.route("/post").post(authenticateToken,postJob);
router.route("/get").get(authenticateToken,getAllJobs);
router.route("/get/:id").get(authenticateToken,getJobById);
router.route("/getadminjobs").get(authenticateToken,getAdminJobs)

export default router;