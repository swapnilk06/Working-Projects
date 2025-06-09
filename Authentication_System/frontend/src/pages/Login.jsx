import React, { useState, useContext } from "react";
import { assets } from "../assets/assets";
import { useNavigate } from "react-router-dom";
import { AppContent } from "../context/AppContext";
import { toast } from "react-toastify";
import axios from "axios";
import { useLocation } from "react-router-dom";

const Login = () => {
  const navigate = useNavigate();

  const { backendUrl, setIsLoggedin, getUserData } = useContext(AppContent);

  // const [state, setState] = useState("Sign Up"); // old
  const location = useLocation();
  const defaultMode =
    new URLSearchParams(location.search).get("mode") || "signup";
  const [state, setState] = useState(
    defaultMode === "login" ? "Login" : "Sign Up"
  );
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const onSubmitHandler = async (e) => {
    try {
      e.preventDefault();

      // With API request (backendUrl) send cookies
      axios.defaults.withCredentials = true;

      if (state === "Sign Up") {
        const { data } = await axios.post(backendUrl + "/api/auth/register", {
          name,
          email,
          password,
        });

        if (data.success) {
          setIsLoggedin(true);
          await getUserData();
          navigate("/");
        } else {
          toast.error(data.message);
        }
      } else {
        const { data } = await axios.post(backendUrl + "/api/auth/login", {
          email,
          password,
        });

        if (data.success) {
          setIsLoggedin(true);
          await getUserData();
          navigate("/");
        } else {
          toast.error(data.message);
        }
      }
    } catch (error) {
      // toast.error(error?.response?.data?.message || "Something went wrong");
      toast.error(error.message);
    }
  };
  return (
    <div className="flex items-center justify-center min-h-screen px-6 sm:px-0 bg-gradient-to-br from-yellow-200 to-purple-400">
      <img
        onClick={() => navigate("/")}
        src={assets.logo}
        alt=""
        className="absolute left-5 sm:left-20 top-5 w-10 sm:w-10 cursor-pointer"
      />
      <div className="bg-slate-900 p-10 rounded-lg shadow-lg w-full sm:w-96 text-white text-sm">
        <h2 className="text-3xl font-semibold text-white text-center mb-3">
          {state === "Sign Up" ? "Signup" : "Login"}
        </h2>

        <p className="text-sm text-center mb-6 text-indigo-300">
          {state === "Sign Up"
            ? "Create your account!"
            : "Login to your account!"}
        </p>
        <form onSubmit={onSubmitHandler}>
          {state === "Sign Up" && (
            <div className="border border-slate-500 mb-4 flex items-center gap-3 w-full px-5 py-2.5 rounded-lg bg-[#333A5C]">
              <img src={assets.person_icon} alt="" />
              <input
                onChange={(e) => setName(e.target.value)}
                value={name}
                className="bg-transparent outline-none w-full flex-1"
                type="text"
                placeholder="Full Name"
                required
              />
            </div>
          )}

          <div className="border border-slate-500 mb-4 flex items-center gap-3 w-full px-5 py-2.5 rounded-lg bg-[#333A5C]">
            <img src={assets.mail_icon} alt="" />
            <input
              onChange={(e) => setEmail(e.target.value)}
              value={email}
              className="bg-transparent outline-none w-full flex-1"
              type="email"
              placeholder="Email Id"
              required
            />
          </div>

          <div className="border border-slate-500 mb-4 flex items-center gap-3 w-full px-5 py-2.5 rounded-lg bg-[#333A5C]">
            <img src={assets.lock_icon} alt="" />
            <input
              onChange={(e) => setPassword(e.target.value)}
              value={password}
              className="bg-transparent outline-none w-full flex-1"
              type="password"
              placeholder="Password"
              required
            />
          </div>

          <p
            onClick={() => navigate("/reset-password")}
            className="mb-4 w-fit text-gray-400 cursor-pointer hover:text-white  transition-all duration-300 ease-in-out"
          >
            Forgot password?
          </p>

          <button className="w-full py-2.5 px-4 rounded-lg bg-gradient-to-r from-blue-600 to-purple-600 text-white font-semibold border-2 border-transparent hover:border-white shadow-md hover:shadow-white/30 hover:scale-105 transition-all duration-300 ease-in-out dark:from-blue-400 dark:to-purple-500">
            {state}
          </button>
        </form>

        {state === "Sign Up" ? (
          <p className="text-gray-400 text-center text-xs mt-4">
            Already have an acoount?{" "}
            <span
              onClick={() => setState("Login")}
              className="text-blue-400 cursor-pointer underline"
            >
              Login
            </span>
          </p>
        ) : (
          <p className="text-gray-400 text-center text-xs mt-4">
            Don't have an acoount?{" "}
            <span
              onClick={() => setState("Sign Up")}
              className="text-blue-400 cursor-pointer underline"
            >
              Sign up
            </span>
          </p>
        )}
      </div>
    </div>
  );
};

export default Login;
