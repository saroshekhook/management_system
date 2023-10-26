import express from "express";
import taskRoutes from "./routes/taskRoutes";

const router = express.Router();

router.use("/tasks", taskRoutes);

export default router;