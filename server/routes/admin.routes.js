// src/routes/admin.routes.js
import { Router } from "express";
import { 
  getAllUsers, getUserById, updateUserById, deleteUserById,
  getAdminProfile, updateAdminProfile, deleteAdminProfile
} from "../controllers/admin.controller.js";
import { requireAuth, requireAdmin } from "../middleware/auth.middleware.js";

const router = Router();

// --- Admin self profile ---
router.get("/profile", requireAuth, requireAdmin, getAdminProfile);
router.put("/profile", requireAuth, requireAdmin, updateAdminProfile);
router.delete("/profile", requireAuth, requireAdmin, deleteAdminProfile);

// --- Admin managing Users ---
router.get("/users", requireAuth, requireAdmin, getAllUsers);
router.get("/users/:id", requireAuth, requireAdmin, getUserById);
router.put("/users/:id", requireAuth, requireAdmin, updateUserById);
router.delete("/users/:id", requireAuth, requireAdmin, deleteUserById);

export default router;
