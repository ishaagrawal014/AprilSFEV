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
  logoPath?: string; // New prop for logo
  logoAlt?: string; // New prop for logo alt
  textContent?: TextContent;
  imagePosition?: "left" | "right";
  backgroundColor?: string;
}

const ImageTextSection: React.FC<ImageTextSectionProps> = ({
  imagePath = "/images/ShieldLogo.png",
  imageAlt = "Image",
  logoPath = "/images/logo600.png", // Default empty
  logoAlt = "Logo",
  textContent = {
    title: "Track your Vehilcles",
    description: "Asset Shield Program powered by Bluebells Insurance Broking Pvt. Ltd.",
  },
  imagePosition = "left",
  backgroundColor = "bg-white",
}) => {
  const isImageLeft = imagePosition === "left";

  return (
    <section className={`${backgroundColor} py-10`}>
      <div className="container mx-auto px-3">
        <div className="grid gap-12 items-center lg:grid-cols-2 max-w-xl mx-auto">
          {/* IMAGE - No box, no shadow, just the image */}
          <div className={`${!isImageLeft ? "lg:order-last" : ""}`}>
            <img
              src={imagePath}
              alt={imageAlt}
              className="w-full h-auto object-contain"
            />
          </div>

          {/* TEXT CONTENT */}
          <div
            className={`flex flex-col justify-center ${
              !isImageLeft ? "lg:pr-8" : "lg:pl-8"
            }`}
          >
            {/* Logo above text */}
            {logoPath && (
              <div className="mb-6">
                <img
                  src={logoPath}
                  alt={logoAlt}
                  className="h-12 w-auto object-contain"
                />
              </div>
            )}

            {textContent.subtitle && (
              <p className="inline-flex items-center rounded-full bg-[#b7f7d6] px-4 py-1 text-xs font-semibold uppercase tracking-widest text-[#132644] w-fit mb-4">
                {textContent.subtitle}
              </p>
            )}

           

            <p className="text-lg text-[#1b1b1b] mb-6 leading-relaxed">
              {textContent.description}
            </p>

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