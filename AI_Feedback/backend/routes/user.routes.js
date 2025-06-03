import express from "express";
import {
  registerUser,
  verifyUser,
  login,
  getMe,
  logoutUser,
  forgotPassword,
  resetPassword,
} from "../controller/user.controller.js";
import userAuth from "../middleware/userauth.middleware.js";

// router
const router = express.Router();

router.post("/register", registerUser);
router.get("/verify/:token", verifyUser);
router.post("/login", login);
router.get("/logout", logoutUser);

// using middleware
router.get("/profile", userAuth, getMe);
router.post("/forgot-password", forgotPassword);
router.post("/reset-password/:token", resetPassword);

export default router;
