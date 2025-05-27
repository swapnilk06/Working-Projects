import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";
import {
  User,
  Mail,
  Smartphone,
  MessageSquareText,
  SendHorizonal,
} from "lucide-react";

// Zod schema
const feedbackSchema = z.object({
  fullName: z.string().min(2, "Full name is required"),
  email: z.string().email("Enter a valid email address"),
  mobile: z
    .string()
    .regex(/^[6-9]\d{9}$/, "Enter a valid 10-digit mobile number"),
  feedback: z.string().min(10, "Feedback must be at least 10 characters"),
});

export default function FeedbackPage() {
  const {
    register,
    handleSubmit,
    formState: { errors },
    reset,
  } = useForm({
    resolver: zodResolver(feedbackSchema),
  });

  const onSubmit = (data) => {
    console.log("Form Data:", data);
    reset();
  };

  return (
    <div className="min-h-screen flex items-center justify-center py-12">
      <div className="w-full max-w-lg bg-white/30 backdrop-blur-lg border border-white/20 rounded-xl shadow-xl p-8 text-gray-800">
        <h2 className="text-3xl font-bold text-center mb-6">Feedback Form</h2>

        <form onSubmit={handleSubmit(onSubmit)} className="space-y-5">
          {/* Full Name */}
          <div>
            <label className="block mb-1 text-sm font-semibold">Full Name</label>
            <div className="relative">
              <User className="absolute left-3 top-3.5 w-5 h-5 text-gray-500" />
              <input
                type="text"
                {...register("fullName")}
                placeholder="Your name"
                className="w-full pl-10 pr-4 py-2 rounded-lg bg-white/60 border border-gray-300 focus:outline-none focus:ring-2 focus:ring-blue-500 transition"
              />
            </div>
            {errors.fullName && (
              <p className="text-red-500 text-sm mt-1">{errors.fullName.message}</p>
            )}
          </div>

          {/* Email */}
          <div>
            <label className="block mb-1 text-sm font-semibold">Email</label>
            <div className="relative">
              <Mail className="absolute left-3 top-3.5 w-5 h-5 text-gray-500" />
              <input
                type="email"
                {...register("email")}
                placeholder="example@email.com"
                className="w-full pl-10 pr-4 py-2 rounded-lg bg-white/60 border border-gray-300 focus:outline-none focus:ring-2 focus:ring-blue-500 transition"
              />
            </div>
            {errors.email && (
              <p className="text-red-500 text-sm mt-1">{errors.email.message}</p>
            )}
          </div>

          {/* Mobile */}
          <div>
            <label className="block mb-1 text-sm font-semibold">Mobile Number</label>
            <div className="relative">
              <Smartphone className="absolute left-3 top-3.5 w-5 h-5 text-gray-500" />
              <input
                type="text"
                {...register("mobile")}
                placeholder="9876543210"
                className="w-full pl-10 pr-4 py-2 rounded-lg bg-white/60 border border-gray-300 focus:outline-none focus:ring-2 focus:ring-blue-500 transition"
              />
            </div>
            {errors.mobile && (
              <p className="text-red-500 text-sm mt-1">{errors.mobile.message}</p>
            )}
          </div>

          {/* Feedback */}
          <div>
            <label className="block mb-1 text-sm font-semibold">Feedback</label>
            <div className="relative">
              <MessageSquareText className="absolute left-3 top-3.5 w-5 h-5 text-gray-500" />
              <textarea
                rows="4"
                {...register("feedback")}
                placeholder="Write your feedback..."
                className="w-full pl-10 pr-4 py-2 rounded-lg bg-white/60 border border-gray-300 focus:outline-none focus:ring-2 focus:ring-blue-500 transition"
              />
            </div>
            {errors.feedback && (
              <p className="text-red-500 text-sm mt-1">{errors.feedback.message}</p>
            )}
          </div>

          {/* Submit Button */}
          <button
            type="submit"
            className="w-full bg-blue-600 text-white py-2 rounded-lg font-semibold flex items-center justify-center gap-2 hover:bg-blue-700 transition-all duration-300"
          >
            <SendHorizonal className="w-5 h-5" /> Submit Feedback
          </button>
        </form>
      </div>
    </div>
  );
}
