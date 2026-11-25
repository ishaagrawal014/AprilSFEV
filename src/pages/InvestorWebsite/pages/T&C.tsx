import React from 'react';

export default function TC() {
    return (
        <div className="bg-slate-200 min-h-screen py-10 px-4 font-sans text-gray-800 flex justify-center items-center">

            {/* MAIN DOCUMENT CONTAINER */}
            <div className="max-w-4xl w-full bg-white border-[16px] border-white shadow-[0_35px_60px_-15px_rgba(0,0,0,0.4)] rounded-sm relative overflow-hidden">

                {/* --- SINGLE REFINED DARK GRAY WATERMARK --- */}
                {/* Size reduced, color darkened to gray-400, opacity set to 0.15 for visibility */}
                <div className="absolute inset-0 pointer-events-none select-none overflow-hidden flex items-center justify-center z-0">
                    <h2 className="text-[7rem] font-black text-gray-800 uppercase rotate-[-25deg] whitespace-nowrap tracking-tighter opacity-15">
                        SpeedForce EV
                    </h2>
                </div>

                {/* --- HEADER SECTION --- */}
                <header className="relative z-10 bg-emerald-700 py-12 px-8 text-center text-white">
                    <h1 className="text-3xl md:text-4xl font-black uppercase tracking-[0.2em] mb-2">
                        Terms & Conditions
                    </h1>
                    <p className="text-emerald-200 font-bold text-[10px] tracking-[0.4em] uppercase opacity-80 mb-4">

                    </p>
                    {/* Header Support Badge */}
                    <div className="inline-block px-4 py-1 bg-emerald-800/40 border border-emerald-500/30 rounded-full text-[9px] font-bold tracking-widest text-emerald-100 uppercase">

                    </div>
                </header>

                {/* --- BODY CONTENT --- */}
                <div className="relative z-20 p-8 md:p-16 bg-white/40 backdrop-blur-[0.5px]">

                    {/* Status Bar */}
                    <div className="flex justify-between items-center mb-10 border-b border-emerald-500/30 pb-3">
                        <div className="text-[9px] font-black text-gray-400 uppercase tracking-widest">

                        </div>
                        <div className="text-[9px] font-black text-emerald-700 uppercase tracking-widest bg-emerald-50/50 px-3 py-1">

                        </div>
                    </div>

                    <main className="space-y-10">
                        <section>
                            <h2 className="text-md font-black text-gray-900 mb-3 flex items-center gap-3">
                                <span className="text-emerald-600">01.</span>
                                INTRODUCTION & ACCEPTANCE
                            </h2>
                            <p className="leading-relaxed text-gray-600 text-xs md:text-sm pl-8 font-semibold tracking-wide">
                                This document outlines the legal framework between the Investor and <strong>Speed Force EV</strong>.
                                By participating in the EV ecosystem, you acknowledge that you have read, understood, and agreed to
                                the operational protocols of our FOCO model.
                            </p>
                        </section>

                        <section>
                            <h2 className="text-md font-black text-gray-900 mb-3 flex items-center gap-3">
                                <span className="text-emerald-600">02.</span>
                                ASSET OWNERSHIP & LEASING
                            </h2>
                            <div className="pl-8 space-y-3">
                                <p className="text-gray-600 text-xs leading-loose">
                                    The core of this partnership is based on asset-backed security.
                                    Speed Force EV facilitates the purchase and deployment, but ownership remains with you.
                                </p>
                                <div className="bg-white/60 border-l-4 border-emerald-600 p-5 italic font-bold text-gray-800 text-xs shadow-sm leading-relaxed">
                                    "Investors hold 100% legal title to the Electric Vehicles. Tax invoices, registration
                                    details, and insurance papers are issued in the name of the primary investor."
                                </div>
                            </div>
                        </section>

                        <section>
                            <h2 className="text-md font-black text-gray-900 mb-3 flex items-center gap-3">
                                <span className="text-emerald-600">03.</span>
                                OPERATIONAL MANDATE
                            </h2>
                            <div className="pl-8">
                                <ul className="grid grid-cols-1 md:grid-cols-2 gap-y-2 text-[11px] font-black text-gray-500 uppercase tracking-wider">
                                    <li className="flex items-center gap-2">▪ 48-Month Management Cycle</li>
                                    <li className="flex items-center gap-2">▪ Real-time Telematics Access</li>
                                    <li className="flex items-center gap-2">▪ Comprehensive Asset Shield</li>
                                    <li className="flex items-center gap-2">▪ End-to-End Maintenance</li>
                                </ul>
                            </div>
                        </section>

                        <section>
                            <h2 className="text-md font-black text-gray-900 mb-3 flex items-center gap-3">
                                <span className="text-emerald-600">04.</span>
                                FINANCIAL DISCLOSURES
                            </h2>
                            <p className="leading-loose text-gray-600 text-xs pl-8 font-medium tracking-wide">
                                Monthly rental payouts are processed on a fixed date. Returns are calculated
                                based on the initial investment slab. All figures are subject to standard
                                Indian taxation laws, including GST and TDS deductions at source.
                            </p>
                        </section>

                        {/* --- SUPPORT CONTACT SECTION --- */}
                        <section className="relative bg-white/30 border-t border-b border-gray-100 py-6 px-8 rounded-sm">
                            <h3 className="text-[10px] font-black text-gray-400 uppercase tracking-widest mb-1">Customer Support & Queries</h3>
                            <p className="text-xs text-gray-700 leading-relaxed mb-3 font-semibold">
                                For any queries regarding the investment slabs or legal terms, please reach out:
                            </p>
                            <a
                                href="mailto:support@speedforceev.in"
                                className="text-emerald-800 font-black text-lg border-b-2 border-emerald-800 hover:text-emerald-600 transition-all tracking-tighter"
                            >
                                support@speedforceev.in
                            </a>
                        </section>

                        {/* SIGNATURE AREA */}
                        <div className="pt-12 flex justify-between items-end relative z-30 px-4">
                            <div className="text-center">


                            </div>

                            <div className="w-20 h-20 border border-emerald-100 flex items-center justify-center p-2 rounded-sm bg-white shadow-sm opacity-60">

                            </div>
                        </div>
                    </main>

                    <footer className="mt-10 text-center relative z-30">
                        <p className="text-[9px] text-gray-400 font-black uppercase tracking-[0.5em] ">
                            BUILDING THE LARGEST GREEN FLEET IN INDIA
                        </p>
                    </footer>
                </div>
            </div>
        </div>
    );
}