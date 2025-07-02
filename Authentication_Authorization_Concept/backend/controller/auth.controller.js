import jwt from "jsonwebtoken";
import bcrypt from "bcryptjs";
import User from "../model/User.model.js";

const register = async (req, res) => {
  try {
    const { username, password, role } = req.body;
    const hashPassword = await bcrypt.hash(password, 10);

    const newUser = new User({ username, password: hashPassword, role });
    await newUser.save();
    res
      .status(201)
      .json({ message: `User registered with username ${username}` });
  } catch (err) {
    console.error("Register Error:", err);
    res.status(500).json({ message: `Something went wrong` });
  }
};

const login = async (req, res) => {
  try {
    const { username, password } = req.body;
    const user = await User.findOne({ username });

    if (!user) {
      return res
        .status(404)
        .json({ message: `User with username ${username} not found` });
    }

    const isMatch = await bcrypt.compare(password, user.password);
    if (!isMatch) {
      return res.status(400).json({ message: `Invalid Credentails` });
    }
    const token = jwt.sign(
      { id: user._id, role: user.role },
      process.env.JWT_SECRET,
      { expiresIn: "1h" }
    );

    res.status(200).json({ token });
  } catch (err) {
    console.error("Login Error:", err);
    res.status(500).json({ message: `Something went wrong` });
  }
};

export { register, login };
