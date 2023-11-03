import { Request, Response } from "express";
import User, { USER_Type } from "../models/User";
import bcrypt from "bcrypt";
import jwt, { SignOptions, VerifyErrors } from "jsonwebtoken";
import { getJWTSecret } from "../util/getJWTSecret";
import { promisify } from "util";

// Handles user login logic
export const login = async (req: Request, res: Response) => {
  try {
    // TODO validate
    const { email, password } = req.body;
    const user = await User.findOne({ where: { email } });

    if (!user) return res.status(404).json({ error: "user is not found" });

    const isMatch = await bcrypt.compare(password, user.password);

    if (!isMatch) {
      // TODO change the message
      return res.status(400).json({ error: "Authentication did not work" });
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
    res.status(500).json({ error: "Internal server error" });
  }
};

// Handles user logout logic
export const signUp = async (req: Request, res: Response) => {
  try {
    // TODO validate

    const { username, password, email } = req.body;
    await User.create({ username, password, email });
    res.status(200).json({ description: "user is created" });
  } catch (error) {
    // TODO find a better way to generalize and handle errors
    res.status(500).json({ error: "Internal server error" });
  }
};
