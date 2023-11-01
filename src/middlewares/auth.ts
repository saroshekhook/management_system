import { NextFunction, Response, Request } from "express";
import jwt, { VerifyErrors } from "jsonwebtoken";
import { getJWTSecret } from "../util/getJWTSecret";
import { RequestWithUser } from "../types/types";
import { USER_Type } from "../models/User";

export async function isAuth(req: Request, res: Response, next: NextFunction) {
  const authHeader = req.headers["authorization"];
  const token = authHeader && authHeader.split(" ")[1];

  if (token == null) return res.sendStatus(401);

  try {
    const decodedToken = await jwt.verify(token, getJWTSecret());
    (req as RequestWithUser).user = decodedToken; // TODO check correct ts
    next();
  } catch (err) {}
}

export function isAuthorized(...type: USER_Type[]) {
  return function (req: Request, res: Response, next: NextFunction) {
    const userPayload = (req as RequestWithUser)["user"]; // TODO check correct ts
    if (!userPayload) {
      return res.sendStatus(401);
    }

    if (typeof userPayload === "string") {
      return res.sendStatus(403);
    }

    if (Array.isArray(type) && !type.includes(userPayload.type)) {
      return res.sendStatus(403);
    }

    next();
  };
}
