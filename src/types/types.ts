import { Request } from "express";
import USER from "../models/User";

export interface RequestWithUser extends Request {
  user: USER;
}
