// src/pages/admin/AllContents.jsx
import { useEffect, useState } from "react";
import { useNavigate, Link } from "react-router-dom";
import api from "../../lib/api";
import {
  Edit3,
  Trash2,
  Plus,
  ArrowLeft,
  FileText,
  Video,
  Star,
  Eye,
} from "lucide-react";

export default function AllContents() {
  const [contents, setContents] = useState([]);
  const navigate = useNavigate();

  useEffect(() => {
    const token = localStorage.getItem("token");
    const role = localStorage.getItem("role");

    if (!token || role !== "admin") {
      navigate("/admin/login");
      return;
    }

    (async () => {
      try {
        const { data } = await api.get("/admin/contents", {
          params: { page: 1, limit: 50 },
        });
        setContents(Array.isArray(data.items) ? data.items : []);
      } catch (err) {
        console.error(err);
        setContents([]);
      }
    })();
  }, [navigate]);

  const handleDelete = async (id) => {
    if (!window.confirm("Are you sure you want to delete this content?")) return;
    try {
      await api.delete(`/admin/content/${id}`);
      setContents(contents.filter((c) => c._id !== id));
      alert("Content deleted successfully");
    } catch (err) {
      console.error(err);
      alert("Failed to delete content");
    }
  };

  return (
    <div className="min-h-screen w-full relative text-[#2F3E46]">
      {/* Background same as Home.jsx */}
      <div
        className="absolute inset-0 z-0"
        style={{
          background:
            "radial-gradient(ellipse 80% 60% at 50% 0%, rgba(224, 255, 249, 0.4), transparent 70%), #FFFFFF",
        }}
      />

      <div className="relative z-10 max-w-6xl mx-auto px-6 pt-24 pb-20">
        {/* Header */}
        <div className="flex flex-col md:flex-row justify-between items-start md:items-center mb-10 gap-4">
          <div className="flex flex-col gap-4">
            <button
              onClick={() => navigate(-1)}
              className="inline-flex items-center gap-2 text-sm text-gray-600 hover:text-[#1ABC9C]"
            >
              <ArrowLeft size={18} /> Back
            </button>
            <div>
              <h1 className="text-3xl font-bold mb-1">Manage Content</h1>
              <p className="text-gray-500 text-sm">
                Add, edit, delete, or review content quickly.
              </p>
            </div>
          </div>

          <Link
            to="/admin/content/new"
            className="inline-flex items-center gap-2 bg-gradient-to-r from-[#1ABC9C] to-[#00FFE0] hover:opacity-90 px-5 py-2 rounded-xl text-sm font-medium text-white shadow"
          >
            <Plus size={18} /> Add New Content
          </Link>
        </div>

        {/* Content Grid */}
        <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
          {contents.length > 0 ? (
            contents.map((it) => (
              <div
                key={it._id}
                className="group bg-white border border-teal-100 rounded-2xl shadow-md hover:shadow-lg hover:-translate-y-1 transition p-5 flex flex-col justify-between"
              >
                <div>
                  {/* Title */}
                  <h3 className="font-bold text-lg text-[#2F3E46] line-clamp-2">
                    {it.title}
                  </h3>

                  {/* Top badges */}
                  <div className="flex gap-2 mt-2 flex-wrap items-center pb-2 text-xs font-semibold">
                    {Array.isArray(it.type) &&
                      it.type.map((t, idx) => (
                        <span
                          key={idx}
                          className="flex items-center gap-1 px-2 py-0.5 rounded-full bg-[#E0FFF9] text-[#2F3E46]"
                        >
                          {t === "article" && (
                            <FileText size={14} className="text-indigo-500" />
                          )}
                          {t === "video" && (
                            <Video size={14} className="text-green-500" />
                          )}
                          {t}
                        </span>
                      ))}

                    {it.level && (
                      <span className="flex items-center gap-1 px-2 py-0.5 rounded-full bg-[#E0FFF9] text-[#2F3E46]">
                        {it.level}
                      </span>
                    )}

                    {/* Status badge */}
                    <span
                      className={`flex items-center gap-1 px-2 py-0.5 rounded-full ${
                        it.status === "published"
                          ? "bg-green-100 text-green-600"
                          : "bg-yellow-100 text-yellow-600"
                      }`}
                    >
                      {it.status === "published" ? "Published" : "Draft"}
                    </span>
                  </div>

                  {/* Summary */}
                  <p className="text-gray-600 text-sm mt-2 line-clamp-3">
                    {it.summary ||
                      it.body?.substring(0, 120) ||
                      "No preview available..."}
                  </p>
                </div>

                {/* Bottom badges + Actions */}
                <div className="mt-4 flex justify-between items-center">
                  <div className="flex gap-2 items-center text-xs font-semibold">
                    <span
                      className={`flex items-center gap-1 px-2 py-0.5 rounded-full ${
                        it.isPremium
                          ? "bg-purple-100 text-purple-600"
                          : "bg-blue-100 text-blue-600"
                      }`}
                    >
                      <Star size={12} />
                      {it.isPremium ? "Premium" : "Free"}
                    </span>
                    <span className="flex items-center gap-1 px-2 py-0.5 rounded-full bg-gray-100 text-gray-600">
                      <Eye size={12} />
                      {it.views || 0}
                    </span>
                  </div>

                  <div className="flex gap-3">
                    <Link
                      to={`/admin/content/${it._id}`}
                      className="text-[#1ABC9C] hover:text-[#0e8a73] flex items-center gap-1 text-sm"
                    >
                      <Edit3 size={16} /> Edit
                    </Link>
                    <button
                      onClick={() => handleDelete(it._id)}
                      className="text-red-500 hover:text-red-600 flex items-center gap-1 text-sm"
                    >
                      <Trash2 size={16} /> Delete
                    </button>
                  </div>
                </div>
              </div>
            ))
          ) : (
            <p className="text-gray-500 text-center col-span-full mt-4">
              No content found.
            </p>
          )}
        </div>
      </div>
    </div>
  );
}
