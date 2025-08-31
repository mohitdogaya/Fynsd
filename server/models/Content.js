import mongoose from "mongoose";

const ContentSchema = new mongoose.Schema({
    title: {
        type: String,
        required: true
    },        // Content ka title

    slug: {
        type: String,
        required: true,
        unique: true
    }, // SEO-friendly URL

    summary: {
        type: String,
        default: ""
    },         // Short description

    type: [{ type: String, enum: ["article", "video"] }], 

    level: {
        type: String,
        enum: ["beginner", "intermediate", "advanced"],
        default: "beginner"
    },

    topics: [{
        type: String
    }],                     // e.g. budgeting, saving

    body: {
        type: String,
        default: ""
    },            // Article content

    mediaUrl: {
        type: String,
        default: ""
    },        // Image/video file link

    sourceUrl: {
        type: String,
        default: ""
    },       // Youtube/other link

    status: {
        type: String,
        enum: ["draft", "published", "archived"],
        default: "draft"
    },

    publishedAt: {
        type: Date
    },

    authorId: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "Admin"
    }, // jisne banaya

    // ✅ Premium content ka option
    isPremium: {
        type: Boolean,
        default: false
    },

    // ✅ Views counter for analytics
    views: {
        type: Number,
        default: 0
    }

}, { timestamps: true });

export default mongoose.model("Content", ContentSchema);
