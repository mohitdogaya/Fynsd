// src/pages/admin/AdminDashboard.jsx
import { useEffect, useState } from "react";
import { useNavigate, Link } from "react-router-dom";
import api from "../../lib/api";
import { Users, FileText, Plus, User, Video, Map } from "lucide-react"; // Map icon for roadmap
import LogoutButton from "../../components/LogoutButton";

export default function AdminDashboard() {
  const [latestContents, setLatestContents] = useState([]);
  const [latestRoadmaps, setLatestRoadmaps] = useState([]); // Roadmap state
  const [activeTab, setActiveTab] = useState("latest");
  const navigate = useNavigate();
  const adminName = localStorage.getItem("name") || "Admin";

  useEffect(() => {
    const token = localStorage.getItem("token");
    const role = localStorage.getItem("role");

    // agar admin login nahi hai to login page bhej do
    if (!token || role !== "admin") {
      navigate("/admin/login");
      return;
    }

    // ✅ Latest Content fetch
    async function getContents() {
      try {
        const res = await api.get("/admin/contents", {
          params: { page: 1, limit: 6 },
        });

        let items = res.data;
        if (Array.isArray(items)) {
          setLatestContents(items.slice(0, 6));
        } else if (items.items) {
          setLatestContents(items.items.slice(0, 6));
        } else {
          setLatestContents([]);
        }
      } catch (error) {
        console.log("Error fetching contents:", error);
        setLatestContents([]);
      }
    }

    // ✅ Latest Roadmaps fetch
    async function getRoadmaps() {
      try {
        const res = await api.get("/roadmaps", {
          params: { page: 1, limit: 6 },
        });

        let items = res.data;
        if (Array.isArray(items)) {
          setLatestRoadmaps(items.slice(0, 6));
        } else if (items.items) {
          setLatestRoadmaps(items.items.slice(0, 6));
        } else {
          setLatestRoadmaps([]);
        }
      } catch (error) {
        console.log("Error fetching roadmaps:", error);
        setLatestRoadmaps([]);
      }
    }

    // functions ko call kar do
    getContents();
    getRoadmaps();

  }, [navigate]);


  return (
    <div className="min-h-screen w-full relative text-[#2F3E46] px-6 pt-20 pb-16 overflow-x-hidden">
      {/* Background Layer - same as Home.jsx */}
      <div
        className="absolute inset-0 z-0"
        style={{
          background: "linear-gradient(135deg, #ffffff 0%, #f9fffc 100%)",
        }}
      />

      {/* Main Content */}
      <div className="relative z-10 max-w-7xl mx-auto">
        {/* Header */}
        <div className="mb-12">
          <div className="flex flex-col md:flex-row items-start md:items-center justify-between gap-6">
            <div>
              <h1 className="text-3xl font-bold mb-2">
                Welcome,{" "}
                <span className="bg-gradient-to-r from-[#00FF7C] to-[#007755] bg-clip-text text-transparent">
                  {adminName}
                </span>
              </h1>
              <p className="text-gray-500">
                Manage users, content, roadmaps and more.
              </p>
            </div>
            <div className="flex gap-3">
              <button
                onClick={() => navigate("/admin/profile")}
                className="bg-[#E0FFF9] hover:bg-[#00FFE0]/20 text-[#09332C] px-4 py-2 rounded-2xl text-sm font-medium flex items-center gap-2 shadow-sm"
              >
                <User size={18} />
                Profile
              </button>
              <LogoutButton className="bg-[#FF6B6B] hover:bg-[#ff4b4b] text-white px-4 py-2 rounded-2xl text-sm font-medium shadow-sm" />
            </div>
          </div>
        </div>

        {/* Quick Links */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 mb-16">
          {/* Users */}
          <Link
            to="/admin/users"
            className="bg-white border border-[#E7E7E3] rounded-2xl p-6 shadow-md hover:shadow-lg hover:-translate-y-1 transition"
          >
            <Users size={32} className="text-[#1ABC9C] mb-3" />
            <h2 className="text-xl font-semibold">All Users</h2>
            <p className="text-gray-500 mt-1 text-sm">Manage registered users</p>
          </Link>

          {/* Content */}
          <Link
            to="/admin/contents"
            className="bg-white border border-[#E7E7E3] rounded-2xl p-6 shadow-md hover:shadow-lg hover:-translate-y-1 transition"
          >
            <FileText size={32} className="text-[#1ABC9C] mb-3" />
            <h2 className="text-xl font-semibold">All Content</h2>
            <p className="text-gray-500 mt-1 text-sm">View or edit content</p>
          </Link>

          {/* Add Content */}
          <Link
            to="/admin/content/new"
            className="bg-white border border-[#E7E7E3] rounded-2xl p-6 shadow-md hover:shadow-lg hover:-translate-y-1 transition"
          >
            <Plus size={32} className="text-[#1ABC9C] mb-3" />
            <h2 className="text-xl font-semibold">Add Content</h2>
            <p className="text-gray-500 mt-1 text-sm">Publish new material</p>
          </Link>

          {/* Roadmaps */}
          <Link
            to="/admin/roadmaps"
            className="bg-white border border-[#E7E7E3] rounded-2xl p-6 shadow-md hover:shadow-lg hover:-translate-y-1 transition"
          >
            <Map size={32} className="text-[#1ABC9C] mb-3" />
            <h2 className="text-xl font-semibold">All Roadmaps</h2>
            <p className="text-gray-500 mt-1 text-sm">Manage learning roadmaps</p>
          </Link>

          {/* Add Roadmap */}
          <Link
            to="/admin/roadmap"
            className="bg-white border border-[#E7E7E3] rounded-2xl p-6 shadow-md hover:shadow-lg hover:-translate-y-1 transition"
          >
            <Plus size={32} className="text-[#1ABC9C] mb-3" />
            <h2 className="text-xl font-semibold">Add Roadmap</h2>
            <p className="text-gray-500 mt-1 text-sm">Create new roadmap</p>
          </Link>
        </div>

        {/* Latest Section */}
        <div>
          <div className="flex gap-6 border-b border-[#E7E7E3] mb-6">
            <button
              className={`pb-2 font-semibold transition ${activeTab === "latest"
                ? "border-b-2 border-[#1ABC9C] text-[#09332C]"
                : "text-gray-500 hover:text-[#09332C]"
                }`}
              onClick={() => setActiveTab("latest")}
            >
              Latest Content
            </button>

            <button
              className={`pb-2 font-semibold transition ${activeTab === "roadmaps"
                ? "border-b-2 border-[#1ABC9C] text-[#09332C]"
                : "text-gray-500 hover:text-[#09332C]"
                }`}
              onClick={() => setActiveTab("roadmaps")}
            >
              Latest Roadmaps
            </button>
          </div>

          {/* Latest Content */}
          {activeTab === "latest" && (
            <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
              {latestContents.length > 0 ? (
                latestContents.map((it) => (
                  <div
                    key={it._id}
                    className="bg-white border border-[#E7E7E3] rounded-2xl p-5 shadow-md hover:shadow-lg transition hover:-translate-y-1"
                  >
                    <h3 className="font-semibold text-lg mb-1 line-clamp-2 text-[#09332C]">
                      {it.title}
                    </h3>

                    {/* Type display with icons */}
                    <div className="flex gap-2 text-sm text-gray-500 capitalize">
                      {Array.isArray(it.type)
                        ? it.type.map((t, idx) => (
                          <span key={idx} className="flex items-center gap-1">
                            {t === "article" && (
                              <FileText size={14} className="text-[#1ABC9C]" />
                            )}
                            {t === "video" && (
                              <Video size={14} className="text-[#00FFE0]" />
                            )}
                            {t}
                          </span>
                        ))
                        : it.type}
                    </div>

                    <Link
                      to={`/admin/content/${it._id}`}
                      className="mt-4 inline-block text-[#1ABC9C] hover:text-[#007755] font-medium"
                    >
                      Edit →
                    </Link>
                  </div>
                ))
              ) : (
                <p className="text-gray-500 text-center col-span-full mt-4">
                  No content found.
                </p>
              )}
            </div>
          )}

          {/* Latest Roadmaps */}
          {activeTab === "roadmaps" && (
            <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
              {latestRoadmaps.length > 0 ? (
                latestRoadmaps.map((roadmap) => (
                  <div
                    key={roadmap._id}
                    className="bg-white border border-[#E7E7E3] rounded-2xl p-5 shadow-md hover:shadow-lg transition hover:-translate-y-1"
                  >
                    <h3 className="font-semibold text-lg mb-1 line-clamp-2 text-[#09332C]">
                      {roadmap.title}
                    </h3>

                    <p className="text-sm text-gray-500 line-clamp-2">
                      {roadmap.description}
                    </p>

                    <Link
                      to={`/roadmaps/${roadmap._id}`}
                      className="mt-4 inline-block text-[#1ABC9C] hover:text-[#007755] font-medium"
                    >
                      Edit →
                    </Link>
                  </div>
                ))
              ) : (
                <p className="text-gray-500 text-center col-span-full mt-4">
                  No roadmaps found.
                </p>
              )}
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
