import React, { useState } from 'react';
import {
    ChevronLeft, ChevronRight, Clock, BarChart3,
    Zap, Settings, ShieldCheck, AlertCircle,
    TrendingUp, HardDrive, Gauge
} from 'lucide-react';

const FleetSolutionsMatrix = () => {
    const [currentIndex, setCurrentIndex] = useState(0);

    const allCards = [
        {
            category: "UPTIME",
            problem: "Unplanned Downtime",
            solution: "Predictive Analytics",
            description: "AI-driven diagnostics to prevent on-road breakdowns.",
            icon: <Clock className="w-5 h-5 text-rose-500" />,
            metric: "99.9% AVAILABILITY",
            accent: "from-rose-500/20 to-transparent"
        },
        {
            category: "COST",
            problem: "Opex Volatility",
            solution: "Unified AMC",
            description: "Fixed-cost maintenance for multi-brand fleet assets.",
            icon: <BarChart3 className="w-5 h-5 text-blue-500" />,
            metric: "22% COST SAVING",
            accent: "from-blue-500/20 to-transparent"
        },
        {
            category: "BATTERY",
            problem: "Battery Decay",
            solution: "SOH Monitoring",
            description: "Real-time health tracking to extend EV asset life.",
            icon: <Zap className="w-5 h-5 text-amber-500" />,
            metric: "EXTENDED LIFE",
            accent: "from-amber-500/20 to-transparent"
        },
        {
            category: "DATA",
            problem: "Manual Logging",
            solution: "Cloud Ecosystem",
            description: "Paperless audits and digital service history ledgers.",
            icon: <HardDrive className="w-5 h-5 text-emerald-500" />,
            metric: "100% AUDIT READY",
            accent: "from-emerald-500/20 to-transparent"
        },
        {
            category: "HEALTH",
            problem: "Sensor Failure",
            solution: "Remote Telemetry",
            description: "Instant alerts for technical faults before they escalate.",
            icon: <Gauge className="w-5 h-5 text-indigo-500" />,
            metric: "REAL-TIME ALERTS",
            accent: "from-indigo-500/20 to-transparent"
        },
        {
            category: "SUPPORT",
            problem: "Regional Gaps",
            solution: "Pan-India Network",
            description: "Consistent service quality across 37+ major cities.",
            icon: <Settings className="w-5 h-5 text-purple-500" />,
            metric: "NATIONWIDE REACH",
            accent: "from-purple-500/20 to-transparent"
        }
    ];

    const cardsToShow = 3;
    const totalPages = Math.ceil(allCards.length / cardsToShow);
    const currentPage = Math.floor(currentIndex / cardsToShow) + 1;

    const handleNext = () => {
        if (currentIndex + cardsToShow < allCards.length) {
            setCurrentIndex(prev => prev + cardsToShow);
        }
    };

    const handlePrev = () => {
        if (currentIndex - cardsToShow >= 0) {
            setCurrentIndex(prev => prev - cardsToShow);
        }
    };

    return (
        <section className="bg-white py-20 px-4 font-sans antialiased">
            <div className="max-w-7xl mx-auto">

                {/* Header with Counter and Navigation */}
                <div className="flex flex-col md:flex-row justify-between items-end mb-12 gap-8 border-b border-slate-200 pb-8">
                    <div className="flex items-start gap-4">
                        <div className="h-12 w-1.5 bg-red-600 rounded-full mt-1" />
                        <div>
                            <h2 className="text-4xl font-black text-slate-900 tracking-tight mb-2">
                                Fleet Problem-Solution Matrix
                            </h2>
                            <p className="text-slate-500 font-medium">Institutional framework for high-performance EV operations.</p>
                        </div>
                    </div>

                    <div className="flex items-center gap-4">
                        <div className="flex items-center bg-white border border-slate-200 rounded-xl px-4 py-2 shadow-sm">
                            <span className="text-xs font-bold text-slate-400 uppercase tracking-tighter mr-3">Progress</span>
                            <div className="flex items-center gap-1">
                                <span className="text-sm font-bold text-red-600">{currentPage}</span>
                                <span className="text-slate-300">/</span>
                                <span className="text-sm font-bold text-slate-900">{totalPages}</span>
                            </div>
                        </div>

                        <div className="flex gap-2">
                            <button
                                onClick={handlePrev}
                                disabled={currentIndex === 0}
                                className="p-3 bg-white border border-slate-200 rounded-xl hover:bg-slate-50 disabled:opacity-30 disabled:cursor-not-allowed transition-all shadow-sm active:scale-95"
                            >
                                <ChevronLeft size={20} className="text-slate-700" />
                            </button>
                            <button
                                onClick={handleNext}
                                disabled={currentIndex + cardsToShow >= allCards.length}
                                className="p-3 bg-white border border-slate-200 rounded-xl hover:bg-slate-50 disabled:opacity-30 disabled:cursor-not-allowed transition-all shadow-sm active:scale-95"
                            >
                                <ChevronRight size={20} className="text-slate-700" />
                            </button>
                        </div>
                    </div>
                </div>

                {/* The Sliding Card Grid */}
                <div className="grid grid-cols-1 md:grid-cols-3 gap-8 transition-all duration-700">
                    {allCards.slice(currentIndex, currentIndex + cardsToShow).map((item, idx) => (
                        <div key={idx} className="flex flex-col rounded-[2.5rem] bg-white border border-slate-200 shadow-xl shadow-slate-200/50 overflow-hidden group transition-all duration-300 hover:-translate-y-1">

                            {/* Problem Section (Top) */}
                            <div className={`p-8 bg-gradient-to-b ${item.accent} flex flex-col h-full`}>
                                <div className="flex justify-between items-start mb-10">
                                    <div className="p-4 bg-white rounded-2xl shadow-md group-hover:scale-110 transition-transform duration-500">
                                        {item.icon}
                                    </div>
                                    <span className="text-[11px] font-black text-slate-400 uppercase tracking-[0.2em]">{item.category}</span>
                                </div>

                                <div className="space-y-3 mb-6">
                                    <div className="flex items-center gap-2 text-rose-500/80">
                                        <AlertCircle size={14} className="animate-pulse" />
                                        <span className="text-[10px] font-bold uppercase tracking-widest">Structural Pain Point</span>
                                    </div>
                                    <h4 className="text-2xl font-extrabold text-slate-900 leading-tight">
                                        {item.problem}
                                    </h4>
                                </div>
                            </div>

                            {/* Solution Section (Bottom) - UPDATED FOR HIGH CLARITY */}
                            <div className="bg-slate-900 p-8 text-white relative">
                                <div className="absolute top-0 left-8 right-8 h-[1px] bg-gradient-to-r from-transparent via-slate-700 to-transparent" />

                                <div className="flex items-center gap-2 text-emerald-400 mb-4">
                                    <ShieldCheck size={18} />
                                    <span className="text-[11px] font-black uppercase tracking-[0.15em]">Proprietary Solution</span>
                                </div>

                                {/* Highlighted White Title */}
                                <h5 className="text-xl font-bold mb-3 tracking-tight text-white transition-colors group-hover:text-emerald-50">
                                    {item.solution}
                                </h5>

                                {/* Highlighted White/Light Grey Description */}
                                <p className="text-slate-200 text-sm leading-relaxed mb-8 font-medium">
                                    {item.description}
                                </p>

                                {/* Metric Badge - High Contrast */}
                                <div className="inline-flex items-center gap-2 bg-white/10 border border-white/20 px-4 py-2 rounded-xl backdrop-blur-sm group-hover:bg-emerald-500/20 group-hover:border-emerald-500/30 transition-all">
                                    <TrendingUp size={14} className="text-emerald-400" />
                                    <span className="text-[10px] font-black tracking-widest text-white">
                                        {item.metric}
                                    </span>
                                </div>
                            </div>

                        </div>
                    ))}
                </div>
            </div>
        </section>
    );
};

export default FleetSolutionsMatrix;