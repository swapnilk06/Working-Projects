import express from "express";
import {
  register,
  login,
  logout,
  sendVerifyOtp,
  verifyEmail,
  isAuthenticated,
  sendResetOtp,
  restPassword,
} from "../controllers/auth.controller.js"; // add controller funs
import userAuth from "../middleware/userauth.middleware.js";
const authRouter = express.Router(); // after creating endpoints add "authRouter" in index.js

// created 3 endpoints in authRouter
authRouter.post("/register", register);
authRouter.post("/login", login);
authRouter.post("/logout", logout);

// enponits using middlewares
authRouter.post("/send-verify-otp", userAuth, sendVerifyOtp);
authRouter.post("/verify-account", userAuth, verifyEmail);
authRouter.get("/is-auth", userAuth, isAuthenticated);

authRouter.post("/send-reset-otp", sendResetOtp);
authRouter.post("/reset-password", restPassword);

export default authRouter;
