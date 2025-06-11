import express from "express";
import {
  getUserData,
  deleteUserData,
} from "../controllers/admin.controller.js";
import isAdmin from "../middleware/isAdmin.middleware.js";

const router = express.Router();

// GET all users (only admin)
router.get("/data", isAdmin, getUserData);

// DELETE user
router.delete("/data/:id", isAdmin, deleteUserData);

export default router;
