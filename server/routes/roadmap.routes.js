import express from "express";
import {
  createRoadmap,
  getRoadmaps,
  getRoadmapById,
  updateRoadmap,
  deleteRoadmap
} from "../controllers/roadmap.controller.js";

import { requireAuth, requireAdmin } from "../middleware/auth.middleware.js";

const router = express.Router();

/* ============================
   🚀 Public/User Routes
   ============================ */

// ⇝ Get all roadmaps (anyone can see published ones)
router.get("/", getRoadmaps);

// ⇝ Get roadmap by ID (for viewing detailed roadmap)
router.get("/:id", getRoadmapById);


/* ============================
   🔒 Admin Routes
   ============================ */

// ⇝ Create roadmap (only admin)
router.post("/", requireAuth, requireAdmin, createRoadmap);

// ⇝ Update roadmap (only admin)
router.put("/:id", requireAuth, requireAdmin, updateRoadmap);

// ⇝ Delete roadmap (only admin)
router.delete("/:id", requireAuth, requireAdmin, deleteRoadmap);

export default router;
