import React from 'react';
import { ShieldCheck, Leaf, Zap } from "lucide-react";
import { Card, CardContent, CardHeader, CardTitle } from "./card";

const WhySpeedforce = () => {
    const data = [
        {
            feature: "Precision Tech",
            benefit: "Our 'Speedforce' ensures your motor runs at peak efficiency through advanced diagnostic technology.",
            icon: <Zap className="w-10 h-10 text-yellow-500" />,
        },
        {
            feature: "Sustainability",
            benefit: "Every service supports the EV mission of reducing carbon footprints for a cleaner future.",
            icon: <Leaf className="w-10 h-10 text-emerald-500" />,
        },
        {
            feature: "Expert Care",
            benefit: "Certified technicians trained specifically for EV-specific mechanical needs and safety.",
            icon: <ShieldCheck className="w-10 h-10 text-blue-500" />,
        },
    ];

    return (
        <section className="py-20 px-4 bg-white w-full">
            <div className="max-w-6xl mx-auto">
                <div className="text-center mb-16">
                    <h2 className="text-4xl font-extrabold tracking-tight lg:text-5xl mb-4 text-green-900">
                        Why Speedforce EV?
                    </h2>
                    <p className="text-emerald-600 text-sm uppercase tracking-widest font-bold">
                        Value Proposition
                    </p>
                    <div className="h-1.5 w-20 bg-emerald-500 mx-auto mt-4 rounded-full" />
                </div>

                <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
                    {data.map((item, index) => (
                        <Card key={index} className="border-none shadow-md hover:shadow-xl transition-all duration-300 group bg-white">
                            <CardHeader className="flex flex-col items-center pt-8">
                                <div className="p-4 rounded-2xl bg-slate-50 group-hover:bg-emerald-50 transition-colors duration-300 mb-4">
                                    {item.icon}
                                </div>
                                <CardTitle className="text-2xl font-bold text-slate-800">{item.feature}</CardTitle>
                            </CardHeader>
                            <CardContent className="text-center pb-8 px-6">
                                <p className="text-slate-600 leading-relaxed">
                                    {item.benefit}
                                </p>
                            </CardContent>
                        </Card>
                    ))}
                </div>
            </div>
        </section>
    );
};

export default WhySpeedforce;