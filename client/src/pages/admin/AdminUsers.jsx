// src/pages/admin/AdminUsers.jsx
import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import api from "../../lib/api";
import { Trash2, ArrowLeft } from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";

export default function AdminUsers() {
  const [users, setUsers] = useState([]);
  const [modalOpen, setModalOpen] = useState(false);
  const [selectedUser, setSelectedUser] = useState(null);
  const [toast, setToast] = useState({ show: false, message: "", type: "" });
  const navigate = useNavigate();

  useEffect(() => {
    const token = localStorage.getItem("token");
    if (!token) {
      navigate("/admin/login");
      return;
    }

    (async () => {
      try {
        const { data } = await api.get("/admin/users");
        setUsers(Array.isArray(data) ? data : data.items || []);
      } catch (err) {
        console.error("Failed to fetch users:", err);
        if (err.response && err.response.status === 401) {
          localStorage.removeItem("token");
          navigate("/admin/login");
        }
      }
    })();
  }, [navigate]);

  // Open modal
  const confirmDelete = (user) => {
    setSelectedUser(user);
    setModalOpen(true);
  };

  // Delete user
  const handleDelete = async () => {
    try {
      await api.delete(`/admin/users/${selectedUser._id}`);
      setUsers(users.filter((u) => u._id !== selectedUser._id));
      setToast({ show: true, message: "User deleted successfully!", type: "success" });
    } catch (err) {
      console.error("Failed to delete user:", err);
      setToast({ show: true, message: "User could not be deleted.", type: "error" });
    } finally {
      setModalOpen(false);
      setSelectedUser(null);
      setTimeout(() => setToast({ show: false, message: "", type: "" }), 3000);
    }
  };

  return (
    <div className="min-h-screen w-full relative text-[#2F3E46] font-poppins">
      {/* Background */}
      <div
        className="absolute inset-0 z-0"
        style={{
          background: "linear-gradient(135deg, #ffffff 0%, #FFFFFF 100%)",
        }}
      />

      {/* Page Content */}
      <div className="relative z-10 max-w-6xl mx-auto px-6 pt-24 pb-16">
        {/* Header */}
        <div className="flex flex-col md:flex-row justify-between items-start md:items-center mb-8">
          <div className="flex flex-col gap-6">
            <button
              onClick={() => navigate(-1)}
              className="inline-flex items-center gap-2 text-sm text-[#2F3E46] hover:text-[#1ABC9C]"
            >
              <ArrowLeft size={18} /> Back
            </button>
            <div>
              <h1 className="text-3xl md:text-4xl font-bold leading-tight">
                Manage Users
              </h1>
              <p className="text-sm text-gray-500">
                View, check status, and remove platform users.
              </p>
            </div>
          </div>
        </div>

        {/* Table */}
        <div className="overflow-x-auto rounded-2xl border border-[#E7E7E3] bg-white shadow hover:shadow-[#00FF7C]/20 transition">
          <table className="w-full text-sm md:text-base table-auto">
            <thead>
              <tr className="text-left text-[#09332C] border-b border-[#E7E7E3] bg-[#F9FAFB]">
                <th className="px-5 py-3 font-semibold tracking-wide">#</th>
                <th className="px-5 py-3 font-semibold tracking-wide">Name</th>
                <th className="px-5 py-3 font-semibold tracking-wide">Email</th>
                <th className="px-5 py-3 font-semibold tracking-wide">Status</th>
                <th className="px-5 py-3 font-semibold tracking-wide">Actions</th>
              </tr>
            </thead>
            <tbody>
              {users.length > 0 ? (
                users.map((user, idx) => (
                  <tr
                    key={user._id}
                    className="border-b border-[#E7E7E3] hover:bg-[#F4FFF9] transition"
                  >
                    <td className="px-5 py-3 text-gray-600">{idx + 1}</td>
                    <td className="px-5 py-3">{user.name || "N/A"}</td>
                    <td className="px-5 py-3">{user.email}</td>
                    <td className="px-5 py-3">
                      {user.isPremium ? (
                        <span className="px-3 py-1 text-xs font-semibold rounded-full bg-green-100 text-green-700">
                          🌟 Premium
                        </span>
                      ) : (
                        <span className="px-3 py-1 text-xs font-semibold rounded-full bg-gray-200 text-gray-700">
                          Free
                        </span>
                      )}
                    </td>
                    <td className="px-5 py-3">
                      <div className="flex gap-3">
                        <button
                          onClick={() => confirmDelete(user)}
                          className="text-red-600 hover:text-red-700 flex items-center gap-1 text-sm font-medium"
                        >
                          <Trash2 size={16} /> Delete
                        </button>
                      </div>
                    </td>
                  </tr>
                ))
              ) : (
                <tr>
                  <td
                    colSpan="5"
                    className="px-5 py-6 text-center text-gray-500 text-sm"
                  >
                    No users found.
                  </td>
                </tr>
              )}
            </tbody>
          </table>
        </div>
      </div>

      {/* Modal */}
      <AnimatePresence>
        {modalOpen && (
          <motion.div
            className="fixed inset-0 bg-black/50 backdrop-blur-sm flex items-center justify-center z-50"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
          >
            <motion.div
              className="bg-white/10 backdrop-blur-lg border border-white/20 rounded-3xl p-8 max-w-md w-full text-center text-white shadow-2xl"
              initial={{ scale: 0.8, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              exit={{ scale: 0.8, opacity: 0 }}
            >
              <h2 className="text-xl font-bold mb-4">Confirm Deletion</h2>
              <p className="mb-6">
                Are you sure you want to delete{" "}
                <strong>{selectedUser?.name}</strong>?
              </p>
              <div className="flex justify-center gap-4">
                <button
                  onClick={() => setModalOpen(false)}
                  className="px-6 py-2 rounded-xl bg-gray-700/50 hover:bg-gray-700 transition"
                >
                  Cancel
                </button>
                <button
                  onClick={handleDelete}
                  className="px-6 py-2 rounded-xl bg-red-600 hover:bg-red-700 transition"
                >
                  Delete
                </button>
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>

      {/* Toast */}
      <AnimatePresence>
        {toast.show && (
          <motion.div
            className={`fixed bottom-8 right-8 px-6 py-3 rounded-xl font-semibold shadow-lg ${
              toast.type === "success" ? "bg-green-600" : "bg-red-600"
            } text-white z-50`}
            initial={{ opacity: 0, y: 50 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: 50 }}
          >
            {toast.message}
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}
