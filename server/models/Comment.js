// models/Comment.js
import mongoose from "mongoose";

const CommentSchema = new mongoose.Schema({
  contentId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "Content",
    required: true,
  },
  userId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "User",
    required: true,
  },
  text: {
    type: String,
    required: true,
  },
  parentComment: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "Comment",
    default: null, // reply hoga toh yahan parent comment ka id store hoga
  }
}, { timestamps: true });

export default mongoose.model("Comment", CommentSchema);
