import { useState } from "react";

export default function RetirementCalculator() {
  const [currentAge, setCurrentAge] = useState(25);
  const [retirementAge, setRetirementAge] = useState(60);
  const [monthlyExpense, setMonthlyExpense] = useState(30000);
  const [inflation, setInflation] = useState(6);
  const [corpus, setCorpus] = useState(null);

  const calculate = () => {
    const years = retirementAge - currentAge;
    const futureExpense = monthlyExpense * Math.pow(1 + inflation / 100, years);
    const requiredCorpus = futureExpense * 12 * 20; // 20 years retirement
    setCorpus(requiredCorpus.toFixed(2));
  };

  return (
    <div>
      <h2 className="text-2xl font-bold mb-2 bg-gradient-to-r from-[#00FF7C] to-[#007755] bg-clip-text text-transparent">
        Retirement Calculator
      </h2>
      <p className="text-sm text-gray-600 mb-6">
        Estimate the retirement corpus you need.
      </p>

      <div className="space-y-4">
        <div>
          <label className="block text-sm mb-1">Current Age</label>
          <input
            type="number"
            value={currentAge}
            onChange={(e) => setCurrentAge(+e.target.value)}
            className="w-full border rounded-xl px-3 py-2 focus:ring-2 focus:ring-[#00FF7C]"
          />
        </div>
        <div>
          <label className="block text-sm mb-1">Retirement Age</label>
          <input
            type="number"
            value={retirementAge}
            onChange={(e) => setRetirementAge(+e.target.value)}
            className="w-full border rounded-xl px-3 py-2 focus:ring-2 focus:ring-[#00FF7C]"
          />
        </div>
        <div>
          <label className="block text-sm mb-1">Current Monthly Expense (₹)</label>
          <input
            type="number"
            value={monthlyExpense}
            onChange={(e) => setMonthlyExpense(+e.target.value)}
            className="w-full border rounded-xl px-3 py-2 focus:ring-2 focus:ring-[#00FF7C]"
          />
        </div>
        <div>
          <label className="block text-sm mb-1">Inflation Rate (% per year)</label>
          <input
            type="number"
            value={inflation}
            onChange={(e) => setInflation(+e.target.value)}
            className="w-full border rounded-xl px-3 py-2 focus:ring-2 focus:ring-[#00FF7C]"
          />
        </div>
        <button
          onClick={calculate}
          className="w-full bg-[#00FF7C] text-[#09332C] font-semibold py-2 rounded-2xl hover:bg-[#00e671]"
        >
          Calculate
        </button>

        {corpus && (
          <div className="mt-4 p-4 rounded-xl bg-[#F0FFF7] border border-[#00FF7C]/40 shadow">
            <p className="font-medium text-[#09332C]">
              Required Retirement Corpus:{" "}
              <span className="font-bold text-lg text-[#007755]">₹ {corpus}</span>
            </p>
          </div>
        )}
      </div>
    </div>
  );
}
