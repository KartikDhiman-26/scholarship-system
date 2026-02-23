import { db } from "../config/firebase.config.js";

export const createUser = async (req, res) => {
  try {
    const uid = req.user.uid;
    const email = req.user.email;
    const { role } = req.body;

    await db.collection("users").doc(uid).set({
      email,
      role: role || "student",
      createdAt: new Date(),
    });

    return res.status(201).json({
      success: true,
      message: "User created successfully",
    });

  } catch (error) {
    return res.status(500).json({
      success: false,
      message: error.message,
    });
  }
};