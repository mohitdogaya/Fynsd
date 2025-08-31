import express from "express";
import passport from "passport";
import { googleCallback } from "../controllers/googleAuth.controller.js";

const router = express.Router();

// Login with Google
router.get(
  "/google",
  passport.authenticate("google", { scope: ["profile", "email"] })
);

// Google callback
router.get(
  "/google/callback",
  passport.authenticate("google", { failureRedirect: "/login", session: false }),
  googleCallback
);

export default router;
