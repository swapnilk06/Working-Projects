import userModel from "../models/User.model.js";

// Get all users
export const getUserData = async (req, res) => {
  try {
    const users = await userModel.find();

    if (!users || users.length === 0) {
      return res.json({ success: false, message: "No users found" });
    }

    return res.json({ success: true, users });
  } catch (error) {
    return res.status(500).json({ success: false, message: error.message });
  }
};

// Delete user
export const deleteUserData = async (req, res) => {
  try {
    const userId = req.params.id;

    const user = await userModel.findByIdAndDelete(userId);

    if (!user) {
      return res.json({ success: false, message: "User not found" });
    }

    return res.json({
      success: true,
      message: "User deleted successfully",
      user,
    });
  } catch (error) {
    return res.status(500).json({ success: false, message: error.message });
  }
};
