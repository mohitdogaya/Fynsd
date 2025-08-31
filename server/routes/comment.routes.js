import { Router } from "express";
import { requireAuth, requireUser } from "../middleware/auth.middleware.js";
import { addComment, getComments, deleteComment, editComment } from "../controllers/comment.controller.js";

const router = Router();

router.post("/", requireAuth, requireUser, addComment);          // Add comment/reply
router.get("/:contentId", getComments);                         // Get all comments + replies
router.put("/:id", requireAuth, requireUser, editComment);       // Edit comment/reply
router.delete("/:id", requireAuth, requireUser, deleteComment);  // Delete comment/reply

export default router;
