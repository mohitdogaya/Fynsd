// src/pages/admin/AdminDashboard.jsx
import { useEffect, useState } from "react";
import { useNavigate, Link } from "react-router-dom";
import { motion } from "framer-motion";
import api from "../../lib/api";
import { Users, BookOpen, Map, Plus, User, Video } from "lucide-react";
import LogoutButton from "../../components/LogoutButton";

export default function AdminDashboard() {
  const [stats, setStats] = useState({
    users: { total: 0, free: 0, premium: 0 },
    contents: { total: 0, published: 0, draft: 0, free: 0, premium: 0 },
    roadmaps: { total: 0 },
  });
  const [latestContent, setLatestContent] = useState([]);
  const [latestRoadmaps, setLatestRoadmaps] = useState([]);
  const [activeTab, setActiveTab] = useState("content");

  const navigate = useNavigate();
  const adminName = localStorage.getItem("name") || "Admin";

  useEffect(() => {
    const token = localStorage.getItem("token");
    const role = localStorage.getItem("role");
    if (!token || role !== "admin") {
      navigate("/admin/login");
      return;
    }

    fetchStats();
    fetchLatestContent();
    fetchLatestRoadmaps();
  }, [navigate]);

  // ✅ Stats fetch
  const fetchStats = async () => {
    try {
      const usersRes = await api.get("/admin/users");
      const contentsRes = await api.get("/admin/contents");
      const roadmapsRes = await api.get("/roadmaps");

      const users = usersRes.data;
      const contents = contentsRes.data.items || contentsRes.data;
      const roadmaps = roadmapsRes.data.items || roadmapsRes.data;

      setStats({
        users: {
          total: users.length,
          free: users.filter(u => !u.isPremium).length,
          premium: users.filter(u => u.isPremium).length,
        },
        contents: {
          total: contents.length,
          published: contents.filter(c => c.status === "published").length,
          draft: contents.filter(c => c.status === "draft").length,
          free: contents.filter(c => !c.isPremium).length,
          premium: contents.filter(c => c.isPremium).length,
        },
        roadmaps: {
          total: roadmaps.length,
        },
      });
    } catch (error) {
      console.error("Error fetching stats:", error);
    }
  };

  // ✅ Latest Content fetch (limit 6)
  const fetchLatestContent = async () => {
    try {
      const res = await api.get("/admin/contents", {
        params: { page: 1, limit: 6, sort: "-createdAt" },
      });

      const items = Array.isArray(res.data) ? res.data : res.data.items || [];
      setLatestContent(items.slice(0, 6));
    } catch (error) {
      console.error("Error fetching latest content:", error);
      setLatestContent([]);
    }
  };

  // ✅ Latest Roadmaps fetch (limit 6)
  const fetchLatestRoadmaps = async () => {
    try {
      const res = await api.get("/roadmaps", {
        params: { page: 1, limit: 6, sort: "-createdAt" },
      });

      const items = Array.isArray(res.data) ? res.data : res.data.items || [];
      setLatestRoadmaps(items.slice(0, 6));
    } catch (error) {
      console.error("Error fetching latest roadmaps:", error);
      setLatestRoadmaps([]);
    }
  };

  return (
    <div className="min-h-screen w-full relative text-[#2F3E46] px-6 pt-20 pb-16 overflow-x-hidden">
      {/* Background Layer */}
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

        {/* Stats Row */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 mb-10">
          <div className="bg-white p-6 rounded-2xl shadow-md border border-[#E7E7E3]">
            <h3 className="text-lg font-semibold text-emerald-800 mb-2">Users</h3>
            <p className="text-2xl font-bold text-emerald-600">{stats.users.total}</p>
            <p className="text-sm text-gray-500">Free: {stats.users.free} | Premium: {stats.users.premium}</p>
          </div>
          <div className="bg-white p-6 rounded-2xl shadow-md border border-[#E7E7E3]">
            <h3 className="text-lg font-semibold text-emerald-800 mb-2">Contents</h3>
            <p className="text-2xl font-bold text-emerald-600">{stats.contents.total}</p>
            <p className="text-sm text-gray-500">Published: {stats.contents.published} | Draft: {stats.contents.draft}</p>
            <p className="text-sm text-gray-500">Free: {stats.contents.free} | Premium: {stats.contents.premium}</p>
          </div>
          <div className="bg-white p-6 rounded-2xl shadow-md border border-[#E7E7E3]">
            <h3 className="text-lg font-semibold text-emerald-800 mb-2">Roadmaps</h3>
            <p className="text-2xl font-bold text-emerald-600">{stats.roadmaps.total}</p>
          </div>
        </div>

        {/* Quick Actions */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-5 gap-6 mb-12">
          {[
            { icon: <Users className="h-6 w-6 text-emerald-600" />, title: "Manage Users", desc: "View and edit users", link: "/admin/users" },
            { icon: <BookOpen className="h-6 w-6 text-emerald-600" />, title: "Manage Content", desc: "Review all content", link: "/admin/contents" },
            { icon: <Map className="h-6 w-6 text-emerald-600" />, title: "Manage Roadmaps", desc: "Update learning paths", link: "/admin/roadmaps" },
            { icon: <Plus className="h-6 w-6 text-emerald-600" />, title: "Add Content", desc: "Create new content", link: "/admin/content/new" }, // ✅ fixed
            { icon: <Plus className="h-6 w-6 text-emerald-600" />, title: "Add Roadmap", desc: "Create new roadmap", link: "/admin/roadmap" }, // ✅ fixed
          ].map((action, idx) => (
            <motion.a
              key={idx}
              href={action.link}
              whileHover={{ scale: 1.05 }}
              className="bg-white p-5 rounded-2xl shadow-md border border-[#E7E7E3] flex flex-col items-start gap-2 hover:shadow-lg transition"
            >
              {action.icon}
              <h4 className="font-semibold text-emerald-800">{action.title}</h4>
              <p className="text-sm text-gray-500">{action.desc}</p>
            </motion.a>
          ))}
        </div>

        {/* Latest Section Tabs */}
        <div>
          <div className="flex gap-6 border-b border-[#E7E7E3] mb-6">
            <button
              className={`pb-2 font-semibold transition ${activeTab === "content"
                ? "border-b-2 border-[#1ABC9C] text-[#09332C]"
                : "text-gray-500 hover:text-[#09332C]"}`}
              onClick={() => setActiveTab("content")}
            >
              Latest Content
            </button>

            <button
              className={`pb-2 font-semibold transition ${activeTab === "roadmaps"
                ? "border-b-2 border-[#1ABC9C] text-[#09332C]"
                : "text-gray-500 hover:text-[#09332C]"}`}
              onClick={() => setActiveTab("roadmaps")}
            >
              Latest Roadmaps
            </button>
          </div>

          {/* Latest Content */}
          {activeTab === "content" && (
            <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
              {latestContent.length > 0 ? (
                latestContent.map((it) => (
                  <div
                    key={it._id}
                    className="bg-white border border-[#E7E7E3] rounded-2xl p-5 shadow-md hover:shadow-lg transition hover:-translate-y-1"
                  >
                    <h3 className="font-semibold text-lg mb-1 line-clamp-2 text-[#09332C]">
                      {it.title}
                    </h3>

                    <div className="flex gap-2 text-sm text-gray-500 capitalize">
                      {Array.isArray(it.type)
                        ? it.type.map((t, idx) => (
                          <span key={idx} className="flex items-center gap-1">
                            {t === "article" && (
                              <BookOpen size={14} className="text-[#1ABC9C]" />
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
