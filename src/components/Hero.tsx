import { Button } from "@/components/ui/button";
import { Zap, MapPin, Leaf } from "lucide-react";

const Hero = () => {
    const statsData = [
        {
            label: "Deployed Vehicles",
            value: "14,000+",
            icon: MapPin,
            color: "text-blue-400"
        },
        {
            label: "Green Kilometers",
            value: "17,500,000+",
            icon: Leaf,
            color: "text-emerald-400"
        }
    ];

    return (
        <section 
        id="hero"
        className="relative min-h-screen flex items-center pt-24 md:pt-20 overflow-hidden">
            {/* Background Image */}
            <div className="absolute inset-0">
                <img
                    src="/images/BG IMAGE.jpg"
                    alt="Background"
                    className="w-full h-full object-cover object-center"
                />
                <div className="absolute inset-0 bg-black/50 md:bg-black/40" />
            </div>

            <div className="container-alt relative z-10 py-12 md:py-16 lg:py-24 px-4 md:px-6">
                <div className="grid lg:grid-cols-2 gap-8 md:gap-12 items-center">
                    {/* Content */}
                    <div className="space-y-6 md:space-y-8">
                        <div className="inline-flex items-center gap-2 px-3 py-2 md:px-4 md:py-2 bg-green-500/20 backdrop-blur-sm border border-green-500/30 rounded-full">
                            <Zap className="w-3 h-3 md:w-4 md:h-4 text-green-400 flex-shrink-0" />
                            <span className="text-xs md:text-sm font-medium text-white">Building India's Largest Green Fleet Ecosystem</span>
                        </div>

                        <h1 className="text-3xl sm:text-4xl md:text-5xl lg:text-6xl font-bold text-white leading-tight animate-fade-in">
                            <span className="block sm:inline">India's Fastest Growing</span>{" "}
                            <span className="relative inline-block">
                                EV Leasing
                                <svg className="absolute -bottom-1 md:-bottom-2 left-0 w-full" viewBox="0 0 200 12" fill="none">
                                    <path d="M2 8C50 2 150 2 198 8" stroke="#22c55e" strokeWidth="4" strokeLinecap="round" />
                                </svg>
                            </span>{" "}
                            <span className="block mt-2 sm:mt-0 sm:inline">& Asset Management Ecosystem</span>
                        </h1>
                        
                        <p className="text-base md:text-lg lg:text-xl text-gray-200 max-w-xl animate-fade-in stagger-1">
                            We offer end-to-end electric vehicle leasing and lifecycle management solutions for businesses, fleet partners, and individual drivers.
                        </p>

                        {/* Buttons — hidden on mobile (shown in sticky bar instead), visible on sm+ */}
                        <div className="hidden sm:flex flex-row flex-wrap gap-3  md:gap-4 animate-fade-in stagger-2">
                            <Button variant="gold" size="lg" asChild>
                                <a href="/contact">Start Leasing</a>
                            </Button>
                            <Button variant="outline" size="lg" className="text-white border-white hover:bg-white/10" asChild>
                                <a href="/vehicles">Fleet Partner Program</a>
                            </Button>
                        </div>

                        {/* Fleet Stats */}
                        <div className="grid grid-cols-2 gap-3 md:gap-4 pt-6 md:pt-8 border-t border-white/20 animate-fade-in stagger-3">
                            {statsData.map((stat) => (
                                <div
                                    key={stat.label}
                                    className="rounded-lg md:rounded-xl border border-white/30 bg-white/10 backdrop-blur-md px-3 py-3 md:px-4 md:py-4 hover:bg-white/15 transition-all"
                                >
                                    <div className="flex items-center justify-between mb-1 md:mb-2">
                                        <span className="text-[10px] md:text-xs font-semibold text-white/80 leading-tight">
                                            {stat.label}
                                        </span>
                                    </div>
                                    <div className="text-xl sm:text-2xl md:text-3xl font-bold text-white">
                                        {stat.value}
                                    </div>
                                </div>
                            ))}
                        </div>
                    </div>
                </div>
            </div>

            {/* ── Mobile sticky bottom bar (hidden on sm+) ── */}
            <div className="fixed bottom-0 left-0 right-0 z-50 sm:hidden   px-4 py-3 flex flex-col gap-2">
                <Button variant="outline" size="lg" className="w-full  backdrop-blur-md text-black bg-white/60 border-white/60 hover:bg-white/10" asChild>
                    <a href="/contact">Start Leasing</a>
                </Button>
                <Button variant="gold" size="lg" className="w-full" asChild>
                    <a href="/fleet-investment"><span className="text-[#EAB308] text-lg leading-none font-black drop-shadow-sm" >₹</span> Fleet Partner Program</a>
                </Button>
            </div>
        </section>
    );
};

export default Hero;