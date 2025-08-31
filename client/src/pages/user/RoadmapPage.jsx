// frontend/src/pages/RoadmapPage.jsx
import { useEffect, useState } from "react";
import { motion } from "framer-motion";

function RoadmapPage() {
  const [roadmaps, setRoadmaps] = useState([]);

  useEffect(() => {
    const fetchRoadmaps = async () => {
      try {
        const res = await fetch("https://fynsd-backend.vercel.app/api/roadmaps");
        const data = await res.json();
        setRoadmaps(data);
      } catch (error) {
        console.error("Error fetching roadmaps:", error);
      }
    };
    fetchRoadmaps();
  }, []);

  return (
    <div className="min-h-screen w-full relative text-[#2F3E46] font-poppins overflow-hidden">
      {/* Glass Morph + Blurred Circles */}
      <div className="absolute inset-0 z-0 bg-white">
        <div className="absolute top-20 left-32 w-72 h-72 bg-[#00FF7C]/30 rounded-full blur-3xl"></div>
        <div className="absolute bottom-20 right-32 w-80 h-80 bg-[#007755]/30 rounded-full blur-3xl"></div>
      </div>

      {/* Main Wrapper */}
      <div className="relative z-10 pt-28 px-6 pb-20 max-w-6xl mx-auto">
        {/* Page Heading */}
        <motion.h1
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          className="text-5xl md:text-6xl font-extrabold mb-16 text-center tracking-tight"
        >
          <span className="bg-gradient-to-r from-[#00FF7C] to-[#007755] bg-clip-text text-transparent">
            ROADMAPS
          </span>
        </motion.h1>

        {/* Cards Container */}
        {roadmaps.length === 0 ? (
          <p className="text-center text-gray-500">No roadmaps found.</p>
        ) : (
          <div className="grid md:grid-cols-2 gap-12">
            {roadmaps.map((rm, i) => (
              <motion.div
                key={rm._id}
                initial={{ opacity: 0, y: 40 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: i * 0.2 }}
                className="backdrop-blur-xl bg-white/40 border border-[#E7E7E3] rounded-2xl p-8 shadow-lg hover:shadow-[#00FF7C]/30 transition transform hover:-translate-y-2"
              >
                {/* Roadmap Title */}
                <h2 className="text-2xl font-bold text-[#09332C] mb-2 text-center">
                  {rm.title}
                </h2>
                <p className="text-center text-[#2F3E46] mb-4">
                  {rm.description}
                </p>
                <p className="text-xs text-center text-[#007755] font-medium mb-8">
                  <b className="text-[#09332C]">Category:</b> {rm.category}
                </p>

                {/* Timeline */}
                <div className="relative border-l-4 border-[#00FF7C] pl-6">
                  {["beginner", "intermediate", "advanced"].map(
                    (level) =>
                      rm.levels[level]?.length > 0 && (
                        <div key={level} className="mb-8">
                          <div className="flex items-center mb-4">
                            <span className="w-3 h-3 bg-[#00FF7C] rounded-full border-4 border-white shadow-md" />
                            <h3 className="ml-3 font-semibold text-[#007755] capitalize text-base">
                              {level}
                            </h3>
                          </div>

                          <ul className="space-y-3">
                            {rm.levels[level].map((step, index) => (
                              <li
                                key={step._id || step.title}
                                className="bg-white/60 backdrop-blur-md border border-[#E7E7E3] rounded-xl p-4 shadow-sm hover:shadow-md hover:border-[#00FF7C] transition"
                              >
                                <div className="flex justify-between items-center">
                                  <a
                                    href={step.articleLink}
                                    target="_blank"
                                    rel="noreferrer"
                                    className="text-[#09332C] font-medium hover:text-[#007755] transition"
                                  >
                                    {index + 1}. {step.title}
                                  </a>
                                  <span className="text-xs text-[#007755] font-medium">
                                    {level}
                                  </span>
                                </div>
                              </li>
                            ))}
                          </ul>
                        </div>
                      )
                  )}
                </div>
              </motion.div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
}

export default RoadmapPage;
