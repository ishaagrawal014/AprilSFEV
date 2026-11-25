import React from 'react';
import {
    Car,
    Wrench,
    MapPin,
    BatteryCharging,
    ShieldCheck,
    Zap,
    CheckCircle2
} from 'lucide-react';

const EcosystemSection = () => {
    const features = [
        {
            title: "Vehicle Supply",
            description: "We provide high-performance EVs tailored for last-mile delivery needs, ready to deploy immediately.",
            icon: <Car className="w-6 h-6 text-blue-600" />,
            iconBg: "bg-blue-50"
        },
        {
            title: "Maintenance & Repair",
            description: "Zero downtime commitment. We handle all servicing, repairs, and spare parts management.",
            icon: <Wrench className="w-6 h-6 text-emerald-600" />,
            iconBg: "bg-emerald-50"
        },
        {
            title: "24/7 Tracking",
            description: "Real-time fleet visibility, route optimization, and driver behavior analytics at your fingertips.",
            icon: <MapPin className="w-6 h-6 text-indigo-600" />,
            iconBg: "bg-indigo-50"
        },
        {
            title: "Battery Management",
            description: "Advanced diagnostics to extend battery life and ensure maximum range for every delivery run.",
            icon: <BatteryCharging className="w-6 h-6 text-amber-600" />,
            iconBg: "bg-amber-50"
        },
        {
            title: "Insurance & Compliance",
            description: "We handle the paperwork. Comprehensive insurance coverage and full regulatory compliance included.",
            icon: <ShieldCheck className="w-6 h-6 text-slate-600" />,
            iconBg: "bg-slate-100"
        }
    ];

    return (
        /* Section Background changed to Light Gray (bg-slate-50) */
        <section className="py-24 bg-white relative overflow-hidden">
            <div className="absolute top-0 left-0 w-full h-full bg-[radial-gradient(#cbd5e1_1px,transparent_1px)] [background-size:40px_40px] opacity-20 pointer-events-none"></div>

            <div className="max-w-7xl mx-auto px-6 lg:px-8 relative z-10">

                {/* Section Header */}
                <div className="text-center max-w-3xl mx-auto mb-20">
                    <div className="inline-flex items-center space-x-2 bg-white px-4 py-1.5 rounded-full border border-slate-200 mb-6">
                        <span className="w-2 h-2 rounded-full bg-blue-600 animate-pulse"></span>
                        <span className="text-[11px] font-bold tracking-[0.1em] text-slate-600 uppercase">Speedforce Ecosystem</span>
                    </div>

                    <h2 className="text-6xl md:text-6xl font-black text-slate-900 tracking-tight mb-6">
                        Everything you need. <br />
                        <span className="text-green-600 text-6xl">Nothing you don't.</span>
                    </h2>

                    <p className="text-lg text-slate-500 leading-relaxed font-medium">
                        Running a fleet is complex. We simplify it by handling the entire operations lifecycle.
                    </p>
                </div>

                {/* Grid Layout */}
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 ">

                    {/* UPDATED FIRST BOX: Light Slate Background with Dark Text */}
                    <div className="relative group bg-white rounded-[2.5rem] p-10 shadow-lg flex flex-col justify-between transform transition-all duration-500 hover:-translate-y-2 border border-slate-200">
                        <div className="absolute top-0 right-0 -mr-10 -mt-10 w-40 h-40 bg-blue-600/5 rounded-full blur-3xl group-hover:bg-blue-600/10 transition-all"></div>

                        <div className="relative z-10">
                            <div className="w-14 h-14 bg-blue-600 rounded-2xl flex items-center justify-center mb-10 shadow-lg shadow-blue-500/20">
                                <Zap className="w-7 h-7 text-white fill-white" />
                            </div>

                            {/* Dark Heading for Light Background */}
                            <h3 className="text-3xl font-bold text-slate-900 mb-4 tracking-tight">
                                Total Control
                            </h3>

                            {/* Dark Slate Text for Readability */}
                            <p className="text-slate-600 text-lg leading-relaxed font-medium">
                                A proprietary ecosystem where hardware and software converge to give you 100% fleet visibility.
                            </p>
                        </div>

                        <div className="relative z-10 mt-12 pt-8 border-t border-slate-200">
                            <div className="flex items-center gap-3 text-emerald-600 font-black text-xs uppercase tracking-widest">
                                <CheckCircle2 size={18} />
                                <span>500+ Pincodes Covered</span>
                            </div>
                        </div>
                    </div>

                    {/* White Feature Cards */}
                    {features.map((feature, index) => (
                        <div
                            key={index}
                            className="group bg-white rounded-[2.5rem] p-10 shadow-sm border border-slate-200 hover:shadow-2xl hover:border-blue-100 transition-all duration-500 flex flex-col items-start hover:-translate-y-2"
                        >
                            <div className={`w-14 h-14 ${feature.iconBg} rounded-2xl flex items-center justify-center mb-10 transition-transform duration-500 group-hover:rotate-6`}>
                                {feature.icon}
                            </div>
                            <h3 className="text-2xl font-bold text-slate-900 mb-4 tracking-tight group-hover:text-blue-600 transition-colors">
                                {feature.title}
                            </h3>
                            <p className="text-slate-500 leading-relaxed font-medium">
                                {feature.description}
                            </p>
                        </div>
                    ))}

                </div>

                {/* Bottom Footer Text */}
                <div className="mt-24 text-center">
                    <p className="text-slate-400 font-bold text-[10px] uppercase tracking-[0.3em] opacity-60">

                    </p>
                </div>
            </div>
        </section>
    );
};

export default EcosystemSection;