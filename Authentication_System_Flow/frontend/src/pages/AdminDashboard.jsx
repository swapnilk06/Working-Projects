import { useEffect, useState, useContext } from "react";
import axios from "axios";
import { toast } from "react-toastify";
import { AppContent } from "../context/AppContext";
import Navbar from "../components/Navbar";
import { useNavigate } from "react-router-dom";
import { Save, Plus, RefreshCw, Trash2 } from "lucide-react";

const AdminDashboard = () => {
  const [feedbacks, setFeedbacks] = useState([]);
  const [loading, setLoading] = useState(true);
  const [searchTerm, setSearchTerm] = useState("");
  const [currentPage, setCurrentPage] = useState(1);
  const [editableAdminText, setEditableAdminText] = useState({});
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

  const handleDelete = async (id) => {
    if (!window.confirm("Are you sure you want to delete this feedback?"))
      return;
    try {
      const res = await axios.delete(
        `${backendUrl}/api/feedback/admin/delete/${id}`,
        { withCredentials: true }
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

  const handleRefreshAI = async (id) => {
    try {
      const res = await axios.put(
        `${backendUrl}/api/feedback/admin/refresh-ai/${id}`,
        {},
        { withCredentials: true }
      );
      if (res.data.success) {
        toast.success("AI response refreshed");
        getFeedbacks();
      }
    } catch {
      toast.error("Failed to refresh AI");
    }
  };

  const handleSaveAdminResponse = async (id) => {
    const text = editableAdminText[id]?.trim();

    if (!text) {
      return toast.error("Admin response cannot be empty.");
    }

    const wordCount = text.split(/\s+/).filter(Boolean).length;
    if (wordCount < 5) {
      return toast.error("Must be at least 5 words.");
    }

    try {
      const res = await axios.put(
        `${backendUrl}/api/feedback/admin/save-admin-response/${id}`,
        { adminResponse: text },
        { withCredentials: true }
      );
      if (res.data.success) {
        toast.success("Admin response saved");
        setEditableAdminText((prev) => {
          const updated = { ...prev };
          delete updated[id];
          return updated;
        });
        getFeedbacks();
      }
    } catch {
      toast.error("Failed to save admin response");
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
            <div className="overflow-x-auto rounded-lg bg-white shadow-lg ring-1 ring-gray-200">
              <table className="w-full min-w-[1100px] border-collapse text-left text-sm text-gray-800">
                <thead className="bg-gradient-to-r from-blue-600 to-purple-600 text-white text-sm">
                  <tr>
                    <th className="px-4 py-3 w-36">Name</th>
                    <th className="px-4 py-3 w-48">Email</th>
                    <th className="px-4 py-3 w-28">Mobile</th>
                    <th className="px-4 py-3 w-[300px]">Feedback</th>
                    <th className="px-4 py-3 w-[300px] max-w-xs">
                      Admin Response
                    </th>

                    <th className="px-4 py-3 w-[300px]">AI Response</th>
                    <th className="px-4 py-3 w-40">Tags</th>
                    <th className="px-4 py-3 w-24 text-center">Actions</th>
                  </tr>
                </thead>
                <tbody>
                  {currentFeedbacks.length > 0 ? (
                    currentFeedbacks.map((fb) => (
                      <tr
                        key={fb._id}
                        className="border-b hover:bg-gray-100 transition duration-200"
                      >
                        <td className="px-4 py-2 align-top">{fb.fullName}</td>
                        <td className="px-4 py-2 align-top break-words">
                          {fb.email}
                        </td>
                        <td className="px-4 py-2 align-top">{fb.mobile}</td>

                        <td className="px-4 py-2 align-top break-words whitespace-pre-wrap">
                          {fb.message}
                        </td>

                        <td className="px-4 py-2 align-top whitespace-pre-wrap break-words max-w-xs">
                          {editableAdminText[fb._id] !== undefined ? (
                            <div>
                              <textarea
                                value={editableAdminText[fb._id]}
                                onChange={(e) =>
                                  setEditableAdminText((prev) => ({
                                    ...prev,
                                    [fb._id]: e.target.value,
                                  }))
                                }
                                className="w-full p-2 border border-gray-300 rounded shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-400 resize-y"
                                rows={4}
                                placeholder="Write admin response..."
                              />
                              <div className="flex gap-2 mt-2">
                                <button
                                  onClick={() =>
                                    handleSaveAdminResponse(fb._id)
                                  }
                                  className="flex items-center gap-2 text-sm text-blue-600 hover:text-white hover:bg-blue-600 px-3 py-1 rounded transition duration-200"
                                >
                                  <Save size={16} />
                                  Save
                                </button>
                                <button
                                  onClick={() =>
                                    setEditableAdminText((prev) => {
                                      const updated = { ...prev };
                                      delete updated[fb._id];
                                      return updated;
                                    })
                                  }
                                  className="flex items-center gap-2 text-sm text-gray-600 hover:text-white hover:bg-gray-500 px-3 py-1 rounded transition duration-200"
                                >
                                  Cancel
                                </button>
                              </div>
                            </div>
                          ) : (
                            <div>
                              <p className="whitespace-pre-wrap break-words text-sm">
                                {fb.adminResponse || "No response"}
                              </p>
                              <button
                                onClick={() =>
                                  setEditableAdminText((prev) => ({
                                    ...prev,
                                    [fb._id]: fb.adminResponse || "",
                                  }))
                                }
                                className="flex items-center gap-2 text-sm text-green-600 hover:text-white hover:bg-green-600 px-3 py-1 rounded mt-2 transition duration-200"
                              >
                                <Plus size={16} />
                                Add
                              </button>
                            </div>
                          )}
                        </td>

                        <td className="px-4 py-2 align-top break-words whitespace-pre-wrap">
                          <div>
                            <p className="mb-1">{fb.aiResponse}</p>
                            <button
                              onClick={() => handleRefreshAI(fb._id)}
                              className="flex items-center gap-2 text-sm text-purple-600 hover:text-white hover:bg-purple-600 px-3 py-1 rounded transition duration-200"
                            >
                              <RefreshCw size={16} />
                              Refresh
                            </button>
                          </div>
                        </td>

                        <td className="px-4 py-2 align-top">
                          <div className="flex flex-wrap gap-2">
                            {fb.tags?.length > 0 ? (
                              fb.tags.map((tag, idx) => (
                                <span
                                  key={idx}
                                  className="bg-yellow-100 text-yellow-800 px-3 py-1 rounded-full text-xs font-medium"
                                >
                                  {tag}
                                </span>
                              ))
                            ) : (
                              <span className="text-gray-400">No tags</span>
                            )}
                          </div>
                        </td>

                        <td className="px-4 py-2 align-top text-center">
                          <button
                            onClick={() => handleDelete(fb._id)}
                            className="flex items-center gap-2 justify-center text-sm text-red-600 hover:text-white hover:bg-red-600 px-3 py-1 rounded transition duration-200"
                          >
                            <Trash2 size={16} />
                            Delete
                          </button>
                        </td>
                      </tr>
                    ))
                  ) : (
                    <tr>
                      <td
                        colSpan="8"
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
