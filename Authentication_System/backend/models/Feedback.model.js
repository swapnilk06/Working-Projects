import mongoose from "mongoose";

const feedbackSchema = new mongoose.Schema({
  fullName: String,
  email: String,
  mobile: String,
  message: String,
  adminResponse: {
    type: String,
    default: "",
  },
  aiResponse: String,
  tags: [String],
  createdAt: {
    type: Date,
    default: Date.now,
  },
});

export default mongoose.model("Feedback", feedbackSchema);
