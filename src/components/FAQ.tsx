import {
    Accordion,
    AccordionContent,
    AccordionItem,
    AccordionTrigger,
} from "@/components/ui/accordion";
import { Headphones } from "lucide-react";

const FAQ = () => {
    const faqs = [
    {
        question: "How efficient are EVs compared to ICE vehicles?",
        answer: "Electric vehicles are far more efficient than internal combustion engine vehicles. They convert more than 85% of electrical energy into movement, while ICE vehicles only convert about 20–30% of fuel energy into motion. This high efficiency is supported by real-time performance monitoring to maintain optimal uptime.",
    },
    {
        question: "What is the usual lifespan of an EV battery?",
        answer: "The lifespan of a battery varies based on how it is used and charged. Under typical commercial operating conditions, batteries generally last around 3–5 years. Alt also offers battery upgrade and refurbishment options within its leasing plans.",
    },
    {
        question: "What level of cost savings can EVs provide?",
        answer: "EVs reduce costs mainly through lower fuel expenses and greater efficiency, bringing the running cost to under ₹1 per kilometer. Overall, businesses can save up to 62% compared to conventional ICE vehicles.",
    },
    {
        question: "How does leasing differ from financing?",
        answer: "Leasing generally involves a smaller upfront payment and lower monthly costs compared to traditional EMI financing. It can also reduce the total cost of ownership by about 15%, while covering maintenance, insurance, and support services.",
    },
    {
    question: "Do you use a Battery-as-a-Service (BaaS) model?",
    answer: "Yes, we operate on a Battery-as-a-Service (BaaS) model, where the battery is offered as part of the service instead of being owned outright. This helps reduce the upfront cost of the vehicle and ensures better battery management, monitoring, and replacement support.",
},
{
    question: "How long does it take to deploy vehicles?",
    answer: "Vehicles can typically be deployed within 45 days after the contract is finalized and all necessary requirements are completed. Our process is designed to ensure quick and efficient fleet deployment.",
},
{
    question: "What is the running cost of your EV vehicles?",
    answer: "Our vehicles have a running cost of approximately ₹17 per 100 km, making them significantly more economical compared to traditional fuel-powered vehicles.",
},
];

    return (
        // Changed to a soft gray background (bg-slate-50)
        <section className="py-20 bg-white">
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                <div className="max-w-3xl mx-auto">

                    {/* Header Section */}
                    <div className="text-center mb-16">
                        <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-white border border-slate-200 mb-4 shadow-sm">
                            <Headphones className="w-4 h-4 text-blue-600" />
                            <span className="text-xs font-semibold uppercase tracking-wider text-slate-600">
                24/7 Support Available
              </span>
                        </div>
                        <h2 className="text-3xl md:text-4xl font-extrabold text-slate-900 tracking-tight">
                            Frequently Asked Questions
                        </h2>
                        <p className="mt-4 text-slate-600">
                            Everything you need to know about EV leasing and efficiency.
                        </p>
                    </div>

                    {/* Accordion Logic */}
                    <Accordion type="single" collapsible className="w-full space-y-4">
                        {faqs.map((faq, index) => (
                            <AccordionItem
                                key={index}
                                value={`item-${index}`}
                                // White cards against the gray background make it look premium
                                className="bg-white border border-slate-200 rounded-2xl px-6 overflow-hidden data-[state=open]:border-blue-200 data-[state=open]:ring-4 data-[state=open]:ring-blue-50 transition-all duration-300"
                            >
                                <AccordionTrigger className="text-left text-lg font-medium text-slate-800 hover:text-blue-600 hover:no-underline py-6">
                                    {faq.question}
                                </AccordionTrigger>
                                <AccordionContent className="text-slate-600 text-base leading-relaxed pb-6">
                                    {faq.answer}
                                </AccordionContent>
                            </AccordionItem>
                        ))}
                    </Accordion>
                </div>
            </div>
        </section>
    );
};

export default FAQ;