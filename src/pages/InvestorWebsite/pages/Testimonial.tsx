import React from 'react';
import { Quote } from 'lucide-react';

const TestimonialSection = () => {
    const testimonials = [
        {
            name: "Rahul Sharma",
            role: "Fleet Owner",
            content: "Switching to Speedforce EV has been the best decision for my logistics business. The fixed monthly income helps me manage my expenses without any stress.",
            image: "/images/test1.jpg"
        },
        {
            name: "Anita Desai",
            role: "Individual Investor",
            content: "I was looking for a sustainable investment opportunity. Speedforce provided a transparent FOCO model where I can track my asset's performance easily.",
            image: "/images/test2.png"
        },
        {
            name: "Riya Malhotra",
            role: "Business Partner",
            content: "The end-to-end ecosystem is impressive. From deployment to maintenance, they handle everything. It's truly a 'set it and forget it' investment.",
            image: "/images/test3.png"
        }
    ];

    return (
        <section className="relative py-24 bg-white overflow-hidden ">
            {/* Optional: Subtle background pattern or light city image to match your theme */}
            <div className="absolute inset-0 opacity-[0.03] pointer-events-none">
                <div className="absolute inset-0 bg-[url('/city-bg.jpg')] bg-cover bg-center" />
            </div>

            <div className="container mx-auto px-4 relative z-10">
                {/* Section Header */}
                <div className="text-center mb-16">
                    <h2 className="text-4xl font-black text-[#050505] sm:text-5xl mb-4">
                        What Our <span className="text-green-500">Partners</span> Say
                    </h2>
                    <div className="w-24 h-1.5 bg-[#21c45d] mx-auto rounded-full mb-6"></div>
                    <p className="text-gray-500 max-w-2xl mx-auto text-lg font-medium">
                        Real stories from the people driving the Speedforce EV revolution across India.
                    </p>
                </div>

                {/* Testimonial Grid */}
                <div className="grid gap-8 md:grid-cols-2 lg:grid-cols-3 ">
                    {testimonials.map((t, index) => (
                        <div
                            key={index}
                            className="group relative rounded-[3rem] border border-[#21c45d] bg-white p-10 shadow-sm transition-all duration-300 hover:shadow-2xl hover:shadow-blue-500/10 hover:-translate-y-2 flex flex-col border border-blue-400"
                        >
                            {/* Blue Quote Badge */}
                            <div className="absolute -top-5 left-10 bg-[#21c45d] p-4 rounded-2xl shadow-lg transform transition-transform group-hover:scale-110">
                                <Quote className="text-white h-6 w-6" fill="currentColor" />
                            </div>

                            {/* Main Testimonial Text */}
                            <div className="mt-6 flex-grow">
                                <p className="text-[#374151] italic leading-relaxed text-lg font-medium">
                                    "{t.content}"
                                </p>
                            </div>

                            {/* Divider and User Info */}
                            <div className="mt-8 flex items-center gap-5 pt-8 border-t border-gray-100">
                                <div className="relative">
                                    <img
                                        src={t.image}
                                        alt={t.name}
                                        className="h-16 w-16 rounded-full border-2 border-[#258afe]/20 object-cover shadow-md"
                                    />
                                    {/* Small checkmark decoration */}
                                    <div className="absolute -bottom-1 -right-1 bg-green-500 border-2 border-white rounded-full p-1">
                                        <svg className="w-2 h-2 text-white" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth="4">
                                            <path d="M5 13l4 4L19 7" />
                                        </svg>
                                    </div>
                                </div>
                                <div className="text-left">
                                    <h4 className="font-black text-[#050505] text-xl mb-0.5">{t.name}</h4>
                                    <p className="text-xs font-bold text-green-500 uppercase tracking-[0.15em]">
                                        {t.role}
                                    </p>
                                </div>
                            </div>
                        </div>
                    ))}
                </div>
            </div>
        </section>
    );
};

export default TestimonialSection;