import { useEffect, useState, useContext } from "react";
import axios from "axios";
import { toast } from "react-toastify";
import { AppContent } from "../context/AppContext";
import { assets } from "../assets/assets";
import Navbar from "../components/Navbar";
import { useNavigate } from "react-router-dom";

const AdminDashboard = () => {
  const [feedbacks, setFeedbacks] = useState([]);
  const [loading, setLoading] = useState(true);

  const [searchTerm, setSearchTerm] = useState("");

  const [currentPage, setCurrentPage] = useState(1);

  const itemsPerPage = 4;

  const navigate = useNavigate();

  const { backendUrl } = useContext(AppContent);

  const getFeedbacks = async () => {
    try {
      const res = await axios.get(`${backendUrl}/api/feedback/all`, {
        withCredentials: true,
      });
      if (res.data.success) {
        setFeedbacks(res.data.feedbacks);
      }
    } catch (error) {
      if (error.response?.status === 403) {
        toast.error("Unauthorized: Admin access only");
      } else {
        toast.error("Failed to fetch feedbacks");
      }
    } finally {
      setLoading(false);
    }
  };

  const filteredFeedbacks = feedbacks.filter(
    (fb) =>
      fb.fullName?.toLowerCase().includes(searchTerm.toLowerCase()) ||
      fb.tags?.join(" ").toLowerCase().includes(searchTerm.toLowerCase())
  );

  const indexOfLastItem = currentPage * itemsPerPage;
  const indexOfFirstItem = indexOfLastItem - itemsPerPage;
  const currentFeedbacks = filteredFeedbacks.slice(
    indexOfFirstItem,
    indexOfLastItem
  );

  useEffect(() => {
    getFeedbacks();
  }, []);

  // ✅ ADD handleDelete HERE
  const handleDelete = async (id) => {
    if (!window.confirm("Are you sure you want to delete this feedback?"))
      return;

    try {
      const res = await axios.delete(
        `${backendUrl}/api/feedback/admin/delete/${id}`,
        {
          withCredentials: true,
        }
      );
      if (res.data.success) {
        toast.success("Feedback deleted successfully");
        setFeedbacks((prev) => prev.filter((fb) => fb._id !== id));
      } else {
        toast.error("Failed to delete feedback");
      }
    } catch (error) {
      toast.error("Error deleting feedback");
    }
  };

  return (
    <div className="flex items-center flex-col justify-center min-h-screen w-screen overflow-x-hidden overflow-y-auto bg-gradient-to-br from-yellow-200 to-purple-400 py-10 px-4 sm:px-6 pt-40 text-center text-gray-800">
      <Navbar />

      <div className="max-w-7xl mx-auto w-full">
        <h1 className="text-3xl font-bold text-center mb-6">
          Dashboard - User Feedbacks
        </h1>

        <div className="flex justify-center mb-6">
          <input
            type="text"
            placeholder="Search by name or tag..."
            className="w-full sm:w-2/3 md:w-1/2 px-4 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-400"
            value={searchTerm}
            onChange={(e) => {
              setSearchTerm(e.target.value);
              setCurrentPage(1);
            }}
          />
        </div>

        {loading ? (
          <p className="text-center text-gray-700 font-medium">Loading...</p>
        ) : (
          <>
            <div className="overflow-auto max-w-full shadow-md rounded-lg bg-white">
              <table className="w-full min-w-[1000px] border-collapse text-left text-sm text-gray-700">
                <thead className="bg-gradient-to-r from-blue-600 to-purple-600 text-white">
                  <tr>
                    <th className="px-4 py-3">Name</th>
                    <th className="px-4 py-3">Email</th>
                    <th className="px-4 py-3">Mobile</th>
                    <th className="px-4 py-3">Feedback</th>
                    <th className="px-4 py-3">AI Response</th>
                    <th className="px-4 py-3">Tags</th>
                    <th className="px-4 py-3 text-center">Actions</th>
                  </tr>
                </thead>
                <tbody>
                  {currentFeedbacks.length > 0 ? (
                    currentFeedbacks.map((fb) => (
                      <tr
                        key={fb._id}
                        className="border-b hover:bg-gray-100 transition duration-200 rounded-md"
                      >
                        <td className="px-4 py-2 align-top">{fb.fullName}</td>
                        <td className="px-4 py-2 align-top">{fb.email}</td>
                        <td className="px-4 py-2 align-top">{fb.mobile}</td>

                        <td className="px-4 py-2 align-top break-words whitespace-pre-wrap max-w-xs">
                          {fb.message}
                        </td>
                        <td className="px-4 py-2 align-top max-w-xs break-words text-ellipsis overflow-hidden">
                          {fb.aiResponse}
                        </td>

                        <td className="px-4 py-2 align-top">
                          {fb.tags?.join(", ") || "No tags"}
                        </td>

                        <td className="px-4 py-2 align-top text-center">
                          <button
                            onClick={() => handleDelete(fb._id)}
                            className="text-red-600 hover:text-red-800 font-semibold text-sm"
                          >
                            Delete
                          </button>
                        </td>
                      </tr>
                    ))
                  ) : (
                    <tr>
                      <td
                        colSpan="7"
                        className="text-center px-4 py-6 text-gray-600"
                      >
                        No feedbacks found.
                      </td>
                    </tr>
                  )}
                </tbody>
              </table>
            </div>

            {/* Pagination */}
            {filteredFeedbacks.length > itemsPerPage && (
              <div className="flex justify-center mt-6 flex-wrap gap-2">
                {Array.from({
                  length: Math.ceil(filteredFeedbacks.length / itemsPerPage),
                }).map((_, index) => (
                  <button
                    key={index}
                    onClick={() => setCurrentPage(index + 1)}
                    className={`px-4 py-1 rounded-full text-sm font-medium ${
                      currentPage === index + 1
                        ? "bg-blue-600 text-white"
                        : "bg-gray-200 hover:bg-gray-300"
                    }`}
                  >
                    {index + 1}
                  </button>
                ))}
              </div>
            )}
          </>
        )}
      </div>
    </div>
  );
};

export default AdminDashboard;
