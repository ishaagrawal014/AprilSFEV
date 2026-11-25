import React from 'react';

const TermsAndConditions = () => {
    const sections = [
        {
            title: "1. Acceptance of Terms",
            content: "By accessing the SpeedForce EV Fleet platform or utilizing our electric vehicle services, you agree to be bound by these Terms and Conditions, all applicable laws, and regulations in India."
        },
        {
            title: "2. Fleet Usage & Restrictions",
            content: "Vehicles must be used solely for the purposes agreed upon (e.g., last-mile delivery, corporate commute). Users are prohibited from using vehicles for racing, towing, or sub-leasing without written consent from SpeedForce EV."
        },
        {
            title: "3. Battery & Charging Policy",
            content: "Drivers are responsible for maintaining the battery state of charge (SoC) between 20% and 80% for optimal health. Allowing the battery to fall below 10% may result in negligence fees. Only authorized charging infrastructure or battery swapping stations may be used."
        },
        {
            title: "4. Maintenance & Repairs",
            content: "SpeedForce EV handles routine maintenance. However, damage resulting from misuse, overloading, or unauthorized repairs will be the sole financial responsibility of the user/partner."
        },
        {
            title: "5. Telematics & Data Privacy",
            content: "All fleet vehicles are equipped with IoT devices. We monitor real-time location, speed, and battery health to ensure safety and operational efficiency. By using our fleet, you consent to this data collection."
        },
        {
            title: "6. Insurance & Liability",
            content: "Vehicles are covered under commercial insurance. In the event of an accident, the user must provide a police report (FIR) within 24 hours. The user is liable for the insurance deductible/excess amount."
        }
    ];

    return (
        <div className="bg-gray-50 min-h-screen py-12 px-4 sm:px-6 lg:px-8 font-sans">
            <div className="max-w-4xl mx-auto bg-white shadow-xl rounded-2xl overflow-hidden">
                {/* Header */}
                <div className="bg-green-600 p-8 text-white text-center">
                    <h1 className="text-3xl font-bold uppercase tracking-wide">SpeedForce EV Fleet</h1>
                    <p className="mt-2 opacity-90 italic">Terms and Conditions of Service</p>
                    <p className="text-sm mt-4">Last Updated: March 2026</p>
                </div>

                {/* Content */}
                <div className="p-8 sm:p-12">
                    <p className="text-gray-600 mb-8 leading-relaxed">
                        Welcome to SpeedForce EV. These terms govern the use of our electric vehicle fleet and
                        integrated mobility solutions. Please read them carefully before commencing operations.
                    </p>

                    <div className="space-y-10">
                        {sections.map((section, index) => (
                            <section key={index} className="border-l-4 border-green-500 pl-6">
                                <h2 className="text-xl font-semibold text-gray-800 mb-3">
                                    {section.title}
                                </h2>
                                <p className="text-gray-600 leading-relaxed">
                                    {section.content}
                                </p>
                            </section>
                        ))}
                    </div>

                    {/* Footer Note */}
                    <div className="mt-16 pt-8 border-t border-gray-200">
                        <h3 className="text-lg font-medium text-gray-900">Contact Us</h3>
                        <p className="text-gray-600 mt-2">
                            For legal inquiries regarding these terms, please contact:<br />
                            <span className="font-semibold text-green-700">legal@speedforceev.in</span><br />
                            Signet Hub, Akshar Chowk, Vadodara, Gujarat.
                        </p>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default TermsAndConditions;