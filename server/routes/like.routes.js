import { Router } from "express";
import { requireAuth, requireUser } from "../middleware/auth.middleware.js";
import { toggleLike, getLikesCount } from "../controllers/like.controller.js";

const router = Router();

router.post("/", requireAuth, requireUser, toggleLike);
router.get("/:contentId", getLikesCount);

export default router;
