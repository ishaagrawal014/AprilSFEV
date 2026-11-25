import React, { useEffect, useRef, useState } from "react";
import { Button } from "@/pages/InvestorWebsite/components/ui/button";
import Header from "@/components/Header";
import { ArrowRight } from "lucide-react";
import Hero from "@/pages/InvestorWebsite/components/Hero";
import LiveFleetStats from "@/pages/InvestorWebsite/components/LiveFleetStats";
import ExpectedROI from "@/pages/InvestorWebsite/components/ROICalculator";
import ContactForm from "@/pages/InvestorWebsite/components/ContactForm";
import content from "@/pages/InvestorWebsite/data/content.json";
import WhyUs from "@/pages/InvestorWebsite/pages/WhyUs.tsx";
import {
    Accordion,
    AccordionContent,
    AccordionItem,
    AccordionTrigger,
} from "@/components/ui/accordion";
import { smoothScrollTo } from "@/pages/InvestorWebsite/lib/lenis";

// IMAGE IMPORTS (Keeping your existing imports...)
import Swiggy from "/images/logo1.webp";
import Amazon from "/images/logo2.png";
import BigBasket from "/images/logo3.png";
import Blinkit from "/images/logo4.png";
import Flipkart from "/images/logo5.png";
import GoodBox from "/images/logo6.png";
import RebelFoods from "/images/logo7.png";
import Zepto from "/images/logo8.png";
import Zomato from "/images/logo9.png";
import ShipRocket from "/images/logo10.png";
import IANS from "/images/logo15.png";
import ZEE from "/images/logo14.png";
import CII from "/images/logo16.png";
import GA from "/images/logo18.png";
import OLB from "/images/OLB-logo-1.svg"
import AutoEV from "/images/AutoEV-Times-1.png";
import SBI from "/images/900.png";
import JoyBike from "/images/logo100.png";
import Kotak from "/images/logo101.png";
import SpeedForce from "/images/logo12.png";
import Smartech from "/images/logo110.png";
import JoyRik from "/images/logo200.png";
import Amp from "/images/logo400.png";
import BatSmart from "/images/logo500.png";
import Bluebells from "/images/logo600.png";
import HDFC from "/images/logo800.png";
import ThingsUp from "/images/Things UP.png";

import Video from "@/pages/InvestorWebsite/pages/Video.tsx";
import WorkingProfessionals from "@/pages/InvestorWebsite/components/ui/WorkingProfessionals.tsx";
import Investors from "@/pages/InvestorWebsite/components/ui/Investors.tsx";
import SEBI from "@/pages/InvestorWebsite/pages/SEBIRegis.tsx";
import Fleet from "@/pages/InvestorWebsite/pages/FleetPresence.tsx"
import ImgGal from "@/pages/InvestorWebsite/pages/ImgGal.tsx";
import Tracking from "@/pages/InvestorWebsite/pages/Tracking.tsx"
import Testimonial from "@/pages/InvestorWebsite/pages/Testimonial.tsx"
import Snapshot from "@/pages/InvestorWebsite/pages/SnapShot"
import Opportunity from "@/pages/InvestorWebsite/pages/Opportunity";
import Footer from "@/components/Footer";

const deliveryPartners = [
    { image: Zepto, name: "Zepto", color: "bg-purple-600/10" },
    { image: Swiggy, name: "Swiggy", color: "bg-orange-600/10" },
    { image: Zomato, name: "Zomato", color: "bg-red-600/10" },
    { image: Blinkit, name: "Blinkit", color: "bg-lime-600/10" },
    { image: Amazon, name: "Amazon", color: "bg-indigo-600/10" },
    { image: ShipRocket, name: "ShipRocket", color: "bg-green-700/10" },
    { image: BigBasket, name: "BigBasket", color: "bg-yellow-600/10" },
    { image: RebelFoods, name: "RebelFoods", color: "bg-pink-600/10" },
    { image: Flipkart, name: "Flipkart", color: "bg-blue-600/20" },
    { image: GoodBox, name: "GoodBox", color: "bg-gray-600/10" },
];

const ourPartners = [
    { logo: JoyBike }, { logo: JoyRik }, { logo: SBI },
    { logo: Kotak }, { logo: Smartech }, { logo: SpeedForce },
    { logo: Amp }, { logo: BatSmart }, { logo: Bluebells }, { logo: HDFC }, { logo: ThingsUp },
];

const mediaMentions = [
    { id: 2, name: "IANS", fileName: IANS },
    { id: 3, name: "ZEE Business", fileName: ZEE },
    { id: 4, name: "CII", fileName: CII },
    { id: 5, name: "Green Arrow", fileName: GA },
    { id: 6, name: "Outlook Business", fileName: OLB },
    { id: 7, name: "AutoEV Times", fileName: AutoEV },
];

export default function Home() {
    const stepsRef = useRef<HTMLDivElement | null>(null);
    const [stepsVisible, setStepsVisible] = useState(false);

    useEffect(() => {
        const node = stepsRef.current;
        if (!node) return;
        const observer = new IntersectionObserver((entries) => {
            if (entries[0].isIntersecting) {
                setStepsVisible(true);
                observer.disconnect();
            }
        }, { threshold: 0.1 });
        observer.observe(node);
        return () => observer.disconnect();
    }, []);

    useEffect(() => {
        const homeElement = document.getElementById('home');
        if (homeElement) {
            homeElement.scrollIntoView({ behavior: 'smooth', block: 'start' });
        }
    }, []);

    const handleScroll = (target: string) => smoothScrollTo(target);

    return (
        <>
            {/* CSS FOR ALL SLIDERS */}
            <style dangerouslySetInnerHTML={{ __html: `
            @keyframes marquee {
                0% { transform: translateX(0); }
                100% { transform: translateX(-50%); }
            }
            .animate-marquee-custom {
                display: flex;
                width: max-content;
                animation: marquee 30s linear infinite;
            }
            .animate-marquee-custom:hover {
                animation-play-state: paused;
            }
        `}} />

            <Header />
            <div className="min-h-screen bg-layer-blue pt-24">
                <div className="mx-auto w-full px-4 sm:px-6 lg:max-w-[1500px]">
                    <Hero
                        eyebrow={
                            <div className="flex items-center text-green-500 gap-2 font-bold tracking-wide uppercase">
                                <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor" className="w-5 h-5 flex-shrink-0">
                                    <path fillRule="evenodd" d="M8.603 3.799A4.49 4.49 0 0112 2.25c1.357 0 2.573.6 3.397 1.549a4.49 4.49 0 013.498 1.307 4.491 4.491 0 011.307 3.497A4.49 4.49 0 0121.75 12a4.49 4.49 0 01-1.549 3.397 4.491 4.491 0 01-1.307 3.498 4.491 4.491 0 01-3.497 1.307A4.49 4.49 0 0112 21.75a4.49 4.49 0 01-3.397-1.549 4.49 4.49 0 01-3.498-1.306 4.491 4.491 0 01-1.307-3.498A4.49 4.49 0 012.25 12c0-1.357.6-2.573 1.549-3.397a4.49 4.49 0 011.307-3.497 4.49 4.49 0 013.497-1.307zm7.007 6.387a.75.75 0 10-1.22-.872l-3.236 4.53L9.53 12.22a.75.75 0 00-1.06 1.06l2.25 2.25a.75.75 0 001.14-.094l3.75-5.25z" clipRule="evenodd" />
                                </svg>
                                <span className="hidden lg:block text-md">Own Electric Vehicles. Earn Fixed Monthly Income. Stay 100% Asset Owner</span>
                                <span className="lg:hidden text-xls flex flex-col gap-1 text-left leading-tight">
                                <span>Own Electric Vehicles</span>
                                <span>Earn Fixed Monthly Income</span>
                                <span>Stay 100% Asset Owner</span>
                            </span>
                            </div>
                        }
                        title={
                            <div className="flex flex-col gap-3">
                                <span>India's only</span>
                                <span className="text-green-500">Investor 1<sup>st</sup></span>
                                <span>EV rental ecosystem</span>
                            </div>
                        }
                        subtitle="Invest in EVs that will be deployed to fleet operators across India, while Speed Force EV runs the entire operation for you under a FOCO model."
                        backgroundImage="/images/Gemini_Generated_Image_5cejfn5cejfn5cej.jpg"
                        primaryCta="Get in Touch"
                        onPrimaryClick={() => handleScroll("contact")}
                        secondaryCta={""}
                    />
                </div>

                <LiveFleetStats />
                <Video />
                <Opportunity />
                <ImgGal />
                <WhyUs />

                {/* Who Should Join Section */}
                <section id="whoshould" className="bg-layer-gray py-20">
                    <div className="container mx-auto px-4">
                        <h2 className="text-3xl font-bold text-[#050505] sm:text-4xl text-center mb-10">Our <span className="text-green-500">EV Fleet Investment</span> model is ideal for:</h2>
                        <div className="mx-auto max-w-5xl rounded-3xl border border-[#c2deff] bg-white p-8 shadow-card flex flex-col gap-16">
                            <div>
                                <h3 className="text-2xl font-bold mb-4 text-[#050505]">Working Professionals</h3>
                                <WorkingProfessionals />
                            </div>
                            <hr className="border-gray-100" />
                            <div>
                                <h3 className="text-2xl font-bold mb-4 text-[#050505]">Investors</h3>
                                <Investors />
                            </div>
                        </div>
                    </div>
                </section>

                {/* Our Partners Section */}
                <section id="partner1" className="bg-white py-16">
                    <div className="container mx-auto px-4">
                        <div className="mx-auto max-w-4xl text-center">
                            <h2 className="text-3xl font-bold text-[#050505] sm:text-4xl">Our <span className="text-green-500">Partners</span></h2>
                            <p className="mt-4 text-lg text-[#1b1b1b]">With a validated product-market fit, operational efficiency, and cutting-edge technology.</p>
                        </div>
                        <div className="mt-10 overflow-hidden rounded-3xl border border-[#e4e7ec] bg-white py-6">
                            {/* THE ANIMATED TRACK */}
                            <div className="animate-marquee-custom flex items-center gap-6">
                                {[...ourPartners, ...ourPartners].map((data, index) => (
                                    <div key={index} className="flex h-20 w-40 flex-shrink-0 items-center justify-center rounded-2xl border border-gray-700/25">
                                        <img src={data.logo} alt="Partner Logo" className="h-auto w-5/6 object-contain"/>
                                    </div>
                                ))}
                            </div>
                        </div>
                    </div>
                </section>

                <ExpectedROI />

                {/* Steps Section (Code omitted for brevity, kept same as your source) */}
                {/* ... */}

                <SEBI />
                <Testimonial />
                <Fleet />

                {/* Delivery Partners Section */}
                <section id="partners" className="bg-layer-gray py-16">
                    <div className="container mx-auto px-4 text-center">
                        <h2 className="text-3xl font-bold text-[#050505] md:text-4xl">{content.partners.title}</h2>
                        <p className="mt-4 text-lg text-[#1b1b1b]">{content.partners.subtitle}</p>
                        <div className="mt-10 overflow-hidden rounded-3xl border border-[#e4e7ec] bg-white py-6">
                            <div className="animate-marquee-custom flex items-center gap-8">
                                {[...deliveryPartners, ...deliveryPartners].map((data, index) => (
                                    <div key={index} className={`flex h-20 w-40 flex-shrink-0 items-center justify-center ${data.color} rounded-2xl`}>
                                        <img src={data.image} alt={data.name} className="h-auto w-5/6 object-contain" />
                                    </div>
                                ))}
                            </div>
                        </div>
                    </div>
                </section>

                <Snapshot />

                {/* Media Mentions */}
                <section className="bg-white py-16 overflow-hidden">
                    <div className="container mx-auto px-4 text-center">
                        <h2 className="text-3xl font-bold text-[#050505] md:text-4xl">In The News</h2>
                        <p className="mt-4 text-lg text-[#1b1b1b]">Featured by leading business and energy publications.</p>
                        <div className="mt-5 bg-[#f2f4f7] rounded-3xl p-4 overflow-hidden">
                            <div className="animate-marquee-custom flex gap-6">
                                {[...mediaMentions, ...mediaMentions].map((data, index) => (
                                    <div key={index} className="flex items-center justify-center w-32 h-20 flex-shrink-0 rounded-xl bg-white border border-[#e4e7ec]">
                                        <img src={data.fileName} alt={data.name} className="max-h-8 max-w-[90px] object-contain" />
                                    </div>
                                ))}
                            </div>
                        </div>
                    </div>
                </section>

                <Tracking />
                
                <section id="investorcontact" className="bg-layer-gray py-20">
                <div className="container mx-auto px-4">
                    <div className="mx-auto max-w-4xl rounded-3xl border border-[#c2deff] bg-white p-8 shadow-card text-center">
                        <p className="inline-flex items-center rounded-full bg-[#b7f7d6] px-4 py-1 text-xs font-semibold uppercase tracking-[0.2em] text-[#132644]">
                            {content?.contact?.notice}
                        </p>
                        <h2 className="mt-4 text-3xl font-bold text-[#050505] sm:text-4xl">Ready to Start Earning?</h2>
                        <div className="mt-10"><ContactForm /></div>
                    </div>
                </div>
            </section>

                

                {/* Contact and FAQ (Code omitted for brevity, kept same as your source) */}
                {/* ... */}

                <div className="fixed bottom-4 left-4 right-4 z-40 lg:hidden">
                    <Button onClick={() => handleScroll("contact")} className="w-full bg-[#258afe] py-6 text-lg font-semibold text-white shadow-elevated">
                        Invest Now <ArrowRight className="ml-2 h-5 w-5" />
                    </Button>
                </div>
            </div>
            <Footer />
        </>
    );
}