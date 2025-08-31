// src/routes/user.routes.js
import { Router } from "express";
import { getUserProfile, updateUserProfile, deleteUserProfile } from "../controllers/user.controller.js";
import { requireAuth, requireUser } from "../middleware/auth.middleware.js";

const router = Router();

router.get("/profile", requireAuth, requireUser, getUserProfile);
router.put("/profile", requireAuth, requireUser, updateUserProfile);
router.delete("/profile", requireAuth, requireUser, deleteUserProfile);

export default router;
