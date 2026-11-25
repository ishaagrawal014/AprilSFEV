import React, { useState } from "react";

// 1. Updated tiers to reach 20,00,000
const investmentTiers = [
  250000, 500000, 750000, 1000000, 1250000, 1500000, 1750000, 2000000,
];

export default function WhyEv() {
  const [tierIndex, setTierIndex] = useState(0);
  const currentInvestment = investmentTiers[tierIndex];

  // Logic remains: ₹8,800 payout per ₹2.5L investment (4 vehicles)
  const monthlyPayout = (currentInvestment / 250000) * 8800;
  const total48Months = monthlyPayout * 48;
  const buyback = currentInvestment * 0.15;
  const totalReturns = total48Months + buyback;
  const vehicleCount = (currentInvestment / 250000) * 4;

  const data = [
    {
      metric: `Monthly rental payout (${vehicleCount} Vehicles)`,
      value: `₹ ${monthlyPayout.toLocaleString("en-IN")}/-`,
    },
    {
      metric: "Total rent over 48 months",
      value: `₹ ${total48Months.toLocaleString("en-IN")}/-`,
    },
    {
      metric: "15% Salvage value (after 48 months)",
      value: `₹ ${buyback.toLocaleString("en-IN")}/-`,
    },
    {
      metric: "Total Rental Returns + Salvage value",
      value: `₹ ${totalReturns.toLocaleString("en-IN")}/-`,
      highlight: true,
    },
    { metric: "Absolute rent returns (48 Months)", value: (
  <>
    84%<sup className="text-gray/90">*</sup>
  </>
) },
    { metric: "Absolute yearly rent returns", value: (
  <>
    21%<sup className="text-gray/90">*</sup>
  </>
) },

  ];

  return (
    <section id="calc" className="py-12 sm:py-16 bg-gray-50/30">
      <div className="max-w-4xl mx-auto px-4 sm:px-6">
        <div className="bg-white overflow-hidden rounded-2xl sm:rounded-3xl border border-gray-100 shadow-lg sm:shadow-xl">
          {/* Header */}
          <div className="flex items-center justify-between px-4 py-4 sm:px-8 sm:py-5 bg-blue-600 text-white">
            <h2 className="text-xs sm:text-sm font-bold tracking-[0.18em] text-white uppercase">
              SpeedForce EV Investment
            </h2>
            <span className="text-[9px] sm:text-[10px] font-semibold tracking-[0.2em] uppercase opacity-80">
              Projections
            </span>
          </div>

          {/* Slider row */}
          <div className="bg-blue-50/40 border-y border-blue-100 px-4 py-5 sm:px-8 sm:py-8">
            <div className="flex flex-col sm:flex-row sm:items-start sm:justify-between gap-4 sm:gap-6">
              {/* Slider + labels */}
              <div className="flex-1">
                <span className="text-[11px] sm:text-sm font-bold text-blue-900 block mb-3">
                  Adjust Investment Amount
                </span>
                <input
                  type="range"
                  min={0}
                  max={investmentTiers.length - 1}
                  step={1}
                  value={tierIndex}
                  onChange={(e) => setTierIndex(parseInt(e.target.value))}
                  className="w-full h-2 bg-blue-200 rounded-full appearance-none cursor-pointer accent-blue-600"
                />
                <div className="flex justify-between mt-3 px-0.5">
                  {investmentTiers.map((amt, idx) => (
                    <span
                      key={idx}
                      className={`text-[9px] font-bold ${
                        tierIndex === idx ? "text-blue-600" : "text-gray-400"
                      }`}
                    >
                      {amt >= 1000000 ? `${amt / 100000}L` : `${amt / 100000}L`}
                    </span>
                  ))}
                </div>
              </div>

              {/* Principal display */}
              <div className="text-right sm:min-w-[160px]">
                <div className="text-xl sm:text-2xl font-black text-blue-600 leading-tight">
                  ₹{currentInvestment.toLocaleString("en-IN")}
                </div>
                <span className="text-[9px] sm:text-[10px] text-gray-500 font-bold uppercase tracking-[0.18em]">
                  Principal Amount
                </span>
              </div>
            </div>
          </div>

          {/* Mobile cards */}
          <div className="block sm:hidden px-4 py-4 space-y-3">
            {data.map((item, index) => (
              <div
                key={index}
                className={`rounded-xl border ${
                  item.highlight
                    ? "border-blue-200 bg-blue-50/60"
                    : "border-gray-100 bg-gray-50/50"
                } px-4 py-3 flex items-center justify-between`}
              >
                <div className="pr-3">
                  <p
                    className={`text-[11px] font-medium ${
                      item.highlight ? "text-blue-900 italic" : "text-gray-600"
                    }`}
                  >
                    {item.metric}
                  </p>
                </div>
                <div className="text-right">
                  <p
                    className={`font-bold tracking-tight ${
                      item.highlight
                        ? "text-blue-700 text-sm"
                        : "text-gray-900 text-[13px]"
                    }`}
                  >
                    {item.value}
                  </p>
                </div>
              </div>
            ))}
          </div>

          {/* Desktop table */}
          <div className="hidden sm:block">
            <table className="w-full text-left border-collapse">
              <tbody>
                {data.map((item, index) => (
                  <tr
                    key={index}
                    className={`transition-colors ${
                      index % 2 === 0 ? "bg-white" : "bg-gray-50/30"
                    }`}
                  >
                    <td
                      className={`py-4 px-8 border-b border-gray-50 text-sm ${
                        item.highlight
                          ? "text-blue-900 font-bold italic"
                          : "text-gray-600 font-medium"
                      }`}
                    >
                      {item.metric}
                    </td>
                    <td
                      className={`py-4 px-8 text-right border-b border-gray-50 font-bold tracking-tight ${
                        item.highlight
                          ? "text-blue-600 text-xl"
                          : "text-gray-800 text-base"
                      }`}
                    >
                      {item.value}
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>

          {/* Footer strip */}
          <div className="bg-blue-50/40 py-3 sm:py-4 px-4 sm:px-8 flex flex-col sm:flex-row gap-2 sm:gap-0 justify-between items-start sm:items-center border-t border-blue-50">
            <span className="text-[9px] sm:text-[10px] text-blue-700 font-bold uppercase tracking-[0.2em] bg-blue-100/60 px-2 py-1 rounded">
              Interactive Returns Table
            </span>
            <p className="text-[9px] sm:text-[10px] text-gray-400 font-semibold italic">
              *GST &amp; TDS Applicable
            </p>
          </div>
        </div>
      </div>
    </section>
  );
}
