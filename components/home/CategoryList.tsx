"use client"

import Image from "next/image"
import { Keyboard, Bike, Shirt, Hammer, UtensilsCrossed, Sparkles, Baby, Dog } from "lucide-react"

const categories = [
    {
        title: "Electronics",
        icon: Keyboard,
        image: "",
        mobileSpan: "col-span-1",
        mobileHeight: "h-48",
        link: "/category/electronics"
    },
    {
        title: "SPorts & Outdoors",
        icon: Bike,
        image: "",
        mobileSpan: "col-span-1",
        mobileHeight: "h-48",
        link: "/category/electronics"
    },
    {
        title: "Home & Kitchen",
        icon: UtensilsCrossed,
        image: "",
        mobileSpan: "col-span-1",
        mobileHeight: "h-48",
        link: "/category/sports-outdoors"
    },
    {
        title: "Beauty & Personal Care",
        icon: Sparkles,
        image: "",
        mobileSpan: "col-span-1",
        mobileHeight: "h-48",
        link: "/category/beauty-personal-care"
    },
    {
        title: "Clothing, Shoes & Jewelry",
        icon: Shirt,
        image: "",
        mobileSpan: "col-span-1",
        mobileHeight: "h-48",
        link: "/category/clothing-shoes-jewelry"
    },
    {
        title: "Baby Products",
        icon: Baby,
        image: "",
        mobileSpan: "col-span-1",
        mobileHeight: "h-48",
        link: "/category/baby-products"
    },
    {
        title: "Tools & Home Improvement",
        icon: Keyboard,
        image: "",
        mobileSpan: "col-span-1",
        mobileHeight: "h-48",
        link: "/category/tools-home-improvement"
    },
    {
        title: "Pet Supplies",
        icon: Dog,
        image: "",
        mobileSpan: "col-span-2",
        mobileHeight: "h-48",
        link: "/category/pet-supplies"
    }
]


export default function CategoryList() {
    return (
        <section className="px-4 pt-8 pb-4 md:py-16">
            <div className="text-center mb-[40px] md:mb-12">
                <h2 className="font-hurme-semibold font-semibold text-[32px] tracking-[0.64px] leading-[38px] md:text-[48px] md:tracking-[0.96px] md:leading-[58px]">Categories</h2>
            </div>
            <div className="max-w-[1204px] mx-auto">
                {/* Mobile Layout - 2 column grid matching reference image */}
                <div className="lg:hidden grid grid-cols-2 gap-2">

                    <div className="relative overflow-hidden rounded-2xl group cursor-pointer transition-transform hover:scale-105 h-28">
                        <a href='/category/electronics' target='blank'>
                            <Image src="/category/electronics.jpg" alt="Electronics" fill className="object-cover" />
                            <div className="absolute inset-0 bg-black opacity-[65%]" />
                            <div className="absolute inset-0 flex flex-col items-center justify-center text-white p-4">
                                <Keyboard className="w-10 h-10 mb-2 stroke-[1.5]" />
                                <h3 className="font-hurme-bold font-bold text-[15px] leading-[23px] md:font-hurme-semibold md:font-semibold text-center md:text-[20px] md:leading-[24px] tracking-normal">Electronics</h3>
                            </div>
                        </a>
                    </div>


                    <div className="relative overflow-hidden rounded-2xl group cursor-pointer transition-transform hover:scale-105 h-60 row-span-2">
                        <a href='/category/sports-outdoors' target='blank'>
                            <Image src="/category/sports-outdoors.jpg" alt="Sports & Outdoors" fill className="object-cover" />
                            <div className="absolute inset-0 bg-black opacity-[65%]" />
                            <div className="absolute inset-0 flex flex-col items-center justify-center text-white p-4">
                                <Bike className="w-10 h-10 mb-2 stroke-[1.5]" />
                                <h3 className="font-hurme-bold font-bold text-[15px] leading-[23px] md:font-hurme-semibold md:font-semibold text-center md:text-[20px] md:leading-[24px] tracking-normal">Sports & Outdoors</h3>
                            </div>
                        </a>
                    </div>


                    <div className="relative overflow-hidden rounded-2xl group cursor-pointer transition-transform hover:scale-105 h-28">
                        <a href='/category/home-kitchen' target='blank'>
                            <Image src="/category/home-kitchen.jpg" alt="Home & Kitchen" fill className="object-cover" />
                            <div className="absolute inset-0 bg-black opacity-[65%]" />
                            <div className="absolute inset-0 flex flex-col items-center justify-center text-white p-4">
                                <UtensilsCrossed className="w-10 h-10 mb-2 stroke-[1.5]" />
                                <h3 className="font-hurme-bold font-bold text-[15px] leading-[23px] md:font-hurme-semibold md:font-semibold text-center md:text-[20px] md:leading-[24px] tracking-normal">Home & Kitchen</h3>
                            </div>
                        </a>
                    </div>


                    <div className="col-span-2 relative overflow-hidden rounded-2xl group cursor-pointer transition-transform hover:scale-105 h-[133px]">
                        <a href='/category/beauty-personal-care' target='blank'>
                            <Image
                                src="/category/beauty-personal-care.jpg"
                                alt="Beauty & Personal Care"
                                fill
                                className="object-cover"
                            />
                            <div className="absolute inset-0 bg-black opacity-[65%]" />
                            <div className="absolute inset-0 flex flex-col items-center justify-center text-white p-4">
                                <Sparkles className="w-10 h-10 mb-2 stroke-[1.5]" />
                                <h3 className="font-hurme-bold font-bold text-[15px] leading-[23px] md:font-hurme-semibold md:font-semibold text-center md:text-[20px] md:leading-[24px] tracking-normal">Beauty & Personal Care</h3>
                            </div>
                        </a>
                    </div>


                    <div className="relative overflow-hidden rounded-2xl group cursor-pointer transition-transform hover:scale-105 h-60 row-span-2">
                        <a href='/category/clothing-shoes-jewelry' target='blank'>
                            <Image
                                src="/category/clothing-shoes-jewelry.jpg"
                                alt="Clothing, Shoes & Jewelry"
                                fill
                                className="object-cover"
                            />
                            <div className="absolute inset-0 bg-black opacity-[65%]" />
                            <div className="absolute inset-0 flex flex-col items-center justify-center text-white p-4">
                                <Shirt className="w-10 h-10 mb-2 stroke-[1.5]" />
                                <h3 className="font-hurme-bold font-bold text-[15px] leading-[23px] md:font-hurme-semibold md:font-semibold text-center md:text-[20px] md:leading-[24px] tracking-normal">Clothing, Shoes & Jewelry</h3>
                            </div>
                        </a>
                    </div>


                    <div className="relative overflow-hidden rounded-2xl group cursor-pointer transition-transform hover:scale-105 h-28">
                        <a href='/category/baby-products' target='blank'>
                            <Image src="/category/baby-products.jpg" alt="Baby Products" fill className="object-cover" />
                            <div className="absolute inset-0 bg-black opacity-[65%]" />
                            <div className="absolute inset-0 flex flex-col items-center justify-center text-white p-4">
                                <Baby className="w-10 h-10 mb-2 stroke-[1.5]" />
                                <h3 className="font-hurme-bold font-bold text-[15px] leading-[23px] md:font-hurme-semibold md:font-semibold text-center md:text-[20px] md:leading-[24px] tracking-normal">Baby Products</h3>
                            </div>
                        </a>
                    </div>



                    <div className="relative overflow-hidden rounded-2xl group cursor-pointer transition-transform hover:scale-105 h-28">
                        <a href='/category/tools-home-improvement' target='blank'>
                            <Image
                                src="/category/tools-home-improvement.jpg"
                                alt="Tools & Home Improvement"
                                fill
                                className="object-cover"
                            />
                            <div className="absolute inset-0 bg-black opacity-[65%]" />
                            <div className="absolute inset-0 flex flex-col items-center justify-center text-white p-4">
                                <Hammer className="w-10 h-10 mb-2 stroke-[1.5]" />
                                <h3 className="font-hurme-bold font-bold text-[15px] leading-[23px] md:font-hurme-semibold md:font-semibold text-center md:text-[20px] md:leading-[24px] tracking-normal">Tools & Home Improvement</h3>
                            </div>
                        </a>
                    </div>


                    <div className="col-span-2 relative overflow-hidden rounded-2xl group cursor-pointer transition-transform hover:scale-105 h-[133px]">
                        <a href='/category/pet-supplies' target='blank'>
                            <Image src="/category/pet-supplies.jpg" alt="Pet Supplies" fill className="object-cover" />
                            <div className="absolute inset-0 bg-black opacity-[65%]" />
                            <div className="absolute inset-0 flex flex-col items-center justify-center text-white p-4">
                                <Dog className="w-10 h-10 mb-2 stroke-[1.5]" />
                                <h3 className="font-hurme-bold font-bold text-[15px] leading-[23px] md:font-hurme-semibold md:font-semibold text-center md:text-[20px] md:leading-[24px] tracking-normal">Pet Supplies</h3>
                            </div>
                        </a>
                    </div>

                </div>

                {/* Desktop Layout - 4 columns with equal heights */}
                <div className="hidden lg:grid lg:grid-cols-4 gap-4">
                    {/* Column 1 */}
                    <div className="flex flex-col gap-4">
                        <a href='/category/electronics' target='blank'>
                            <div className="relative overflow-hidden rounded-2xl group cursor-pointer transition-transform hover:scale-105 h-64">
                                <Image src="/category/electronics.jpg" alt="Electronics" fill className="object-cover" />
                                <div className="absolute inset-0 bg-black opacity-[65%]" />
                                <div className="absolute inset-0 flex flex-col items-center justify-center text-white p-6">
                                    <Keyboard className="w-12 h-12 mb-3 stroke-[1.5]" />
                                    <h3 className="text-xl font-semibold text-center">Electronics</h3>
                                </div>
                            </div>
                        </a>
                        <a href='/category/home-kitchen' target='blank'>

                            <div className="relative overflow-hidden rounded-2xl group cursor-pointer transition-transform hover:scale-105 h-96">
                                <Image src="/category/home-kitchen.jpg" alt="Home & Kitchen" fill className="object-cover" />
                                <div className="absolute inset-0 bg-black opacity-[65%]" />
                                <div className="absolute inset-0 flex flex-col items-center justify-center text-white p-6">
                                    <UtensilsCrossed className="w-12 h-12 mb-3 stroke-[1.5]" />
                                    <h3 className="text-xl font-semibold text-center">Home & Kitchen</h3>
                                </div>
                            </div>
                        </a>
                    </div>


                    {/* Column 2 */}
                    <div className="flex flex-col gap-4">
                        <a href='/category/sports-outdoors' target='blank'>
                            <div className="relative overflow-hidden rounded-2xl group cursor-pointer transition-transform hover:scale-105 h-80">
                                <Image src="/category/sports-outdoors.jpg" alt="Sports & Outdoors" fill className="object-cover" />
                                <div className="absolute inset-0 bg-black opacity-[65%]" />
                                <div className="absolute inset-0 flex flex-col items-center justify-center text-white p-6">
                                    <Bike className="w-12 h-12 mb-3 stroke-[1.5]" />
                                    <h3 className="text-xl font-semibold text-center">Sports & Outdoors</h3>
                                </div>
                            </div>
                        </a>
                        <a href='/category/beauty-personal-care' target='blank'>
                            <div className="relative overflow-hidden rounded-2xl group cursor-pointer transition-transform hover:scale-105 h-80">
                                <Image
                                    src="/category/beauty-personal-care.jpg"
                                    alt="Beauty & Personal Care"
                                    fill
                                    className="object-cover"
                                />
                                <div className="absolute inset-0 bg-black opacity-[65%]" />
                                <div className="absolute inset-0 flex flex-col items-center justify-center text-white p-6">
                                    <Sparkles className="w-12 h-12 mb-3 stroke-[1.5]" />
                                    <h3 className="text-xl font-semibold text-center">Beauty & Personal Care</h3>
                                </div>
                            </div>
                        </a>
                    </div>

                    {/* Column 3 */}
                    <div className="flex flex-col gap-4">
                        <a href='/category/clothing-shoes-jewelry' target='blank'>
                            <div className="relative overflow-hidden rounded-2xl group cursor-pointer transition-transform hover:scale-105 h-[400px]">
                                <Image
                                    src="/category/clothing-shoes-jewelry.jpg"
                                    alt="Clothing, Shoes & Jewelry"
                                    fill
                                    className="object-cover"
                                />
                                <div className="absolute inset-0 bg-black opacity-[65%]" />
                                <div className="absolute inset-0 flex flex-col items-center justify-center text-white p-6">
                                    <Shirt className="w-12 h-12 mb-3 stroke-[1.5]" />
                                    <h3 className="text-xl font-semibold text-center">Clothing, Shoes & Jewelry</h3>
                                </div>
                            </div>
                        </a>
                        <a href='/category/baby-products' target='blank'>
                            <div className="relative overflow-hidden rounded-2xl group cursor-pointer transition-transform hover:scale-105 h-60">
                                <Image src="/category/baby-products.jpg" alt="Baby Products" fill className="object-cover" />
                                <div className="absolute inset-0 bg-black opacity-[65%]" />
                                <div className="absolute inset-0 flex flex-col items-center justify-center text-white p-6">
                                    <Baby className="w-12 h-12 mb-3 stroke-[1.5]" />
                                    <h3 className="text-xl font-semibold text-center">Baby Products</h3>
                                </div>
                            </div>
                        </a>
                    </div>

                    {/* Column 4 */}
                    <div className="flex flex-col gap-4">
                        <a href='/category/tools-home-improvement' target='blank'>
                            <div className="relative overflow-hidden rounded-2xl group cursor-pointer transition-transform hover:scale-105 h-64">
                                <Image
                                    src="/category/tools-home-improvement.jpg"
                                    alt="Tools & Home Improvement"
                                    fill
                                    className="object-cover"
                                />
                                <div className="absolute inset-0 bg-black opacity-[65%]" />
                                <div className="absolute inset-0 flex flex-col items-center justify-center text-white p-6">
                                    <Hammer className="w-12 h-12 mb-3 stroke-[1.5]" />
                                    <h3 className="text-xl font-semibold text-center">Tools & Home Improvement</h3>
                                </div>
                            </div>
                        </a>
                        <a href='/category/pet-supplies' target='blank'>
                            <div className="relative overflow-hidden rounded-2xl group cursor-pointer transition-transform hover:scale-105 h-96">
                                <Image src="/category/pet-supplies.jpg" alt="Pet Supplies" fill className="object-cover" />
                                <div className="absolute inset-0 bg-black opacity-[65%]" />
                                <div className="absolute inset-0 flex flex-col items-center justify-center text-white p-6">
                                    <Dog className="w-12 h-12 mb-3 stroke-[1.5]" />
                                    <h3 className="text-xl font-semibold text-center">Pet Supplies</h3>
                                </div>
                            </div>
                        </a>
                    </div>
                </div>
            </div>
        </section >
    )
}