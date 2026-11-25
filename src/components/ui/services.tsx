import React from 'react';
// 1. Updated icons for a fresh look
import { BatteryCharging, Truck, PlugZap } from 'lucide-react';
import { Card, CardContent, CardHeader, CardTitle } from "./card";

const EvService = () => {
    const services = [
        {
            title: "Smart Maintenance",
            description: "Specialized tools designed specifically for electric drive vehicles and battery health.",
            // Vibrant Blue
            icon: <BatteryCharging className="w-10 h-10 text-blue-600" />,
            bgColor: "bg-blue-50",
        },
        {
            title: "Fleet Management",
            description: "Scalable service solutions for commercial EV operators to minimize downtime.",
            // Electric Orange/Amber
            icon: <Truck className="w-10 h-10 text-amber-500" />,
            bgColor: "bg-amber-50",
        },
        {
            title: "Eco Friendly Engineering",
            description: "Combining high-speed performance with a zero emission philosophy.",
            // Eco Green
            icon: <PlugZap className="w-10 h-10 text-emerald-600" />,
            bgColor: "bg-emerald-50",
        }
    ];

    return (
        <section className="py-20 px-6 bg-white">
            <div className="max-w-6xl mx-auto">
                <div className="text-center mb-16">
                    <h2 className="text-3xl md:text-4xl font-bold tracking-tight text-slate-900 uppercase">
                        Our Services
                    </h2>
                    <p className="text-muted-foreground mt-4 text-lg italic text-blue-600">

                    </p>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
                    {services.map((service, index) => (
                        <Card key={index} className="group border border-slate-200 shadow-sm hover:shadow-xl transition-all duration-300 bg-white">
                            <CardHeader className="flex items-center justify-center pt-8">
                                {/* The 'group-hover' class makes the icon grow when the card is hovered */}
                                <div className={`p-4 ${service.bgColor} rounded-2xl mb-2 transition-transform duration-300 group-hover:scale-110`}>
                                    {service.icon}
                                </div>
                                <CardTitle className="text-xl font-bold pt-4 text-center">
                                    {service.title}
                                </CardTitle>
                            </CardHeader>
                            <CardContent className="text-center pb-8">
                                <p className="text-slate-600 leading-relaxed">
                                    {service.description}
                                </p>
                            </CardContent>
                        </Card>
                    ))}
                </div>
            </div>
        </section>
    );
};

export default EvService;