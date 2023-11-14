import { NextFunction, Response, Request } from "express";
import jwt, { JwtPayload, VerifyCallback, VerifyErrors, VerifyOptions } from "jsonwebtoken";
import { getJWTSecret } from "../util/getJWTSecret";
import { RequestWithUser } from "../types/types";
import { USER_Type } from "../models/User";
import { promisify } from "util";
import { MyError, errorCatcher, errorThrower } from "../controllers/error";

// Performs authentication checks
export async function isAuth(req: Request, res: Response, next: NextFunction) {
  const authHeader = req.headers["authorization"];
  const token = authHeader && authHeader?.split(" ")[1];

  
  try {
    if (token == null) return errorThrower("", 401);
    const verify = promisify<
    (token: string, secret: string) => Promise<JwtPayload>
    >(jwt.verify as any);
    const decodedToken = await verify(token, getJWTSecret());
    (req as RequestWithUser).user = decodedToken; // TODO check correct ts
    next();
  } catch (err) {
    errorCatcher(next,err as MyError)
  }
}

// Verifies if the user has authorization for certain options
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
