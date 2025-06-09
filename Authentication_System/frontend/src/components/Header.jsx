import React, { useContext } from "react";
import { assets } from "../assets/assets";
import { AppContent } from "../context/AppContext";
import { useNavigate } from "react-router-dom";
import { toast } from "react-toastify";

const Header = () => {
  const navigate = useNavigate();
  const { userData, isLoggedin } = useContext(AppContent);

  const handleGetStarted = () => {
    if (!isLoggedin) {
      toast.error("Please login to continue");
    } else {
      navigate("/feedback");
    }
  };

  return (
    <div className="flex flex-col items-center mt-20 px-4 text-center text-gray-800">
      <img
        src={assets.header_img}
        alt=""
        className="w-36 h-36 rounded-full mb-6"
      />

      <h1 className="flex items-center gap-2 text-xl sm:text-3xl font-medium mb-2">
        Hey <img className="w-8 aspect-square" src={assets.hand_wave} alt="" />{" "}
        {userData ? userData.name : "Developer"}!
      </h1>

      <h2 className="text-3xl sm:text-5xl font-semibold mb-4">
        Welcome in Auth base sytem
      </h2>

      <p className="mb-8 max-w-md">
        "Our authentication system offers secure and seamless access with
        ensuring user data stays protected.
      </p>

      <button
        onClick={handleGetStarted}
        className="relative py-2.5 px-6 rounded-full bg-white text-gray-800  transition-all duration-300 ease-in-out overflow-hidden group border border-gray-500"
      >
        <span className="relative z-10 group-hover:text-white transition-colors duration-300">
          Get Started
        </span>
        <span className="absolute inset-0 z-0 bg-gradient-to-r from-blue-600 to-purple-600 opacity-0 group-hover:opacity-100 transition-opacity duration-300 rounded-full"></span>
      </button>
    </div>
  );
};

export default Header;
