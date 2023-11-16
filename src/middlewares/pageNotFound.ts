import { Request, Response } from "express";
import { errorThrower } from "../controllers/error";

export const notFoundMiddleware = (
  req: Request,
  res: Response,
) => {
  const endPoint = req.path.split("/").filter(Boolean).pop();
  return errorThrower(`Page ${endPoint} not found`, 404);
  // res.status(404).json({ error: `Page ${endPoint} not found` });
};
