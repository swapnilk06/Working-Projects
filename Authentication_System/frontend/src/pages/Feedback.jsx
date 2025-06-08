import React, { useState, useContext } from "react";
import { assets } from "../assets/assets";
import { AppContent } from "../context/AppContext";
import { toast } from "react-toastify";
import axios from "axios";
import { useNavigate } from "react-router-dom";

const Feedback = () => {
  const navigate = useNavigate();
  const { backendUrl } = useContext(AppContent);

  const [formData, setFormData] = useState({
    name: "",
    email: "",
    mobile: "",
    feedback: "",
  });

  const [loading, setLoading] = useState(false);

  const handleChange = (e) => {
    setFormData((prev) => ({
      ...prev,
      [e.target.name]: e.target.value,
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    try {
      const { data } = await axios.post(
        `${backendUrl}/api/feedback/submit`,
        formData
      );

      if (data.success) {
        toast.success("Feedback submitted successfully!");
        navigate("/"); // or navigate to thank you page
      } else {
        toast.error(data.message || "Something went wrong");
      }
    } catch (err) {
      toast.error(err.message || "Network error");
    }
    setLoading(false);
  };

  return (
    <div className="flex items-center justify-center min-h-screen px-6 sm:px-0 bg-gradient-to-br from-yellow-200 to-purple-400">
      <img
        onClick={() => navigate("/")}
        src={assets.logo}
        alt=""
        className="absolute left-5 top-5 w-10 sm:w-10 cursor-pointer"
      />
      <form
        onSubmit={handleSubmit}
        className="bg-slate-900 p-8 rounded-lg shadow-lg w-full sm:w-96 text-sm text-white"
      >
        <h1 className="text-2xl font-semibold text-center mb-4">
          Feedback Form
        </h1>

        <div className="border border-slate-500 mb-4 flex items-center gap-3 w-full px-5 py-2.5 rounded-lg bg-[#333A5C]">
          <img src={assets.person_icon} alt="" />
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

        <div className="border border-slate-500 mb-4 flex items-center gap-3 w-full px-5 py-2.5 rounded-lg bg-[#333A5C]">
          <img src={assets.mail_icon} alt="" />
          <input
            className="bg-transparent outline-none w-full flex-1"
            type="email"
            name="email"
            placeholder="Email id"
            value={formData.email}
            onChange={handleChange}
            required
          />
        </div>

        <div className="border border-slate-500 mb-4 flex items-center gap-3 w-full px-5 py-2.5 rounded-lg bg-[#333A5C]">
          <img src={assets.phone_icon} alt="" />
          <input
            className="bg-transparent outline-none w-full flex-1"
            type="tel"
            name="mobile"
            placeholder="Mobile Number"
            value={formData.mobile}
            onChange={handleChange}
            required
          />
        </div>

        <div className="border border-slate-500 mb-4 flex items-start gap-3 w-full px-5 py-2.5 rounded-lg bg-[#333A5C]">
          <img className="mt-1" src={assets.feedback_icon} alt="" />
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

        <button
          type="submit"
          className="w-full py-2.5 px-4 rounded-lg bg-gradient-to-r from-blue-600 to-purple-600 text-white font-semibold border-2 border-transparent hover:border-white shadow-md hover:shadow-white/30 hover:scale-105 transition-all duration-300 ease-in-out dark:from-blue-400 dark:to-purple-500"
          disabled={loading}
        >
          {loading ? "Submitting..." : "Submit Feedback"}
        </button>
      </form>
    </div>
  );
};

export default Feedback;
