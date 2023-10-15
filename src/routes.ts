import express from "express";
import todoRoutes from "./routes/todoRoutes";

const router = express.Router();

router.use("/todos", todoRoutes);

router.use("/secTodo", todoRoutes);


export default router;