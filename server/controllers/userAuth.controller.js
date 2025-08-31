import bcrypt from "bcryptjs";
import jwt from "jsonwebtoken";
import User from "../models/User.js";

export const userRegister = async (req, res) => {
  try {
    const { name, email, password } = req.body;
    const hash = await bcrypt.hash(password, 10);
    const user = await User.create({ name, email, password: hash });
    res.json({ id: user._id, name: user.name });
  } catch (err) {
    res.status(400).json({ msg: "Error registering user", error: err.message });
  }
};

export const userLogin = async (req, res) => {
  const { email, password } = req.body;
  const user = await User.findOne({ email });
  if (!user) return res.status(400).json({ msg: "Invalid credentials" });

  const ok = await bcrypt.compare(password, user.password);
  if (!ok) return res.status(400).json({ msg: "Invalid credentials" });

  // 🔑 FIX: use `userId`
  const token = jwt.sign(
    { userId: user._id, type: "user", isPremium: user.isPremium },
    process.env.JWT_SECRET,
    { expiresIn: "7d" }
  );

  res.json({ token, user: { id: user._id, name: user.name, isPremium: user.isPremium } });
};

export const userLogout = (req, res) => {
  res.json({ msg: "User logged out" });
};
