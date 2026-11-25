import React from 'react';

const PrivacyPolicy = () => {
    const lastUpdated = "March 10, 2026";

    return (
        <div className="bg-white min-h-screen py-12 px-4 sm:px-6 lg:px-8 font-sans text-gray-800">
            <div className="max-w-4xl mx-auto border border-gray-100 shadow-2xl rounded-3xl overflow-hidden">

                {/* Header */}
                <div className="bg-slate-900 p-10 text-white">
                    <h1 className="text-3xl text-white  tracking-tight">Privacy Policy</h1>
                    <p className="mt-2 text-slate-400">SpeedForce EV Vehicles Private Limited</p>
                    <div className="mt-6 inline-block bg-green-500/20 text-green-400 px-3 py-1 rounded-full text-xs font-semibold uppercase tracking-wider">
                        DPDP Act 2023 Compliant
                    </div>
                </div>

                <div className="p-8 sm:p-12 space-y-12">
                    <section>
                        <p className="text-sm text-gray-500 mb-6 font-medium uppercase tracking-widest">Effective Date: {lastUpdated}</p>
                        <p className="leading-relaxed">
                            At **SpeedForce EV**, we value the trust you place in us when sharing your personal data.
                            This policy explains how we collect, use, and protect your digital information across our
                            fleet, mobile applications, and web platforms in accordance with the
                            **Digital Personal Data Protection Act (DPDP) of India.**
                        </p>
                    </section>

                    {/* Data Collection */}
                    <section className="space-y-4">
                        <h2 className="text-2xl font-bold text-slate-900 border-b pb-2">1. Information We Collect</h2>
                        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                            <div className="bg-gray-50 p-5 rounded-xl">
                                <h3 className="font-bold text-green-700 mb-2">A. Fleet & Telematics Data</h3>
                                <ul className="text-sm space-y-2 list-disc ml-4 text-gray-600">
                                    <li>Real-time GPS location & route history.</li>
                                    <li>Driving behavior (speed, braking, acceleration).</li>
                                    <li>Vehicle health (Battery SoC, temperature, voltage).</li>
                                </ul>
                            </div>
                            <div className="bg-gray-50 p-5 rounded-xl">
                                <h3 className="font-bold text-green-700 mb-2">B. Personal Identifiers</h3>
                                <ul className="text-sm space-y-2 list-disc ml-4 text-gray-600">
                                    <li>Name, Phone Number, and Email.</li>
                                    <li>KYC documents (Aadhaar/Driving License) for verification.</li>
                                    <li>Financial/Payment data for franchise (FOCO) partners.</li>
                                </ul>
                            </div>
                        </div>
                    </section>

                    {/* Purpose */}
                    <section className="space-y-4">
                        <h2 className="text-2xl font-bold text-slate-900 border-b pb-2">2. Purpose of Processing</h2>
                        <p className="text-gray-600">We process your data only for the following "Consented Purposes":</p>
                        <ul className="grid grid-cols-1 sm:grid-cols-2 gap-3 text-sm">
                            <li className="flex items-center">✅ Optimizing vehicle uptime & range</li>
                            <li className="flex items-center">✅ Ensuring driver safety & emergency response</li>
                            <li className="flex items-center">✅ Processing franchise payouts/incentives</li>
                            <li className="flex items-center">✅ Complying with FAME-II/III subsidy audits</li>
                        </ul>
                    </section>

                    {/* Your Rights */}
                    <section className="bg-slate-50 p-8 rounded-2xl border-l-8 border-slate-900">
                        <h2 className="text-xl font-bold text-slate-900 mb-4">Your Rights (Data Principal)</h2>
                        <p className="text-sm text-gray-600 mb-4">Under Indian law, you have the right to:</p>
                        <div className="flex flex-wrap gap-2 text-xs font-semibold">
                            <span className="bg-white border px-3 py-1 rounded shadow-sm">Right to Access</span>
                            <span className="bg-white border px-3 py-1 rounded shadow-sm">Right to Correction</span>
                            <span className="bg-white border px-3 py-1 rounded shadow-sm">Right to Erasure</span>
                            <span className="bg-white border px-3 py-1 rounded shadow-sm">Right to Withdraw Consent</span>
                        </div>
                    </section>

                    {/* Grievance Redressal */}
                    <section className="border-t pt-10">
                        <h2 className="text-2xl font-bold text-slate-900 mb-4">Grievance Redressal</h2>
                        <p className="text-gray-600 mb-6 leading-relaxed">
                            If you have any questions or wish to exercise your rights, please contact our
                            designated **Data Protection Officer (DPO)** as per the DPDP Rules.
                        </p>
                        <div className="bg-gray-900 text-white p-6 rounded-xl flex flex-col sm:flex-row justify-between items-center">
                            <div className="mb-4 sm:mb-0">
                                <p className="text-green-400 font-bold">Grievance Officer:</p>
                                <p className="text-lg">Compliance Dept, SpeedForce EV</p>
                            </div>
                            <div className="text-right">
                                <p>Email: <span className="underline">privacy@speedforceev.in</span></p>
                                <p>Vadodara, Gujarat, India</p>
                            </div>
                        </div>
                    </section>

                </div>
            </div>
            <p className="text-center mt-8 text-gray-400 text-xs italic">
                SpeedForce EV Vehicles Pvt. Ltd. | CIN: U34103GJ2021PTC127167
            </p>
        </div>
    );
};

export default PrivacyPolicy;