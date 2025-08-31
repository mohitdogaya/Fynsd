import { motion } from "framer-motion";

export default function TaglineScroll() {
  const taglines = [
    "Clarity that Builds Prosperity",
    "Learn with Clarity, Live with Prosperity",
    "From Curious Minds to Clear Futures",
    "Finance, Simplified. Learning, Amplified.",
    "Curiosity in Finance, Clarity in Life",
  ];

  const loopedTaglines = [...taglines, ...taglines];

  return (
    <div className="relative overflow-hidden py-6 px-4 md:px-8 my-12">
      {/* Gradient fade left */}
      <div className="pointer-events-none absolute left-0 top-0 h-full w-16 bg-gradient-to-r from-white via-white/60 to-transparent z-10" />
      {/* Gradient fade right */}
      <div className="pointer-events-none absolute right-0 top-0 h-full w-16 bg-gradient-to-l from-white via-white/60 to-transparent z-10" />

      {/* Scrolling container */}
      <motion.div
        className="flex gap-8 whitespace-nowrap"
        animate={{ x: ["0%", "-50%"] }}
        transition={{ repeat: Infinity, duration: 25, ease: "linear" }}
      >
        {loopedTaglines.map((line, i) => (
          <span
            key={i}
            className="inline-flex items-center px-4 py-2 bg-gradient-to-r from-[#00FF7C]/10 to-[#007755]/10 
                       border border-[#00FF7C]/30 rounded-full text-[#007755] 
                       text-sm md:text-base font-medium backdrop-blur-sm shadow-sm"
          >
            {line}
          </span>
        ))}
      </motion.div>
    </div>
  );
}
