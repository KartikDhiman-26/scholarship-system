import express from "express";
import cors from "cors";
import dotenv from "dotenv";

import applicationRoutes from "./routes/application.routes.js";
import userRoutes from "./routes/user.routes.js";

// Load environment variables
dotenv.config();

const app = express();

/**
 * 🔥 CORS CONFIG
 * Allow frontend (Vercel) to call backend (Render)
 */
app.use(
  cors({
    origin: "*", // Later you can restrict to your Vercel domain
  })
);

/**
 * 🔥 Middleware
 */
app.use(express.json());

/**
 * 🔥 Routes
 */
app.use("/api/applications", applicationRoutes);
app.use("/api/users", userRoutes);

/**
 * 🔥 Health Check Route
 */
app.get("/", (req, res) => {
  res.send("Scholarship System Backend is Running 🚀");
});

/**gi
 * 🔥 IMPORTANT: Render requires binding to process.env.PORT
 */
const PORT = process.env.PORT || 5000;

app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});