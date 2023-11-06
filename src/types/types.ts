import { Request } from "express";
import { JwtPayload } from "jsonwebtoken";

// User ID or token payload added by auth middleware
export interface RequestWithUser extends Request {
  user: JwtPayload;
}
