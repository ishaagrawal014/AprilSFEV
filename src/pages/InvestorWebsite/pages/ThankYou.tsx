import { CheckCircle2, ArrowRight } from "lucide-react";
import { Button } from "@/components/ui/button";
import BG_IMG from "/images/Gemini_Generated_Image_5cejfn5cejfn5cej.jpg";
import { useNavigate } from "react-router-dom";

export default function ThankYou({setStep}) {

    const navigate = useNavigate();

    return (
        <section className="min-h-screen min-w-svw bg-layer-blue flex-col items-center justify-center px-4 py-10 ">
            <div className="max-w-svw w-full grid lg:grid-cols-2 gap-12 items-center flex-col">

                {/* LEFT CONTENT */}
                <div className="text-center lg:text-left order-2 lg:order-1 flex-col">
                    <div className="inline-flex items-center gap-2 rounded-full bg-green-100 px-4 py-2 text-green-700 font-semibold text-sm">
                        <CheckCircle2 className="h-5 w-5" />
                        Submission Successful
                    </div>

                    <h1 className="mt-6 text-4xl sm:text-5xl lg:text-6xl font-bold text-[#050505] leading-tight">
                        Thank you for expressing your interest in
                        <span className="block text-[#258afe]">SpeedForce EV</span>
                    </h1>

                    <p className="mt-6 text-xl text-[#1b1b1b]">
                        We’ll be in touch within the next <span>24–48 hours</span>.
                    </p>

                    <p className="mt-6 text-base text-[#1b1b1b] max-w-xl opacity-80">
                        This is more than an investment — it’s a stake in the future of
                        mobility. Our platform is built for forward-thinking investors
                        seeking consistent returns and sustainable impact.
                    </p>

                    <div className="mt-10 flex flex-col sm:flex-row gap-4 justify-center lg:justify-start">
                        <Button
                            onClick={() => setStep("form")}
                            className="bg-[#258afe] text-white px-8 py-7 text-lg hover:bg-[#132644] transition-all shadow-lg"
                        >
                            Return to Home Page
                            <ArrowRight className="ml-2 h-5 w-5" />
                        </Button>
                        <Button
                            variant="outline"
                            onClick={() => navigate("/blogs")}
                            className="px-8 py-7 text-lg border-[#258afe] text-[#258afe] hover:bg-blue-900"
                        >
                            Explore Insights
                        </Button>
                    </div>
                </div>

                {/* RIGHT IMAGE - ADJUSTED HEIGHT */}
                <div className="relative order-1 lg:order-2">
                    <div className="rounded-[2.5rem] overflow-hidden shadow-2xl border-4 border-white">
                        <img
                            src={BG_IMG}
                            alt="Future of Electric Mobility"
                            // CHANGED: Increased height to 600px on desktop, 400px on mobile
                            className="w-full h-[400px] lg:h-[300px] object-cover object-center"
                        />
                    </div>

                    {/* Optional: Decorative glow behind the image */}
                    <div className="absolute -inset-4 bg-[#258afe]/10 blur-3xl -z-10 rounded-full" />
                </div>

            </div>
        </section>
    );
}