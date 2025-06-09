import React, { useState, useContext, useEffect } from "react";
import { assets } from "../assets/assets";
import { AppContent } from "../context/AppContext";
import { toast } from "react-toastify";
import axios from "axios";
import { useNavigate } from "react-router-dom";

const Feedback = () => {
  const navigate = useNavigate();
  const { backendUrl, isLoggedin, userData } = useContext(AppContent);

  const [formData, setFormData] = useState({
    name: "",
    email: "",
    mobile: "",
    feedback: "",
  });

  const [errors, setErrors] = useState({});
  const [loading, setLoading] = useState(false);

  // Auto-fill name and email if logged in
  useEffect(() => {
    console.log("userData:", userData);
    if (isLoggedin && userData) {
      setFormData((prev) => ({
        ...prev,
        name: userData.name || "",
        email: userData.email || "",
      }));
    }
  }, [isLoggedin, userData]);

  const handleChange = (e) => {
    const { name, value } = e.target;

    // Clear error when user starts typing
    setErrors((prev) => ({ ...prev, [name]: "" }));

    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const validate = () => {
    const newErrors = {};
    if (!formData.name.trim()) newErrors.name = "Name is required";
    if (!formData.email.trim()) newErrors.email = "Email id is required";

    if (!formData.mobile.trim()) {
      newErrors.mobile = "Mobile no is required";
    } else if (!/^\d{10}$/.test(formData.mobile)) {
      newErrors.mobile = "Mobile number must be exactly 10 digits";
    }

    if (!formData.feedback.trim()) newErrors.feedback = "Feedback is required";
    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!validate()) return;

    setLoading(true);
    axios.defaults.withCredentials = true;

    try {
      const { data } = await axios.post(
        `${backendUrl}/api/feedback/submit`,
        formData
      );

      if (data.success) {
        toast.success("Feedback submitted successfully!");
        navigate("/thank-you");
      } else {
        toast.error(data.message || "Something went wrong");
      }
    } catch (err) {
      toast.error(
        err?.response?.data?.message || err.message || "Network error"
      );
    }

    setLoading(false);
  };

  return (
    <div className="flex items-center justify-center min-h-screen px-6 sm:px-0 bg-gradient-to-br from-yellow-200 to-purple-400">
      <img
        onClick={() => navigate("/")}
        src={assets.logo}
        alt="Logo"
        className="absolute left-5 sm:left-20 top-5 w-10 sm:w-10 cursor-pointer"
      />

      <div className="flex items-center justify-center text-center">
        <form
          onSubmit={handleSubmit}
          className="bg-slate-900 p-8 rounded-lg shadow-lg w-full sm:w-96 text-sm text-white"
        >
          <div className="text-center">
            <h1 className="text-3xl font-bold mb-3">Feedback Form</h1>
            <p className="mb-6">
              We appreciate your feedback. It helps us grow!
            </p>
          </div>

          {/* Full Name */}
          <div
            className={`border ${
              errors.name ? "border-red-500" : "border-slate-500"
            } mb-4 flex items-center gap-3 w-full px-5 py-2.5 rounded-lg bg-[#333A5C]`}
          >
            <img src={assets.person_icon} alt="Person" />
            <input
              className="bg-transparent outline-none w-full flex-1"
              type="text"
              name="name"
              placeholder="Full Name"
              value={formData.name}
              onChange={handleChange}
              required
            />
          </div>

          {/* Email */}
          <div
            className={`border ${
              errors.email ? "border-red-500" : "border-slate-500"
            } mb-4 flex items-center gap-3 w-full px-5 py-2.5 rounded-lg bg-[#333A5C]`}
          >
            <img src={assets.mail_icon} alt="Mail" />
            <input
              className="bg-transparent outline-none w-full flex-1 cursor-not-allowed"
              type="email"
              name="email"
              placeholder="Email id"
              value={formData.email}
              readOnly
            />
          </div>

          {/* Mobile */}
          <div className="mb-4">
            <div
              className={`border ${
                errors.mobile ? "border-red-500" : "border-slate-500"
              } mb-4 flex items-center gap-3 w-full px-5 py-2.5 rounded-lg bg-[#333A5C]`}
            >
              <img src={assets.phone_icon} alt="Phone" />
              <input
                className="bg-transparent outline-none w-full flex-1"
                type="tel"
                name="mobile"
                placeholder="Mobile no"
                value={formData.mobile}
                onChange={(e) => {
                  const value = e.target.value;
                  if (/^\d{0,10}$/.test(value)) {
                    handleChange(e);
                    setErrors((prev) => ({
                      ...prev,
                      mobile: "",
                    }));
                  } else {
                    setErrors((prev) => ({
                      ...prev,
                      mobile: "Only numeric digits allowed",
                    }));
                  }
                }}
                autoComplete="off"
                inputMode="numeric"
                required
              />
            </div>

            {errors.mobile && (
              <p className="text-red-400 text-xs mt-1 pl-1 text-start">
                {errors.mobile}
              </p>
            )}
          </div>

          {/* Feedback Textarea */}
          <div
            className={`border ${
              errors.feedback ? "border-red-500" : "border-slate-500"
            } mb-4 flex items-start gap-3 w-full px-5 py-2.5 rounded-lg bg-[#333A5C]`}
          >
            <img className="mt-1" src={assets.feedback_icon} alt="Feedback" />
            <textarea
              className="bg-transparent outline-none w-full flex-1"
              rows="4"
              name="feedback"
              placeholder="Detailed Feedback"
              value={formData.feedback}
              onChange={handleChange}
              required
            ></textarea>
          </div>

          {/* Submit Button */}
          <button
            type="submit"
            className="py-2.5 px-4 rounded-lg bg-gradient-to-r from-blue-600 to-purple-600 text-white font-semibold border-2 border-transparent hover:border-white shadow-md hover:shadow-white/30 hover:scale-105 transition-all duration-300 ease-in-out dark:from-blue-400 dark:to-purple-500"
            disabled={loading}
          >
            {loading ? (
              <svg
                className="animate-spin w-5 h-5 border-2 border-white border-t-transparent rounded-full"
                viewBox="0 0 24 24"
              ></svg>
            ) : (
              "Submit Feedback"
            )}
          </button>
        </form>
      </div>
    </div>
  );
};

export default Feedback;
