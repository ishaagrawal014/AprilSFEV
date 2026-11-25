import React from 'react';
import { MapPin, IndianRupee, Wrench, Zap, Bike, Radio } from 'lucide-react';

const PartnerBenefits = () => {
    return (
        <section id="whyus" className="bg-slate-950 py-16 px-6 font-sans relative overflow-hidden">
        <div className="bg-slate-950 py-16 px-6 font-sans relative overflow-hidden">
            {/* Background Elements */}
            <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_top,_var(--tw-gradient-stops))] from-[#22C55E]/5 via-transparent to-transparent"></div>
            <div className="absolute top-0 right-0 w-[500px] h-[500px] bg-[#22C55E]/10 rounded-full blur-[120px]"></div>
            <div className="absolute bottom-0 left-0 w-[500px] h-[500px] bg-blue-500/10 rounded-full blur-[120px]"></div>

            <div className="max-w-7xl mx-auto relative z-10">
                {/* Header Section */}
                <div className="max-w-3xl mb-6">
                    <p className="text-[#22C55E] font-semibold text-sm uppercase tracking-wider mb-3 flex items-center gap-2">
                        <span className="w-8 h-[2px] bg-[#22C55E]"></span>
                        Partner Benefits
                    </p>
                    <h1 className="text-3xl sm:text-5xl font-bold text-white mb-4 leading-tight">
                        Why <span className="text-transparent bg-clip-text bg-gradient-to-r from-[#22C55E] to-emerald-400">us</span>?
                    </h1>
                    <p className="text-slate-400 text-lg leading-relaxed">
                        Thousands of delivery partners trust our electric vehicles to enhance operations with cost-effective, eco-friendly transportation solutions.
                    </p>
                </div>

                {/* Mobile Layout (visible only below lg) */}
                <div className="flex flex-col gap-4 lg:hidden">

                    {/* Card 1 - Made for Indian Roads */}
                    <div className="bg-gradient-to-br from-slate-900/90 to-slate-800/90 backdrop-blur-sm border border-slate-700/50 rounded-3xl p-6 hover:border-blue-500/60 transition-all duration-300 flex flex-col group hover:shadow-[0_0_30px_rgba(59,130,246,0.15)] hover:-translate-y-1">
                        <div className="w-12 h-12 rounded-xl bg-blue-500/10 border border-blue-500/20 flex items-center justify-center mb-4 group-hover:bg-blue-500/20 transition-all duration-300 group-hover:shadow-[0_0_20px_rgba(59,130,246,0.3)]">
                            <MapPin size={24} className="text-blue-400 group-hover:text-blue-300 transition-colors" strokeWidth={1.5} />
                        </div>
                        <h3 className="text-lg font-bold text-white mb-2 group-hover:text-blue-50 transition-colors">Made for Indian Roads</h3>
                        <p className="text-slate-400 text-sm leading-relaxed group-hover:text-slate-300 transition-colors mb-4">Vehicles engineered for Indian terrain and traffic conditions.</p>
                        <div className="mt-auto w-full h-24 rounded-2xl overflow-hidden">
                            <img src="/images/indianroads.jpg" alt="Made for Indian Roads" className="w-full h-full object-cover" />
                        </div>
                    </div>

                    {/* Card 2 - Budget Friendly Rents */}
                    <div className="bg-gradient-to-br from-emerald-950/60 to-emerald-900/40 backdrop-blur-sm border border-emerald-700/40 rounded-3xl p-8 hover:border-[#22C55E]/70 transition-all duration-300 flex flex-col group hover:shadow-[0_0_40px_rgba(34,197,94,0.2)] hover:-translate-y-1 relative overflow-hidden">
                        <div className="absolute inset-0 bg-gradient-to-br from-[#22C55E]/5 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
                        <div className="relative z-10 flex flex-col h-full">
                            <div className="w-16 h-16 rounded-2xl bg-[#22C55E]/15 border border-[#22C55E]/30 flex items-center justify-center mb-6 group-hover:bg-[#22C55E]/25 transition-all duration-300 group-hover:shadow-[0_0_25px_rgba(34,197,94,0.4)] group-hover:scale-105">
                                <IndianRupee size={36} className="text-[#22C55E] group-hover:text-emerald-400 transition-colors" strokeWidth={1.5} />
                            </div>
                            <h3 className="text-2xl font-bold text-white mb-4 group-hover:text-emerald-50 transition-colors">Budget Friendly Fleet</h3>
                            <p className="text-slate-400 leading-relaxed group-hover:text-slate-300 transition-colors mb-6">Competitive rental plans designed to maximize your returns while keeping operational costs low.</p>
                            <div className="mt-auto w-full h-32 rounded-2xl overflow-hidden">
                                <img src="/images/Budgetfriendly2.png" alt="Budget friendly electric vehicle" className="w-full h-full object-cover" />
                            </div>
                        </div>
                    </div>

                    {/* Card 3 - Service and Maintenance */}
                    <div className="bg-gradient-to-br from-slate-900/90 to-slate-800/90 backdrop-blur-sm border border-slate-700/50 rounded-3xl p-6 hover:border-orange-500/60 transition-all duration-300 flex flex-col group hover:shadow-[0_0_30px_rgba(249,115,22,0.15)] hover:-translate-y-1">
                        <div className="w-14 h-14 rounded-xl bg-orange-500/10 border border-orange-500/20 flex items-center justify-center mb-4 group-hover:bg-orange-500/20 transition-all duration-300 group-hover:shadow-[0_0_20px_rgba(249,115,22,0.3)]">
                            <Wrench size={28} className="text-orange-400 group-hover:text-orange-300 transition-colors" strokeWidth={1.5} />
                        </div>
                        <h3 className="text-xl font-bold text-white mb-3 group-hover:text-orange-50 transition-colors">Service & Maintenance</h3>
                        <p className="text-slate-400 text-sm leading-relaxed group-hover:text-slate-300 transition-colors mb-4">Comprehensive support ensuring minimal downtime.</p>
                        <div className="mt-auto w-full h-32 rounded-2xl overflow-hidden">
                            <img src="/images/serviceimage2.jpg" alt="Service and Maintenance" className="w-full h-full object-cover" />
                        </div>
                    </div>

                    {/* Card 4 - Charging & Hubs */}
                    <div className="bg-gradient-to-br from-yellow-950/60 to-yellow-900/40 backdrop-blur-sm border border-yellow-700/40 rounded-3xl p-6 hover:border-yellow-500/60 transition-all duration-300 flex flex-col group hover:shadow-[0_0_35px_rgba(234,179,8,0.2)] hover:-translate-y-1 relative overflow-hidden">
                        <div className="absolute inset-0 bg-gradient-to-br from-yellow-500/5 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
                        <div className="relative z-10 flex flex-col h-full">
                            <div className="w-14 h-14 rounded-xl bg-yellow-500/15 border border-yellow-500/30 flex items-center justify-center mb-4 group-hover:bg-yellow-500/25 transition-all duration-300 group-hover:shadow-[0_0_20px_rgba(234,179,8,0.4)]">
                                <Zap size={28} className="text-yellow-400 group-hover:text-yellow-300 transition-colors" strokeWidth={1.5} />
                            </div>
                            <h3 className="text-xl font-bold text-white mb-3 group-hover:text-yellow-50 transition-colors">Charging & Hubs</h3>
                            <p className="text-slate-400 text-sm leading-relaxed group-hover:text-slate-300 transition-colors mb-4">Strategically located charging stations across multiple cities.</p>
                            <div className="mt-auto w-full h-32 rounded-2xl overflow-hidden">
                                <img src="/images/Chargingthing.png" alt="Charging and Hubs" className="w-full h-full object-cover" />
                            </div>
                        </div>
                    </div>

                    {/* Card 5 - Multi Vehicle Options */}
                    <div className="bg-gradient-to-br from-purple-950/60 to-purple-900/40 backdrop-blur-sm border border-purple-700/40 rounded-3xl p-6 hover:border-purple-500/60 transition-all duration-300 flex flex-col group hover:shadow-[0_0_35px_rgba(168,85,247,0.2)] hover:-translate-y-1 relative overflow-hidden">
                        <div className="absolute inset-0 bg-gradient-to-br from-purple-500/5 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
                        <div className="relative z-10 flex flex-col h-full">
                            <div className="w-14 h-14 rounded-xl bg-purple-500/15 border border-purple-500/30 flex items-center justify-center mb-4 group-hover:bg-purple-500/25 transition-all duration-300 group-hover:shadow-[0_0_20px_rgba(168,85,247,0.4)]">
                                <Bike size={28} className="text-purple-400 group-hover:text-purple-300 transition-colors" strokeWidth={1.5} />
                            </div>
                            <h3 className="text-xl font-bold text-white mb-3 group-hover:text-purple-50 transition-colors">Multi Vehicle Options</h3>
                            <p className="text-slate-400 text-sm leading-relaxed group-hover:text-slate-300 transition-colors mb-4">Diverse fleet including 2-wheelers and 3-wheelers.</p>
                            <div className="mt-auto w-full h-24 rounded-2xl overflow-hidden">
                                <img src="/images/9.png" alt="Multi Vehicle Options" className="w-full h-full object-cover" />
                            </div>
                        </div>
                    </div>

                    {/* Card 6 - Real Time Tracking */}
                    <div className="bg-gradient-to-br from-blue-950/60 to-blue-900/40 backdrop-blur-sm border border-blue-700/40 rounded-3xl p-6 hover:border-blue-500/60 transition-all duration-300 flex flex-col group hover:shadow-[0_0_35px_rgba(59,130,246,0.2)] hover:-translate-y-1 relative overflow-hidden">
                        <div className="absolute inset-0 bg-gradient-to-br from-blue-500/5 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
                        <div className="relative z-10 flex flex-col h-full">
                            <div className="w-14 h-14 rounded-xl bg-blue-500/15 border border-blue-500/30 flex items-center justify-center mb-4 group-hover:bg-blue-500/25 transition-all duration-300 group-hover:shadow-[0_0_20px_rgba(59,130,246,0.4)]">
                                <Radio size={28} className="text-blue-400 group-hover:text-blue-300 transition-colors" strokeWidth={1.5} />
                            </div>
                            <h3 className="text-xl font-bold text-white mb-3 group-hover:text-blue-50 transition-colors">Real Time Tracking</h3>
                            <p className="text-slate-400 text-sm leading-relaxed group-hover:text-slate-300 transition-colors mb-4">Complete visibility into fleet performance.</p>
                            <div className="mt-auto w-full h-24 rounded-2xl overflow-hidden">
                                <img src="/images/map[s.png" alt="Real Time Tracking" className="w-full h-full object-cover" />
                            </div>
                        </div>
                    </div>
                </div>

                {/* Desktop Layout (original, unchanged — visible only at lg and above) */}
                <div className="hidden lg:grid grid-cols-12 gap-4">
                    {/* Card 1 - Made for Indian Roads */}
                    <div className="col-span-3 row-span-2 col-start-2 row-start-2 bg-gradient-to-br from-slate-900/90 to-slate-800/90 backdrop-blur-sm border border-slate-700/50 rounded-3xl p-6 hover:border-blue-500/60 transition-all duration-300 flex flex-col group hover:shadow-[0_0_30px_rgba(59,130,246,0.15)] hover:-translate-y-1">
                        <div className="w-12 h-12 rounded-xl bg-blue-500/10 border border-blue-500/20 flex items-center justify-center mb-4 group-hover:bg-blue-500/20 transition-all duration-300 group-hover:shadow-[0_0_20px_rgba(59,130,246,0.3)]">
                            <MapPin size={24} className="text-blue-400 group-hover:text-blue-300 transition-colors" strokeWidth={1.5} />
                        </div>
                        <h3 className="text-lg font-bold text-white mb-2 group-hover:text-blue-50 transition-colors">Made for Indian Roads</h3>
                        <p className="text-slate-400 text-sm leading-relaxed group-hover:text-slate-300 transition-colors mb-4">Vehicles engineered for Indian terrain and traffic conditions.</p>
                        <div className="mt-auto w-full h-24 rounded-2xl overflow-hidden">
                            <img src="/images/indianroads.jpg" alt="Made for Indian Roads" className="w-full h-full object-cover" />
                        </div>
                    </div>

                    {/* Card 2 - Budget Friendly Rents */}
                    <div className="col-span-5 row-span-3 col-start-5 row-start-2 bg-gradient-to-br from-emerald-950/60 to-emerald-900/40 backdrop-blur-sm border border-emerald-700/40 rounded-3xl p-8 hover:border-[#22C55E]/70 transition-all duration-300 flex flex-col group hover:shadow-[0_0_40px_rgba(34,197,94,0.2)] hover:-translate-y-1 relative overflow-hidden">
                        <div className="absolute inset-0 bg-gradient-to-br from-[#22C55E]/5 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
                        <div className="relative z-10 flex flex-col h-full">
                            <div className="w-16 h-16 rounded-2xl bg-[#22C55E]/15 border border-[#22C55E]/30 flex items-center justify-center mb-6 group-hover:bg-[#22C55E]/25 transition-all duration-300 group-hover:shadow-[0_0_25px_rgba(34,197,94,0.4)] group-hover:scale-105">
                                <IndianRupee size={36} className="text-[#22C55E] group-hover:text-emerald-400 transition-colors" strokeWidth={1.5} />
                            </div>
                            <h3 className="text-2xl font-bold text-white mb-4 group-hover:text-emerald-50 transition-colors">Budget Friendly Rents</h3>
                            <p className="text-slate-400 leading-relaxed group-hover:text-slate-300 transition-colors mb-6">Competitive rental plans designed to maximize your returns while keeping operational costs low.</p>
                            <div className="mt-auto w-full h-32 rounded-2xl overflow-hidden">
                                <img src="/images/Budgetfriendly2.png" alt="Budget friendly electric vehicle" className="w-full h-full object-cover" />
                            </div>
                        </div>
                    </div>

                    {/* Card 3 - Service and Maintenance */}
                    <div className="col-span-2 row-span-3 col-start-10 row-start-2 bg-gradient-to-br from-slate-900/90 to-slate-800/90 backdrop-blur-sm border border-slate-700/50 rounded-3xl p-6 hover:border-orange-500/60 transition-all duration-300 flex flex-col group hover:shadow-[0_0_30px_rgba(249,115,22,0.15)] hover:-translate-y-1">
                        <div className="w-14 h-14 rounded-xl bg-orange-500/10 border border-orange-500/20 flex items-center justify-center mb-4 group-hover:bg-orange-500/20 transition-all duration-300 group-hover:shadow-[0_0_20px_rgba(249,115,22,0.3)]">
                            <Wrench size={28} className="text-orange-400 group-hover:text-orange-300 transition-colors" strokeWidth={1.5} />
                        </div>
                        <h3 className="text-xl font-bold text-white mb-3 group-hover:text-orange-50 transition-colors">Service & Maintenance</h3>
                        <p className="text-slate-400 text-sm leading-relaxed group-hover:text-slate-300 transition-colors mb-4">Comprehensive support ensuring minimal downtime.</p>
                        <div className="mt-auto w-full h-32 rounded-2xl overflow-hidden">
                            <img src="/images/serviceimage2.jpg" alt="Service and Maintenance" className="w-full h-full object-cover" />
                        </div>
                    </div>

                    {/* Card 4 - Charging & Hubs */}
                    <div className="col-span-3 row-span-3 col-start-2 row-start-4 bg-gradient-to-br from-yellow-950/60 to-yellow-900/40 backdrop-blur-sm border border-yellow-700/40 rounded-3xl p-6 hover:border-yellow-500/60 transition-all duration-300 flex flex-col group hover:shadow-[0_0_35px_rgba(234,179,8,0.2)] hover:-translate-y-1 relative overflow-hidden">
                        <div className="absolute inset-0 bg-gradient-to-br from-yellow-500/5 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
                        <div className="relative z-10 flex flex-col h-full">
                            <div className="w-14 h-14 rounded-xl bg-yellow-500/15 border border-yellow-500/30 flex items-center justify-center mb-4 group-hover:bg-yellow-500/25 transition-all duration-300 group-hover:shadow-[0_0_20px_rgba(234,179,8,0.4)]">
                                <Zap size={28} className="text-yellow-400 group-hover:text-yellow-300 transition-colors" strokeWidth={1.5} />
                            </div>
                            <h3 className="text-xl font-bold text-white mb-3 group-hover:text-yellow-50 transition-colors">Charging & Hubs</h3>
                            <p className="text-slate-400 text-sm leading-relaxed group-hover:text-slate-300 transition-colors mb-4">Strategically located charging stations across multiple cities.</p>
                            <div className="mt-auto w-full h-32 rounded-2xl overflow-hidden">
                                <img src="/images/Chargingthing.png" alt="Charging and Hubs" className="w-full h-full object-cover" />
                            </div>
                        </div>
                    </div>

                    {/* Card 5 - Multi Vehicle Options */}
                    <div className="col-span-4 row-span-2 col-start-5 row-start-5 bg-gradient-to-br from-purple-950/60 to-purple-900/40 backdrop-blur-sm border border-purple-700/40 rounded-3xl p-6 hover:border-purple-500/60 transition-all duration-300 flex flex-col group hover:shadow-[0_0_35px_rgba(168,85,247,0.2)] hover:-translate-y-1 relative overflow-hidden">
                        <div className="absolute inset-0 bg-gradient-to-br from-purple-500/5 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
                        <div className="relative z-10 flex flex-col h-full">
                            <div className="w-14 h-14 rounded-xl bg-purple-500/15 border border-purple-500/30 flex items-center justify-center mb-4 group-hover:bg-purple-500/25 transition-all duration-300 group-hover:shadow-[0_0_20px_rgba(168,85,247,0.4)]">
                                <Bike size={28} className="text-purple-400 group-hover:text-purple-300 transition-colors" strokeWidth={1.5} />
                            </div>
                            <h3 className="text-xl font-bold text-white mb-3 group-hover:text-purple-50 transition-colors">Multi Vehicle Options</h3>
                            <p className="text-slate-400 text-sm leading-relaxed group-hover:text-slate-300 transition-colors mb-4">Diverse fleet including 2-wheelers and 3-wheelers.</p>
                            <div className="mt-auto w-full h-24 rounded-2xl overflow-hidden">
                                <img src="/images/9.png" alt="Multi Vehicle Options" className="w-full h-full object-cover" />
                            </div>
                        </div>
                    </div>

                    {/* Card 6 - Real Time Tracking */}
                    <div className="col-span-3 row-span-2 col-start-9 row-start-5 bg-gradient-to-br from-blue-950/60 to-blue-900/40 backdrop-blur-sm border border-blue-700/40 rounded-3xl p-6 hover:border-blue-500/60 transition-all duration-300 flex flex-col group hover:shadow-[0_0_35px_rgba(59,130,246,0.2)] hover:-translate-y-1 relative overflow-hidden">
                        <div className="absolute inset-0 bg-gradient-to-br from-blue-500/5 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
                        <div className="relative z-10 flex flex-col h-full">
                            <div className="w-14 h-14 rounded-xl bg-blue-500/15 border border-blue-500/30 flex items-center justify-center mb-4 group-hover:bg-blue-500/25 transition-all duration-300 group-hover:shadow-[0_0_20px_rgba(59,130,246,0.4)]">
                                <Radio size={28} className="text-blue-400 group-hover:text-blue-300 transition-colors" strokeWidth={1.5} />
                            </div>
                            <h3 className="text-xl font-bold text-white mb-3 group-hover:text-blue-50 transition-colors">Real Time Tracking</h3>
                            <p className="text-slate-400 text-sm leading-relaxed group-hover:text-slate-300 transition-colors mb-4">Complete visibility into fleet performance.</p>
                            <div className="mt-auto w-full h-24 rounded-2xl overflow-hidden">
                                <img src="/images/map[s.png" alt="Real Time Tracking" className="w-full h-full object-cover" />
                            </div>
                        </div>
                    </div>
                </div>

                {/* CTA Section */}
                <div className="mt-6 bg-gradient-to-r from-[#22C55E] to-emerald-600 rounded-3xl p-8 sm:p-12 flex flex-col md:flex-row items-center justify-between gap-6 shadow-[0_0_50px_rgba(34,197,94,0.2)] hover:shadow-[0_0_70px_rgba(34,197,94,0.3)] transition-all duration-300 group relative overflow-hidden">
                    <div className="absolute inset-0 bg-gradient-to-r from-emerald-400/0 via-white/5 to-emerald-400/0 translate-x-[-100%] group-hover:translate-x-[100%] transition-transform duration-1000"></div>
                    <div className="text-center md:text-left relative z-10">
                        <h2 className="text-2xl sm:text-3xl font-bold text-white mb-2">Ready to Go Electricfy your Fleet?</h2>
                        <p className="text-emerald-100">Join thousands of partners benefiting from sustainable EV solutions</p>
                    </div>
                    <a href="/contact">
                    <button className="w-full md:w-auto bg-white text-[#22C55E] px-8 py-4 rounded-xl font-semibold flex items-center justify-center gap-2 hover:bg-slate-50 transition-all hover:gap-3 whitespace-nowrap shadow-lg hover:shadow-xl hover:scale-105 relative z-10 group/btn">
                        <span>Start Leasing</span>
                        
                        <svg className="w-5 h-5 group-hover/btn:translate-x-1 transition-transform" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 7l5 5m0 0l-5 5m5-5H6" />
                        </svg>
                    </button>
                    </a>
                </div>
            </div>
        </div>
          </section>
    );
  
};

export default PartnerBenefits;