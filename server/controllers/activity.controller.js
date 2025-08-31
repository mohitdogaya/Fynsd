import Like from "../models/Like.js";
import Comment from "../models/Comment.js";
import Content from "../models/Content.js";

export const getUserActivity = async (req, res) => {
  try {
    const userId = req.userId;

    // ✅ Get Liked Content
    const likes = await Like.find({ userId }).populate("contentId");
    const likedContents = likes.map(l => l.contentId);

    // ✅ Get Commented Content (distinct)
    const comments = await Comment.find({ userId }).populate("contentId");
    const commentedContents = comments.map(c => c.contentId);

    // ✅ Remove duplicates
    const uniqueCommented = [];
    const seen = new Set();
    for (let c of commentedContents) {
      if (c && !seen.has(c._id.toString())) {
        seen.add(c._id.toString());
        uniqueCommented.push(c);
      }
    }

    res.json({
      liked: likedContents,
      commented: uniqueCommented
    });
  } catch (err) {
    console.error("Error fetching activity:", err);
    res.status(500).json({ msg: "Error fetching activity" });
  }
};
