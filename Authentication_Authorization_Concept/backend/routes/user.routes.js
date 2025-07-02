import express from "express";
import verifyToken from "../middleware/auth.middleware.js";
import authorizeRoles from "../middleware/role.middleware.js";

// router
const router = express.Router();

// Only admin can access this router
router.get("/admin", verifyToken, authorizeRoles("admin"), (req, res) => {
  res.json({ message: "Welcome Admin" });
});

// Both admin & manager can access this router
router.get(
  "/manager",
  verifyToken,
  authorizeRoles("admin", "manger"),
  (req, res) => {
    res.json({ message: "Welcome Manager" });
  }
);

// All can access this router
router.get(
  "/user",
  verifyToken,
  authorizeRoles("admin", "manager", "user"),
  (req, res) => {
    res.json({ message: "Welcome User" });
  }
);

export default router;
