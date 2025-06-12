import jwt from "jsonwebtoken";
import userModel from "../models/User.model.js";

const isAdmin = async (req, res, next) => {
  try {
    const token = req.cookies.token;
    if (!token) {
      return res.json({
        success: false,
        message: "Not Authorized Login Again",
      });
    }
    const decoded = jwt.verify(token, process.env.JWT_SECRET);
    const user = await userModel.findById(decoded.id);
    if (!user) {
      return res
        .status(403)
        .json({ success: false, message: "User not found" });
    }

    if (user.role !== "admin") {
      return res
        .status(403)
        .json({ success: false, message: "User is not an admin" });
    }

    next();
  } catch (error) {
    console.log("login error", error);
    return res
      .status(500)
      .json({ success: false, message: "internal server error" });
  }
};

export default isAdmin;
