import { Request, Response } from "express";

export const notFoundMiddleware = (
  req: Request,
  res: Response,
) => {
  const endPoint = req.path.split("/").filter(Boolean).pop();
  res.status(404).json({ error: `Page ${endPoint} not found` });
};
