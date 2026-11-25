import React from "react";
import { CheckCircle2 } from "lucide-react";

const OpportunityPage = () => {
    // 1. Define the missing 'content' object
    const content = {
        opportunity: {
            title: "The Investment Opportunity",
            subtitle: "A seamless way to enter the EV ecosystem with guaranteed monthly returns.",
        }
    };

    const cards = [
        {
            heading: (
                <>
                    You <span className="text-green-500">purchase</span> the <span className="text-green-500">EVs</span>
                </>
            ),
            content: (
                <>
                    Choose your investment slab.<br />
                    Each slab equals a specific number of EVs.
                    <br />
                    Ownership Tax invoices are shared with you for 100% transparency
                </>
            ),
            image: "/images/card13.jpg",
            showDots: false
        },
        {
            heading: (
                <>
                    Lease it <span className="text-green-500">back to us</span>
                </>
            ),
            content: "A notarized lease agreement is signed where you lease vehicles to the company for 4 years. Fixed monthly rental per vehicle for the entire term, irrespective of daily utilization.",
            image: "/images/card12.jpg",
            showDots: false
        },
        {
            heading: (
                <>
                    We <span className="text-green-500">Deploy</span> & <span className="text-green-500">Manage</span>
                </>
            ),
            content: (
                <>
                    Our team handles driver onboarding, routing, charging, maintenance, insurance and legal compliances. Vehicles are deployed to fleet owners working with:
                </>
            ),
            image: "/images/card11.jpg",
            isPartnerCard: true // Flag to show logos
        },
        {
            heading: (
                <>
                    Monthly Rental for <span className="text-green-500">4 Years</span>
                </>
            ),
            content: (
                <>
                    Rent will be transferred directly to your bank account every month.
                    <br />
                    Salvage value on Invested amount after 48 months.
                </>
            ),
            image: "/images/card14.jpg",
            showDots: false
        }
    ];

    return (
        <section id="opportunity" className="bg-white py-20 shadow-xl shadow-blue-300">
            <div className="container mx-auto px-4">
                {/* Header Section */}
                <div className="mx-auto max-w-5xl text-center">
                    <h2 className="text-3xl font-bold text-[#050505] sm:text-4xl">{content.opportunity.title}</h2>
                    <p className="mt-4 text-lg text-[#1b1b1b]">{content.opportunity.subtitle}</p>
                </div>

                {/* Cards Grid - Using the 'cards' array */}
                <div className="mt-12 grid gap-6 md:grid-cols-2 lg:grid-cols-4">
                    {cards.map((card, index) => (
                        <div
                            key={index}
                            className="flex min-h-[420px] flex-col rounded-3xl border border-[#e4e7ec] bg-white p-6 text-left shadow-card hover:shadow-lg transition-shadow duration-300"
                        >
                            {/* Step number */}
                            <div className="mb-4 flex justify-left">
                                <div className="flex h-10 w-10 items-center justify-center rounded-full bg-green-500 text-lg font-bold text-white shadow-md">
                                    {index + 1}
                                </div>
                            </div>

                            <div className="flex-grow">
                                <h3 className="text-2xl font-semibold text-[#050505]">
                                    {card.heading}
                                </h3>

                                {/* Special Logic for Partner Logos in Card 3 */}
                                {card.isPartnerCard ? (
                                    <div className="mt-3">
                                        <p className="text-sm text-[#1b1b1b] mb-4 leading-relaxed">
                                            {card.content}
                                        </p>
                                        <div className="flex flex-wrap items-center gap-4 opacity-80">
                                            <img src="/images/logo1.webp" alt="Zomato" className="h-6 object-contain" />
                                            <img src="/images/logo9.png" alt="Swiggy" className="h-7 object-contain" />
                                            <img src="/images/logo2.png" alt="Flipkart" className="h-5 object-contain" />
                                        </div>
                                    </div>
                                ) : (
                                    <p className="mt-3 text-sm leading-relaxed text-[#1b1b1b]">
                                        {card.content}
                                    </p>
                                )}
                            </div>

                            {/* Image Container */}
                            <div className="mt-6 overflow-hidden rounded-2xl">
                                <img
                                    src={card.image}
                                    alt={`Step ${index + 1}`}
                                    className="h-48 w-full object-cover transition-transform duration-500 hover:scale-110"
                                />
                            </div>
                        </div>
                    ))}
                </div>

                {/* Why Partner Now Section */}
                <div className="mt-16 rounded-2xl border border-[#b7f7d6]/50 bg-gradient-to-r from-[#f0f9f0]/80 to-[#edf7f7] p-6 shadow-sm max-w-4xl mx-auto">
                    <div className="flex items-center gap-4 mb-6 pb-4 border-b border-[#b7f7d6]/30">
                        <div className="w-12 h-12 bg-[#23c55e]/20 rounded-xl flex items-center justify-center flex-shrink-0">
                            <CheckCircle2 className="h-6 w-6 text-[#23c55e]" />
                        </div>
                        <h3 className="text-2xl font-bold text-green-500 flex-1">Why Partner Now?</h3>
                    </div>

                    <ul className="space-y-3 text-sm">
                        <li className="flex items-start gap-3 p-3 bg-white/60 rounded-xl hover:bg-white/80 transition-all">
                            <CheckCircle2 className="mt-1 h-4 w-4 text-[#23c55e] flex-shrink-0" />
                            <span className="text-[#1b1b1b] font-bold text-xl leading-tight">
                                Opportunity for 1,000,000+ vehicles
                            </span>
                        </li>
                        <li className="flex items-start gap-3 p-3 bg-white/60 rounded-xl hover:bg-white/80 transition-all">
                            <CheckCircle2 className="mt-1 h-4 w-4 text-[#23c55e] flex-shrink-0" />
                            <span className="text-[#1b1b1b] font-bold text-xl leading-tight">
                                Govt drive to convert last-mile deliveries to EVs by 2030
                            </span>
                        </li>
                        <li className="flex items-start gap-3 p-3 bg-white/60 rounded-xl hover:bg-white/80 transition-all">
                            <CheckCircle2 className="mt-1 h-4 w-4 text-[#23c55e] flex-shrink-0" />
                            <span className="text-[#1b1b1b] font-bold text-xl leading-tight">
                                1<sup>st</sup> Company to provide entire EV Fleet Ecosystem
                            </span>
                        </li>
                    </ul>
                </div>
            </div>
        </section>
    );
};

export default OpportunityPage;