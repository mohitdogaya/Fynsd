// src/pages/user/Calculators.jsx
import { useState } from "react";
import { motion } from "framer-motion";

// Import Calculators
import SipCalculator from "../../components/calculators/SipCalculator";
import EmiCalculator from "../../components/calculators/EmiCalculator";
import FdCalculator from "../../components/calculators/FdCalculator";
import RdCalculator from "../../components/calculators/RdCalculator";
import RetirementCalculator from "../../components/calculators/RetirementCalculator";
import GoalCalculator from "../../components/calculators/GoalCalculator";
import InflationCalculator from "../../components/calculators/InflationCalculator";

const calculators = [
  { name: "SIP", component: <SipCalculator /> },
  { name: "EMI", component: <EmiCalculator /> },
  { name: "FD", component: <FdCalculator /> },
  { name: "RD", component: <RdCalculator /> },
  { name: "Retirement", component: <RetirementCalculator /> },
  { name: "Goal", component: <GoalCalculator /> },
  { name: "Inflation", component: <InflationCalculator /> },
];

export default function Calculators() {
  const [active, setActive] = useState(0);

  return (
    <div className="min-h-screen relative font-poppins pb-30">
      {/* Background Glow */}
      <div
        className="absolute inset-0 z-0"
        style={{
          background: "linear-gradient(135deg, #ffffffff 0%, #FFFFFF 100%)",
        }}
      />

      <div className="relative z-10 pt-28 max-w-5xl mx-auto px-6">
        {/* Title */}
        <motion.h1
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          className="text-5xl md:text-6xl font-extrabold text-center mb-6"
        >
          FINANCE{" "}
          <span className="bg-gradient-to-r from-[#00FF7C] to-[#007755] bg-clip-text text-transparent">
            CALCULATORS
          </span>
        </motion.h1>
        <p className="text-center text-[#2F3E46] mb-12 max-w-2xl mx-auto">
          Explore easy-to-use tools for savings, loans, retirement and more.
          Choose a calculator below and start planning smarter!
        </p>

        {/* Tabs */}
        <div className="flex flex-wrap justify-center gap-3 mb-10">
          {calculators.map((calc, idx) => (
            <button
              key={idx}
              onClick={() => setActive(idx)}
              className={`px-5 py-2 rounded-2xl font-medium transition-all duration-300
                ${
                  active === idx
                    ? "bg-[#00FF7C] text-[#09332C] shadow-lg shadow-[#00FF7C]/30 scale-105"
                    : "bg-gray-200 text-gray-700 hover:bg-gray-300"
                }`}
            >
              {calc.name}
            </button>
          ))}
        </div>

        {/* Active Calculator Card */}
        <motion.div
          key={active}
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          className="bg-white shadow-md rounded-2xl p-8 border border-[#E7E7E3] hover:border-[#00FF7C]/50 hover:shadow-[#00FF7C]/20 transition"
        >
          {calculators[active].component}
        </motion.div>
      </div>
    </div>
  );
}
