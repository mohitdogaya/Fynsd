// controllers/contentController.js
import Content from "../models/Content.js";

// ⇝ List Contents
export const listContents = async (req, res) => {
  try {
    const { type, level, q, page = 1, limit = 12 } = req.query;
    const filter = { status: "published" };

    const userId = req.user?.userId || null;
    const isPremiumUser = req.user?.isPremium || false;

    if (!isPremiumUser) filter.isPremium = false;

    if (type) filter.type = type;
    if (level) filter.level = level;

    // ⇝ Search in title + summary + body
    if (q) {
      filter.$or = [
        { title: { $regex: q, $options: "i" } },
        { summary: { $regex: q, $options: "i" } },
        { body: { $regex: q, $options: "i" } },
      ];
    }

    const skip = (Number(page) - 1) * Number(limit);
    const items = await Content.find(filter)
      .populate("authorId", "name email")
      .sort({ publishedAt: -1 })
      .skip(skip)
      .limit(Number(limit));

    const total = await Content.countDocuments(filter);

    res.json({ items, total, page: Number(page), pages: Math.ceil(total / Number(limit)) });
  } catch (err) {
    console.error("Error listing contents:", err);
    res.status(500).json({ msg: "Server error" });
  }
};

// ⇝ Get Content by Slug
export const getContentBySlug = async (req, res) => {
  try {
    const content = await Content.findOne({ slug: req.params.slug, status: "published" })
      .populate("authorId", "name email");

    if (!content) return res.status(404).json({ msg: "Content not found" });

    const isPremiumUser = req.user?.isPremium || false;

    if (content.isPremium && !isPremiumUser) {
      return res.status(403).json({ msg: "Upgrade to premium to access this content" });
    }

    content.views = (content.views || 0) + 1;
    await content.save();

    res.json(content);
  } catch (err) {
    console.error("Error fetching content:", err);
    res.status(500).json({ msg: "Server error" });
  }
};
