import React, { useState } from "react";
import {
    FaArrowUp,
    FaBoxOpen,
    FaCheckCircle,
    FaRupeeSign,
    FaShieldAlt,
    FaStar,
    FaTimesCircle,
    FaRecycle,
    FaChartLine,
} from "react-icons/fa";

import CalcSFEV from "@/pages/InvestorWebsite/pages/CalcSFEV";

const investmentPerBike = 250000;
const investmentOptions = [
    250000, 500000, 750000, 1000000, 1250000, 1500000, 1750000, 2000000, 2250000, 2500000,
];

// ✅ PRE-CALCULATED ARRAYS - Just update these numbers
const speedForceEVReturns = [52500,105000,157500,210000,262500,315000,367500,420000,472500,525000];
const speedForceEVTotal4Yr = [459900,919800,1379700,1839600,2299500,2759400,3219300,3679200,4139100,4599000];

// ✅ Fixed Deposits Arrays (6% rate)
const fixedDepositsReturns = [15000,30000,45000,60000,75000,90000,105000,120000,135000,150000];
const fixedDepositsTotal4Yr = [310000, 620000, 930000, 1240000, 1550000, 1860000, 2170000, 2480000, 2790000, 3100000];

// ✅ Mutual Funds Arrays (13% rate)  
const mutualFundsReturns = [32500,65000,97500,130000,162500,195000,227500,260000,292500,325000];
const mutualFundsTotal4Yr = [380000, 760000, 1140000, 1520000, 1900000, 2280000, 2660000, 3040000, 3420000, 3800000];

// ✅ Precious Metals Arrays (8% rate)
const preciousMetalsReturns = [20000,40000,60000,80000,100000,120000,140000,160000,180000,200000];
const preciousMetalsTotal4Yr = [330000, 660000, 990000, 1320000, 1650000, 1980000, 2310000, 2640000, 2970000, 3300000];

type AssetFeatureKey =
    | "return"
    | "assetBacked"
    | "risk"
    | "income"
    | "totalReturn4Yr";

const assetClasses = [
    {
        name: "Speed Force EV",
        color: "#1d853e",
        Recommended: true,
         percentage: (
            <>
                21 %<sup className=" text-white/90">*</sup>
            </>
        ),
        assetKey: "speedForceEV",
        features: {
            salvageValue: "15%",
            assetBacked: true,
            risk: "Low",
            income: true,
        },
    },
    {
        name: "Fixed Deposits",
        percentage: (
            <>
                6 %<sup className=" text-gray/90">*</sup>
            </>
        ),
        color: "#4bc0c0",
        Recommended: false,
        assetKey: "fixedDeposits",
        features: {
            salvageValue: "0%",
            assetBacked: false,
            risk: "Low",
            income: false,
        },
    },
    {
        name: "Mutual Funds",
        percentage: (
            <>
                13 %<sup className=" text-gray/90">*</sup>
            </>
        ),
        color: "#2689ff",
        Recommended: false,
        assetKey: "mutualFunds",
        features: {
            salvageValue: "0%",
            assetBacked: false,
            risk: "High",
            income: false,
        },
    },
    {
        name: "Precious Metals",
       percentage: (
            <>
                8 %<sup className=" text-gray/90">*</sup>
            </>
        ),
        color: "#ff6384",
        Recommended: false,
        assetKey: "preciousMetals",
        features: {
            salvageValue: "0%",
            assetBacked: true,
            risk: "Low",
            income: false,
        },
    },
];

const featureRows: { key: AssetFeatureKey; label: string; icon: JSX.Element }[] = [
    { key: "return", label: "Average Return / Yr.", icon: <FaArrowUp className="text-[#258afe]" /> },
    { key: "assetBacked", label: "Asset Backed", icon: <FaBoxOpen className="text-[#1d853e]" /> },
    { key: "risk", label: "Risk", icon: <FaShieldAlt className="text-[#ff6384]" /> },
    { key: "income", label: "Monthly Income", icon: <FaRupeeSign className="text-[#1d853e]" /> },
    { key: "totalReturn4Yr", label: "Total Absolute 4yr Return", icon: <FaChartLine className="text-[#258afe]" /> },
];

const renderFeatureValue = (key: AssetFeatureKey, value: any) => {
    if (key === "income" || key === "assetBacked") {
        if (value === true) return <FaCheckCircle className="text-[#1d853e] text-lg" title="Yes" />;
        if (value === false) return <FaTimesCircle className="text-[#ff6384] text-lg" title="No" />;
    }
    return <span className="text-sm font-bold">{value}</span>;
};

import vehicleIcon from '/images/Wolf_White_Red.png'; // Adjust path

const CombinedInvestmentView = () => {
    const [investmentAmount, setInvestmentAmount] = useState(investmentOptions[0]);
    const [showAllAssets, setShowAllAssets] = useState(false);
    const isContactUs = investmentAmount > 2000000;
    const currentIndex = investmentOptions.indexOf(investmentAmount);

    // ✅ UNIVERSAL ARRAY LOOKUP - Works for ALL assets
    const getPreCalculatedValue = (assetKey: string, rowKey: AssetFeatureKey) => {
    if (isContactUs || currentIndex === -1) return <span className="text-sm font-bold">Contact Us</span>;

    const arrays: Record<string, Record<string, number[]>> = {
        speedForceEV: { return: speedForceEVReturns, totalReturn4Yr: speedForceEVTotal4Yr },
        fixedDeposits: { return: fixedDepositsReturns, totalReturn4Yr: fixedDepositsTotal4Yr },
        mutualFunds: { return: mutualFundsReturns, totalReturn4Yr: mutualFundsTotal4Yr },
        preciousMetals: { return: preciousMetalsReturns, totalReturn4Yr: preciousMetalsTotal4Yr },
    };

    const assetArrays = arrays[assetKey];
    if (assetArrays && assetArrays[rowKey]) {
        const amount = assetArrays[rowKey][currentIndex]?.toLocaleString("en-IN");
        const isSpeedForceEV = assetKey === "speedForceEV";
        const isRentLabel = ["return", "totalReturn4Yr"].includes(rowKey);

        return (
            <div className="flex flex-col items-center gap-1 text-center">
                <span className="text-base font-extrabold flex items-center justify-center">
                    <FaRupeeSign className="inline h-4 w-4 mr-1" />
                    {amount}
                </span>
                {isSpeedForceEV && isRentLabel && (
                    <span className="text-xs text-gray-500 font-medium">(Rent)</span>
                )}
            </div>
        );
    }
    return null;
};
    return (
        <section id="investment" className="bg-gradient-to-br from-blue-50 to-cyan-50 py-20">
            <div className="mx-auto max-w-6xl px-4">
                <div className="flex flex-wrap justify-center text-center">
                    <div className="w-full lg:w-2/3">
                        <div className="mb-4 inline-flex items-center justify-center rounded-full bg-white px-5 py-2 text-sm font-semibold text-[#132644] shadow-lg">
                            Investment View • Comparison
                        </div>
                        <h2 className="text-3xl font-bold text-[#050505] sm:text-4xl">
                            4-Year Projection & <span className="text-[#258afe]">Analysis</span>
                        </h2>
                    </div>
                </div>

                <div className="mt-12 flex flex-wrap justify-center">
                    <div className="flex w-full lg:w-5/6">
                        <div className="w-full rounded-3xl border border-[#e1e7f5] bg-white p-6 sm:p-8 shadow-xl">
                            <h3 className="text-xl font-bold text-[#050505] mb-6 text-center border border-[#e1e7f5] bg-[#f0f6ff] rounded-xl p-4">
                                Select Your Investment Tier
                            </h3>

                            {/* ✅ TWO SYNCED SLIDERS WITH SAME STATE */}
                            {/* ✅ TWO SLIDERS STACKED VERTICALLY + TWO DISPLAY BOXES */}
<div className="mt-4 space-y-6">
  {/* First Slider + First Display */}
  <div className="flex flex-col md:flex-row md:items-center gap-4">
    <div className="flex-1">
      <div className="text-sm font-semibold mb-2 text-[#050505]">Select Investment Amount</div>
      <input
        type="range"
        className="w-full accent-[#258afe]"
        min={0}
        max={investmentOptions.length - 2}
        step={1}
        value={investmentOptions.indexOf(investmentAmount)}
        onChange={(e) => setInvestmentAmount(investmentOptions[Number(e.target.value)])}
      />
    </div>
    <div className="w-full md:w-1/3">
      <div className="rounded-2xl border border-slate-700/70 bg-[#f0f6ff] py-3 text-center text-lg font-bold text-[#132644]">
        {isContactUs ? "Contact Us" : `₹${investmentAmount.toLocaleString("en-IN")}`}
      </div>
    </div>
  </div>

  {/* Second Slider + Second Display */}
<div className="flex flex-col md:flex-row md:items-center gap-4">
  <div className="flex-1">
    <div className="text-sm font-semibold mb-2 text-[#050505]">Select Quantity of Vehicles</div>
    <input
      type="range"
      className="w-full accent-[#258afe]"
      min={0}
      max={investmentOptions.length - 2}
      step={1}
      value={investmentOptions.indexOf(investmentAmount)}  
      onChange={(e) => setInvestmentAmount(investmentOptions[Number(e.target.value)])}  
    />
  </div>
  <div className="w-full md:w-1/3">
    <div className="flex items-center justify-center gap-2 rounded-2xl border border-slate-700/70 bg-[#f0f6ff] py-3 px-4 text-lg font-bold text-[#132644]">
      {isContactUs ? (
        "Contact Us"
      ) : (
        <>
          {/* SAFE VEHICLE ICON - SVG fallback */}
           <img src={vehicleIcon} alt="Vehicle" className="w-12 h-auto" />
          <span>x {Math.floor(investmentAmount / investmentPerBike * 4)}</span>
        </>
      )}
    </div>
  </div>
</div>
</div>

                            <div className="mt-12">
                                {/* DESKTOP VIEW */}
                                <div className="hidden rounded-xl bg-white p-6 lg:block shadow-md border border-[#e1e7f5]">
                                    <div className="grid gap-2" style={{ gridTemplateColumns: `minmax(140px, 1fr) repeat(4, minmax(110px, 1fr))` }}>
                                        <div />
                                        {assetClasses.map((asset) => (
                                            <div key={asset.name} className="flex flex-col items-center gap-1 rounded-xl px-2 py-1 text-center text-sm font-semibold">
                                                <span className="text-base font-bold" style={{ color: asset.color }}>{asset.name}</span>
                                                {asset.Recommended ? (
                                                    <span className="flex items-center gap-1 font-bold rounded-full bg-[#1d853e] px-2 py-[2px] text-[10px] text-white uppercase whitespace-nowrap">
                                                        <FaStar size={8} />  {asset.percentage}
                                                    </span>
                                                ) : (
                                                    <span className="text-xs font-medium text-gray-500">{asset.percentage}</span>
                                                )}
                                            </div>
                                        ))}

                                        {featureRows.map((row, rowIndex) => {
                                            const rowBgColor = rowIndex % 2 === 0 ? "#f0f6ff" : "#edf7f7";
                                            return (
                                                <React.Fragment key={row.key}>
                                                    <div className="flex items-center gap-3 rounded-xl px-3 text-sm font-bold py-2" style={{ background: rowBgColor, color: "#132644" }}>
                                                        <span className="text-lg">{row.icon}</span>
                                                        {row.label}
                                                    </div>

                                                    {assetClasses.map((asset) => {
                                                        const isEV = asset.name === "Speed Force EV";
                                                        const value = asset.features[row.key];

                                                        let displayValue;
                                                        if (["return", "totalReturn4Yr"].includes(row.key)) {
                                                            displayValue = getPreCalculatedValue(asset.assetKey, row.key);
                                                        } else {
                                                            displayValue = renderFeatureValue(row.key, value);
                                                        }

                                                        return (
                                                            <div key={`${asset.name}-${row.key}`} className="flex items-center justify-center rounded-xl px-2 text-center text-sm py-2 font-bold" style={{ background: rowBgColor, color: isEV && row.key !== 'risk' ? "#1d853e" : "#505050" }}>
                                                                {displayValue}
                                                            </div>
                                                        );
                                                    })}
                                                </React.Fragment>
                                            );
                                        })}
                                    </div>
                                    <div className="mt-6 text-center text-sm font-semibold text-[#132644]">
                                        *All values are pre-calculated. Update arrays at top to change numbers instantly.
                                    </div>
                                </div>

                                {/* MOBILE VIEW - Show Speed Force EV first, others on button click */}
                                <div className="mt-8 lg:hidden">
                                    <div className="space-y-6">
                                        {assetClasses
                                            .filter((asset) => showAllAssets || asset.name === "Speed Force EV")
                                            .map((asset) => (
                                                <div
                                                    key={asset.name}
                                                    className="rounded-2xl border border-[#e1e7f5] bg-white p-5 shadow-md"
                                                >
                                                    {/* Header */}
                                                    <div className="flex items-center justify-between mb-4">
                                                        <div>
                                                            <h3
                                                                className="text-lg font-bold"
                                                                style={{ color: asset.color }}
                                                            >
                                                                {asset.name}
                                                            </h3>
                                                            <p className="text-sm text-gray-500">{asset.percentage}</p>
                                                        </div>

                                                        {asset.Recommended && (
                                                            <span className="flex items-center gap-1 rounded-full bg-[#1d853e] px-3 py-1 text-[10px] font-bold text-white uppercase">
                                                                <FaStar size={10} />
                                                                Recommended
                                                            </span>
                                                        )}
                                                    </div>

                                                    {/* Features */}
                                                    <div className="space-y-3">
                                                        {featureRows.map((row) => {
                                                            let value;

                                                            if (row.key === "return" || row.key === "totalReturn4Yr") {
                                                                value = getPreCalculatedValue(asset.assetKey, row.key);
                                                            } else {
                                                                value = renderFeatureValue(
                                                                    row.key,
                                                                    asset.features[row.key]
                                                                );
                                                            }

                                                            return (
                                                                <div
                                                                    key={row.key}
                                                                    className="flex items-center justify-between border-b border-dashed border-gray-200 pb-2 last:border-none"
                                                                >
                                                                    <div className="flex items-center gap-2 text-sm font-semibold text-[#132644]">
                                                                        {row.icon}
                                                                        {row.label}
                                                                    </div>
                                                                    <div className="text-sm font-bold text-right">
                                                                        {value}
                                                                    </div>
                                                                </div>
                                                            );
                                                        })}
                                                    </div>
                                                </div>
                                            ))}
                                    </div>

                                    {/* Button to toggle other investments */}
                                    {!showAllAssets ? (
                                        <div className="mt-6 text-center">
                                            <button
                                                onClick={() => setShowAllAssets(true)}
                                                className="inline-flex items-center gap-2 rounded-full bg-[#258afe] px-6 py-3 text-sm font-bold text-white shadow-lg hover:bg-[#1d6fd4] transition-colors active:scale-95"
                                            >
                                                <FaChartLine />
                                                Compare with Other Investments
                                            </button>
                                        </div>
                                    ) : (
                                        <div className="mt-6 text-center">
                                            <button
                                                onClick={() => setShowAllAssets(false)}
                                                className="inline-flex items-center gap-2 rounded-full bg-gray-600 px-6 py-3 text-sm font-bold text-white shadow-lg hover:bg-gray-700 transition-colors active:scale-95"
                                            >
                                                <FaTimesCircle />
                                                Hide Comparisons
                                            </button>
                                        </div>
                                    )}
                                    
                                </div>
                                
                            </div>
                            
                        </div>
                        
                    </div>
                </div>
                <CalcSFEV />
            </div>
            <div className="mt-8 flex flex-wrap gap-4 justify-center">
  <a
    href="#contact"
    className="px-6 py-3 bg-blue-500 text-white font-semibold rounded-full hover:bg-blue-600 transition-colors"
  >
    Partner with Us
  </a>
</div>
        </section>
    );
};

export default CombinedInvestmentView;
