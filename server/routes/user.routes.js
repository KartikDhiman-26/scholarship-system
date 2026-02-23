import express from "express";
import { createUser } from "../controllers/user.controller.js";
import { verifyToken } from "../middleware/auth.middleware.js";

const router = express.Router();

// Protected route (user must be logged in)
router.post("/", verifyToken, createUser);

export default router;