import express from "express";
import {
  createApplication,
  getAllApplications
} from "../controllers/application.controller.js";

import { verifyToken } from "../middleware/auth.middleware.js";
import { adminOnly } from "../middleware/admin.middleware.js";
import { updateApplicationStatus } from "../controllers/application.controller.js";

const router = express.Router();

router.post("/",verifyToken, createApplication);

// Protected admin route
router.get("/", verifyToken, adminOnly, getAllApplications);
router.get("/my", verifyToken, getMyApplications);

router.put("/:id", verifyToken, adminOnly, updateApplicationStatus);

export default router;