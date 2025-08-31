import express from "express";
import Razorpay from "razorpay";
import crypto from "crypto";
import User from "../models/User.js";
import { requireAuth } from "../middleware/auth.middleware.js"; // ✅ use your existing auth

const router = express.Router();

// Initialize Razorpay
const razorpay = new Razorpay({
  key_id: process.env.RAZORPAY_KEY_ID,
  key_secret: process.env.RAZORPAY_KEY_SECRET,
});

// ⇝ Create Order (protected route, must be logged in)
router.post("/create-order", requireAuth, async (req, res) => {
  try {
    const { amount, currency = "INR" } = req.body;

    const options = {
      amount: amount * 100, // amount in paise
      currency,
      receipt: `receipt_${Date.now()}`,
    };

    const order = await razorpay.orders.create(options);
    res.json({ order, userId: req.user.userId });
  } catch (error) {
    console.error("Order creation failed:", error);
    res.status(500).json({ message: "Something went wrong" });
  }
});

// ⇝ Verify Payment
router.post("/verify-payment", requireAuth, async (req, res) => {
  try {
    const { razorpay_order_id, razorpay_payment_id, razorpay_signature } = req.body;

    const body = razorpay_order_id + "|" + razorpay_payment_id;

    const expectedSignature = crypto
      .createHmac("sha256", process.env.RAZORPAY_KEY_SECRET)
      .update(body.toString())
      .digest("hex");

    if (expectedSignature === razorpay_signature) {
      // ✅ Payment verified → make user premium
      await User.findByIdAndUpdate(req.user.userId, { isPremium: true });

      res.json({ success: true, message: "Payment verified, Premium Activated ✅" });
    } else {
      res.status(400).json({ success: false, message: "Invalid signature ❌" });
    }
  } catch (error) {
    console.error("Verification failed:", error);
    res.status(500).json({ message: "Server error" });
  }
});

export default router;
