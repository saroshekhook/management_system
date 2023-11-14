import { NextFunction, Request, Response } from "express";
import User, { USER_Type } from "../models/User";
import bcrypt from "bcrypt";
import jwt, { SignOptions, VerifyErrors } from "jsonwebtoken";
import { getJWTSecret } from "../util/getJWTSecret";
import { promisify } from "util";
import { MyError, errorCatcher, errorThrower } from "./error";

// Handles user login logic
export const login = async (req: Request, res: Response, next: NextFunction) => {
  try {
    // TODO validate
    const { email, password } = req.body;
    const user = await User.findOne({ where: { email } });
    if (!user) return errorThrower("Error in credentials", 404);
    // console.log("OOOOOOO");
    //return res.status(404).json({ error: "Error in credentials" });

    const isMatch = await bcrypt.compare(password, user.password);

    if (!isMatch) {
      // TODO change the message
      return errorThrower("Error in credentials", 400);
      //return res.status(400).json({ error: "Error in credentials" });
    }

    const payload = {
      id: user.id,
      name: user.username,
      type: user.type,
    };
    const sign = promisify<object, string, SignOptions>(jwt.sign);
    const token = await sign(payload, getJWTSecret(), {
      expiresIn: 3600,
    });
    return res.status(200).json({ success: true, token: `Bearer ${token}` });
  } catch (error) {
    // TODO find a better way to generalize and handle errors
    return errorCatcher(next, error as MyError)
    // res.status(500).json({ error: "Internal server error" });
  }
};

// Handles user creation logic
export const createUser = async (req: Request, res: Response, next: NextFunction) => {
  try {
    // TODO validate
    const { username, password, email } = req.body;
    await User.create({ username, password, email });
    res.status(200).json({ description: "user is created" });
  } catch (error) {
    // TODO find a better way to generalize and handle errors
    return errorCatcher(next, error as MyError)
    //res.status(500).json({ error: "Internal server error" });
  }
};

// Handles user logout logic
export const logout = (req: Request, res: Response) => {
  // Deletes the token from the request headers
  delete req.headers.authorization;
  res
    .status(200)
    .json({ success: true, message: "Logout successful. Token removed." });
};
