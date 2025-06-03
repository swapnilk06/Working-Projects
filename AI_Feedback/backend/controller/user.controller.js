import User from "../model/User.model.js";
import crypto from "crypto";
import nodemailer from "nodemailer";
import bcrypt from "bcryptjs";
import jwt from "jsonwebtoken";
import transporter from "../utils/nodemailer.js";

// 1] Register user controller - Goals
// get data
// validate
// check if user already exists
// create a user in database
// create a verification token
// save token in database
// send token as email to user
// send success status to user
export const registerUser = async (req, res) => {
  const { name, email, password } = req.body;
  if (!name || !email || !password) {
    return res
      .status(400)
      .json({ success: false, message: "All fields are required" });
  }

  try {
    const existingUser = await User.findOne({ email });
    if (existingUser) {
      return res
        .status(400)
        .json({ success: false, message: "User already exists" });
    }

    const hashedPassword = await bcrypt.hash(password, 10);
    const verificationToken = crypto.randomBytes(20).toString("hex");

    const user = await User.create({
      name,
      email,
      password: hashedPassword,
      verificationToken,
      verificationTokenExpires: Date.now() + 3 * 60 * 1000, // 3 minutes
    });

    const mailOptions = {
      from: process.env.SENDER_EMAIL,
      to: email,
      subject: "Verify Your Email",
      text: `Please verify your email using this token: ${verificationToken}`,
    };

    await transporter.sendMail(mailOptions);

    return res.status(201).json({
      success: true,
      message: "Registered successfully. Please verify your email.",
    });
  } catch (error) {
    return res.status(500).json({
      success: false,
      message: "Registration failed",
      error: error.message,
    });
  }
};

// Verify through mail controller - Goals
// get token from url
// validate
// find user based on token
// if not
// set isVerified field to true
// remove verification token
// save
// return response
export const verifyUser = async (req, res) => {
  const { token } = req.params;

  try {
    const user = await User.findOne({
      verificationToken: token,
      verificationTokenExpires: { $gt: Date.now() },
    });

    if (!user) {
      return res.status(400).json({
        success: false,
        message: "Invalid or expired verification token",
      });
    }

    user.isVerified = true;
    user.verificationToken = undefined;
    user.verificationTokenExpires = undefined;
    await user.save();

    return res
      .status(200)
      .json({ success: true, message: "Email verified successfully" });
  } catch (error) {
    return res.status(500).json({ success: false, message: error.message });
  }
};

// login controller - Goals
// user give email, password
// exist email
// check password
export const login = async (req, res) => {
  const { email, password } = req.body;
  if (!email || !password)
    return res
      .status(400)
      .json({ success: false, message: "All fields are required" });

  try {
    const user = await User.findOne({ email });
    if (!user)
      return res
        .status(400)
        .json({ success: false, message: "Invalid credentials" });

    const isMatch = await bcrypt.compare(password, user.password);
    if (!isMatch)
      return res
        .status(400)
        .json({ success: false, message: "Invalid email or password" });

    if (!user.isVerified)
      return res
        .status(403)
        .json({ success: false, message: "Please verify your email" });

    const token = jwt.sign(
      { id: user._id, role: user.role },
      process.env.JWT_SECRET,
      { expiresIn: "24h" }
    );

    res.cookie("token", token, {
      httpOnly: true,
      secure: process.env.NODE_ENV === "production",
      sameSite: "strict",
      maxAge: 24 * 60 * 60 * 1000,
    });

    return res.status(200).json({
      success: true,
      message: "Login successful",
      user: {
        id: user._id,
        name: user.name,
        email: user.email,
        role: user.role,
      },
    });
  } catch (error) {
    return res.status(500).json({ success: false, message: error.message });
  }
};

// Get Logged-in User Profile
export const getMe = async (req, res) => {
  try {
    const user = await User.findById(req.body.userId).select("-password");
    if (!user)
      return res
        .status(404)
        .json({ success: false, message: "User not found" });

    return res.status(200).json({ success: true, user });
  } catch (error) {
    return res.status(500).json({ success: false, message: error.message });
  }
};

// Logout user
export const logoutUser = async (req, res) => {
  try {
    res.clearCookie("token");
    return res
      .status(200)
      .json({ success: true, message: "Logged out successfully" });
  } catch (error) {
    return res.status(500).json({ success: false, message: error.message });
  }
};

// Forgot Password - send reset token
//get email
// find user based on email
// reset token + reset expiry => Date.now() + 10 * 60 * 1000 => user.save()
// send mail => design url
export const forgotPassword = async (req, res) => {
  const { email } = req.body;
  if (!email)
    return res
      .status(400)
      .json({ success: false, message: "Email is required" });

  try {
    const user = await User.findOne({ email });
    if (!user)
      return res
        .status(404)
        .json({ success: false, message: "User not found" });

    const resetToken = crypto.randomBytes(32).toString("hex");
    user.resetPasswordToken = resetToken;
    user.resetPasswordExpires = Date.now() + 10 * 60 * 1000; // 10 minutes

    await user.save();

    const mailOptions = {
      from: process.env.SENDER_EMAIL,
      to: email,
      subject: "Reset Your Password",
      text: `Use this token to reset your password: ${resetToken}`,
    };

    await transporter.sendMail(mailOptions);

    return res
      .status(200)
      .json({ success: true, message: "Reset token sent to email" });
  } catch (error) {
    return res.status(500).json({ success: false, message: error.message });
  }
};

// Reset Password
export const resetPassword = async (req, res) => {
  const { token } = req.params;
  const { password, confirmPassword } = req.body;

  if (!password || password !== confirmPassword)
    return res
      .status(400)
      .json({ success: false, message: "Passwords do not match" });

  try {
    const user = await User.findOne({
      resetPasswordToken: token,
      resetPasswordExpires: { $gt: Date.now() },
    });

    if (!user)
      return res
        .status(400)
        .json({ success: false, message: "Invalid or expired token" });

    user.password = await bcrypt.hash(password, 10);
    user.resetPasswordToken = undefined;
    user.resetPasswordExpires = undefined;

    await user.save();

    return res
      .status(200)
      .json({ success: true, message: "Password reset successfully" });
  } catch (error) {
    return res.status(500).json({ success: false, message: error.message });
  }
};
