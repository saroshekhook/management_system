import express from "express";
import taskRouter from "./taskRoutes";
import userRoutes from "./userRoutes";
import { isAuth } from "../middlewares/auth";

const router = express.Router();

router.use("/user", userRoutes);

router.use("/tasks", taskRouter);
router.use((req, res) => {
  const endPoint = req.path.split('/').filter(Boolean).pop()
  res.status(404).json({ error: `Page ${endPoint} not found` });
});

export default router;
