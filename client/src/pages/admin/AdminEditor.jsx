// src/pages/admin/AdminEditor.jsx
import { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import ReactMarkdown from "react-markdown";
import remarkGfm from "remark-gfm";
import api from "../../lib/api";
import "github-markdown-css/github-markdown-light.css";

export default function AdminEditor() {
  const { id } = useParams();
  const navigate = useNavigate();
  const [form, setForm] = useState({
    title: "",
    summary: "",
    type: [],
    level: "beginner",
    topics: "",
    body: "",
    status: "draft",
    mediaUrl: "",
    sourceUrl: "",
    isPremium: false,
    views: 0,
  });
  const [showModal, setShowModal] = useState(false);

  useEffect(() => {
    if (id) {
      (async () => {
        try {
          const { data } = await api.get(`/admin/contents/content/${id}`);
          setForm((prev) => ({
            ...prev,
            ...data,
            topics: Array.isArray(data.topics)
              ? data.topics.join(", ")
              : data.topics || "",
            type: Array.isArray(data.type) ? data.type : [data.type],
          }));
        } catch (err) {
          console.error("Failed to load content:", err);
        }
      })();
    }
  }, [id]);

  const save = async () => {
    const payload = {
      ...form,
      topics: form.topics
        .split(",")
        .map((s) => s.trim())
        .filter(Boolean),
    };

    if (id) {
      await api.put(`/admin/contents/content/${id}`, payload);
    } else {
      await api.post(`/admin/contents/create`, payload);
    }
    setShowModal(true);

    // Auto close modal after 2s
    setTimeout(() => {
      setShowModal(false);
      navigate("/admin");
    }, 2000);
  };

  const uploadFile = async (file) => {
    const fd = new FormData();
    fd.append("file", file);
    const { data } = await api.post("/admin/upload", fd, {
      headers: { "Content-Type": "multipart/form-data" },
    });
    setForm((f) => ({ ...f, mediaUrl: data.url }));
  };

  const toggleType = (val) => {
    setForm((prev) => {
      const exists = prev.type.includes(val);
      return {
        ...prev,
        type: exists
          ? prev.type.filter((t) => t !== val)
          : [...prev.type, val],
      };
    });
  };

  return (
    <div className="min-h-screen w-full relative bg-gradient-to-br from-gray-50 via-white to-gray-100 text-gray-900 py-20 px-4 md:px-8">
      {/* Background glass grid */}
      <div className="absolute inset-0 z-0 grid grid-cols-12 gap-px opacity-10">
        {Array.from({ length: 120 }).map((_, i) => (
          <div key={i} className="border border-gray-300"></div>
        ))}
      </div>

      {/* Back button */}
      <button
        onClick={() => navigate(-1)}
        className="fixed top-5 left-5 z-10 px-5 py-2 rounded-full backdrop-blur-md bg-white/30 border border-white/50 text-gray-900 font-medium shadow-lg hover:scale-105 hover:bg-white/50 transition"
      >
        ← Back
      </button>

      {/* Main Container */}
      <div className="relative z-10 max-w-6xl mx-auto bg-white/60 backdrop-blur-xl border border-gray-200/50 p-10 rounded-3xl shadow-2xl space-y-8">
        <h1 className="text-4xl font-black tracking-tight text-gray-900 text-center uppercase">
          {id ? "Edit Content" : "New Content"}
        </h1>

        {/* Title */}
        <input
          className="bg-white/70 border border-gray-300 rounded-xl px-5 py-3 w-full placeholder-gray-500 text-gray-900 focus:outline-none focus:ring-2 focus:ring-black"
          placeholder="Title"
          value={form.title}
          onChange={(e) => setForm({ ...form, title: e.target.value })}
        />

        {/* Summary */}
        <textarea
          className="bg-white/70 border border-gray-300 rounded-xl px-5 py-3 w-full placeholder-gray-500 text-gray-900 min-h-[80px] focus:outline-none focus:ring-2 focus:ring-black"
          placeholder="Summary"
          value={form.summary}
          onChange={(e) => setForm({ ...form, summary: e.target.value })}
        />

        {/* Multi-select Types */}
        <div className="flex gap-4 flex-wrap">
          {["article", "video"].map((opt) => (
            <button
              key={opt}
              type="button"
              onClick={() => toggleType(opt)}
              className={`px-6 py-2 rounded-xl border text-sm font-semibold uppercase tracking-wide transition-all ${form.type.includes(opt)
                  ? "bg-black text-white border-black shadow-lg"
                  : "bg-white/60 text-gray-700 border-gray-300 hover:bg-gray-100"
                }`}
            >
              {opt}
            </button>
          ))}
        </div>

        {/* Dropdowns */}
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
          <select
            className="bg-white/70 border border-gray-300 rounded-xl px-5 py-3 text-gray-900 focus:ring-2 focus:ring-black"
            value={form.level}
            onChange={(e) => setForm({ ...form, level: e.target.value })}
          >
            {["beginner", "intermediate", "advanced"].map((opt) => (
              <option key={opt}>{opt}</option>
            ))}
          </select>

          <select
            className="bg-white/70 border border-gray-300 rounded-xl px-5 py-3 text-gray-900 focus:ring-2 focus:ring-black"
            value={form.status}
            onChange={(e) => setForm({ ...form, status: e.target.value })}
          >
            {["draft", "published"].map((opt) => (
              <option key={opt}>{opt}</option>
            ))}
          </select>
        </div>

        {/* Premium toggle */}
        <label className="flex items-center gap-3 text-gray-700 font-medium">
          <input
            type="checkbox"
            checked={form.isPremium}
            onChange={(e) => setForm({ ...form, isPremium: e.target.checked })}
            className="scale-125 accent-black"
          />
          Premium Content
        </label>

        {/* Views */}
        {id && (
          <div className="text-gray-600 text-sm tracking-wide font-medium">
            👀 Views: <span className="font-mono">{form.views}</span>
          </div>
        )}

        {/* Topics */}
        <input
          className="bg-white/70 border border-gray-300 rounded-xl px-5 py-3 w-full placeholder-gray-500 text-gray-900 focus:ring-2 focus:ring-black"
          placeholder="Topics (comma separated)"
          value={form.topics}
          onChange={(e) => setForm({ ...form, topics: e.target.value })}
        />

        {/* Body (Markdown) */}
        {form.type.includes("article") && (
          <div className="grid md:grid-cols-2 gap-6">
            <textarea
              className="bg-white/70 border border-gray-300 rounded-xl px-5 py-3 w-full min-h-[250px] placeholder-gray-500 text-gray-900 focus:ring-2 focus:ring-black"
              placeholder="Markdown body"
              value={form.body}
              onChange={(e) => setForm({ ...form, body: e.target.value })}
            />
            <div className="bg-white/70 border border-gray-300 rounded-xl p-6 overflow-y-auto">
              <div className="markdown-body">
                <ReactMarkdown remarkPlugins={[remarkGfm]}>
                  {form.body || "*Live preview...*"}
                </ReactMarkdown>
              </div>
            </div>
          </div>
        )}

        {/* Media / Video */}
        {form.type.includes("video") && (
          <div className="space-y-3">
            <input
              type="file"
              className="text-gray-900"
              onChange={(e) => uploadFile(e.target.files[0])}
            />
            <input
              className="bg-white/70 border border-gray-300 rounded-xl px-5 py-3 w-full placeholder-gray-500 text-gray-900 focus:ring-2 focus:ring-black"
              placeholder="Source URL (YouTube embed or external link)"
              value={form.sourceUrl}
              onChange={(e) =>
                setForm({ ...form, sourceUrl: e.target.value })
              }
            />
            {form.mediaUrl && (
              <div className="text-sm text-green-600 font-medium mt-1">
                ✅ Uploaded: {form.mediaUrl}
              </div>
            )}
          </div>
        )}

        {/* Save Button */}
        <button
          onClick={save}
          className="w-full bg-black hover:bg-gray-900 text-white font-bold text-lg py-4 rounded-xl shadow-xl tracking-wide uppercase transition-transform transform hover:scale-[1.03]"
        >
          Save Content
        </button>

        {/* Modal */}
        {showModal && (
          <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/30">
            <div className="bg-white rounded-xl p-8 shadow-2xl text-center max-w-sm">
              <h2 className="text-xl font-bold mb-2">Saved Successfully!</h2>
              <p className="text-gray-700">You will be redirected shortly...</p>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
