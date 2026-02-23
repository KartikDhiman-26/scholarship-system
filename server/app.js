import express from "express";
import cors from "cors";

import userRoutes from "./routes/user.routes.js";
import testRoutes from "./routes/application.routes.js";
import applicationRoutes from "./routes/application.routes.js";

const app = express();

/* =========================
   Global Middlewares
========================= */
app.use(cors());
app.use(express.json());

/* =========================
   Health Check Route
========================= */
app.get("/", (req, res) => {
  res.status(200).send("Scholarship API Running");
});

/* =========================
   API Routes
========================= */

// Applications route
app.use("/api/applications", applicationRoutes);
app.use("/api/users", userRoutes);
// Test route (temporary)

app.use("/api", testRoutes);

/* =========================
   404 Handler (MUST BE LAST)
========================= */
app.use((req, res) => {
  res.status(404).json({
    success: false,
    message: "Route not found",
  });
});

export default app;