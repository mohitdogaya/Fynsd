// src/pages/knowledge/KnowledgeList.jsx
import { useEffect, useState } from "react";
import { motion } from "framer-motion";
import { useUser } from "../../context/UserContext";  // ✅
import api from "../../lib/api";
import { Search, BookOpen, Video, Star, Eye } from "lucide-react";

export default function KnowledgeList() {
  const { user } = useUser();  

  const [items, setItems] = useState([]);
  const [q, setQ] = useState("");
  const [type, setType] = useState("");
  const [level, setLevel] = useState("");
  const [page, setPage] = useState(1);
  const [total, setTotal] = useState(0);

  const fetchData = async () => {
    try {
      const { data } = await api.get("/contents", {
        params: { q, type, level, page, limit: 10 },
      });
      setItems(data.items || []);
      setTotal(data.total || 0);
    } catch (err) {
      console.error("Failed to fetch contents:", err);
    }
  };

  useEffect(() => {
    fetchData();
  }, [q, type, level, page]);

  const renderTypes = (types) => {
    if (!types) return null;
    return (Array.isArray(types) ? types : [types]).map((t, idx) => {
      let icon;
      switch (t) {
        case "article": icon = <BookOpen className="w-4 h-4 text-[#00FF7C]" />; break;
        case "video": icon = <Video className="w-4 h-4 text-[#ff4a4a]" />; break;
        default: icon = null;
      }
      return (
        <span key={idx} className="flex items-center gap-1 px-2 py-0.5 rounded-full text-xs font-semibold bg-[#F3F3F2]/50 backdrop-blur-sm">
          {icon} {t}
        </span>
      );
    });
  };

  return (
    <div className="min-h-screen w-full relative text-[#2F3E46] px-6 pt-28 pb-16 font-poppins">
      {/* Background with blur circles */}
      <div className="absolute inset-0 z-0 bg-gradient-to-br from-white via-[#EFFFF5] to-[#DFFFEF]" />
      <div className="absolute top-32 left-16 w-64 h-64 bg-[#00FF7C]/30 blur-3xl rounded-full" />
      <div className="absolute bottom-32 right-20 w-72 h-72 bg-[#007755]/20 blur-3xl rounded-full" />

      {/* Title - Swiss Style */}
      <div className="relative z-10 max-w-5xl mx-auto text-center mb-14">
        <h1 className="text-6xl font-extrabold tracking-tight text-[#09332C] uppercase">
          Explore Knowledge
        </h1>
        <p className="text-[#2F3E46] mt-4 text-lg font-light tracking-wide">
          Search. Filter. Discover finance resources.
        </p>
      </div>

      {/* Filters - Glass morph */}
      <div className="relative z-10 max-w-5xl mx-auto grid md:grid-cols-3 gap-5 mb-12">
        <div className="relative">
          <Search className="absolute left-3 top-3 text-[#00FF7C] w-5 h-5" />
          <input
            placeholder="Search..."
            value={q}
            onChange={(e) => setQ(e.target.value)}
            className="pl-10 w-full bg-white/40 backdrop-blur-md text-[#09332C] border border-white/30 p-3 rounded-2xl shadow-lg focus:ring-2 focus:ring-[#00FF7C] focus:outline-none"
          />
        </div>

        <select
          value={type}
          onChange={(e) => setType(e.target.value)}
          className="bg-white/40 backdrop-blur-md text-[#09332C] border border-white/30 p-3 rounded-2xl shadow-lg focus:ring-2 focus:ring-[#00FF7C]"
        >
          <option value="">All Types</option>
          <option value="article">Article</option>
          <option value="video">Video</option>
        </select>

        <select
          value={level}
          onChange={(e) => setLevel(e.target.value)}
          className="bg-white/40 backdrop-blur-md text-[#09332C] border border-white/30 p-3 rounded-2xl shadow-lg focus:ring-2 focus:ring-[#00FF7C]"
        >
          <option value="">All Levels</option>
          <option value="beginner">Beginner</option>
          <option value="intermediate">Intermediate</option>
          <option value="advanced">Advanced</option>
        </select>
      </div>

      {/* Knowledge Cards */}
      <div className="relative z-10 max-w-5xl mx-auto grid sm:grid-cols-2 md:grid-cols-3 gap-6">
        {items.map((it) => (
          <motion.a
            key={it._id}
            href={it.isPremium && !user?.isPremium ? "#" : `/knowledge/${it.slug}`}
            onClick={(e) => {
              if (it.isPremium && !(user?.isPremium === true)) {
                e.preventDefault();
                alert("Upgrade to premium to access this content");
              }
            }}
            whileHover={{ y: -6, scale: 1 }}
            transition={{ type: "spring", stiffness: 100 }}
            className="bg-white/50 backdrop-blur-xl border border-white/40 rounded-2xl shadow-lg hover:shadow-[#00FF7C]/40 p-6 flex flex-col justify-between hover:border-[#00FF7C]"
          >
            <div className="flex flex-wrap gap-2 items-center text-xs font-semibold">
              {renderTypes(it.type)}
              {it.level && (
                <span className="flex items-center gap-1 px-2 py-0.5 rounded-full bg-[#F3F3F2]/60 backdrop-blur-sm text-[#09332C]">
                  {it.level}
                </span>
              )}
            </div>

            <div className="font-bold text-lg text-[#09332C] mt-3 leading-snug">{it.title}</div>
            <div className="text-[#2F3E46] text-sm line-clamp-3 mt-2">{it.summary || it.body}</div>

            <div className="flex gap-2 mt-4 items-center text-xs font-semibold">
              {it.isPremium != null && (
                <span
                  className={`flex items-center gap-1 px-2 py-0.5 rounded-full ${
                    it.isPremium ? "bg-[#007755]/20 text-[#007755]" : "bg-[#00FF7C]/20 text-[#09332C] backdrop-blur-sm"
                  }`}
                >
                  <Star size={12} />
                  {it.isPremium ? "Premium" : "Free"}
                </span>
              )}
              <span className="flex items-center gap-1 px-2 py-0.5 rounded-full bg-[#E7E7E3]/60 backdrop-blur-sm text-[#09332C]">
                <Eye size={12} />
                {it.views || 0}
              </span>
            </div>
          </motion.a>
        ))}
      </div>

      {/* Pagination */}
      <div className="relative z-10 max-w-5xl mx-auto flex items-center justify-between mt-12">
        <div className="text-sm text-[#09332C]/70">Total: {total}</div>
        <div className="flex gap-3">
          <button
            disabled={page === 1}
            onClick={() => setPage((p) => p - 1)}
            className="px-5 py-2 rounded-xl bg-gradient-to-r from-[#00FF7C] to-[#007755] text-white font-semibold shadow hover:shadow-[#00FF7C]/40 disabled:opacity-50 disabled:cursor-not-allowed"
          >
            Prev
          </button>
          <button
            disabled={items.length < 10}
            onClick={() => setPage((p) => p + 1)}
            className="px-5 py-2 rounded-xl bg-gradient-to-r from-[#00FF7C] to-[#007755] text-white font-semibold shadow hover:shadow-[#00FF7C]/40 disabled:opacity-50 disabled:cursor-not-allowed"
          >
            Next
          </button>
        </div>
      </div>
    </div>
  );
}
