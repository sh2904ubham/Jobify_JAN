import express from "express";

import authenticateToken from "../middleware/isAuthenticated.js";

import {
    applyJob,
    getAppliedJobs,
    getApplicants,
    updateStatus,

} from "../controllers/application.controller.js";

const router =express.Router();

router.route("/apply/:id").post(authenticateToken,applyJob);
router.route("/get").get(authenticateToken,getAppliedJobs);
router.route("/get/:id").get(authenticateToken,getApplicants);
router.route("/update/:id").put(authenticateToken,updateStatus)

export default router;