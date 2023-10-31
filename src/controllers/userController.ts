import { Request, Response } from "express";
import USER, { USER_Type } from "../models/User";
import * as bcrypt from "bcrypt";
import jwt, { VerifyErrors } from "jsonwebtoken";
import { getJWTSecret } from "../util/getJWTSecret";

export const login = async (req: Request, res: Response) => {
  try {
    // TODO validate
    const { email, password } = req.body;
    const user = await USER.findOne({ where: { email: email } });

    if (!user) {
      return res.status(401).json({ error: "user is not found" });
    }

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
    const token = await jwt.sign(payload, getJWTSecret(), {
      expiresIn: 3600,
    });
    return res.status(200).json({ success: true, token: `Bearer ${token}` });
  } catch (error) {
    console.log(error, "ssss");
    // TODO find a better way to generalize and handle errors
    res.status(500).json({ error: "Internal server error" });
  }
};

export const signUp = async (req: Request, res: Response) => {
  try {
    // TODO validate

    const { username, password, email } = req.body;
    await USER.create({ username, password, email });
    res.status(200).json({ description: "user is created" });
  } catch (error) {
    // TODO find a better way to generalize and handle errors
    res.status(500).json({ error: "Internal server error" });
  }
};
