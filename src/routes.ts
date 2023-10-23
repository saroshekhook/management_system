import express from "express";
import todoRoutes from "./routes/todoRoutes";

const router = express.Router();

router.use("/todos", todoRoutes);

export default router;