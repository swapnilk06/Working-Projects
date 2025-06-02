import express from "express";
import {
  register,
  login,
  logout,
  sendVerifyOtp,
  verifyEmail,
} from "../controllers/auth.controller.js"; // add 3 controller funs
import userAuth from "../middleware/userauth.middleware.js";
const authRouter = express.Router(); // after creating endpoints add "authRouter" in index.js

// created 3 endpoints in authRouter
authRouter.post("/register", register);
authRouter.post("/login", login);
authRouter.post("/logout", logout);

authRouter.post("/send-verify-otp", userAuth, sendVerifyOtp);
authRouter.post("/verify-account", userAuth, verifyEmail);

export default authRouter;
