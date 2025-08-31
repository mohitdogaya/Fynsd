import { useState } from "react";

export default function EmiCalculator() {
  const [principal, setPrincipal] = useState(500000);
  const [rate, setRate] = useState(10);
  const [years, setYears] = useState(5);
  const [emi, setEmi] = useState(null);

  const calculate = () => {
    const months = years * 12;
    const monthlyRate = rate / 12 / 100;
    const emiValue =
      (principal * monthlyRate * Math.pow(1 + monthlyRate, months)) /
      (Math.pow(1 + monthlyRate, months) - 1);

    setEmi(emiValue.toFixed(2));
  };

  return (
    <div>
      {/* Title */}
      <h2 className="text-2xl font-bold mb-2 bg-gradient-to-r from-[#00FF7C] to-[#007755] bg-clip-text text-transparent">
        EMI Calculator
      </h2>
      <p className="text-sm text-gray-600 mb-6">
        Calculate your monthly loan repayment amount.
      </p>

      {/* Inputs */}
      <div className="space-y-4">
        <div>
          <label className="block text-sm font-medium mb-1">
            Loan Amount (₹)
          </label>
          <input
            type="number"
            value={principal}
            onChange={(e) => setPrincipal(+e.target.value)}
            className="w-full border rounded-xl px-3 py-2 focus:ring-2 focus:ring-[#00FF7C] outline-none transition"
          />
        </div>

        <div>
          <label className="block text-sm font-medium mb-1">
            Interest Rate (% per year)
          </label>
          <input
            type="number"
            value={rate}
            onChange={(e) => setRate(+e.target.value)}
            className="w-full border rounded-xl px-3 py-2 focus:ring-2 focus:ring-[#00FF7C] outline-none transition"
          />
        </div>

        <div>
          <label className="block text-sm font-medium mb-1">Loan Tenure (Years)</label>
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
          Calculate EMI
        </button>

        {/* Result */}
        {emi && (
          <div className="mt-4 p-4 rounded-xl bg-[#F0FFF7] border border-[#00FF7C]/40 shadow">
            <p className="font-medium text-[#09332C]">
              Monthly EMI:{" "}
              <span className="font-bold text-lg text-[#007755]">₹ {emi}</span>
            </p>
          </div>
        )}
      </div>
    </div>
  );
}
