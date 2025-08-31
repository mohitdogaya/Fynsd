// src/models/Admin.js
import mongoose from "mongoose";

const adminSchema = new mongoose.Schema(
  {
    name: { type: String, required: true },       // admin name
    email: { type: String, required: true, unique: true }, // admin email
    password: { type: String, required: true },   // hashed password
  },
  { timestamps: true }
);

export default mongoose.model("Admin", adminSchema);
