import React from 'react';
import {
    BadgePercent,   // Fixed Monthly Rental (Financial)
    Briefcase,      // FOCO Model (Business/Operations)
    Cpu,            // Live Asset Tracking (IoT/Tech)
    ShieldCheck     // Govt. Aligned (Security/Compliance)
} from 'lucide-react';

const InvestorPhilosophy = () => {
    const cards = [
        {
            title: "Fixed Monthly Rental",
            description: "Unlike traditional fleets, receive a guaranteed monthly rental per vehicle regardless of utilization.",
            icon: <BadgePercent className="w-6 h-6 text-emerald-600" />,
            theme: "light"
        },
        {
            title: "FOCO Model",
            description: "Pure Returns, Zero Operations. We manage drivers, routing, maintenance, and insurance.",
            icon: <Briefcase className="w-6 h-6 text-emerald-600" />,
            theme: "light" // Highlighted focus card
        },
        {
            title: "Live Asset Tracking",
            description: "Access a real-time IoT dashboard to monitor 'Green Kilometers' and vehicle health.",
            icon: <Cpu className="w-6 h-6 text-emerald-600" />,
            theme: "light"
        },
        {
            title: "Govt. Aligned",
            description: "Capitalize on the 2030 mandate to convert all last-mile delivery to 100% electric.",
            icon: <ShieldCheck className="w-6 h-6 text-emerald-600" />,
            theme: "light"
        }
    ];

    return (
        <section className="py-24 px-6 bg-white">
            <div className="max-w-6xl mx-auto">
                <div className="text-center mb-16">
          <span className="text-emerald-600 font-bold tracking-[0.2em] text-xs uppercase block mb-4">
            The Investor-First Philosophy
          </span>
                    <h2 className="text-4xl md:text-5xl font-black text-slate-900 tracking-tight leading-tight">
                        Why Smart Investors Choose <br />
                        <span className="text-emerald-600">Speedforce EV Fleets</span>
                    </h2>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                    {cards.map((card, index) => (
                        <div
                            key={index}
                            className={`group p-10 rounded-[2.5rem] transition-all duration-500 hover:-translate-y-2 border ${
                                card.theme === 'dark'
                                    ? 'bg-[#0f172a] border-slate-800 text-white shadow-2xl shadow-emerald-900/20'
                                    : 'bg-white border-slate-100 text-slate-800 shadow-sm hover:shadow-xl hover:border-emerald-100'
                            }`}
                        >
                            <div className={`w-14 h-14 rounded-2xl flex items-center justify-center mb-8 transition-all duration-500 group-hover:rotate-6 ${
                                card.theme === 'dark' ? 'bg-emerald-600 shadow-lg shadow-emerald-500/30' : 'bg-emerald-50'
                            }`}>
                                {card.icon}
                            </div>
                            <h3 className="text-2xl font-bold mb-4 tracking-tight">{card.title}</h3>
                            <p className={`text-lg leading-relaxed ${
                                card.theme === 'dark' ? 'text-slate-400' : 'text-slate-500'
                            }`}>
                                {card.description}
                            </p>
                        </div>
                    ))}
                </div>

            </div>
        </section>
    );
};

export default InvestorPhilosophy;