import React from "react";

export default function PartnerBrands() {

    const brands = [
        { name: "Sony", logo: "/brands/logo_sony.png" },
        { name: "Nike", logo: "/brands/logo_nike.png" },
        { name: "dyson", logo: "/brands/logo_dyson.png" },
        { name: "Apple", logo: "/brands/logo_apple.png" },
        { name: "Yeti", logo: "/brands/logo_yeti.png" },
        { name: "Lego", logo: "/brands/logo_lego.png" },
    ]


    return (
        <section className="py-16 bg-white">
            <div className="container mx-auto max-w-[1312px] px-4 lg:px-0">
                <div className="text-center mb-6 md:mb-12">
                    <h2 className="text-[#06012D] font-hurme-semibold font-semibold text-[24px] leading-[29px] tracking-normal md:text-[36px] md:leading-[43px] md:tracking-[0.72px] mb-4">
                        Connected With <img src="/brands/logo_amazon.png" alt="Amazon" className="w-[80px] md:w-[122px] inline-block -mb-[8px] md:-mb-[14px]" />
                    </h2>
                    <p className="content-text">to bring you some of the worlds top Rated brands.</p>
                </div>

                <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-[20px] mx-auto">
                    {brands.map((brand) => (
                        <div
                            key={brand.name}
                            className="h-[80px] lg:w-[200px] md:h-[120px] bg-[#F4F7FF] rounded-2xl px-[13px] py-[24px] lg:px-[47px] lg:py-[44px] flex items-center justify-center shadow-[0_4px_6px_rgba(6,1,45,0.03)] shadow-[inset_0_2px_2px_rgba(60,80,2555,0.06)]"
                        >
                            <img src={brand.logo} alt={brand.name} className="h-[32px] object-contain" />
                        </div>
                    ))}
                </div>
            </div>
        </section>
    )
}