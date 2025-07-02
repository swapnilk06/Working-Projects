import React, { useContext } from "react";
import { assets } from "../assets/assets";
import { useNavigate } from "react-router-dom";
import { AppContent } from "../context/AppContext";
import { toast } from "react-toastify";
import axios from "axios";

const Navbar = () => {
  const navigate = useNavigate();
  const { userData, backendUrl, setUserData, setIsLoggedin } =
    useContext(AppContent);

  // send OTP for email verification
  const sendVerificationOtp = async () => {
    try {
      axios.defaults.withCredentials = true;

      const { data } = await axios.post(
        backendUrl + "/api/auth/send-verify-otp"
      );
      if (data.success) {
        navigate("/email-verify");
        toast.success(data.message);
      } else {
        toast.error(data.message);
      }
    } catch (error) {
      toast.error(error.message);
    }
  };
  console.log("UserData:", userData);
  // logout function
  const logout = async () => {
    try {
      axios.defaults.withCredentials = true;
      const { data } = await axios.post(backendUrl + "/api/auth/logout");
      data.success && setIsLoggedin(false);
      data.success && setUserData(false);
      navigate("/");
    } catch (error) {
      toast.error(error.message);
    }
  };

  return (
    <div className="w-full flex justify-between items-center text-start p-4 sm:p-6 sm:px-24 absolute top-0 ">
      <img
        src={assets.logo}
        alt="Logo"
        className="w-10 sm:w-10 cursor-pointer"
        onClick={() => navigate("/")}
      />

      {/* If user is logged in */}
      {userData ? (
        <div className="w-8 h-8 flex justify-center items-center rounded-full text-white relative group bg-gradient-to-r from-blue-600 to-purple-600 cursor-pointer">
          {userData.name[0].toUpperCase()}

          <div className="absolute hidden group-hover:block top-0 right-0 z-10 text-black rounded pt-10">
            <ul className="list-none m-0 p-2 bg-gray-100 text-sm shadow-md rounded-md w-44">
              {/* Admin Dashboard - Only for admin */}
              {userData?.role === "admin" &&
                location.pathname !== "/admin-dashboard" && (
                  <li
                    onClick={() => navigate("/admin-dashboard")}
                    className="py-1 px-3 hover:bg-gray-200 cursor-pointer rounded"
                  >
                    User Feedbacks
                  </li>
                )}

              {/* Email verify if not verified */}
              {!userData.isAccountVerified && (
                <li
                  onClick={sendVerificationOtp}
                  className="py-1 px-3 hover:bg-gray-200 cursor-pointer rounded"
                >
                  Verify email
                </li>
              )}

              {/* Logout */}
              <li
                onClick={logout}
                className="py-1 px-3 hover:bg-gray-200 cursor cursor-pointer pr-10 rounded"
              >
                Logout
              </li>
            </ul>
          </div>
        </div>
      ) : (
        // If user is not logged in
        <button
          onClick={() => navigate("/login")}
          className="relative flex items-center gap-2 px-6 py-2 rounded-full bg-white text-gray-800 transition-all duration-300 ease-in-out overflow-hidden group border border-gray-500"
        >
          <span className="relative z-10 flex items-center gap-2 group-hover:text-white transition-colors duration-300">
            Login <img src={assets.arrow_icon} alt="arrow" />
          </span>
          <span className="absolute inset-0 z-0 bg-gradient-to-r from-blue-600 to-purple-600 opacity-0 group-hover:opacity-100 transition-opacity duration-300 font-hover:semibold rounded-full"></span>
        </button>
      )}
    </div>
  );
};

export default Navbar;
