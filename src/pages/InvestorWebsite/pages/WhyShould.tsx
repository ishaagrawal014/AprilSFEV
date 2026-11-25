import React from "react";
import investorsImage from "/images/Wolf_White_Red.png";

const WhyShouldPage = () => {
    return (
        <div className="bg-white w-full">

            {/* SECTION 1: WORKING PROFESSIONALS */}
            <section className="bg-[#f8fafc] py-16 lg:py-24 border-b border-gray-100">
                <div className="max-w-[1200px] mx-auto px-6 grid lg:grid-cols-2 gap-12 items-center">
                    <div>
                        <h2 className="text-3xl sm:text-4xl font-bold text-black">
                            Working Professionals
                        </h2>
                        <p className="mt-4 text-lg text-gray-700">
                            The preferred choice for professionals seeking secure, fixed monthly
                            recurring returns through sustainable and hassle-free investments.
                        </p>

                        <div className="mt-8 flex gap-12">
                            <div>
                                <p className="text-4xl font-bold text-[#10b981]">17k+</p>
                                <p className="text-sm text-gray-500 uppercase tracking-wide">eBikes</p>
                            </div>
                            <div>
                                <p className="text-4xl font-bold text-[#10b981]">₹73Cr+</p>
                                <p className="text-sm text-gray-500 uppercase tracking-wide">Returns Delivered</p>
                            </div>
                        </div>

                        {/* BUTTONS FOR PROFESSIONALS */}
                        <div className="mt-10 flex flex-wrap items-center gap-6">
                            <button className="rounded-xl bg-[#258afe] px-8 py-3.5 text-white font-bold hover:bg-blue-600 transition-all shadow-md">
                                Become a Partner
                            </button>
                            <a href="#" className="text-[#258afe] font-bold flex items-center group">
                                What to expect <span className="ml-2 group-hover:translate-x-1 transition-transform">→</span>
                            </a>
                        </div>
                    </div>

                    <div className="hidden lg:block">
                        {/* Right side empty or another image */}
                    </div>
                </div>
            </section>

            {/* SECTION 2: INVESTORS */}
            <section className="bg-white py-16 lg:py-24">
                <div className="max-w-[1200px] mx-auto px-6 grid lg:grid-cols-2 gap-12 items-center">

                    {/* LEFT CONTENT BOX */}
                    <div className="flex flex-col">
                        <h2 className="text-3xl sm:text-4xl font-bold text-black">
                            Investors
                        </h2>
                        <p className="mt-4 text-lg text-gray-700">
                            The ideal platform for investors combining sustainability with
                            high-demand opportunities, ensuring consistent growth and
                            long-term relevance.
                        </p>

                        {/* STATS */}
                        <div className="mt-8 grid grid-cols-3 gap-4">
                            <div>
                                <p className="text-3xl font-bold text-[#258afe]">8</p>
                                <p className="text-xs text-gray-500 font-medium">Years of Expertise</p>
                            </div>
                            <div>
                                <p className="text-3xl font-bold text-[#258afe]">15+</p>
                                <p className="text-xs text-gray-500 font-medium">Corporate Partners</p>
                            </div>
                            <div>
                                <p className="text-3xl font-bold text-[#258afe]">17k+</p>
                                <p className="text-xs text-gray-500 font-medium">Riders Empowered</p>
                            </div>
                        </div>

                        {/* MANDATORY BUTTONS FOR INVESTORS */}
                        <div className="mt-10 flex flex-wrap items-center gap-6">
                            <button className="rounded-xl bg-[#258afe] px-8 py-3.5 text-white font-bold hover:bg-blue-600 transition-all shadow-md">
                                Become a Partner
                            </button>
                            <a href="#" className="text-[#258afe] font-bold flex items-center group">
                                What to expect <span className="ml-2 group-hover:translate-x-1 transition-transform">→</span>
                            </a>
                        </div>
                    </div>

                    {/* RIGHT IMAGE BOX */}
                    <div className="w-full h-full flex justify-center items-center flex flex-col">
                        <img
                            src={investorsImage}
                            alt="Investors"
                            className="w-full max-w-md lg:max-w-full h-auto rounded-3xl shadow-lg object-cover"
                        />
                    </div>

                </div>
            </section>

        </div>
    );
};

export default WhyShouldPage;