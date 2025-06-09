import React from "react";
import { assets } from "../assets/assets";
import { useNavigate } from "react-router-dom";

const ThankYou = () => {
  const navigate = useNavigate();

  return (
    <div className="flex items-center justify-center min-h-screen bg-gradient-to-br from-yellow-200 to-purple-400 text-center px-6">
      <div className="bg-slate-900 text-white p-10 rounded-xl shadow-lg w-full sm:w-[400px]">
        <img
          src={assets.logo_light}
          alt="logo"
          className="w-16 mx-auto mb-4 "
        />
        <h1 className="text-3xl font-bold mb-3">Thank You!</h1>
        <p className="text-center mb-6 text-indigo-300">
          We appreciate your feedback. It helps us grow!
        </p>
        <button
          onClick={() => navigate("/")}
          className="py-2.5 px-4 rounded-lg bg-gradient-to-r from-blue-600 to-purple-600 text-white font-semibold border-2 border-transparent hover:border-white shadow-md hover:shadow-white/30 hover:scale-105 transition-all duration-300 ease-in-out dark:from-blue-400 dark:to-purple-500"
        >
          Go Home
        </button>
      </div>
    </div>
  );
};

export default ThankYou;
