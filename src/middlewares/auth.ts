import { NextFunction, Response, Request } from "express";
import jwt, { VerifyErrors } from "jsonwebtoken";
import { getJWTSecret } from "../util/getJWTSecret";
import { RequestWithUser } from "../types/types";

export async function isAuth(req: Request, res: Response, next: NextFunction) {
  const authHeader = req.headers["authorization"];
  const token = authHeader && authHeader.split(" ")[1];

  if (token == null) return res.sendStatus(401);

  try {
    const decodedToken = await jwt.verify(token, getJWTSecret());
    (req as RequestWithUser).user = decodedToken;
    next();
  } catch (err) {}
}
