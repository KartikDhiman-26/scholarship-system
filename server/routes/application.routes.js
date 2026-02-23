import express from "express";

import {
  createApplication,
  getAllApplications,
  updateApplicationStatus,
  getMyApplications
} from "../controllers/application.controller.js";

import { verifyToken } from "../middleware/auth.middleware.js";
import { adminOnly } from "../middleware/admin.middleware.js";

const router = express.Router();

/**
 * 🔹 Student submits scholarship application
 * Protected route (must be logged in)
 */
router.post("/", verifyToken, createApplication);

/**
 * 🔹 Student checks their own applications
 * Protected route (student only)
 */
router.get("/my", verifyToken, getMyApplications);

/**
 * 🔹 Admin fetches all applications
 * Admin only
 */
router.get("/", verifyToken, adminOnly, getAllApplications);

/**
 * 🔹 Admin updates application status
 * Admin only
 */
router.put("/:id", verifyToken, adminOnly, updateApplicationStatus);

export default router;