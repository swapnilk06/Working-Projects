import express from "express";
import {
  getUserData,
  deleteUserData,
} from "../controllers/admin.controller.js";
import isAdmin from "../middleware/isAdmin.middleware.js";
import { submitFeedback } from "../controllers/feedback.controller.js";

const adminRouter = express.Router();

adminRouter.get("/getallusers", isAdmin, getUserData, submitFeedback);
adminRouter.delete("/deleteuser:id", isAdmin, deleteUserData);

export default adminRouter;
