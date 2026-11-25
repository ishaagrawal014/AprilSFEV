import { Leaf, TrendingUp, Bike, BadgeIndianRupee, Zap } from "lucide-react";
import { Card } from "@/pages/InvestorWebsite/components/ui/card";
import bgVideo from "@/pages/InvestorWebsite/assets/bgvideo.mp4";
import imag from "/images/5.png";


const CounterData = [
    {
        icon: <BadgeIndianRupee className="h-6 w-6 text-[#23c55e]" />,
        value: "15+ Years",
        title: "In Automotive Industry",
    },
    {
        icon: <Bike className="h-6 w-6 text-[#23c55e]" />,
        value: "India's only EV fleet ecosystem provider",
        title: "",
    },
    {
        icon: <Leaf className="h-6 w-6 text-[#23c55e]" />,
        value: "Govt Backed Industry",
        title: "Supported by National & State Policies",
    },
    {
        icon: <TrendingUp className="h-6 w-6 text-[#23c55e]" />,
        value: "Serving 5,000+ Pincodes",
        title: "Spread across the Nation",
    },
    {
        icon: <Zap className="h-6 w-6 text-[#23c55e]" />,
        value: "Launching 15,000 EVs",
        title: "In Phase 1 by 2026",
    },
];

export default function WhyEV() {
    return (
        <div className="py-20 bg-background relative overflow-hidden" id="whyev">
            <video className="absolute inset-0 w-full h-full object-cover z-0 opacity-30 pointer-events-none" autoPlay controls={false} loop muted>
                <source src={bgVideo} type="video/mp4" />
            </video>
            <div className="container mx-auto px-4 relative z-30 overflow-hidden">
                {/* Header */}
                <div className="text-center max-w-2xl mx-auto mb-16">
                    <h2 className="text-4xl font-bold mb-4">
                        Why Now? <span className="text-green-500">Why EV?</span>
                    </h2>
                    <div className="w-24 h-1 bg-green-500 mx-auto rounded-full mb-6"></div>
                   
                </div>

                {/* Layout */}
                <div className="grid lg:grid-cols-2 gap-12">

                    {/* Counter Cards */}
                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
                        {CounterData.map((item, index) => (
                            <Card
                                key={index}
                                className="p-6 hover-lift animate-fade-up"
                                style={{ animationDelay: `${index * 0.1}s` }}
                            >
                                <div className="flex gap-4">
                                    <div className="h-12 w-12 rounded bg-green-500/10 flex items-center justify-center">
                                        {item.icon}
                                    </div>

                                    <div>
                                        <div className="text-xl font-bold">{item.value}</div>
                                        <p className="text-muted-foreground text-sm">{item.title}</p>
                                    </div>
                                </div>
                            </Card>
                        ))}
                    </div>

                    {/* Image */}
                    <div className="flex items-center justify-center h-17">
                        <img
                            src={imag}
                            alt="EV Achievements"
                        />
                    </div>
                </div>
            </div>
        </div>
    );
}