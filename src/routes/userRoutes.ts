import express from "express";
import { login, logout, createUser  } from "../controllers/userController";
import { isAuthorized, isAuth } from "../middlewares/auth";
import { USER_Type } from "../models/User";

const router = express.Router();

//Table routes
router.post("/login", login);
router.post("/createUser",isAuth, isAuthorized(USER_Type.admin, USER_Type.head), createUser)
router.post("/logout", logout);

export default router;
