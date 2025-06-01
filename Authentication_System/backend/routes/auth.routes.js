import express from "express";
import { register, login, logout } from "../controllers/auth.controller.js"; // add 3 controller funs

const authRouter = express.Router(); // after creating endpoints add "authRouter" in index.js

// created 3 endpoints in authRouter
authRouter.post("/register", register);
authRouter.post("/login", login);
authRouter.post("/logout", logout);

export default authRouter;
