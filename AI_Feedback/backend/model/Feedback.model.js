import mongoose from "mongoose";

const FeedbackSchema = new mongoose.Schema(
  {
    fullName: String,
    email: String,
    phoneNumber: String,
    feedback: String,
    aiResponse: String,
    tags: [String],
  },
  { timestamps: true }
);

export default mongoose.model("Feedback", FeedbackSchema);
