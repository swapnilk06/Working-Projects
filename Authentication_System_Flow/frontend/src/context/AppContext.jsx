import React, { useState, useContext, useEffect, createContext } from "react";
import axios from "axios";
import { toast } from "react-toastify";
export const AppContent = createContext();

export const AppContextProvider = (props) => {
  // send the cookies
  axios.defaults.withCredentials = true;

  const backendUrl = import.meta.env.VITE_BACKEND_URL;
  const [isLoggedin, setIsLoggedin] = useState(false);
  const [userData, setUserData] = useState(false);

  const getAuthState = async () => {
    try {
      const { data } = await axios.get(backendUrl + "/api/auth/is-auth");
      if (data.success) {
        setIsLoggedin(true);
        localStorage.setItem("auth", "true"); // ✅ Save flag for refresh
        getUserData();
      }
    } catch (error) {
      setIsLoggedin(false);
      localStorage.removeItem("auth");
    }
  };
  const getUserData = async () => {
    try {
      const { data } = await axios.get(backendUrl + "/api/user/data");

      if (data.success) {
        setUserData(data.userData);
      } else {
        const alreadyLoggedIn = localStorage.getItem("auth");
        if (alreadyLoggedIn) {
          toast.error(data.message || "User not found");
        }
        setIsLoggedin(false);
        localStorage.removeItem("auth");
      }
    } catch (error) {
      const alreadyLoggedIn = localStorage.getItem("auth");
      if (alreadyLoggedIn) {
        toast.error(error.response?.data?.message || "User not found");
        localStorage.removeItem("auth");
      }
      setIsLoggedin(false);
    }
  };

  useEffect(() => {
    getAuthState();
  }, []);
  const value = {
    backendUrl,
    isLoggedin,
    setIsLoggedin,
    userData,
    setUserData,
    getUserData,
  };
  return (
    <AppContent.Provider value={value}>{props.children}</AppContent.Provider>
  );
};
