import React from "react";

const PartnershipSection: React.FC = () => {
    return (
        <section className="w-full max-w-7xl mx-auto px-4 py-10 space-y-8 flex flex-col justify-center items-center">
            <h2 className="text-3xl font-bold text-center mb-8 text-[#050505]">Our Exclusive Partners</h2>
            {/* Card 1 */}
            <div className="flex flex-col md:flex-row items-center justify-between gap-6 rounded-[32px] bg-[#FFF3E8] p-6 md:p-10 shadow-sm w-full">
                {/* Left logos */}
                <div className="flex flex-col items-center gap-4 min-w-[180px]">
                    <img src="/images/Wardwizard_Innovation & Mobility Ltd.png" alt="Wardwizard" className="h-28" />
                </div>

                {/* Content */}
                <div className="flex-1 text-center md:text-left">
                    <h3 className="text-xl md:text-2xl font-semibold text-gray-900">
                        Wardwizard Innovations & Mobility Limited
                    </h3>
                    <p className="mt-2 text-base md:text-lg text-gray-700">
                        Exclusive Partnership with <strong>joy e-bike</strong> & <strong>joy e-rik</strong> for EV manufacturing.
                    </p>
                </div>

                {/* Right logos */}
                <div className="flex flex-col items-center gap-4 min-w-[140px]">
                    <img src="/images/logo100.png" alt="Joy e-bike" className="h-10" />
                    <img src="/images/logo200.png" alt="Joy e-rik" className="h-10" />
                </div>
            </div>

            {/* Card 2 */}
            <div className="flex flex-col md:flex-row items-center justify-between gap-6 rounded-[32px] bg-[#EEF7F0] p-6 md:p-10 shadow-sm w-full">
                {/* Left logo */}
                <div className="flex items-center min-w-[180px] justify-center">
                    <img src="/images/Ril.png" alt="Reliance Industries" className="h-16" />
                </div>

                {/* Content */}
                <div className="flex-1 text-center md:text-left">
                    <h3 className="text-xl md:text-2xl font-semibold text-gray-900">
                        <strong>Jio Things</strong>
                    </h3>
                    <p className="mt-2 text-base md:text-lg text-gray-700">
                        Only EV fleet management company to incorporate <strong>JioThings</strong> platform.
                    </p>
                </div>

                {/* Right logo */}
                <div className="flex items-center min-w-[140px] justify-center">
                    <img src="/images/700.png" alt="JioThings" className="h-10" />
                </div>
            </div>

            <div className="flex flex-col md:flex-row items-center justify-between gap-6 rounded-[32px] bg-[#e2f0ff] p-6 md:p-10 shadow-sm w-full">
                {/* Left logo */}
                <div className="flex items-center min-w-[180px] justify-center">
                    <img src="/images/logo600.png" alt="Reliance Industries" className="h-16" />
                </div>

                {/* Content */}
                <div className="flex-1 text-center md:text-left">
                    <h3 className="text-xl md:text-2xl font-semibold text-gray-900">
                        Exclusive Insurance Package
                    </h3>
                    <p className="mt-2 text-base md:text-lg text-gray-700">
                        Asset Shield Program powered by <strong>Bluebells Insurance Broking Pvt. Ltd.</strong>
                    </p>
                </div>

                {/* Right logo */}
                <div className="flex items-center min-w-[200px] justify-center">
                    <img src="/images/ShieldLogo.png" alt="Shield Logo" className="h-20" />
                </div>
            </div>
        
        </section>
    );
};

export default PartnershipSection;
