import { useState } from "react";

export default function InflationCalculator() {
  const [amount, setAmount] = useState(100000);
  const [rate, setRate] = useState(6);
  const [years, setYears] = useState(10);
  const [futureValue, setFutureValue] = useState(null);

  const calculate = () => {
    const value = amount / Math.pow(1 + rate / 100, years);
    setFutureValue(value.toFixed(2));
  };

  return (
    <div>
      <h2 className="text-2xl font-bold mb-2 bg-gradient-to-r from-[#00FF7C] to-[#007755] bg-clip-text text-transparent">
        Inflation Calculator
      </h2>
      <p className="text-sm text-gray-600 mb-6">
        Estimate future value of money after inflation.
      </p>

      <div className="space-y-4">
        <div>
          <label className="block text-sm mb-1">Amount (₹)</label>
          <input
            type="number"
            value={amount}
            onChange={(e) => setAmount(+e.target.value)}
            className="w-full border rounded-xl px-3 py-2 focus:ring-2 focus:ring-[#00FF7C]"
          />
        </div>
        <div>
          <label className="block text-sm mb-1">Inflation Rate (% per year)</label>
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
          Calculate
        </button>

        {futureValue && (
          <div className="mt-4 p-4 rounded-xl bg-[#F0FFF7] border border-[#00FF7C]/40 shadow">
            <p className="font-medium text-[#09332C]">
              Future Value of Money:{" "}
              <span className="font-bold text-lg text-[#007755]">₹ {futureValue}</span>
            </p>
          </div>
        )}
      </div>
    </div>
  );
}
