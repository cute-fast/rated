"use Client"

import React, { useEffect, useRef } from "react"
import Image from "next/image";

export default function Comment() {

    const useParallax = (strength = 20) => {
        const ref = useRef<HTMLDivElement | null>(null);

        useEffect(() => {
            const element = ref.current;
            if (!element || typeof window === "undefined") {
                return;
            }

            let frame = 0;

            const update = () => {
                frame = 0;
                const rect = element.getBoundingClientRect();
                const offset = rect.top + rect.height / 2 - window.innerHeight / 2;
                const translate = Math.max(
                    Math.min((-offset / window.innerHeight) * strength, strength),
                    -strength,
                );
                element.style.setProperty("--parallax-offset", `${translate}px`);
            };

            const handleScroll = () => {
                if (frame) return;
                frame = window.requestAnimationFrame(update);
            };

            update();
            window.addEventListener("scroll", handleScroll, { passive: true });
            window.addEventListener("resize", update);

            return () => {
                window.removeEventListener("scroll", handleScroll);
                window.removeEventListener("resize", update);
                if (frame) {
                    window.cancelAnimationFrame(frame);
                }
            };
        }, [strength]);

        return ref;
    }

    const buyerIQParallaxRef = useParallax(28);

    const highlights = [
        {
            label: "Performance",
            body:
                "Reflects how well the product does the job in real life, not just on a spec sheet. We weight verified post-purchase outcomes and peer comparisons so the score tracks everyday use.",
            barColor: "#D76528",
        },
        {
            label: "Reliability",
            body:
                "Measures how long a product lasts without problems and how often it needs fixes. We model failure events, returns, and warranty claims over time to capture durability in the wild.",
            barColor: "#00C386",
        },
        {
            label: "Value",
            body:
                "Captures what you get for the money across the product's lifespan, not just at checkout. We balance quality, features, and expected longevity against price to show true value.",
            barColor: "#C2418B",
        },
        {
            label: "Popularity",
            body:
                "Shows what real buyers are saying now across trusted sources without rewarding hype. We aggregate fresh verified sentiment and down-weight suspicious spikes to reflect durable approval.",
            barColor: "#9E53D6",
        },
        {
            label: "Support",
            body:
                "Grades how the company stands behind the product when something goes wrong. We evaluate response speed, fix quality, parts availability, and warranty clarity to signal fast, fair resolutions.",
            barColor: "#1D70D1",
        },
    ];

    const scoreBadges = [
        { value: "9.7", label: "Experience", color: "text-[#6366F1]" },
        { value: "7.6", label: "Trust", color: "text-[#0EA5E9]" },
        { value: "8.5", label: "Value", color: "text-[#A855F7]" },
    ];



    return (
        <>
            <section className="relative z-0 flex w-full justify-center  bg-[linear-gradient(180deg,#d7d7f5_0%,#f5f7ff_32.11%)]">
                <div className="relative flex w-full max-w-[1312px] flex-col items-center gap-[13px] px-4 pt-12 pb-8 md:h-[796px] md:gap-8 md:pt-[64px] md:pb-[32px]">
                    <div
                        className="font-hurme absolute z-20 hidden h-[294px] w-[600px] flex-col items-center justify-center gap-6 text-left text-[#06012D] md:flex"
                        style={{
                            right: "calc(50% - 1312px/2 + 109px)",
                            top: "calc(64px + 350px - 147px - 149.5px)",
                            padding: "32px 0px 32px 129px",
                        }}
                    >
                        <div className="flex flex-col justify-center items-start p-0 w-[471px] h-[41px]">
                            <span className="text-[12px] uppercase tracking-[0.2em] text-[#06012D] font-normal leading-[29px]">Powered by</span>
                            <span className="inline-flex h-6 w-[104px] bg-[linear-gradient(270deg,#D76528_-1.41%,#C2418B_33.68%,#9E53D6_68.76%,#1D70D1_98.84%)] bg-clip-text text-transparent font-semibold text-[24px] leading-[24px] tracking-[0.02em]" >Buyer IQ</span>
                        </div>
                        <h3 className="w-[471px] h-[68px] text-[36px] font-semibold leading-[43px] tracking-[0.02em] ">
                            The Trust Operating System For Commerce
                        </h3>
                        <p className="text-[15px] leading-[21px]">
                            Powered by <strong>Buyer IQ</strong>, our decision engine turns messy product chatter into one clean, portable <strong>0-10 score</strong> that cannot be bought, faked, or gamed. It gives buyers a single source of truth and gives brands and retailers a standard they can deploy anywhere.</p>
                    </div>

                    {/* Sentence component - mobile version (at top) */}
                    <div className="flex w-full max-w-[1312px] flex-col items-center gap-4 px-4 pb-[50px] text-center md:hidden">
                        <div className="flex flex-col gap-2">
                            <span className="font-hurme text-[12px] uppercase tracking-[0.2em] text-[#06012D]/70">Powered by</span>
                            <span className="inline-flex h-6 w-[104px] bg-[linear-gradient(270deg,#D76528_-1.41%,#C2418B_33.68%,#9E53D6_68.76%,#1D70D1_98.84%)] bg-clip-text text-transparent font-semibold text-[24px] leading-[24px] tracking-[0.02em]">Buyer IQ</span>
                        </div>
                        <h3 className="font-hurme w-full text-[28px] font-semibold leading-[34px] tracking-[0.02em] text-[#06012D]">
                            The Trust Operating System For Commerce
                        </h3>
                        <p className="font-hurme w-full text-[15px] leading-[21px] text-[#06012D]">
                            Powered by <strong>Buyer IQ</strong>, our decision engine turns messy product chatter into one clean, portable <strong>0-10 score</strong> that cannot be bought, faked, or gamed. It gives buyers a single source of truth and gives brands and retailers a standard they can deploy anywhere.
                        </p>
                    </div>

                    <div
                        className="relative flex w-[343px] max-w-[1312px] flex-col items-center gap-[13px] rounded-2xl bg-white md:w-[1312px] md:h-[700px] md:gap-0"
                        style={{
                            borderRadius: "16px",
                            boxShadow: "0px 2px 4px rgba(6, 1, 45, 0.06)",
                        }}
                    >

                        <div className="relative hidden h-full w-full md:block">
                            <div
                                className="group absolute left-[110px] h-[530px] w-[530px]"
                                style={{ top: "calc(50% - 265px - 139px)" }}
                            >
                                <div
                                    ref={buyerIQParallaxRef}
                                    className="parallax-motion pointer-events-none absolute inset-0 z-30 translate-y-[24px]"
                                >
                                    <Image
                                        src="/img/BuyerIQ-Blob.png"
                                        alt="Buyer IQ graphic"
                                        fill
                                        priority
                                        className="object-contain"
                                    />
                                </div>
                            </div>

                            {/* Flex component - desktop */}
                            <div className="absolute bottom-[22px] left-1/2 hidden w-[1312px] -translate-x-1/2 px-4 md:flex md:justify-center">
                                <div className="flex w-full max-w-[1280px] flex-row gap-4">
                                    {highlights.map((item) => (
                                        <div
                                            key={item.label}
                                            className="flex w-full max-w-[243px] flex-col gap-6 rounded-lg border border-[#E7E7E7] bg-[#F9F9F9] p-4 shadow-[0px_2px_4px_rgba(6,1,45,0.06)]"
                                        >
                                            <div className="flex items-center gap-2">
                                                <h4 className="font-hurme text-[18px] font-semibold leading-[22px] tracking-[0.02em] text-[#06012D]">
                                                    {item.label}
                                                </h4>
                                                <div
                                                    className="h-[5px] flex-1 rounded-full"
                                                    style={{ backgroundColor: item.barColor }}
                                                />
                                            </div>
                                            <p className="font-hurme text-[15px] leading-[21px] text-[#06012D]">{item.body}</p>
                                        </div>
                                    ))}
                                </div>
                            </div>
                        </div>

                        {/* PNG component - mobile */}
                        <div className="relative flex w-full items-center justify-center md:hidden">
                            <div className="relative h-[300px] w-full max-w-[343px] mt-[-42px]">
                                <Image
                                    src="/img/BuyerIQ-Blob.png"
                                    alt="Buyer IQ graphic"
                                    fill
                                    priority
                                    className="object-contain"
                                />
                            </div>
                        </div>

                        {/* Flex component - mobile (inside white card, column layout) */}
                        <div className="flex w-full flex-col items-center gap-4 p-6 pt-0 md:hidden">
                            {highlights.map((item) => (
                                <div
                                    key={item.label}
                                    className="flex h-[163px] w-[311px] flex-col gap-4 rounded-lg border border-[#E7E7E7] bg-[#F9F9F9] p-4 shadow-[0px_2px_4px_rgba(6,1,45,0.06)]"
                                >
                                    <div className="flex items-center gap-2">
                                        <h4 className="font-hurme text-[18px] font-semibold leading-[22px] tracking-[0.02em] text-[#06012D]">
                                            {item.label}
                                        </h4>
                                        <div
                                            className="h-[5px] flex-1 rounded-full"
                                            style={{ backgroundColor: item.barColor }}
                                        />
                                    </div>
                                    <p className="font-hurme text-[15px] leading-[21px] text-[#06012D]">{item.body}</p>
                                </div>
                            ))}
                        </div>
                    </div>
                </div>
            </section>
        </>
    )
}