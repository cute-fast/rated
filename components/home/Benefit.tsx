import React from "react";

export default function Benefit() {
    return (
        <section className="bg-slate-900 text-white px-6 py-16 sm:py-16 lg:py-20 xl:py-32">
            <div className="flex flex-col-reverse gap-12 lg:gap-0 lg:flex-row max-w-7xl mx-auto items-center">
                <div className="lg:w-[50%] lg:mr-12">
                    <h3 className="text-[52px] leading-[52px] font-bold mb-6 tracking-[0.02rem]">
                        Benefit from our acquisition channels
                    </h3>
                    <p className="text-white mb-8">
                        Leverage one of the fastest-growing consumer acquisition channels to boost visibility, drive engagement, and
                        accelerate growth by reaching consumers where they already spend time.
                    </p>
                    <div className="space-y-8">
                        <div className="flex items-center gap-3">
                            <div className="text-5xl font-bold text-white leading-none">8x</div>
                            <p className="text-white text-base">ROI driven by influencer marketing</p>
                        </div>
                        <div className="flex items-center gap-3">
                            <div className="text-5xl font-bold text-white leading-none">49%</div>
                            <p className="text-white text-base">of customers rely on influencer recommendations for purchases</p>
                        </div>
                        <div className="flex items-center gap-3">
                            <div className="text-5xl font-bold text-white leading-none">$14b</div>
                            <p className="text-white text-base">in influencer channel investment in 2021 (up from $3b in 2017)</p>
                        </div>
                    </div>
                    <button className="mt-8 bg-white text-black font-bold hover:bg-gray-100 rounded-full px-5 py-3">Contact us</button>
                </div>
                <div className="lg:w-[50%] flex justify-center rounded-3xl overflow-hidden">
                    <img
                        src="benefit.webp"
                        alt="Mobile app interface"
                        className="w-full object-cover"
                    />
                </div>
            </div>
        </section>
    )
}