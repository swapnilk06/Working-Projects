import express from "express";
import { register, login } from "../controller/auth.controller.js";

// router
const router = express.Router();

router.post("/register", register);
router.post("/login", login);

export default router;
