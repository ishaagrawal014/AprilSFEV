import { Button } from "@/components/ui/button";

import { ArrowRight } from "lucide-react";

type HeroProps = {
    eyebrow?: React.ReactNode;
    title: React.ReactNode;
    subtitle: string;
    backgroundImage: string;
    highlightCard?: {
        title: string;
        description: string;
        image: string;
        actionLabel: string;
    };
    primaryCta: string;
    secondaryCta: string;
    onPrimaryClick?: () => void;
    onSecondaryClick?: () => void;
};

const Hero = ({
                  eyebrow,
                  title,
                  subtitle,
                  backgroundImage,
                  highlightCard,
                  primaryCta,
                  secondaryCta,
                  onPrimaryClick,
                  onSecondaryClick,
              }: HeroProps) => {
    return (
        <section
            id="home"
            className="relative isolate flex min-h-[520px] w-full overflow-hidden rounded-[48px] bg-[#ffffff] shadow-elevated">
            <img
                src={backgroundImage}
                alt="Speed Force EV hero"
                className="absolute inset-0 h-full w-full object-cover"
            />
            <div className="absolute inset-0 bg-[#f0f6ff]/5" />

            <div className="relative flex w-full flex-col gap-8 px-6 py-12 lg:flex-row lg:items-center lg:px-12 lg:py-16">
                <div className="max-w-2xl rounded-[36px] bg-white/85 p-8 shadow-card backdrop-blur">
                    {eyebrow && (
                        <p className="text-xs font-semibold uppercase tracking-[0.35em] text-[#4f5b6a]">{eyebrow}</p>
                    )}
                    <h1 className="mt-4 text-4xl font-bold leading-tight text-[#050505] lg:text-6xl">{title}</h1>
                    <p className="mt-6 text-lg text-[#1b1b1b]">{subtitle}</p>
                    <div className="mt-8 flex flex-col gap-4 sm:flex-row">
                        <Button
                            onClick={onPrimaryClick}
                            size="lg"
                            className="bg-[#2689ff] px-8 py-6 text-base font-semibold text-white shadow-card hover:bg-[#132644]"
                        >
                            {primaryCta}
                            <ArrowRight className="ml-2 h-5 w-5" />
                        </Button>
                        {/*<Button*/}
                        {/*    onClick={onSecondaryClick}*/}
                        {/*    size="lg"*/}
                        {/*    variant="outline"*/}
                        {/*    className="border-[#132644] text-[#132644] hover:bg-[#f0f6ff]"*/}
                        {/*>*/}
                        {/*    {secondaryCta}*/}
                        {/*</Button>*/}
                    </div>
                </div>

                {highlightCard && (
                    <div className="ml-auto w-full max-w-sm rounded-[32px] bg-white/75 p-6 shadow-card backdrop-blur">
                        <div className="overflow-hidden rounded-3xl border border-white/60">
                            <img src={highlightCard.image} alt={highlightCard.title} className="h-48 w-full object-cover" />
                        </div>
                        <p className="mt-6 text-sm font-semibold uppercase tracking-[0.25em] text-[#4f5b6a]">
                            {highlightCard.title}
                        </p>
                        <p className="mt-2 text-lg font-semibold text-[#050505]">{highlightCard.description}</p>
                        <button className="mt-4 inline-flex items-center text-sm font-semibold text-[#050505]/80">
                            {highlightCard.actionLabel}
                            <ArrowRight className="ml-2 h-4 w-4" />
                        </button>
                    </div>
                )}
            </div>

            <div className="pointer-events-auto absolute bottom-8 left-6">

            </div>
        </section>
    );
};

export default Hero;