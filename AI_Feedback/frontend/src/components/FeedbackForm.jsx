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
import { useState } from "react";
import toast from "react-hot-toast";

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
    setError,
  } = useForm({
    resolver: zodResolver(feedbackSchema),
  });

  const [loading, setLoading] = useState(false);

  const onSubmit = async (data) => {
    try {
      setLoading(true);
      const response = await fetch("http://localhost:3000/api/feedback/submit", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(data),
      });

      const result = await response.json();
      setLoading(false);

      if (!response.ok) {
        toast.error(result.message || "Something went wrong");

        // Handle validation errors from backend
        if (result.errors) {
          for (let key in result.errors) {
            setError(key, {
              type: "manual",
              message: result.errors[key],
            });
          }
        }

        return;
      }

      toast.success(result.message);
      reset();
    } catch (error) {
      setLoading(false);
      toast.error("Network error! Please try again.");
      console.error(error);
    }
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

          {/* Phone */}
          <div>
            <label className="block mb-1 text-sm font-semibold">Phone Number</label>
            <div className="relative">
              <Smartphone className="absolute left-3 top-3.5 w-5 h-5 text-gray-500" />
              <input
                type="text"
                {...register("mobile")}
                placeholder="9876543211"
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
            disabled={loading}
            className="w-full bg-blue-600 text-white py-2 rounded-lg font-semibold flex items-center justify-center gap-2 hover:bg-blue-700 transition-all duration-300"
          >
            {loading ? "Submitting..." : (
              <>
                <SendHorizonal className="w-5 h-5" /> Submit Feedback
              </>
            )}
          </button>
        </form>
      </div>
    </div>
  );
}
