import { Helmet } from "react-helmet-async";
import { Zap, Gauge, MapPin, ChevronDown, BatteryCharging, Weight, CircleDot, ArrowUpRight, RefreshCw } from "lucide-react";
import { useNavigate } from "react-router-dom";
import { Button } from "@/components/ui/button";
import Header from "@/components/Header";
import Footer from "@/components/Footer";

const fleetData = {
    lowSpeed: [
        {
            id: "ls_group",
            type: "LOW SPEED",
            slides: [
                { name: "GLOB", Baas: "Supports", speed: "25 km/h", range: "70 km", swapping: "Supported", tire: "Tubeless", image: "/images/bike_glob.jpg", charge: "4 Hours", capacity: "140 kg", runningCost: "₹17/100km" },
                { name: "Gen Next Nanu", Baas: "Supports", speed: "25 km/h", range: "70 km", swapping: "Supported", tire: "Tubeless", image: "/images/bike_Gen Next Nanu.jpg", charge: "4 Hours", capacity: "140 kg", runningCost: "₹17/100km" },
                { name: "Wolf", Baas: "Supports", speed: "25 km/h", range: "70 km", swapping: "Supported", tire: "Tubeless", image: "/images/bike_wolf.jpg", charge: "4 Hours", capacity: "140 kg", runningCost: "₹17/100km" },
            ],
        },
    ],
    highSpeed: [
        {
            id: "hs_group",
            type: "HIGH SPEED",
            slides: [
                { name: "Gen Next Nanu Eco", Baas: "Supports", speed: "45 km/h", range: "100 km", swapping: "Supported", tire: "Tubeless", image: "/images/bike_Gen Next Nanu Eco.jpg", charge: "4 to 5 Hours", capacity: "140 kg", runningCost: "₹17/100km" },
                { name: "Wolf Eco", Baas: "Supports", speed: "45 km/h", range: "100 km", swapping: "Supported", tire: "Tubeless", image: "/images/bike_wolf eco.jpg", charge: "4 to 5 Hours", capacity: "140 kg", runningCost: "₹17/100km" },
            ],
        },
    ],
    threeWheelers: [
        { id: 3, name: "CARGO", speed: "55 km/h", range: "150 km", type: "L5 CARGO", image: "/images/cargo.png" },
        { id: 4, name: "PASSENGER", speed: "60 km/h", range: "160 km", type: "L5 PASSENGER", image: "/images/passener.png" },
    ],
};

/* ─── Stat pill ─── */
const StatPill = ({ icon: Icon, label, value }: { icon: any; label: string; value: string }) => (
    <div className= "flex items-center gap-2 bg-secondary/60 rounded-lg px-3 py-2 min-w-[120px] flex-1 border border-transparent hover:border-accent/20 transition-colors" >
    <Icon className="w-3.5 h-3.5 text-accent shrink-0" />
        <div className="overflow-hidden" >
            <p className="text-[9px] text-muted-foreground uppercase tracking-widest leading-none truncate" > { label } </p>
                < p className = "text-xs font-bold text-primary mt-0.5 truncate" > { value } </p>
                    </div>
                    </div>
);

/* ─── Inquire button ─── */
const InquireButton = ({ onClick }: { onClick: () => void }) => (
    <button
        onClick= { onClick }
className = "w-full md:w-fit py-3.5 px-8 bg-slate-900 text-white rounded-xl font-bold text-xs uppercase tracking-widest flex items-center justify-center gap-3 hover:bg-[#22C55E] transition-all duration-300"
    >
    Inquire Now < ArrowUpRight size = { 16} />
        </button>
);

/* ─── 2-Wheeler card ─── */
const TwoWheelerCard = ({
    name, Baas, speed, range, tire, image, charge, capacity, badge, swapping
}: {
    name: string; Baas: string; speed: string; range: string; tire: string;
    image: string; charge: string; capacity: string; badge: string; swapping: string;
}) => {
    const navigate = useNavigate();
    const handleInquire = () => {
        const params = new URLSearchParams({ vehicle: name, type: badge }).toString();
        navigate(`/contact?${params}`);
    };

    return (
        <div className= "group relative bg-card rounded-2xl border border-border overflow-hidden hover:border-accent/40 hover:shadow-xl transition-all duration-500 flex flex-col md:flex-row" >
        <span className="absolute top-3 left-3 z-10 text-[10px] font-bold tracking-widest uppercase bg-accent text-accent-foreground px-2.5 py-1 rounded-full shadow-sm" >
            { badge }
            </span>
            < div className = "relative w-full md:w-2/5 aspect-[4/3] md:aspect-auto bg-gradient-to-br from-secondary to-sky-light overflow-hidden shrink-0" >
                <img
                    src={ image } alt = { name }
    className = "w-full h-full object-contain p-6 md:p-8 group-hover:scale-105 transition-transform duration-700"
        />
        </div>
        < div className = "p-5 md:p-8 flex flex-col justify-center gap-4 md:gap-6 flex-1" >
            <h3 className="text-xl md:text-2xl font-bold text-primary tracking-tight" > { name } </h3>
                < div className = "grid grid-cols-2 sm:grid-cols-3 xl:grid-cols-4 gap-2 md:gap-3" >
                    <StatPill icon={ Gauge } label = "Top Speed" value = { speed } />
                        {/* Range combined into "Range Up To" label for clarity */ }
                        < StatPill icon = { MapPin } label = "Range Up To" value = { range } />
                            <StatPill icon={ BatteryCharging } label = "Charging" value = { charge } />
                                <StatPill icon={ Weight } label = "Load Capacity" value = { capacity } />
                                    <StatPill icon={ CircleDot } label = "Tyre Type" value = { tire } />
                                        <StatPill icon={ Zap } label = "BaaS" value = { Baas } />
                                            {/* NEW STAT PILL ADDED HERE */ }
                                            < StatPill icon = { RefreshCw } label = "Battery Swap" value = { swapping } />
                                                </div>
                                                < InquireButton onClick = { handleInquire } />
                                                    </div>
                                                    </div>
    );
};

/* ─── 3-Wheeler card ─── */
const ThreeWheelerCard = ({
    name, speed, range, type, image,
}: {
    name: string; speed: string; range: string; type: string; image: string;
}) => {
    const navigate = useNavigate();
    const handleInquire = () => {
        const params = new URLSearchParams({ vehicle: name, type }).toString();
        navigate(`/contact?${params}`);
    };

    return (
        <div className= "group relative bg-card rounded-2xl border border-border overflow-hidden hover:border-accent/40 hover:shadow-xl transition-all duration-500 flex flex-col md:flex-row" >
        <span className="absolute top-3 left-3 z-10 text-[10px] font-bold tracking-widest uppercase bg-primary text-primary-foreground px-2.5 py-1 rounded-full shadow-sm" >
            { type }
            </span>
            < div className = "relative w-full md:w-2/5 aspect-[4/3] md:aspect-auto bg-gradient-to-br from-secondary to-sky-light overflow-hidden shrink-0" >
                <img
                    src={ image } alt = { name }
    className = "w-full h-full object-contain p-6 md:p-8 group-hover:scale-105 transition-transform duration-700"
        />
        </div>
        < div className = "p-5 md:p-8 flex flex-col justify-center gap-4 md:gap-6 flex-1" >
            <h3 className="text-xl md:text-2xl font-bold text-primary tracking-tight" > { name } </h3>
                < div className = "grid grid-cols-2 sm:grid-cols-3 gap-2 md:gap-3" >
                    <StatPill icon={ Gauge } label = "Top Speed" value = { speed } />
                        <StatPill icon={ MapPin } label = "Range Up To" value = { range } />
                            <StatPill icon={ Zap } label = "Powertrain" value = "Electric" />
                                </div>
                                < InquireButton onClick = { handleInquire } />
                                    </div>
                                    </div>
    );
};

/* ─── Section heading ─── */
const SectionHeading = ({ label, title, subtitle }: { label: string; title: string; subtitle?: string }) => (
    <div className= "mb-8 md:mb-12 px-4 md:px-0" >
    <span className="inline-block text-[10px] font-bold tracking-[0.2em] uppercase text-accent mb-2" > { label } </span>
        < h2 className = "text-2xl md:text-4xl font-bold text-primary tracking-tight" > { title } </h2>
{ subtitle && <p className="text-sm md:text-base text-muted-foreground mt-2 max-w-xl" > { subtitle } </p> }
<div className="mt-4 h-px bg-gradient-to-r from-accent/40 to-transparent" />
    </div>
);

/* ─── Main Page ─── */
const Vehicles = () => {
    const lowSpeedSlides = fleetData.lowSpeed.flatMap((g) => g.slides);
    const highSpeedSlides = fleetData.highSpeed.flatMap((g) => g.slides);

    return (
        <div className= "min-h-screen bg-background flex flex-col" >
        <Helmet>
        <title>Electric Vehicles for Lease | Speedforce EV </title>
            < meta name = "description" content = "Browse our range of electric scooters, e-bikes, and commercial EVs available for lease." />
                </Helmet>

                < Header />

                <main className="flex-grow" >
                    {/* ── Hero ── */ }
                    < section className = "relative w-full h-[60vh] md:h-[75vh] min-h-[400px] overflow-hidden" >
                        <img
                        src="/images/BGIMAG.jpg"
    alt = "Electric vehicles fleet"
    className = "absolute inset-0 w-full h-full object-cover"
        />
        <div className="absolute inset-0 bg-gradient-to-t md:bg-gradient-to-br from-primary/95 via-primary/70 to-transparent" />
            <div className="relative z-10 h-full flex flex-col justify-end pb-12 px-5 md:px-12 lg:px-20 max-w-7xl mx-auto" >
                <p className="text-[10px] md:text-xs font-bold tracking-[0.25em] uppercase text-accent mb-2" > Speedforce EV Fleet Official 2026 </p>
                    < h1 className = "text-3xl md:text-6xl font-bold text-white leading-tight max-w-2xl" >
                        Electric Vehicles < br className = "hidden md:block" />for Every Mile
                            </h1>
                            < p className = "text-white/80 mt-3 text-sm md:text-lg max-w-xl leading-relaxed" >
                            Lease zero - emission 2 - wheelers and 3 - wheelers — built for delivery, commute, and commercial operations.
                        </p>
                                < div className = "mt-6 flex items-center gap-2 text-white/50 text-xs animate-bounce" >
                                    <ChevronDown className="w-4 h-4" />
                                        <span>Explore fleet below </span>
                                            </div>
                                            </div>
                                            </section>

    {/* ── Fleet Sections ── */ }
    <div className="px-4 md:px-8 max-w-7xl mx-auto" >
        {/* LOW SPEED */ }
        < section className = "py-12 md:py-20" >
            <SectionHeading
                            label="2-Wheeler · Segment 01"
    title = "Low Speed Scooters"
    subtitle = "Ideal for last-mile delivery and campus mobility. No license required for most 25 km/h models."
        />
        <div className="flex flex-col gap-8 md:gap-12" >
        {
            lowSpeedSlides.map((v) => (
                <TwoWheelerCard key= { v.name } { ...v } badge = "Low Speed" />
                            ))
        }
            </div>
            </section>

            < hr className = "border-border/60" />

                {/* HIGH SPEED */ }
                < section className = "py-12 md:py-20" >
                    <SectionHeading
                            label="2-Wheeler · Segment 02"
    title = "High Speed Scooters"
    subtitle = "Greater agility and speed for urban roads. Built for productivity-focused riders."
        />
        <div className="flex flex-col gap-8 md:gap-12" >
        {
            highSpeedSlides.map((v) => (
                <TwoWheelerCard key= { v.name } { ...v } badge = "High Speed" />
                            ))
        }
            </div>
            </section>

            < hr className = "border-border/60" />

                {/* THREE WHEELERS */ }
                < section className = "py-12 md:py-20" >
                    <SectionHeading
                            label="3-Wheeler · L5 Category"
    title = "Three-Wheeler Fleet"
    subtitle = "Commercial-grade cargo and passenger vehicles for large-scale fleet operations."
        />
        <div className="flex flex-col gap-8 md:gap-12" >
        {
            fleetData.threeWheelers.map((v) => (
                <ThreeWheelerCard key= { v.id } { ...v } />
                            ))
        }
            </div>
            </section>
            </div>

    {/* ── CTA ── */ }
    <section className="py-16 bg-slate-900 text-white px-5" >
        <div className="max-w-4xl mx-auto text-center" >
            <h2 className="text-2xl md:text-4xl font-bold mb-4 text-blue-500" >
                Lease Electric Vehicles with SpeedforceEV
                </h2>
                < p className = "text-sm md:text-lg text-slate-300 mb-8 max-w-2xl mx-auto" >
                    Flexible leasing packages with maintenance and insurance included — for individuals and fleets alike.
                        </p>
                        < div className = "flex justify-center" >
                            <a href="/contact" className = "w-full md:w-auto" >
                                <Button variant="outline" className = "w-full md:w-auto bg-white text-black hover:bg-accent border-none py-6 px-10 rounded-xl font-bold" >
                                    Start Leasing Today
                                        </Button>
                                        </a>
                                        </div>
                                        </div>
                                        </section>
                                        </main>

                                        < Footer />
                                        </div>
    );
};

export default Vehicles;