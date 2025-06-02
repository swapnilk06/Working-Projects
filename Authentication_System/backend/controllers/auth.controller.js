import bcrypt from "bcrypt"; // encrypt password
import jwt from "jsonwebtoken"; // generate token for authentication
import userModel from "../models/User.model.js";
import transporter from "../utils/nodemailer.js";

// 1] create the controller fun for user register
export const register = async (req, res) => {
  const { name, email, password } = req.body; // to create "new user" we need to name, email id, password we will get from req.body

  if (!name || !email || !password) {
    return res.json({ success: false, message: "Missing Details" });
    // "success: false" -> user not created, any of detail are missing name, email, password & return success: false
  }

  // after succesfully executed above code whenever success true
  try {
    // 3] before encrypt password check user existance
    const existingUser = await userModel.findOne({ email });

    if (existingUser) {
      return res.json({ success: false, message: "User already exists" }); // no user with email id then stroed into hash password
    }

    // 2] encrypt the password using bcrypt
    const hashedPassword = await bcrypt.hash(password, 10); // before hash password check the existing user

    // 4] create the user for the database using user model
    const user = new userModel({ name, email, password: hashedPassword }); // get 3 required field only from model others are default
    await user.save(); // user created after store in the moongoDB database

    // 5] create token for the authentication using the cookies
    const token = jwt.sign({ id: user._id }, process.env.JWT_SECRET, {
      expiresIn: "24h",
    });

    // 6] after generating token we have to send to user in the response & response add the cookie
    // using the cookie we will send token
    res.cookie("token", token, {
      httpOnly: true,
      secure: process.env.NODE_ENV === "production",
      sameSite: process.env.NODE_ENV === "production" ? "none" : "strict",
      maxAge: 7 * 24 * 60 * 60 * 1000,
    });

    // Sending email to user
    const mailOptions = {
      from: process.env.SENDER_EMAIL,
      to: email,
      subject: "Welocome to Authentication System",
      text: `Welcome Auth base website. Your account has been created with email id: ${email}`,
    };

    await transporter.sendMail(mailOptions);

    // after sending the email get response success => true
    return res.json({ success: true });

    // try to create user account & store the data in the database after reached to name, email, password
  } catch (error) {
    res.json({ success: false, message: error.message });
  }
};

// 7] create the controller fun for user login
export const login = async (req, res) => {
  const { email, password } = req.body;

  if (!email || !password) {
    return res.json({
      success: false,
      message: "Email and password are required",
    }); // if email & password missing return the response
  }

  try {
    const user = await userModel.findOne({ email });

    // if user could not find any user from email id
    if (!user) {
      return res.json({ success: false, message: "Invalid email" });
    }

    const isMatch = await bcrypt.compare(password, user.password);

    if (!isMatch) {
      return res.json({ success: false, message: "Invalid password" });
    }

    // create JWT token
    const token = jwt.sign({ id: user._id }, process.env.JWT_SECRET, {
      expiresIn: "24h",
    });

    // set token in cookie
    res.cookie("token", token, {
      httpOnly: true,
      secure: process.env.NODE_ENV === "production",
      sameSite: process.env.NODE_ENV === "production" ? "none" : "strict",
      maxAge: 7 * 24 * 60 * 60 * 1000,
    });

    return res.json({ success: true });
  } catch (error) {
    res.json({ success: false, message: error.message });
  }
};

// 8] create the controller fun for user logout

export const logout = async (req, res) => {
  try {
    res.clearCookie("token", {
      httpOnly: true,
      secure: process.env.NODE_ENV === "production",
      sameSite: process.env.NODE_ENV === "production" ? "none" : "strict",
    });

    return res.json({ success: true, message: "Logged Out" });
  } catch (error) {
    res.json({ success: false, message: error.message });
  }
};

// 9] Create the controller fun for send verification OTP to the user email
export const sendVerifyOtp = async (req, res) => {
  try {
    const { userId } = req.body;

    // find the user from our database
    const user = await userModel.findById(userId);

    if (user.isAccountVerified) {
      return res.json({ success: false, message: "Account Already verified" });
    }

    // suppose account is not verified then generate OTP & send user email id
    // generate OTP using math random fun
    const otp = String(Math.floor(100000 + Math.random() * 900000));

    user.verifyOtp = otp;
    user.verifyOtpExpireAt = Date.now() + 3 * 60 * 1000; // 3 mins

    await user.save();

    const mailOptions = {
      from: process.env.SENDER_EMAIL,
      to: user.email,
      subject: `Your OTP is ${otp}. Verify your account using this OTP.`,
    };
    await transporter.sendMail(mailOptions);

    res.json({ success: true, message: "Verification OTP sent on Email" });
  } catch (error) {
    res.json({ success: false, message: error.message });
  }
};

// 10] Create the controller fun for verify Email

export const verifyEmail = async (req, res) => {
  const { userId, otp } = req.body;

  if (!userId || !otp) {
    return res.json({ success: false, message: "Missing Details" });
  }
  try {
    // find the user from the database
    const user = await userModel.findById(userId);

    if (!user) {
      return res.json({ success: false, message: "User not found" });
    }

    if (user.verifyOtp === "" || user.verifyOtp !== otp) {
      return res.json({ success: false, message: "Invalid OTP" });
    }

    if (user.verifyOtpExpireAt < Date.now()) {
      return res.json({ success: false, message: "OTP Expired" });
    }

    user.isAccountVerified = true;
    user.verifyOtp = "";
    user.verifyOtpExpireAt = 0;

    await user.save();
    return res.json({ success: true, message: "Email verified successfully" });
  } catch (error) {
    return res.json({ success: false, message: error.message });
  }
};
