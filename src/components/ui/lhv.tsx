import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import {
    Zap,
    Shield,
    ArrowUpRight,
    ChevronLeft,
    ChevronRight,
} from "lucide-react";

// ---------------- DATA ----------------
const fleetData = {
    lowSpeed: [
        {
            id: "ls_group",
            type: "LOW SPEED",
            slides: [
                { name: "GLOB", speed: "25 km/h", range: "70 km", image: "/images/bike_glob.jpg" },
                { name: "Gen Next Nanu", speed: "25 km/h", range: "70 km", image: "/images/bike_Gen Next Nanu.jpg" },
                { name: "Wolf", speed: "25 km/h", range: "70 km", image: "/images/bike_wolf.jpg" },
            ],
        },
    ],
    highSpeed: [
        {
            id: "hs_group",
            type: "HIGH SPEED",
            slides: [
                { name: "GEN Next Nanu Eco", speed: "45 km/h", range: "100 km", image: "/images/bike_Gen Next Nanu Eco.jpg" },
                { name: "Wolf Eco", speed: "45 km/h", range: "100 km", image: "/images/bike_wolf eco.jpg" },
            ],
        },
    ],
    threeWheelers: [
        { id: 3, name: "CARGO", speed: "55 km/h", range: "150 km", type: "L5 CARGO", image: "/images/cargo.png" },
        { id: 4, name: "PASSENGER", speed: "60 km/h", range: "160 km", type: "L5 PASSENGER", image: "/images/passener.png" },
    ],
};

// ---------------- SLIDING CARD ----------------
const SlidingVehicleCard = ({ category }) => {
    const navigate = useNavigate();
    const [activeIndex, setActiveIndex] = useState(0);

    const currentVehicle = category.slides[activeIndex];
    const isLow = category.type === "LOW SPEED";

    const nextSlide = () => setActiveIndex((prev) => (prev + 1) % category.slides.length);
    const prevSlide = () => setActiveIndex((prev) => (prev - 1 + category.slides.length) % category.slides.length);

    const handleConfigure = () => {
        const params = new URLSearchParams({
            vehicle: currentVehicle.name,
            type: category.type,
        }).toString();
        navigate(`/contact?${params}`);
    };

    return (
        <div className="bg-white border border-slate-200 rounded-[2rem] md:rounded-[2.5rem] p-5 md:p-8 flex flex-col hover:shadow-xl transition-all duration-300 h-full">
            {/* Top Section */}
            <div className="flex justify-between items-start mb-4 md:mb-6">
                <span className={`text-[9px] md:text-[10px] font-black px-3 py-1 md:px-4 md:py-1.5 rounded-full border uppercase tracking-widest ${
                    isLow ? "bg-blue-50 text-blue-600 border-blue-100" : "bg-red-50 text-red-600 border-red-100"
                }`}>
                    {category.type}
                </span>
            </div>

            {/* Image Slider */}
            <div className="relative group aspect-video bg-slate-50 rounded-2xl md:rounded-3xl overflow-hidden mb-4 md:mb-6">
                <img
                    src={currentVehicle.image}
                    alt={currentVehicle.name}
                    className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-105"
                />

                <button onClick={prevSlide} className="absolute left-2 top-1/2 -translate-y-1/2 p-2 bg-white/90 rounded-full shadow-sm md:opacity-0 md:group-hover:opacity-100 transition-opacity">
                    <ChevronLeft size={16} />
                </button>

                <button onClick={nextSlide} className="absolute right-2 top-1/2 -translate-y-1/2 p-2 bg-white/90 rounded-full shadow-sm md:opacity-0 md:group-hover:opacity-100 transition-opacity">
                    <ChevronRight size={16} />
                </button>

                <div className="absolute bottom-3 left-1/2 -translate-x-1/2 flex gap-1.5">
                    {category.slides.map((_, i) => (
                        <div key={i} className={`h-1 w-1 md:h-1.5 md:w-1.5 rounded-full transition-all ${
                            i === activeIndex ? "bg-[#22C55E] w-3 md:w-4" : "bg-slate-300"
                        }`} />
                    ))}
                </div>
            </div>

            {/* Title */}
            <h3 className="text-xl md:text-3xl font-black text-slate-900 mb-4 md:mb-6 uppercase truncate">
                {currentVehicle.name}
            </h3>

            {/* Specs */}
            <div className="grid grid-cols-2 gap-3 md:gap-4 mb-6 md:mb-8">
                <div className="p-3 md:p-4 bg-slate-50 rounded-xl md:rounded-2xl border text-center">
                    <div className="flex items-center justify-center gap-1.5 mb-1">
                        <Zap size={12} className="text-[#22C55E]" />
                        <span className="text-[8px] md:text-[9px] font-bold uppercase text-slate-400">Speed</span>
                    </div>
                    <p className="text-xs md:text-sm font-black">{currentVehicle.speed}</p>
                </div>

                <div className="p-3 md:p-4 bg-slate-50 rounded-xl md:rounded-2xl border text-center">
                    <div className="flex items-center justify-center gap-1.5 mb-1">
                        <Shield size={12} className="text-[#22C55E]" />
                        {/* CHANGED HERE: Combined "Range Up To" in the label line */}
                        <span className="text-[8px] md:text-[9px] font-bold uppercase text-slate-400 whitespace-nowrap">Range Up To</span>
                    </div>
                    <p className="text-xs md:text-sm font-black">{currentVehicle.range}</p>
                </div>
            </div>

            {/* Button */}
            <button
                onClick={handleConfigure}
                className="w-full py-4 md:py-5 bg-slate-900 text-white rounded-xl md:rounded-2xl font-bold text-[10px] md:text-xs uppercase tracking-widest flex items-center justify-center gap-2 hover:bg-[#22C55E] transition-all"
            >
                Inquire <ArrowUpRight size={16} />
            </button>
        </div>
    );
};

// ---------------- 3 WHEELER CARD ----------------
const StaticCard = ({ vehicle }) => {
    const navigate = useNavigate();
    const handleConfigure = () => {
        const params = new URLSearchParams({ vehicle: vehicle.name, type: vehicle.type }).toString();
        navigate(`/contact?${params}`);
    };

    return (
        <div className="bg-white border border-slate-200 rounded-[2rem] md:rounded-[2.5rem] p-5 md:p-8 flex flex-col hover:shadow-xl transition-all">
            <span className="w-fit text-[9px] md:text-[10px] font-black px-3 py-1 md:px-4 md:py-1.5 rounded-full border bg-slate-50 uppercase mb-4 md:mb-6">
                {vehicle.type}
            </span>

            <div className="aspect-video bg-slate-50 rounded-2xl md:rounded-3xl overflow-hidden mb-6 md:mb-8">
                <img src={vehicle.image} alt={vehicle.name} className="w-full h-full object-cover" />
            </div>

            <h3 className="text-xl md:text-3xl font-black text-slate-900 mb-6 uppercase">
                {vehicle.name}
            </h3>

            <div className="grid grid-cols-2 gap-3 md:gap-4 mb-6 md:mb-8">
                <div className="p-3 md:p-4 bg-slate-50 rounded-xl md:rounded-2xl border text-center">
                    <div className="flex items-center justify-center gap-1.5 mb-1">
                        <Zap size={12} className="text-[#22C55E]" />
                        <span className="text-[8px] md:text-[9px] font-bold uppercase text-slate-400">Speed</span>
                    </div>
                    <p className="text-xs md:text-sm font-black">{vehicle.speed}</p>
                </div>

                <div className="p-3 md:p-4 bg-slate-50 rounded-xl md:rounded-2xl border text-center">
                    <div className="flex items-center justify-center gap-1.5 mb-1">
                        <Shield size={12} className="text-[#22C55E]" />
                        {/* CHANGED HERE ALSO for 3-wheelers */}
                        <span className="text-[8px] md:text-[9px] font-bold uppercase text-slate-400 whitespace-nowrap">Range Up To</span>
                    </div>
                    <p className="text-xs md:text-sm font-black">{vehicle.range}</p>
                </div>
            </div>

            <button
                onClick={handleConfigure}
                className="w-full py-4 md:py-5 bg-slate-900 text-white rounded-xl md:rounded-2xl font-bold text-[10px] md:text-xs uppercase tracking-widest flex items-center justify-center gap-2 hover:bg-[#22C55E]"
            >
                Inquire <ArrowUpRight size={16} />
            </button>
        </div>
    );
};

// ---------------- MAIN SECTION ----------------
const FleetDashboard = () => {
    return (
        <section id="vehicles" className="min-h-screen bg-[#F8FAFC] py-10 md:py-16 px-4 md:px-12 font-sans">
            <div className="max-w-7xl mx-auto">
                <div className="text-center mb-10 md:mb-16">
                    <span className="text-[#22C55E] font-bold tracking-[0.2em] md:tracking-[0.3em] text-[10px] md:text-xs uppercase block mb-2 md:mb-4">
                        Official 2026 Fleet
                    </span>
                    <h1 className="text-3xl sm:text-4xl md:text-7xl font-black text-slate-900 uppercase leading-tight">
                        NEXT-GEN <br className="block sm:hidden" />
                        <span className="text-slate-300">MOBILITY</span>
                    </h1>
                </div>

                <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 md:gap-10 mb-12 md:mb-20">
                    <div>
                        <h2 className="text-lg md:text-xl font-black mb-4 md:mb-6 border-l-4 border-[#22C55E] pl-4 uppercase">
                            Low Speed Series
                        </h2>
                        {fleetData.lowSpeed.map((cat) => (
                            <SlidingVehicleCard key={cat.id} category={cat} />
                        ))}
                    </div>

                    <div className="mt-8 lg:mt-0">
                        <h2 className="text-lg md:text-xl font-black mb-4 md:mb-6 border-l-4 border-[#22C55E] pl-4 uppercase">
                            High Speed Series
                        </h2>
                        {fleetData.highSpeed.map((cat) => (
                            <SlidingVehicleCard key={cat.id} category={cat} />
                        ))}
                    </div>
                </div>

                <h2 className="text-lg md:text-xl font-black mb-4 md:mb-6 border-l-4 border-[#22C55E] pl-4 uppercase">
                    3-Wheeler L5 Series
                </h2>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6 md:gap-10">
                    {fleetData.threeWheelers.map((v) => (
                        <StaticCard key={v.id} vehicle={v} />
                    ))}
                </div>
            </div>
        </section>
    );
};

export default FleetDashboard;