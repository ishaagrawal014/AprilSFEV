import React from 'react';
import { AlertTriangle, ShieldCheck, Zap } from 'lucide-react'; // Optional: if using lucide-react

const DisclaimerPage = () => {
    return (
        <div className="bg-white min-h-screen py-16 px-6 lg:px-20 font-sans text-gray-800">
            <div className="max-w-5xl mx-auto">
                {/* Header Section */}
                <div className="text-center mb-16">
                    <h1 className="text-4xl font-extrabold text-gray-900 tracking-tight">
                        Legal <span className="text-amber-600">Disclaimer</span>
                    </h1>
                    <div className="h-1.5 w-24 bg-amber-500 mx-auto mt-4 rounded-full"></div>
                    <p className="mt-6 text-lg text-gray-600 max-w-2xl mx-auto leading-relaxed">
                        The information provided by SpeedForce EV ("we," "us," or "our") on our website and
                        fleet management platform is for general informational purposes only.
                    </p>
                </div>

                <div className="grid gap-12 md:grid-cols-2">
                    {/* Performance Disclaimer */}
                    <div className="bg-amber-50 p-8 rounded-2xl border border-amber-100">
                        <div className="flex items-center mb-4">
                            <Zap className="text-amber-600 mr-3" size={28} />
                            <h2 className="text-xl font-bold">EV Performance & Range</h2>
                        </div>
                        <p className="text-gray-700 leading-relaxed">
                            All vehicle ranges, charging times, and battery life estimates are based on ideal
                            manufacturer testing conditions. **Actual performance may vary** significantly based
                            on load capacity, driving behavior, terrain, weather (especially Gujarat's high temperatures),
                            and battery degradation. SpeedForce EV does not guarantee specific mileage per charge.
                        </p>
                    </div>

                    {/* Operational Disclaimer */}
                    <div className="bg-blue-50 p-8 rounded-2xl border border-blue-100">
                        <div className="flex items-center mb-4">
                            <ShieldCheck className="text-blue-600 mr-3" size={28} />
                            <h2 className="text-xl font-bold">No Professional Advice</h2>
                        </div>
                        <p className="text-gray-700 leading-relaxed">
                            Investment details regarding our FOCO (Franchise Owned Company Operated) model are
                            illustrative. Past earnings of fleet partners do not guarantee future results.
                            Prospective partners should conduct their own financial due diligence before
                            entering into a franchise agreement.
                        </p>
                    </div>
                </div>

                {/* Detailed Points */}
                <div className="mt-12 space-y-6 text-gray-600 border-t pt-10">
                    <p>
                        <strong className="text-gray-900">External Links:</strong> Our website may contain links to
                        third-party charging network maps or government subsidy portals (FAME-II/III). We do not
                        warrant, endorse, or assume responsibility for the accuracy of information on
                        third-party sites.
                    </p>
                    <p>
                        <strong className="text-gray-900">Operational Uptime:</strong> While we strive for 100% fleet
                        availability, SpeedForce EV is not liable for any business losses, delivery delays,
                        or contractual penalties incurred by clients due to vehicle breakdowns, software
                        glitches in the telematics system, or power grid failures.
                    </p>
                    <p>
                        <strong className="text-gray-900">Safety & Tracking:</strong> Vehicle tracking is subject
                        to GPS availability and cellular network coverage. We are not responsible for "dark zones"
                        where data transmission is interrupted.
                    </p>
                </div>

                {/* Closing */}
                <div className="mt-16 text-center bg-gray-900 text-white p-8 rounded-xl">
                    <p className="text-sm uppercase tracking-widest opacity-70 mb-2">Consent</p>
                    <p className="text-lg italic">
                        "By using our fleet and website, you hereby consent to our disclaimer and agree to its terms."
                    </p>
                </div>
            </div>
        </div>
    );
};

export default DisclaimerPage;