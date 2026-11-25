import React from 'react';
import { Activity, BatteryCharging, Users, CreditCard } from 'lucide-react';

const OperationalExcellence = () => {
    const features = [
        {
            icon: <Activity className="w-6 h-6" />,
            title: "IoT & Cloud Integration",
            desc: "Real-time monitoring on every bike."
        },
        {
            icon: <BatteryCharging className="w-6 h-6" />,
            title: "Decentralized Infrastructure",
            desc: "Charging & swapping stations everywhere."
        },
        {
            icon: <Users className="w-6 h-6" />,
            title: "Verified Rider Pool",
            desc: "Vetted professionals for last-mile delivery."
        },
        {
            icon: <CreditCard className="w-6 h-6" />,
            title: "Automated Settlements",
            desc: "Seamless monthly payout processing."
        },
    ];

    return (
        // Added min-h-[70vh] and larger py-32 to give it substantial height
        <section className="bg-white min-h-[70vh] flex items-center py-24 md:py-32 px-6 overflow-hidden">
            <div className="max-w-7xl mx-auto w-full">

                {/* Header Section with increased scale */}
                <div className="mb-20 border-l-[6px] border-gray-600 pl-8 md:pl-12">
                    <h2 className="text-base font-bold tracking-[0.2em] text-gray-800 uppercase mb-4">
                        Operational Excellence
                    </h2>
                    <h3 className="text-4xl md:text-6xl font-black-200 text-slate-900 leading-tight mb-8">
                        We aren’t just financiers, <br />
                        <span className="text-green-600">we are tech-driven operators.</span>
                    </h3>
                    <p className="max-w-3xl text-xl text-slate-500 leading-relaxed font-medium">
                        Our infrastructure handles the heavy lifting. From battery lifecycle management
                        to driver compliance, our team ensures your assets are working for you 24/7.
                    </p>
                </div>

                {/* Feature Cards Grid - Increased card height and padding */}
                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8">
                    {features.map((item, idx) => (
                        <div
                            key={idx}
                            className="group bg-slate-50 p-10 rounded-2xl border border-slate-100 hover:bg-white hover:shadow-2xl hover:shadow-blue-100/50 transition-all duration-300 min-h-[280px] flex flex-col justify-between"
                        >
                            <div>
                                <div className="text-blue-600 mb-8 bg-blue-100/50 w-14 h-14 flex items-center justify-center rounded-xl group-hover:scale-110 transition-transform">
                                    {item.icon}
                                </div>
                                <h4 className="font-bold text-xl text-slate-800 mb-4">{item.title}</h4>
                                <p className="text-slate-500 leading-relaxed text-base">{item.desc}</p>
                            </div>
                        </div>
                    ))}
                </div>

            </div>
        </section>
    );
};

export default OperationalExcellence;