import express from "express";

import authenticateToken from "../middleware/isAuthenticated.js";

import {
    registerCompany,
    getAllCompanies,
    getCompanyById,
    updateCompany,

} from "../controllers/company.controller.js"

import { singleUpload } from "../middleware/multer.js";

const router = express.Router();

router.route("/register").post(authenticateToken,/*singleUpload,*/registerCompany);
router.route("/get").get(authenticateToken,getAllCompanies);
router.route("/get/:id").get(authenticateToken,getCompanyById);
router.route("/update/:id").put(authenticateToken,singleUpload,updateCompany)

export default router;