import { useContext, useEffect } from "react";
import { Navigate } from "react-router-dom";
import { AppContent } from "../context/AppContext";
import { toast } from "react-toastify";

const ProtectedRoute = ({ children }) => {
  const { isLoggedin, loadingAuthCheck } = useContext(AppContent);

  if (loadingAuthCheck) {
    return <div className="text-white text-center mt-20">Checking auth...</div>;
  }

  if (!isLoggedin) {
    toast.error("Please login to access this page");
    return <Navigate to="/login" />;
  }

  return children;
};

export default ProtectedRoute;
