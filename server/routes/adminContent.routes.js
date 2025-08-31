import { Router } from "express";
import { requireAuth, requireAdmin } from "../middleware/auth.middleware.js";
import { upload } from "../utils/uploader.js";
import {
  createContent,
  getContentById,
  updateContent,
  deleteContent,
  uploadMedia,
  getAllContent,
} from "../controllers/adminContent.controller.js";

const router = Router();

// CRUD routes (Admin only)
router.post("/create", requireAuth, requireAdmin, createContent);
router.get("/content/:id", requireAuth, requireAdmin, getContentById);
router.put("/content/:id", requireAuth, requireAdmin, updateContent);
router.delete("/content/:id", requireAuth, requireAdmin, deleteContent);
router.get("/", getAllContent);

// Media upload
router.post("/upload", requireAuth, requireAdmin, upload.single("file"), uploadMedia);

export default router;
