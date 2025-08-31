import { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import api from "../../lib/api";

export default function AdminRoadmapEditor() {
  const { id } = useParams();
  const navigate = useNavigate();

  const [form, setForm] = useState({
    title: "",
    description: "",
    category: "Finance",
    levels: {
      beginner: [],
      intermediate: [],
      advanced: [],
    },
  });
  const [showModal, setShowModal] = useState(false);
  const [modalMessage, setModalMessage] = useState("");

  useEffect(() => {
    if (id) {
      (async () => {
        try {
          const { data } = await api.get(`/roadmaps/${id}`);
          setForm(data);
        } catch (err) {
          console.error("Failed to load roadmap:", err);
        }
      })();
    }
  }, [id]);

  const addStep = (level) => {
    setForm((prev) => ({
      ...prev,
      levels: {
        ...prev.levels,
        [level]: [...prev.levels[level], { title: "", articleLink: "" }],
      },
    }));
  };

  const updateStep = (level, idx, field, value) => {
    const updated = [...form.levels[level]];
    updated[idx][field] = value;
    setForm((prev) => ({
      ...prev,
      levels: { ...prev.levels, [level]: updated },
    }));
  };

  const removeStep = (level, idx) => {
    setForm((prev) => ({
      ...prev,
      levels: {
        ...prev.levels,
        [level]: prev.levels[level].filter((_, i) => i !== idx),
      },
    }));
  };

  const save = async () => {
    try {
      if (id) {
        await api.put(`/roadmaps/${id}`, form);
      } else {
        await api.post(`/roadmaps`, form);
      }
      // ✅ Show modal instead of alert
      setModalMessage("✅ Roadmap saved successfully!");
      setShowModal(true);

      setTimeout(() => {
        setShowModal(false);
        navigate("/admin");
      }, 2000);
    } catch (err) {
      console.error(err);
      setModalMessage("❌ Failed to save roadmap");
      setShowModal(true);
      setTimeout(() => setShowModal(false), 2000);
    }
  };

  return (
    <div className="min-h-screen w-full relative bg-gradient-to-b from-[#E0FFF9] to-[#FFFFFF] text-gray-800 py-20 px-4 md:px-8">
      {/* Back button */}
      <button
        onClick={() => navigate(-1)}
        className="fixed top-5 left-5 z-10 bg-white/70 backdrop-blur-md border border-teal-100 px-4 py-2 rounded-lg shadow-sm hover:bg-white hover:shadow-md transition"
      >
        ← Back
      </button>

      <div className="relative z-10 max-w-6xl mx-auto bg-white/70 backdrop-blur-md border border-teal-100 p-10 rounded-3xl shadow-lg space-y-6">
        <h1 className="text-3xl font-extrabold tracking-tight text-[#2F3E46] text-center">
          {id ? "Edit Roadmap" : "New Roadmap"}
        </h1>

        {/* Title */}
        <input
          className="bg-white border border-teal-100 rounded-xl px-4 py-3 w-full shadow-sm focus:ring-2 focus:ring-[#1ABC9C] outline-none"
          placeholder="Roadmap Title"
          value={form.title}
          onChange={(e) => setForm({ ...form, title: e.target.value })}
        />

        {/* Description */}
        <textarea
          className="bg-white border border-teal-100 rounded-xl px-4 py-3 w-full min-h-[80px] shadow-sm focus:ring-2 focus:ring-[#1ABC9C] outline-none"
          placeholder="Roadmap Description"
          value={form.description}
          onChange={(e) => setForm({ ...form, description: e.target.value })}
        />

        {/* Category */}
        <select
          className="bg-white border border-teal-100 rounded-xl px-4 py-3 text-gray-800 shadow-sm focus:ring-2 focus:ring-[#1ABC9C] outline-none"
          value={form.category}
          onChange={(e) => setForm({ ...form, category: e.target.value })}
        >
          {["Finance", "Investing", "Stock Market", "Money Management"].map(
            (opt) => (
              <option key={opt}>{opt}</option>
            )
          )}
        </select>

        {/* Levels */}
        {["beginner", "intermediate", "advanced"].map((level) => (
          <div
            key={level}
            className="bg-white/60 border border-teal-100 p-5 rounded-xl shadow-sm space-y-4"
          >
            <h2 className="text-xl font-bold capitalize text-[#2F3E46]">
              {level} Level
            </h2>

            {form.levels[level].map((step, idx) => (
              <div key={idx} className="grid grid-cols-3 gap-4 items-center">
                <input
                  className="bg-white border border-teal-100 rounded-xl px-3 py-2 w-full shadow-sm focus:ring-2 focus:ring-[#1ABC9C] outline-none"
                  placeholder="Step Title"
                  value={step.title}
                  onChange={(e) =>
                    updateStep(level, idx, "title", e.target.value)
                  }
                />
                <input
                  className="bg-white border border-teal-100 rounded-xl px-3 py-2 w-full shadow-sm focus:ring-2 focus:ring-[#1ABC9C] outline-none"
                  placeholder="Article Link"
                  value={step.articleLink}
                  onChange={(e) =>
                    updateStep(level, idx, "articleLink", e.target.value)
                  }
                />
                <button
                  onClick={() => removeStep(level, idx)}
                  className="bg-red-500 text-white px-3 py-2 rounded-lg hover:bg-red-600 transition shadow-sm"
                >
                  ❌
                </button>
              </div>
            ))}

            <button
              onClick={() => addStep(level)}
              className="bg-gradient-to-r from-[#1ABC9C] to-[#00FFE0] text-white font-semibold px-4 py-2 rounded-lg shadow-md hover:shadow-lg transition"
            >
              + Add Step
            </button>
          </div>
        ))}

        {/* Save */}
        <button
          onClick={save}
          className="w-full bg-gradient-to-r from-[#1ABC9C] to-[#00FFE0] text-white font-semibold text-lg py-3 rounded-xl shadow-md hover:shadow-lg transition transform hover:scale-105"
        >
          Save Roadmap
        </button>

        {/* Modal */}
        {showModal && (
          <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/30">
            <div className="bg-white rounded-xl p-6 shadow-2xl text-center max-w-sm">
              <p className="text-lg font-semibold">{modalMessage}</p>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
