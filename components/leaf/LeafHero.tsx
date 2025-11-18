export default function LeafHero() {
    return (
        <>
            <section className="px-4">
                <div className="py-8 md:py-6 md:pb-0 md:max-w-[1312px] m-auto">
                    <div className="h-[170px] md:h-[190px] relative flex items-center justify-center">
                        <img src="/leaf-hero.jpg" alt="Best Gaming Monitors" className="z-0 absolute top-0 left-0 w-full h-full object-cover object-center rounded-lg" />
                        <div className="z-10 absolute top-0 left-0 bg-black opacity-[0.5] w-full h-full rounded-[16px]" />
                        <div className="z-20">
                            <h1 className="hidden md:block text-[32px] md:text-[48px] text-center z-20 text-white font-semibold">Best Gaming Monitors Of 2025</h1>
                            <h1 className="md:hidden text-[32px] md:text-[48px] text-center z-20 text-white font-semibold">Best Gaming<br /> Monitors Of 2025</h1>
                            <p className="pt-5 hidden md:block text-gray-200 text-lg leading-relaxed text-center">
                                Level Up Your Setup With Crisp Visuals, Smooth Performance,<br />
                                And Next-Gen Immersion
                            </p>
                        </div>
                    </div>
                    <p className="text-[11px] py-2">Last Updated: September 28th, 2025</p>
                </div>
            </section>
        </>
    );
}