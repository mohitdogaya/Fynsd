import { useState } from "react";

export default function RdCalculator() {
  const [monthly, setMonthly] = useState(2000);
  const [rate, setRate] = useState(7);
  const [years, setYears] = useState(5);
  const [maturity, setMaturity] = useState(null);

  const calculate = () => {
    const months = years * 12;
    const i = rate / 100 / 12;
    const maturityValue =
      monthly * ((Math.pow(1 + i, months) - 1) / i) * (1 + i);
    setMaturity(maturityValue.toFixed(2));
  };

  return (
    <div>
      <h2 className="text-2xl font-bold mb-2 bg-gradient-to-r from-[#00FF7C] to-[#007755] bg-clip-text text-transparent">
        RD Calculator
      </h2>
      <p className="text-sm text-gray-600 mb-6">
        Calculate maturity amount of your Recurring Deposit.
      </p>

      <div className="space-y-4">
        <div>
          <label className="block text-sm mb-1">Monthly Deposit (₹)</label>
          <input
            type="number"
            value={monthly}
            onChange={(e) => setMonthly(+e.target.value)}
            className="w-full border rounded-xl px-3 py-2 focus:ring-2 focus:ring-[#00FF7C]"
          />
        </div>
        <div>
          <label className="block text-sm mb-1">Interest Rate (% per year)</label>
          <input
            type="number"
            value={rate}
            onChange={(e) => setRate(+e.target.value)}
            className="w-full border rounded-xl px-3 py-2 focus:ring-2 focus:ring-[#00FF7C]"
          />
        </div>
        <div>
          <label className="block text-sm mb-1">Time Period (Years)</label>
          <input
            type="number"
            value={years}
            onChange={(e) => setYears(+e.target.value)}
            className="w-full border rounded-xl px-3 py-2 focus:ring-2 focus:ring-[#00FF7C]"
          />
        </div>
        <button
          onClick={calculate}
          className="w-full bg-[#00FF7C] text-[#09332C] font-semibold py-2 rounded-2xl hover:bg-[#00e671]"
        >
          Calculate RD
        </button>

        {maturity && (
          <div className="mt-4 p-4 rounded-xl bg-[#F0FFF7] border border-[#00FF7C]/40 shadow">
            <p className="font-medium text-[#09332C]">
              Maturity Value:{" "}
              <span className="font-bold text-lg text-[#007755]">₹ {maturity}</span>
            </p>
          </div>
        )}
      </div>
    </div>
  );
}
