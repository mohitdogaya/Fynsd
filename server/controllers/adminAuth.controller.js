import bcrypt from "bcryptjs";
import jwt from "jsonwebtoken";
import Admin from "../models/Admin.js";

export const adminRegister = async (req, res) => {
  try {
    // console.log("Incoming body:", req.body);
    const { name, email, password } = req.body;
    const hash = await bcrypt.hash(password, 10);
    const admin = await Admin.create({ name, email, password: hash });
    res.json({ id: admin._id, name: admin.name });
  } catch (err) {
    // console.error("Admin register error:", err);
    res.status(400).json({ msg: "Error registering admin", error: err.message });
  }
};

export const adminLogin = async (req, res) => {
  const { email, password } = req.body;
  const admin = await Admin.findOne({ email });
  if (!admin) return res.status(400).json({ msg: "Invalid credentials" });

  const ok = await bcrypt.compare(password, admin.password);
  if (!ok) return res.status(400).json({ msg: "Invalid credentials" });

  // 🔑 FIX: use `adminId`
  const token = jwt.sign(
    { adminId: admin._id, type: "admin" },
    process.env.JWT_SECRET,
    { expiresIn: "7d" }
  );

  res.json({ token, admin: { id: admin._id, name: admin.name } });
};

export const adminLogout = (req, res) => {
  res.json({ msg: "Admin logged out" });
};
