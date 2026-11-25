import * as React from 'react'; // Fixes TS1259
import { Helmet } from "react-helmet-async";
import Header from "@/components/Header";
import Hero from "@/components/Hero";




import LeaseSteps from "@/components/LeaseSteps";

import FAQ from "@/components/FAQ";
import Footer from "@/components/Footer";
import AcceleratingMobility from "@/components/AcceleratingMobiliy";
import WhyUs from "@/components/WhyUs";

// UI Component Imports

import Partner from "@/components/Partner";
// New Component Integrated


// --- ADDING THE NEW VEHICLE SHOWCASE ---
import VehicleShowcase from "@/components/ui/lhv.tsx";

// --- ADDING THE CONTACT FORM ---
// Ensure the file exists at: src/components/ui/ContactForm.tsx
import ContactForm from "@/components/ui/contact.tsx";
import BlogPrev from "@/components/ui/BlogPrev.tsx";


const Index = () => {
    return (
        <>
        <Helmet>
        <title> EV Fleet Solutions for Businesses in India | Invest with SpeedForce EV </title>
            < meta name = "description" content = "Explore Globe (Low Speed) and Gen X (High Speed) electric vehicles for professional fleet management." />
                <meta name="keywords" content = "EV fleet, Globe EV, Gen X EV, high speed electric vehicle, low speed electric vehicle, SpeedForce EV" />
                    <link rel="canonical" href = "https://speedforceev.in" />

                        {/* Open Graph */ }
                        < meta property = "og:title" content = "SpeedForce | India's Most Reliable EV Fleet Partner" />
                            <meta property="og:description" content = "Comprehensive electric vehicle ecosystem featuring Globe and Gen X models." />
                                <meta property="og:type" content = "website" />
                                    <meta property="og:url" content = "https://speedforceev.in" />

                                        {/* Twitter Card */ }
                                        < meta name = "twitter:card" content = "summary_large_image" />
                                            <meta name="twitter:title" content = "SpeedForce EV" />
                                                <meta name="twitter:description" content = "Leading the transition to sustainable fleet operations with Globe and Gen X." />
                                                    </Helmet>

                                                    < div className = "min-h-screen bg-background text-slate-900" >
                                                        <Header />

                                                        < main >
                                                        
                                                        <Hero />

                                                        < AcceleratingMobility />

                                                        <WhyUs />

                                                        <VehicleShowcase />

                                                        <Partner />

                                                        < LeaseSteps />

                                                            <BlogPrev/>

                                                        < FAQ />

                                                        {/* --- CONTACT SECTION ADDED HERE --- */ }
                                                        < section id = "contact" className = "py-12 bg-slate-50" >
                                                            <ContactForm />
                                                            </section>

                                                            </main>
                                                            < Footer />
                                                            </div>
                                                            </>
    );
};

export default Index;