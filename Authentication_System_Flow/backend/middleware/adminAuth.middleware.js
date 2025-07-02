import jwt from "jsonwebtoken";
import userModel from "../models/User.model.js";

const adminAuth = async (req, res) => {
  const { token } = req.cookies;
  if (!token)
    return res.status(401).json({ success: false, message: "Not Authorized" });

  try {
    const decoded = jwt.verify(token, process.env.JWT_SECRET);
    const user = await userModel.findById(decoded.id);
    if (!user || !user.isAdmin) {
      return res
        .status(403)
        .json({ success: false, message: "Admin access only" });
    }
    req.user = user;
    next();
  } catch (error) {
    return res.status(401).json({ success: false, message: "Invalid token" });
  }
};

export default adminAuth;
