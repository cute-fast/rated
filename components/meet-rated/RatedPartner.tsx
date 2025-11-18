'use client';

import Link from "next/link";

export default function RatedPartner() {

    const cards = [
        {
            title: "Zero Risk, All Results",
            copy:
                "There are no upfront costs or long-term contracts. You only pay for verified purchases while gaining free exposure to high-intent shoppers.",
        },
        {
            title: "Effortless Integration",
            copy:
                "Send a product feed or API access, and we handle the rest. No setup time, no added workload - your products go live instantly across Rated.",
        },
        {
            title: "Full Managed Growth",
            copy:
                "No learning curves - Rated runs everything for you. Sit back as it drives performance, traffic, and measurable sales automatically.",
        },
    ];

    return (
        <>
            <section className="relative flex w-full justify-center z-10 px-4 py-0 md:px-0 md:py-0 bg-[#F5F7FF]">
                <div className="relative isolate flex w-full max-w-[1440px] flex-col items-center gap-8 overflow-hidden px-0 py-12 md:h-[461px] md:gap-8 md:px-16 md:py-16">
                    <div className="relative z-[1] flex w-full max-w-[1120px] flex-col items-center gap-8 text-center">
                        <h3 className="font-hurme text-[32px] font-semibold leading-[38px] text-[#06012D] md:text-[48px] md:leading-[58px] md:tracking-[0.02em]">
                            Partner with Rated
                        </h3>
                    </div>

                    <div className="relative z-[2] flex w-full max-w-[1312px] flex-col items-center gap-8">
                        <div className="grid w-full gap-6 md:grid-cols-3 md:gap-8">
                            {cards.map((card) => (
                                <div
                                    key={card.title}
                                    className="font-hurme flex w-full flex-col items-center gap-6 rounded-2xl border border-[#E5ECFF] bg-white/95 px-6 py-8 text-center shadow-[0px_2px_4px_rgba(6,1,45,0.06)] backdrop-blur-[2px] md:h-[186px] md:w-[416px] md:justify-center md:px-8"
                                >
                                    <h4 className="text-[20px] font-semibold leading-[26px] text-[#06012D] md:text-[24px] md:leading-[29px] md:tracking-[0.02em]">
                                        {card.title}
                                    </h4>
                                    <p className="text-[15px] leading-[21px] text-[#06012D] md:w-[384px]">{card.copy}</p>
                                </div>
                            ))}
                        </div>
                    </div>

                    <div className="relative z-[1] flex w-full justify-center">
                        <div className="h-12 p-[2px] rounded-lg bg-gradient-to-r from-[#3D00A6] via-[#E500FF] to-[#080078]">
                            <Link
                                href="/contact-us"
                                className="font-hurme h-full w-full rounded-lg block bg-[#0E00DE] px-8 py-2 text-base font-semibold text-white shadow-[0px_4px_4px_rgba(6,1,45,0.08)] transition hover:bg-[#0b00b5]"
                            >
                                CONTACT US
                            </Link>
                        </div>
                    </div>
                </div>
            </section>
        </>
    )
}