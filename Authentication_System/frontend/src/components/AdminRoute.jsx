import { useContext } from "react";
import { Navigate } from "react-router-dom";
import { AppContent } from "../context/AppContext";
import { toast } from "react-toastify";

const AdminRoute = ({ children }) => {
  const { isLoggedin, userData, loadingAuthCheck } = useContext(AppContent);

  if (loadingAuthCheck) {
    return <div className="text-white text-center mt-20">Checking admin auth...</div>;
  }

  if (!isLoggedin || userData?.role !== "admin") {
    toast.error("Access denied: Admins only");
    return <Navigate to="/" />;
  }

  return children;
};

export default AdminRoute;
