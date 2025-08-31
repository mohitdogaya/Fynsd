import Roadmap from "../models/Roadmap.js";

// ⇝ Create a new roadmap (Admin only)
export const createRoadmap = async (req, res) => {
  try {
    const { title, description, category, levels } = req.body;

    // ⇝ Simple validation
    if (!title || !description || !category || !levels) {
      return res.status(400).json({ msg: "All fields are required" });
    }

    const roadmap = new Roadmap({
      title,
      description,
      category,
      levels,
      createdBy: req.adminId, // ⇝ user injected from auth middleware
    });

    await roadmap.save();

    res.status(201).json({ msg: "Roadmap created successfully", roadmap });
  } catch (error) {
    res.status(500).json({ msg: "Server error", error: error.message });
  }
};

// ⇝ Get all roadmaps (Public)
export const getRoadmaps = async (req, res) => {
  try {
    const roadmaps = await Roadmap.find().populate("createdBy", "name email");
    res.json(roadmaps);
  } catch (error) {
    res.status(500).json({ msg: "Server error", error: error.message });
  }
};

// ⇝ Get roadmap by ID (Public)
export const getRoadmapById = async (req, res) => {
  try {
    const roadmap = await Roadmap.findById(req.params.id).populate("createdBy", "name email");
    if (!roadmap) {
      return res.status(404).json({ msg: "Roadmap not found" });
    }
    res.json(roadmap);
  } catch (error) {
    res.status(500).json({ msg: "Server error", error: error.message });
  }
};

// ⇝ Update roadmap (Admin only)
export const updateRoadmap = async (req, res) => {
  try {
    const roadmap = await Roadmap.findByIdAndUpdate(
      req.params.id,
      req.body,
      { new: true }
    );

    if (!roadmap) {
      return res.status(404).json({ msg: "Roadmap not found" });
    }

    res.json({ msg: "Roadmap updated successfully", roadmap });
  } catch (error) {
    res.status(500).json({ msg: "Server error", error: error.message });
  }
};

// ⇝ Delete roadmap (Admin only)
export const deleteRoadmap = async (req, res) => {
  try {
    const roadmap = await Roadmap.findByIdAndDelete(req.params.id);

    if (!roadmap) {
      return res.status(404).json({ msg: "Roadmap not found" });
    }

    res.json({ msg: "Roadmap deleted successfully" });
  } catch (error) {
    res.status(500).json({ msg: "Server error", error: error.message });
  }
};
