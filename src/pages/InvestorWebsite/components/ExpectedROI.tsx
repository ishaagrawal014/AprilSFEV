import React, { useMemo, useState } from "react";
import {
  FaArrowUp,
  FaBoxOpen,
  FaCheckCircle,
  FaExchangeAlt,
  FaRupeeSign,
  FaShieldAlt,
  FaStar,
  FaTimesCircle,
} from "react-icons/fa";

/* ---------------- DATA ---------------- */

const preCalculatedReturns: any = {
  "250000": { speedforceev: 459900, fixeddeposits: 15000, mutualfunds: 32500, preciousmetal: 20000 },
  "500000": { speedforceev: 919800, fixeddeposits: 30000, mutualfunds: 65000, preciousmetal: 40000 },
  "750000": { speedforceev: 1379700, fixeddeposits: 45000, mutualfunds: 97500, preciousmetal: 60000 },
  "1000000": { speedforceev: 1840000, fixeddeposits: 60000, mutualfunds: 130000, preciousmetal: 80000 },
};

const investmentOptions = [250000, 500000, 750000, 1000000];

const assetClasses = [
  {
    name: "Speed Force EV",
    percentage: "21%",
    color: "#1d853e",
    recommended: true,
    key: "speedforceev",
    features: { flexibility: "High", assetBacked: true, risk: "Low", income: true },
  },
  {
    name: "Fixed Deposits",
    percentage: "6%",
    color: "#4bc0c0",
    recommended: false,
    key: "fixeddeposits",
    features: { flexibility: "Low", assetBacked: false, risk: "Low", income: false },
  },
  {
    name: "Mutual Funds",
    percentage: "13%",
    color: "#2689ff",
    recommended: false,
    key: "mutualfunds",
    features: { flexibility: "Moderate", assetBacked: false, risk: "High", income: false },
  },
  {
    name: "Precious Metal",
    percentage: "8%",
    color: "#ff6384",
    recommended: false,
    key: "preciousmetal",
    features: { flexibility: "None", assetBacked: true, risk: "Low", income: false },
  },
];

const featureRows = [
  { key: "return", label: "Avg. Return (₹)", icon: <FaArrowUp /> },
  { key: "flexibility", label: "Flexibility", icon: <FaExchangeAlt /> },
  { key: "assetBacked", label: "Asset Backed", icon: <FaBoxOpen /> },
  { key: "risk", label: "Risk", icon: <FaShieldAlt /> },
  { key: "income", label: "Monthly Income", icon: <FaRupeeSign /> },
];

/* ---------------- HELPERS ---------------- */

const renderBool = (value: boolean) =>
  value ? <FaCheckCircle className="text-green-600" /> : <FaTimesCircle className="text-red-500" />;

/* ---------------- COMPONENT ---------------- */

export default function CombinedInvestmentView() {
  const [investment, setInvestment] = useState(investmentOptions[0]);

  const returns = useMemo(
    () => preCalculatedReturns[investment.toString()],
    [investment]
  );

  return (
    <section className="bg-[#f5f9ff] py-16">
      <div className="mx-auto max-w-6xl px-4">

        {/* HEADER */}
        <div className="text-center max-w-3xl mx-auto">
          <span className="inline-block mb-3 rounded-full bg-white px-4 py-1 text-sm font-semibold shadow">
            Investment View • Comparison
          </span>
          <h2 className="text-3xl font-bold">
            Investment Range & <span className="text-[#258afe]">Returns</span>
          </h2>
          <p className="mt-3 text-gray-600">
            Compare projected annual returns across asset classes.
          </p>
        </div>

        {/* SLIDER */}
        <div className="mt-10 bg-white rounded-2xl p-6 shadow">
          <input
            type="range"
            min={0}
            max={investmentOptions.length - 1}
            value={investmentOptions.indexOf(investment)}
            onChange={(e) => setInvestment(investmentOptions[+e.target.value])}
            className="w-full accent-[#258afe]"
          />
          <div className="mt-4 text-center text-lg font-bold">
            ₹{investment.toLocaleString("en-IN")}
          </div>
        </div>

        {/* DESKTOP TABLE */}
        <div className="hidden lg:block mt-12 bg-white rounded-2xl p-6 shadow">
          <div className="grid grid-cols-5 gap-2 text-center">
            <div />
            {assetClasses.map((a) => (
              <div key={a.name} className="font-bold">
                <span style={{ color: a.color }}>{a.name}</span>
                {a.recommended && (
                  <div className="mt-1 flex justify-center gap-1 text-xs bg-green-600 text-white rounded-full px-2 py-1">
                    <FaStar /> Recommended
                  </div>
                )}
              </div>
            ))}

            {featureRows.map((row) => (
              <React.Fragment key={row.key}>
                <div className="font-semibold flex items-center gap-2 justify-start">
                  {row.icon} {row.label}
                </div>

                {assetClasses.map((asset) => (
                  <div key={asset.name}>
                    {row.key === "return" ? (
                      <span className="font-bold">
                        ₹{returns[asset.key].toLocaleString("en-IN")}
                      </span>
                    ) : typeof asset.features[row.key as keyof typeof asset.features] === "boolean" ? (
                      renderBool(asset.features[row.key as keyof typeof asset.features] as boolean)
                    ) : (
                      asset.features[row.key as keyof typeof asset.features]
                    )}
                  </div>
                ))}
              </React.Fragment>
            ))}
          </div>
        </div>

        {/* MOBILE CARDS */}
        <div className="mt-10 grid gap-6 lg:hidden">
          {assetClasses.map((asset) => (
            <div key={asset.name} className="bg-white rounded-2xl p-5 shadow">
              <div className="flex justify-between mb-4">
                <h3 className="font-bold" style={{ color: asset.color }}>
                  {asset.name}
                </h3>
                <span>{asset.percentage}</span>
              </div>

              <div className="space-y-3 text-sm">
                <div className="flex justify-between">
                  <span>Avg Return</span>
                  <span className="font-bold">
                    ₹{returns[asset.key].toLocaleString("en-IN")}
                  </span>
                </div>
                <div className="flex justify-between">
                  <span>Flexibility</span>
                  <span>{asset.features.flexibility}</span>
                </div>
                <div className="flex justify-between">
                  <span>Asset Backed</span>
                  {renderBool(asset.features.assetBacked)}
                </div>
                <div className="flex justify-between">
                  <span>Risk</span>
                  <span>{asset.features.risk}</span>
                </div>
                <div className="flex justify-between">
                  <span>Monthly Income</span>
                  {renderBool(asset.features.income)}
                </div>
              </div>
            </div>
          ))}
        </div>

      </div>
    </section>

    
  );
  
}
