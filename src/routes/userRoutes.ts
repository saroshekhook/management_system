import express from "express";
import { login, signUp } from "../controllers/userController";

const router = express.Router();

//Table routes
router.post("/signup", signUp);
router.post("/login", login);

export default router;
