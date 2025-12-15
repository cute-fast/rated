export default function LeafHero({ titleData }: { titleData: { title: string, subtitle: string } }) {
    return (
        <>
            <section className="px-4">
                <div className="py-4 md:pb-0 md:max-w-[1312px] m-auto">
                    <div className="h-[170px] md:h-[190px] relative flex items-center justify-center">
                        <img src="/leaf-hero.jpg" alt={titleData.title || "Best Products"} className="z-0 absolute top-0 left-0 w-full h-full object-cover object-center rounded-lg" />
                        <div className="z-10 absolute top-0 left-0 bg-black opacity-[0.5] w-full h-full rounded-[16px]" />
                        <div className="z-20">
                            <h1 className="hidden md:block text-[32px] md:text-[48px] text-center z-20 text-white font-semibold">{titleData.title}</h1>
                            <h1 className="md:hidden text-[32px] md:text-[48px] text-center z-20 text-white font-semibold">{titleData.title}</h1>
                            <p className="pt-5 hidden md:block text-gray-200 text-[18px] leading-[18px] text-center">
                                {titleData.subtitle}
                            </p>
                        </div>
                    </div>
                    <p className="text-[11px] py-2">Last Updated: September 28th, 2025</p>
                </div>
            </section>
        </>
    );
}