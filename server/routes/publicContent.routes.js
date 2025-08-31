import { Router } from "express";
import { listContents, getContentBySlug } from "../controllers/publicContent.controller.js";
import { requireAuth } from "../middleware/auth.middleware.js"; // already handles optional

const router = Router();

// Public routes with optional auth
router.get("/contents", requireAuth, listContents);
router.get("/content/:slug", requireAuth, getContentBySlug);

export default router;
