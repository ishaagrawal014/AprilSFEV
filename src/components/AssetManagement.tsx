import React from "react";
import { MapPin, Truck, Wrench, Zap, BarChart3, Activity } from "lucide-react";
import { Button } from "@/components/ui/button";

const ProfessionalAssetManagement = () => {
    const features = [
        { icon: Truck, label: "Vehicle Selection" },
        { icon: BarChart3, label: "Fleet Leasing" },
        { icon: Wrench, label: "Service & Repairs" },
        { icon: MapPin, label: "Real-time Tracking" },
        { icon: Zap, label: "Charging & Hubs" },
    ];

    return (
        <section className="py-24 bg-white">
            <div className="container mx-auto px-6">
                <div className="grid lg:grid-cols-2 gap-16 items-center">

                    {/* Content Side */}
                    <div className="space-y-8">
                        <div className="space-y-4">
                            <h2 className="text-4xl md:text-5xl font-extrabold text-slate-900 tracking-tight">
                                Integrated EV <br />
                                <span className="text-emerald-600">Asset Management</span>
                            </h2>
                            <p className="text-lg text-slate-600 leading-relaxed max-w-xl">
                                Discover the benefits of a fully integrated asset management solution. Take charge of your EV fleet to drive your business ahead. Manage vehicle selection, leasing, service & repairs, real-time fleet monitoring, and charging & hubs.
                            </p>
                        </div>

                        {/* Feature Pills */}
                        <div className="flex flex-wrap gap-3">
                            {features.map((feature, index) => (
                                <div
                                    key={index}
                                    className="flex items-center gap-2 px-4 py-2.5 bg-slate-50 border border-slate-200 rounded-xl hover:border-emerald-200 hover:bg-emerald-50/30 transition-all cursor-default group"
                                >
                                    <feature.icon className="w-4 h-4 text-slate-500 group-hover:text-emerald-600" />
                                    <span className="text-sm font-semibold text-slate-700 group-hover:text-emerald-700">
                    {feature.label}
                  </span>
                                </div>
                            ))}
                        </div>

                        <div className="pt-4">
                            <Button className="bg-emerald-600 hover:bg-emerald-700 text-white px-10 py-7 rounded-2xl text-lg font-bold shadow-lg shadow-emerald-200 transition-transform active:scale-95">
                                Learn More
                            </Button>
                        </div>
                    </div>

                    {/* Map Visualization Side */}
                    <div className="relative">
                        {/* Soft decorative glow */}
                        <div className="absolute -inset-10 bg-emerald-100/50 blur-3xl rounded-full opacity-50" />

                        <div className="relative rounded-[2.5rem] border border-slate-200 bg-slate-50/50 p-4 shadow-2xl">
                            <div className="relative aspect-square md:aspect-video lg:aspect-square rounded-[2rem] overflow-hidden bg-white border border-slate-100 shadow-inner">

                                {/* Map Grid Pattern */}
                                <div className="absolute inset-0 opacity-[0.03]" style={{ backgroundImage: 'radial-gradient(#000 1.5px, transparent 0)', backgroundSize: '32px 32px' }} />

                                {/* SVG Map Lines */}
                                <svg className="absolute inset-0 w-full h-full" viewBox="0 0 400 400">
                                    <path
                                        d="M 50 320 Q 150 280 180 150 T 350 80"
                                        fill="none"
                                        stroke="#10b981"
                                        strokeWidth="2.5"
                                        strokeDasharray="8,6"
                                        strokeLinecap="round"
                                        className="opacity-40"
                                    />
                                    {/* Moving Asset */}
                                    <circle r="5" fill="#10b981" className="shadow-lg">
                                        <animateMotion dur="8s" repeatCount="indefinite" path="M 50 320 Q 150 280 180 150 T 350 80" />
                                    </circle>
                                </svg>

                                {/* Pulsing Location Markers */}
                                <div className="absolute top-1/4 left-1/3">
                  <span className="absolute flex h-6 w-6 -translate-x-1/2 -translate-y-1/2">
                    <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-emerald-400 opacity-20"></span>
                    <span className="relative inline-flex rounded-full h-3 w-3 bg-emerald-500 border-2 border-white"></span>
                  </span>
                                </div>

                                <div className="absolute bottom-1/3 right-1/4">
                  <span className="absolute flex h-6 w-6 -translate-x-1/2 -translate-y-1/2">
                    <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-slate-400 opacity-20"></span>
                    <span className="relative inline-flex rounded-full h-3 w-3 bg-slate-400 border-2 border-white"></span>
                  </span>
                                </div>

                                {/* Floating Central Info Card */}
                                <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-64 bg-white/90 backdrop-blur-md p-6 rounded-[1.5rem] shadow-2xl border border-slate-100">
                                    <div className="flex items-center gap-4 mb-5">
                                        <div className="w-12 h-12 bg-emerald-100 rounded-2xl flex items-center justify-center">
                                            <Activity className="w-6 h-6 text-emerald-600" />
                                        </div>
                                        <div>
                                            <p className="text-[10px] uppercase tracking-widest font-bold text-slate-400 leading-none mb-1">Fleet Status</p>
                                            <p className="text-lg font-extrabold text-slate-900 leading-none">Live Tracking</p>
                                        </div>
                                    </div>

                                    <div className="flex items-center justify-between border-t border-slate-100 pt-4">
                                        <div className="text-center">
                                            <p className="text-2xl font-black text-slate-900 leading-none">37+</p>
                                            <p className="text-[10px] uppercase font-bold text-slate-400 mt-1">Cities</p>
                                        </div>
                                        <div className="h-8 w-px bg-slate-100" />
                                        <div className="text-center">
                                            <p className="text-2xl font-black text-emerald-600 leading-none tracking-tight italic">Active</p>
                                            <p className="text-[10px] uppercase font-bold text-slate-400 mt-1">Status</p>
                                        </div>
                                    </div>
                                </div>

                            </div>
                        </div>
                    </div>

                </div>
            </div>
        </section>
    );
};

export default ProfessionalAssetManagement;