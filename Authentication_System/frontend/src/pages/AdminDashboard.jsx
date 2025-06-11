// src/pages/AdminDashboard.jsx
import { useEffect, useState } from "react";
import axios from "axios";

const AdminDashboard = () => {
  const [feedbacks, setFeedbacks] = useState([]);
  const [loading, setLoading] = useState(true);

  const getFeedbacks = async () => {
    try {
      const res = await axios.get("/api/feedback/all", {
        withCredentials: true,
      });
      if (res.data.success) {
        setFeedbacks(res.data.feedbacks);
      }
    } catch (error) {
      console.error(
        "Error fetching feedbacks:",
        error.response?.data || error.message
      );
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    getFeedbacks();
  }, []);

  return (
    <div className="min-h-screen p-6 bg-gray-50">
      <h1 className="text-2xl font-semibold mb-4">
        Admin Dashboard - Feedbacks
      </h1>
      {loading ? (
        <p>Loading...</p>
      ) : (
        <div className="overflow-auto rounded-lg border border-gray-200 shadow-md">
          <table className="w-full border-collapse bg-white text-left text-sm text-gray-700">
            <thead className="bg-gray-100">
              <tr>
                <th className="px-4 py-2">Name</th>
                <th className="px-4 py-2">Email</th>
                <th className="px-4 py-2">Mobile</th>
                <th className="px-4 py-2">Feedback</th>
                <th className="px-4 py-2">AI Response</th>
                <th className="px-4 py-2">Tags</th>
              </tr>
            </thead>
            <tbody>
              {feedbacks.map((fb) => (
                <tr key={fb._id} className="border-t hover:bg-gray-50">
                  <td className="px-4 py-2">{fb.fullName}</td>
                  <td className="px-4 py-2">{fb.email}</td>
                  <td className="px-4 py-2">{fb.mobile}</td>
                  <td className="px-4 py-2">{fb.message}</td>
                  <td className="px-4 py-2">{fb.aiResponse}</td>
                  <td className="px-4 py-2">
                    {fb.tags?.join(", ") || "No tags"}
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      )}
    </div>
  );
};

export default AdminDashboard;
