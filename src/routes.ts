import express from "express";
import taskRouter from "./routes/taskRoutes";
import userRoutes from "./routes/userRoutes";
import { isAuth } from "./middlewares/auth";

const router = express.Router();

router.use("/api", userRoutes);

// TODO change in the future if some routes need to used while being not being authenticated
router.use(isAuth);

router.use("/tasks", taskRouter);

export default router;
