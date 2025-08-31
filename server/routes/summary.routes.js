import { Router } from "express";
import { requireAuth, requireUser } from "../middleware/auth.middleware.js";
import { generateSummary } from "../controllers/summary.controller.js";

const router = Router();

router.post("/", requireAuth, requireUser, generateSummary);

export default router;
