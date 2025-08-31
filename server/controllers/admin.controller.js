// src/controllers/admin.controller.js
import Admin from "../models/Admin.js"; 
import User from "../models/User.js"; 

// --- Admin self CRUD ---
// Get admin profile
export const getAdminProfile = async (req, res) => {
  try {
    const admin = await Admin.findById(req.adminId).select("-password"); // use req.adminId
    if (!admin) return res.status(404).json({ msg: "Admin not found" });
    res.json(admin);
  } catch (err) {
    res.status(500).json({ msg: "Error fetching admin profile", error: err.message });
  }
};

// Update admin profile
export const updateAdminProfile = async (req, res) => {
  try {
    const updates = req.body;
    const admin = await Admin.findByIdAndUpdate(req.adminId, updates, { new: true }).select("-password"); // req.adminId
    res.json(admin);
  } catch (err) {
    res.status(500).json({ msg: "Error updating admin profile", error: err.message });
  }
};

// Delete admin profile
export const deleteAdminProfile = async (req, res) => {
  try {
    await Admin.findByIdAndDelete(req.adminId); // req.adminId
    res.json({ msg: "Admin deleted successfully" });
  } catch (err) {
    res.status(500).json({ msg: "Error deleting admin", error: err.message });
  }
};


// ----------------------------------------------------------


// Get all users
export const getAllUsers = async (req, res) => {
  try {
    const users = await User.find().select("-password");
    res.json(users);
  } catch (err) {
    res.status(500).json({ msg: "Error fetching users", error: err.message });
  }
};

// Get single user by ID
export const getUserById = async (req, res) => {
  try {
    const user = await User.findById(req.params.id).select("-password");
    if (!user) return res.status(404).json({ msg: "User not found" });
    res.json(user);
  } catch (err) {
    res.status(500).json({ msg: "Error fetching user", error: err.message });
  }
};

// Update user by ID
export const updateUserById = async (req, res) => {
  try {
    const updates = req.body;
    const user = await User.findByIdAndUpdate(req.params.id, updates, { new: true }).select("-password");
    res.json(user);
  } catch (err) {
    res.status(500).json({ msg: "Error updating user", error: err.message });
  }
};

// Delete user by ID
export const deleteUserById = async (req, res) => {
  try {
    await User.findByIdAndDelete(req.params.id);
    res.json({ msg: "User deleted by admin" });
  } catch (err) {
    res.status(500).json({ msg: "Error deleting user", error: err.message });
  }
};
