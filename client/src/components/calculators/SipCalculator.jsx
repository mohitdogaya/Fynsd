import { useState } from "react";

export default function SipCalculator() {
  const [monthly, setMonthly] = useState(1000);
  const [rate, setRate] = useState(12);
  const [years, setYears] = useState(10);
  const [future, setFuture] = useState(null);

  const calculate = () => {
    const months = years * 12;
    const i = rate / 12 / 100;
    const total = monthly * ((Math.pow(1 + i, months) - 1) / i) * (1 + i);
    setFuture(total.toFixed(2));
  };

  return (
    <div>
      {/* Title */}
      <h2 className="text-2xl font-bold mb-2 bg-gradient-to-r from-[#00FF7C] to-[#007755] bg-clip-text text-transparent">
        SIP Calculator
      </h2>
      <p className="text-sm text-gray-600 mb-6">
        Estimate the future value of your monthly SIP investments.
      </p>

      {/* Inputs */}
      <div className="space-y-4">
        <div>
          <label className="block text-sm font-medium mb-1">
            Monthly Investment (₹)
          </label>
          <input
            type="number"
            value={monthly}
            onChange={(e) => setMonthly(+e.target.value)}
            className="w-full border rounded-xl px-3 py-2 focus:ring-2 focus:ring-[#00FF7C] outline-none transition"
          />
        </div>

        <div>
          <label className="block text-sm font-medium mb-1">
            Expected Return (% per year)
          </label>
          <input
            type="number"
            value={rate}
            onChange={(e) => setRate(+e.target.value)}
            className="w-full border rounded-xl px-3 py-2 focus:ring-2 focus:ring-[#00FF7C] outline-none transition"
          />
        </div>

        <div>
          <label className="block text-sm font-medium mb-1">Time (Years)</label>
          <input
            type="number"
            value={years}
            onChange={(e) => setYears(+e.target.value)}
            className="w-full border rounded-xl px-3 py-2 focus:ring-2 focus:ring-[#00FF7C] outline-none transition"
          />
        </div>

        {/* Button */}
        <button
          onClick={calculate}
          className="w-full bg-[#00FF7C] text-[#09332C] font-semibold py-2 rounded-2xl hover:bg-[#00e671] shadow-md transition"
        >
          Calculate
        </button>

        {/* Result */}
        {future && (
          <div className="mt-4 p-4 rounded-xl bg-[#F0FFF7] border border-[#00FF7C]/40 shadow">
            <p className="font-medium text-[#09332C]">
              Future Value:{" "}
              <span className="font-bold text-lg text-[#007755]">₹ {future}</span>
            </p>
          </div>
        )}
      </div>
    </div>
  );
}
