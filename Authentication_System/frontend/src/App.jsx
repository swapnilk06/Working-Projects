import React from "react";
import { Routes, Route } from "react-router-dom";
import Home from "./pages/Home";
import Login from "./pages/Login";
import EmailVerify from "./pages/EmailVerify";
import ResetPassword from "./pages/ResetPassword";
import Feedback from "./pages/Feedback";
import ThankYou from "./pages/ThankYou";
import AdminDashboard from "./pages/AdminDashboard";

import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import ProtectedRoute from "./components/ProtectedRoute";

import AdminRoute from "./components/AdminRoute";

const App = () => {
  return (
    <div>
      <ToastContainer />
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/login" element={<Login />} />
        <Route
          path="/email-verify"
          element={
            <ProtectedRoute>
              {" "}
              <EmailVerify />{" "}
            </ProtectedRoute>
          }
        />
        <Route path="/reset-password" element={<ResetPassword />} />
        <Route
          path="/feedback"
          element={
            <ProtectedRoute>
              {" "}
              <Feedback />{" "}
            </ProtectedRoute>
          }
        />
        <Route
          path="/thank-you"
          element={
            <ProtectedRoute>
              {" "}
              <ThankYou />{" "}
            </ProtectedRoute>
          }
        />
        <Route
          path="/admin-dashboard"
          element={
            // <AdminRoute>
              <AdminDashboard />
            // </AdminRoute>
          }
        />
      </Routes>
    </div>
  );
};

export default App;
