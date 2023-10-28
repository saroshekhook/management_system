import express from "express";
import taskRoutes from "./routes/taskRoutes";
import { isAuth } from "./middlewares/auth";

const router = express.Router();

router.use(isAuth);

router.use("/tasks", taskRoutes);

export default router;
