import { NextFunction, Response, Request } from "express";
import jwt, { VerifyErrors } from "jsonwebtoken";

export function isAuth(req: Request, res: Response, next: NextFunction) {
  const authHeader = req.headers["authorization"];
  const token = authHeader && authHeader.split(" ")[1];

  if (token == null) return res.sendStatus(401);

  jwt.verify(
    token,
    process.env.TOKEN_SECRET as string,
    (err: any, user: any) => {
      console.log(err);

      if (err) return res.sendStatus(403);
      //@ts-ignore //TODO Check typescript error
      req["user"] = user;

      next();
    }
  );
}
