'use client';

import Image from "next/image";
import { useEffect, useRef } from "react";


export default function MainHero() {

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

    const astronautParallaxRef = useParallax(28);

    return (
        <>
            <section className="relative flex w-full justify-center bg-[#06012D] px-4 py-16 md:px-0">
                <div className="flex w-full max-w-[1440px] flex-col items-center gap-8">
                    <div className="isolate flex w-full max-w-[343px] flex-col items-center justify-center gap-8 md:max-w-[1120px]">
                        <p className="font-hurme flex w-full items-center justify-center text-center text-[48px] font-semibold leading-[58px] text-white capitalize md:text-[68px] md:leading-[76px] md:tracking-[0.02em]">
                            Meet Rated
                        </p>
                        <div className="flex w-full flex-col items-center gap-6">
                            <p className="font-hurme w-full text-center text-[18px] font-normal leading-[25px] text-white md:text-[24px] md:leading-[34px]">
                                Your product discovery platform that drives confident purchases
                            </p>
                        </div>
                    </div>
                </div>
            </section>
            <section className="relative flex w-full justify-center bg-[linear-gradient(360deg,#d7d7f5_0%,#f5f7ff_32.11%)]">
                <div className="flex w-full flex-col items-center">
                    <div
                        className="flex w-full flex-col items-center gap-[10px] px-4 py-12 
                        md:h-[566px] md:px-16 md:py-0
                        bg-[radial-gradient(23.59%_23.59%_at_22.15%_48.5%,rgba(6,0,71,0.2)_0%,rgba(18,3,172,0)_100%),linear-gradient(180deg,#06012D_0%,rgba(209,210,243,0)_42.11%),url('/img/cloud.png')]
                        bg-cover bg-bottom bg-no-repeat"
                    >

                        <div className="relative hidden h-[518px] w-full max-w-[1312px] rounded-2xl  md:block ">
                            <div className="absolute inset-0 rounded-2xl" aria-hidden />
                            <div className="z-0 group absolute right-[89px] top-[calc(50%_-_265px_-_6px)] h-[530px] w-[530px]">
                                <div
                                    ref={astronautParallaxRef}
                                    className="parallax-motion pointer-events-none absolute z-30"
                                    style={{
                                        width: "1018px",
                                        height: "639px",
                                        left: "-236px",
                                        top: "calc(50% - 639px / 2 + 84.5px)",
                                    }}
                                >
                                    <Image
                                        src="/img/astronaut.png"
                                        alt="Astronaut reaching for the stars"
                                        fill
                                        priority
                                        className="object-contain"
                                    />
                                </div>
                            </div>

                            <div className="z-10 bg-shopping-overlay font-hurme absolute left-[74px] top-[calc(50%_-_113.5px_+_0.5px)] flex h-[227px] w-[629px] flex-col items-center justify-center gap-6 rounded-2xl  px-8 py-8 text-white ">
                                <div className="pointer-events-none absolute left-8 top-[147px] h-12 w-[565px] rounded-full bg-[rgba(6,1,45,0.2)] blur-[8.4px]" aria-hidden />
                                <div className="relative z-11 flex flex-col gap-4">
                                    <h2 className="text-[48px] font-semibold leading-[58px] tracking-[0.02em]">
                                        Elevate Your <br />Shopping Experience
                                    </h2>
                                    <p className="text-[18px] leading-[25px] text-white/90">
                                        Rated cuts through the noise by analyzing millions of reviews, specs, and performance signals to deliver the best-in-class options.
                                    </p>
                                </div>
                            </div>
                        </div>

                        <div className="relative flex w-full max-w-[343px] flex-col items-center gap-6 rounded-2xl bg-shopping-mobile-card px-4 py-8 text-center text-white  md:hidden">
                            <div className="font-hurme relative z-10 flex flex-col items-center gap-6">
                                <h2 className="w-full text-center text-[32px] font-semibold leading-[38px] text-white">
                                    Elevate Your Shopping Experience
                                </h2>
                                <p className="w-full text-center text-[15px] leading-[21px] text-white">
                                    Rated cuts through the noise by analyzing millions of reviews, specs, and performance signals to deliver the best-in-class options.
                                </p>
                            </div>
                            <div className="relative -bottom-4 -right-4 flex h-[311px] w-[495px] items-center justify-center">
                                <Image
                                    src="/img/astronaut.png"
                                    alt="Astronaut reaching for the stars"
                                    fill
                                    priority
                                    className="object-contain"
                                />
                            </div>
                        </div>
                    </div>
                </div>
            </section>
        </>
    )
}