// controllers/adminContentController.js
import slugify from "slugify";
import Content from "../models/Content.js";
import { uploadToCloudinary } from "../utils/uploader.js";

// Create content (Admin)
export const createContent = async (req, res) => {
  try {
    console.log("AdminID:", req.adminId);  // debug
    const { title, summary, type, level, topics, body, mediaUrl, sourceUrl, status, isPremium } = req.body;

    const slug = slugify(title, { lower: true, strict: true });

    const newContent = new Content({
      title,
      summary,
      type,
      level,
      topics,
      body,
      mediaUrl,
      sourceUrl,
      status,
      slug,
      isPremium: isPremium || false,  // ✅ premium flag
      authorId: req.adminId,         // ✅ jis admin ne banaya
      publishedAt: status === "published" ? new Date() : null,
      views: 0
    });

    const saved = await newContent.save();
    res.status(201).json(saved);
  } catch (err) {
    console.error("Create Content Error:", err); // ✅ log full error
    res.status(500).json({ msg: "Server error" });
  }
};

// Get all content (Admin)
export const getAllContent = async (req, res) => {
  try {
    const contents = await Content.find()
      .sort({ createdAt: -1 })
      .populate("authorId", "name email");
    res.json({ items: contents });
  } catch (err) {
    res.status(500).json({ message: "Failed to fetch contents" });
  }
};

// Get single content (Admin) + increment views
export const getContentById = async (req, res) => {
  try {
    const content = await Content.findById(req.params.id).populate("authorId", "name email");
    if (!content) return res.status(404).json({ msg: "Not found" });

    content.views += 1;
    await content.save();

    res.json(content);
  } catch (err) {
    res.status(500).json({ msg: "Server error" });
  }
};

// Update content (Admin)
// controllers/adminContent.controller.js

export const updateContent = async (req, res) => {
  try {
    const { id } = req.params;
    let updates = req.body;

    // 🔹 Normalize type: ensure always array
    if (updates.type) {
      if (!Array.isArray(updates.type)) {
        updates.type = [updates.type];
      }
    }

    // 🔹 Normalize topics: split comma string into array if needed
    if (updates.topics) {
      if (typeof updates.topics === "string") {
        updates.topics = updates.topics
          .split(",")
          .map(t => t.trim())
          .filter(t => t.length > 0);
      }
    }

    const content = await Content.findByIdAndUpdate(id, updates, { new: true });

    if (!content) {
      return res.status(404).json({ message: "Content not found" });
    }

    res.json(content);
  } catch (err) {
    console.error("Update Content Error:", err);
    res.status(500).json({ message: "Error updating content" });
  }
};


// Delete content (Admin)
export const deleteContent = async (req, res) => {
  try {
    await Content.findByIdAndDelete(req.params.id);
    res.json({ ok: true });
  } catch (err) {
    res.status(500).json({ msg: "Server error" });
  }
};

// Upload media (Admin)
export const uploadMedia = async (req, res) => {
  try {
    const result = await uploadToCloudinary(req.file.buffer);
    res.json({ url: result.secure_url });
  } catch (err) {
    res.status(500).json({ msg: "Upload failed" });
  }
};
