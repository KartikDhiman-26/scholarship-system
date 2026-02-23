import { db } from "../config/firebase.config.js";

export const createApplication = async (req, res) => {
  try {
    const { name, email, cgpa, income } = req.body;

    // Basic validation
    if (!name || !email || !cgpa || !income) {
      return res.status(400).json({
        success: false,
        message: "All fields are required",
      });
    }

    const docRef = await db.collection("applications").add({
     studentId: req.user.uid,
     name,
     email,
     cgpa,
     income,
     status: "pending",
     createdAt: new Date(),
});

    return res.status(201).json({
      success: true,
      id: docRef.id,
      message: "Application submitted successfully",
    });

  } catch (error) {
    return res.status(500).json({
      success: false,
      message: error.message,
    });
  }
};

export const getAllApplications = async (req, res) => {
  try {
    const snapshot = await db.collection("applications").get();

    const applications = snapshot.docs.map(doc => ({
      id: doc.id,
      ...doc.data(),
    }));

    return res.status(200).json({
      success: true,
      count: applications.length,
      data: applications,
    });

  } catch (error) {
    return res.status(500).json({
      success: false,
      message: error.message,
    });
  }
};

export const updateApplicationStatus = async (req, res) => {
  try {
    const { id } = req.params;
    const { status } = req.body;

    if (!["approved", "rejected"].includes(status)) {
      return res.status(400).json({
        success: false,
        message: "Invalid status",
      });
    }

    await db.collection("applications").doc(id).update({
      status,
    });

    return res.status(200).json({
      success: true,
      message: "Application status updated",
    });

  } catch (error) {
    return res.status(500).json({
      success: false,
      message: error.message,
    });
  }
};

export const getMyApplications = async (req, res) => {
  try {
    const snapshot = await db
      .collection("applications")
      .where("studentId", "==", req.user.uid)
      .get();

    const applications = snapshot.docs.map(doc => ({
      id: doc.id,
      ...doc.data(),
    }));

    return res.status(200).json({
      success: true,
      data: applications,
    });

  } catch (error) {
    return res.status(500).json({
      success: false,
      message: error.message,
    });
  }
};