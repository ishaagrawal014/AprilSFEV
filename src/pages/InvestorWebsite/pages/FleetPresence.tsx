import React from "react";
import { ArrowRight, Apple, Play } from "lucide-react"; // Added Apple and Play icons

import Bangalore from "/images/bangalore.png";
import Baroda from "/images/3A_Sursagar, Vadodara.png";
import Delhi from "/images/Delhi.png";
import Hyderabad from "/images/Hyderabad.png";
import Mumbai from "/images/Mumbai.png";
import Pune from "/images/Pune.png";
import Ahemdabad from "/images/3C_Patang Hotel.png";

import FleetImg from "/images/lp.png";

const cities = [
    { name: "Mumbai", image: Mumbai, total: 600, reserved: 473, isWide: true },
    { name: "Bengaluru", image: Bangalore, total: 250, reserved: 173 },
    { name: "Delhi NCR", image: Delhi, total: 250, reserved: 196 },
    { name: "Vadodara", image: Baroda, total: 200, reserved: 128 },
    { name: "Hyderabad", image: Hyderabad, total: 150, reserved: 87 },
    { name: "Pune", image: Pune, total: 130, reserved: 64 },
    { name: "Ahmedabad", image: Ahemdabad, total: 150, reserved: 82 },
];

export default function FleetPresence() {
    const fleetReserved = 6300;
    const fleetTotal = 15000;
    const fleetPercentage = Math.round((fleetReserved / fleetTotal) * 100);

    return (
        <section id="fleets" className="bg-white min-h-screen">
            <div className="max-w-[1400px] mx-auto px-6 py-20">

                {/* TOP SECTION */}
                <div className="grid lg:grid-cols-2 gap-12 items-center mb-16">
                    <div>
                        <div className="flex items-center gap-2 mb-4">
                            
                        </div>
                        <h1 className="text-4xl sm:text-5xl font-bold text-[#050505] leading-tight">
                            Our Fleets Are Live In
                            <span className="block text-[#258afe] mt-2">High Commute Cities</span>
                        </h1>
                        <p className="mt-5 text-lg text-gray-500 max-w-xl">
                            Be a part of our deployment of EV fleets onto India’s highly populated cities.
                        </p>

                        {/* APP DOWNLOAD SECTION */}
                        <div className="mt-10">
                            {/* SINGLE COMING SOON BADGE */}


                            <div className="flex flex-wrap gap-3">
                                {/* App Store Button */}


                                {/* Play Store Button */}

                            </div>
                        </div>
                    </div>

                    <div className="relative rounded-3xl overflow-hidden border border-gray-100">
                        <img src={FleetImg} alt="Fleet" className="w-full h-[300px] object-cover" />
                        <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-black/20 to-transparent" />
                        <div className="absolute bottom-6 left-6 right-6">
                            <div className="flex justify-between text-white text-[12px] uppercase font-bold mb-2 tracking-widest">
                                <span>Expansion Progress</span>
                                <span>{fleetReserved} / {fleetTotal} Vehicles</span>
                                <span className="text-green-500">Phase 1</span>
                            </div>
                            <div className="w-full bg-white/20 h-1.5 rounded-full">
                                <div
                                    className="bg-[#258afe] h-full transition-all duration-1000"
                                    style={{ width: `${fleetPercentage}%` }}
                                />
                            </div>
                        </div>
                    </div>
                </div>
<h1 className="text-4xl sm:text-3xl font-bold text-[#050505] leading-tight ">
                            Inviting <span className="text-[#258afe]">Applications</span> For:
                  
                        </h1>
                {/* CITIES GRID */}
                <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-10">
                  
                    {cities.map((city) => {
                        const percentage = Math.round((city.reserved / city.total) * 100);
                        const spotsLeft = city.total - city.reserved;

                        return (
                            <div
                                key={city.name}
                                className={`flex flex-col transition-all duration-500 ${
                                    city.isWide ? "md:col-span-2" : "col-span-1"
                                }`}
                            >
                                <div className="relative w-full h-[220px] md:h-[240px] rounded-2xl overflow-hidden mb-4">
                                    <img
                                        src={city.image}
                                        alt={city.name}
                                        className="w-full h-full object-cover object-top transition-transform duration-700 hover:scale-105"
                                    />
                                </div>

                                <div className="space-y-3">
                                    <div className="flex justify-between items-end">
                                        <h3 className="text-xl font-bold text-gray-900 uppercase tracking-tight">
                                            {city.name}
                                        </h3>
                                        <span className="text-gray-500 text-[11px] font-bold">
                                            {city.reserved} / {city.total} SPOTS
                                        </span>
                                    </div>

                                    <div className="w-full bg-gray-100 h-1.5 rounded-full overflow-hidden">
                                        <div
                                            className="bg-[#258afe] h-full transition-all duration-500"
                                            style={{ width: `${percentage}%` }}
                                        />
                                    </div>

                                    <div className="flex justify-between text-gray-400 text-[10px] uppercase tracking-widest font-bold">
                                        <span>Fleet Progress</span>
                                        <span className="text-[#258afe]">{spotsLeft} spots left</span>
                                    </div>
                                </div>
                            </div>
                        );
                    })}
                </div>

                {/* Footer Button */}
                
            </div>
<div className="max-w-3xl mx-auto text-center">
                        <h2 className="text-3xl font-bold text-[#050505]">
                            Building India's <span className="text-[#23c55e]">Largest Green</span> Fleet Ecosystem
                        </h2>
                        <p className="mt-4 text-lg text-[#1b1b1b]">
                            We are on track to cover 50+ cities by 2026, providing seamless, scalable electric mobility solutions for businesses and investors alike.
                        </p>

                        <div className="mt-8 flex flex-wrap gap-4 justify-center">
  <a
    href="#contact"
    className="px-6 py-3 bg-green-500 text-white font-semibold rounded-full hover:bg-green-600 transition-colors"
  >
    Partner with Us
  </a>
</div>

                    </div>

                         
<section className="w-full py-16 px-4">
  <div className="max-w-7xl mx-auto">

    {/* ================= MOBILE / TABLET ================= */}
    <div className="grid gap-4 lg:hidden">
      {/* Main Image */}
      <div className="rounded-2xl overflow-hidden">
        <img
          src="/images/fleetinaction.png"
          alt="Fleet Operations"
          className="w-full h-auto object-contain"
        />
      </div>
</div>

    {/* ================= DESKTOP ================= */}
    <div className="hidden lg:grid grid-cols-6 grid-rows-5 gap-4 h-[600px]">

      {/* Main Image */}
      <div className="col-span-6 row-span-3 rounded-2xl overflow-hidden">
        <img
          src="/images/1.JPG"
          alt="Main Fleet Operations"
          className="w-full h-full object-cover"
        />
      </div>

      {/* Bottom Images */}
      <div className="col-span-2 row-span-2 row-start-4 rounded-2xl overflow-hidden">
        <img
          src="/images/2.JPG"
          alt="Fleet"
          className="w-full h-full object-cover"
        />
      </div>

      <div className="col-span-2 row-span-2 col-start-3 row-start-4 rounded-2xl overflow-hidden">
        <img
          src="/images/3.JPG"
          alt="Fleet"
          className="w-full h-full object-cover"
        />
      </div>

      <div className="col-span-2 row-span-2 col-start-5 row-start-4 rounded-2xl overflow-hidden">
        <img
          src="/images/4.JPG"
          alt="Fleet"
          className="w-full h-full object-cover"
        />
      </div>
    </div>

  </div>
</section>
        </section>
    );
}