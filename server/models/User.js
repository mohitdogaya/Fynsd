// src/models/User.js
import mongoose from "mongoose";

const userSchema = new mongoose.Schema(
  {
    name: { type: String, required: true },   // user name

    email: { type: String, required: true, unique: true }, // user email

    password: { type: String },  // local users ke liye hoga, google users ke liye empty

    googleId: { type: String },  // Google user ka id store karne ke liye

    provider: { 
      type: String, 
      default: "local"  // local ya google
    },

    isPremium: { type: Boolean, default: false },
  },
  { timestamps: true }
);

export default mongoose.model("User", userSchema);
