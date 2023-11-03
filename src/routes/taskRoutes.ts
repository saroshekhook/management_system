import express from "express";
import {
  getAllTasks,
  createTask,
  updateTask,
  deleteTask,
} from "../controllers/taskController";
import { isAuth, isAuthorized } from "../middlewares/auth";
import { USER_Type } from "../models/User";

const router = express.Router();

router.use(isAuth);

// Table routes
router.get("/", isAuthorized(USER_Type.admin, USER_Type.head), getAllTasks);
router.post("/", createTask);
router.put("/:id", updateTask);
router.delete("/:id", deleteTask);

export default router;
