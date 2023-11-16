import express, { NextFunction, Request, Response } from "express";
import taskRouter from "./taskRoutes";
import userRoutes from "./userRoutes";
import { notFoundMiddleware } from "../middlewares/pageNotFound";
import "../models/associations";

const router = express.Router();

router.use("/user", userRoutes);

router.use("/task", taskRouter);

router.use(notFoundMiddleware);

export const errorHandler = (
  error: any,
  req: Request,
  res: Response,
  next: NextFunction
) => {
  if (error) {
    const status: number = error.statusCode || 500;
    const message: string = error.message;
    const data = error.data;
    if (status === 401 || status === 403) {
      res.sendStatus(status);
    }
    return res.status(status).json({ message, data });
  }
  notFoundMiddleware(req, res);
};

router.use(errorHandler);

export default router;
