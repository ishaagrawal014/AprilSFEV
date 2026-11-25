import React from "react";
import { CheckCircle2 } from "lucide-react";

interface TextContent {
    title: string;
    subtitle?: string;
    description: string;
    bulletPoints?: string[];
    cta?: {
        text: string;
        action: () => void;
    };
}

interface ImageTextSectionProps {
    imagePath?: string;
    imageAlt?: string;
    logoPath?: string;
    logoAlt?: string;
    playStoreSvg?: string;
    appStoreSvg?: string;
    textContent?: TextContent;
    imagePosition?: "left" | "right";
    backgroundColor?: string;
}

const ImageTextSection: React.FC<ImageTextSectionProps> = ({
                                                               imagePath = "/images/MobileApp.png",
                                                               imageAlt = "Image",
                                                               logoPath = "",
                                                               logoAlt = "Logo",
                                                               playStoreSvg = "/images/play-store.svg",
                                                               appStoreSvg = "/images/app-store.svg",
                                                               textContent = {
                                                                   title: "Track your vehicles and earning with Speedforce EV Mobile app",
                                                                   description: "",
                                                               },
                                                               imagePosition = "left",
                                                               backgroundColor = "bg-white",
                                                           }) => {
    const isImageLeft = imagePosition === "left";

    return (
        <section className={`${backgroundColor} py-12 pb-0`}>
            <div className="container mx-auto px-4">
                <div className="grid gap-12 items-center lg:grid-cols-2 max-w-6xl mx-auto">
                    {/* IMAGE BOX */}
                    <div className={`${!isImageLeft ? "lg:order-last" : ""}`}>
                        <img
                            src={imagePath}
                            alt={imageAlt}
                            className="block w-full h-auto object-contain"
                        />
                    </div>

                    {/* TEXT CONTENT */}
                    <div className={`flex flex-col justify-center ${!isImageLeft ? "lg:pr-8" : "lg:pl-8"}`}>
                        {logoPath && (
                            <div className="mb-6">
                                <img src={logoPath} alt={logoAlt} className="h-12 w-auto object-contain" />
                            </div>
                        )}

                        {textContent.subtitle && (
                            <p className="inline-flex items-center rounded-full bg-[#b7f7d6] px-4 py-1 text-xs font-semibold uppercase tracking-widest text-[#132644] w-fit mb-4">
                                {textContent.subtitle}
                            </p>
                        )}

                        <h2 className="text-4xl font-bold text-[#050505] mb-4 leading-tight">
                            {textContent.title}
                        </h2>

                        <p className="text-lg text-[#1b1b1b] mb-8 leading-relaxed">
                            {textContent.description}
                        </p>

                        {/* ✅ UPDATED CARD: Increased Google Play size & clean transparent App Store logo */}
                        <div className="inline-flex flex-col items-center p-8 mb-10 bg-white border-2 border-gray-200 rounded-3xl shadow-md w-fit">
                            <div className="flex items-center gap-12 mb-6">
                                {/* Google Play Icon - Increased to h-16 for better scale */}
                                <div className="flex items-center justify-center">
                                    <img
                                        src={playStoreSvg}
                                        alt="Google Play"
                                        className="h-16 w-auto object-contain transition-transform hover:scale-105"
                                    />
                                </div>

                                {/* Visual Divider */}
                                <div className="w-[1.5px] h-12 bg-gray-200"></div>

                                {/* App Store Icon - Transparent background via object-contain */}
                                <div className="flex items-center justify-center">
                                    <img
                                        src={appStoreSvg}
                                        alt="App Store"
                                        className="h-14 w-auto object-contain bg-transparent transition-transform hover:scale-105"
                                    />
                                </div>
                            </div>

                            {/* Single "Coming Soon" Badge */}
                            <div className="bg-gray-100 px-6 py-1.5 rounded-full border border-gray-200">
                <span className="text-[12px] uppercase font-bold text-gray-500 tracking-widest">
                  Coming Soon
                </span>
                            </div>
                        </div>

                        {textContent.bulletPoints && textContent.bulletPoints.length > 0 && (
                            <ul className="space-y-3 mb-8">
                                {textContent.bulletPoints.map((point, index) => (
                                    <li key={index} className="flex items-start gap-3">
                                        <CheckCircle2 className="h-5 w-5 text-[#23c55e] flex-shrink-0 mt-0.5" />
                                        <span className="text-base text-[#1b1b1b]">{point}</span>
                                    </li>
                                ))}
                            </ul>
                        )}

                        {textContent.cta && (
                            <div className="flex gap-4">
                                <button
                                    onClick={textContent.cta.action}
                                    className="bg-[#258afe] hover:bg-[#132644] text-white px-8 py-3 rounded-lg font-semibold transition-all"
                                >
                                    {textContent.cta.text}
                                </button>
                            </div>
                        )}
                    </div>
                </div>
            </div>
        </section>
    );
};

export default ImageTextSection;