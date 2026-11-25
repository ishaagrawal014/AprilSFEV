import React from "react";
import { ClipboardList, FileCheck, Truck, ArrowRight } from "lucide-react";
import { Button } from "@/components/ui/button";

const LeaseSteps = () => {
    const steps = [
        {
            number: "01",
            icon: <ClipboardList className="w-6 h-6 text-green-600" />,
            title: "Define Your Fleet",
            description: "Select the vehicle make, model, lease tenure, and required fleet size through our website.",
        },
        {
            number: "02",
            icon: <FileCheck className="w-6 h-6 text-green-600" />,
            title: "KYC & Documentation",
            description: "Complete the paperless KYC process by submitting your company details and receive approval within 48 hours.",
        },
        {
            number: "03",
            icon: <Truck className="w-6 h-6 text-green-600" />,
            title: "Vehicle Delivery",
            description: "Vehicles are delivered through the nearest authorized dealer at your preferred location.",
        },
    ];

    return (
        <section className="py-20 bg-white text-slate-900 relative">
            {/* Background Image with Overlay */}
            <div 
                className="absolute inset-0 bg-cover bg-center bg-no-repeat"
                style={{
                    backgroundImage: "url('/images/stepsbg.jpg')",
                }}
            >
                {/* Overlay for better text readability */}
                <div className="absolute inset-0 bg-gray/50"></div>
            </div>

            <div className="container max-w-6xl mx-auto px-4 relative z-10">
                {/* Header Section */}
                <div className=" text-center max-w-2xl mx-auto mb-20">
                    <h2 className="text-white text-3xl md:text-4xl font-extrabold tracking-tight mb-4 text-slate-800">
                        Lease in 3 Easy Steps
                    </h2>
                    <p className="text-white text-lg text-slate-600">
                        Get your electric fleet running in no time with our simplified,
                        fully digital leasing process.
                    </p>
                </div>

                <div className="relative">
                    {/* Horizontal connecting line (Desktop Only) */}
                    <div className="hidden lg:block absolute top-12 left-[15%] right-[15%] h-px bg-slate-200" />

                    <div className="grid md:grid-cols-3 gap-12 relative">
                        {steps.map((step, index) => (
                            <div key={index} className="group flex flex-col items-center text-center">

                                {/* Number Circle */}
                                <div className="relative z-10 flex items-center justify-center w-24 h-24 mb-8 bg-white border border-slate-200 rounded-full shadow-sm group-hover:border-green-500 transition-colors duration-300">
                                    <div className="flex flex-col items-center">
                                        <span className="text-xs font-bold text-slate-400 uppercase tracking-widest mb-1">Step</span>
                                        <span className="text-2xl font-black text-slate-800 leading-none">{step.number}</span>
                                    </div>

                                    {/* Arrow Indicator for Desktop */}
                                    {index < steps.length - 1 && (
                                        <div className="hidden lg:block absolute -right-16 top-1/2 -translate-y-1/2">
                                            <ArrowRight className="text-slate-300 w-6 h-6" />
                                        </div>
                                    )}
                                </div>

                                {/* Icon & Content Box */}
                                <div className="bg-white/80 p-8 rounded-2xl shadow-sm border border-slate-100 hover:shadow-md transition-shadow duration-300 w-full">
                                    <div className="w-12 h-12 mx-auto bg-green-50 rounded-lg flex items-center justify-center mb-5">
                                        {step.icon}
                                    </div>

                                    <h3 className="text-xl font-bold mb-3 text-slate-800">
                                        {step.title}
                                    </h3>

                                    <p className="text-sm text-slate-500 leading-relaxed">
                                        {step.description}
                                    </p>
                                </div>
                            </div>
                        ))}
                    </div>
                </div>

                {/* Call to Action */}
                <div className="text-center mt-16">
                <a href="/contact">
                    <Button
                        className="bg-green-600 hover:bg-green-700 text-white px-10 py-6 text-lg rounded-full transition-all hover:scale-15"
                    >
                        Start Leasing Today
                    </Button>
                    </a>
                </div>
            </div>
        </section>
    );
};

export default LeaseSteps;