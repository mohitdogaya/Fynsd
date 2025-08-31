import { Router } from "express";
import { requireAuth, requireUser } from "../middleware/auth.middleware.js";
import { getUserActivity } from "../controllers/activity.controller.js";

const router = Router();

router.get("/", requireAuth, requireUser, getUserActivity);

export default router;
