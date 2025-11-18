"use client"

import Image from "next/image"
import { Keyboard, Bike, Shirt, Hammer, UtensilsCrossed, Sparkles, Baby, Dog } from "lucide-react"

const categories = [
    {
        title: "Electronics",
        icon: Keyboard,
        image: "",
        mobileSpan: "col-span-1",
        mobileHeight: "h-48"
    },
    {
        title: "SPorts & Outdoors",
        icon: Bike,
        image: "",
        mobileSpan: "col-span-1",
        mobileHeight: "h-48"
    },
    {
        title: "Home & Kitchen",
        icon: UtensilsCrossed,
        image: "",
        mobileSpan: "col-span-1",
        mobileHeight: "h-48"
    },
    {
        title: "Beauty & Personal Care",
        icon: Sparkles,
        image: "",
        mobileSpan: "col-span-1",
        mobileHeight: "h-48"
    },
    {
        title: "Clothing, Shoes & Jewelry",
        icon: Shirt,
        image: "",
        mobileSpan: "col-span-1",
        mobileHeight: "h-48"
    },
    {
        title: "Baby Products",
        icon: Baby,
        image: "",
        mobileSpan: "col-span-1",
        mobileHeight: "h-48"
    },
    {
        title: "Tools & Home Improvement",
        icon: Keyboard,
        image: "",
        mobileSpan: "col-span-1",
        mobileHeight: "h-48"
    },
    {
        title: "Pet Supplies",
        icon: Dog,
        image: "",
        mobileSpan: "col-span-2",
        mobileHeight: "h-48"
    }
]


export default function CategoryList() {
    return (
        <section className="px-4 py-16">
            <div className="text-center mb-12">
                <h2 className="text-4xl md:text-5xl font-bold">Categories</h2>
            </div>
            <div className="max-w-[1204px] mx-auto">
                {/* Mobile Layout - 2 column grid matching reference image */}
                <div className="lg:hidden grid grid-cols-2 gap-4">
                    <div className="relative overflow-hidden rounded-2xl group cursor-pointer transition-transform hover:scale-105 h-28">
                        <Image src="/category/electronics.jpg" alt="Electronics" fill className="object-cover" />
                        <div className="absolute inset-0 bg-black/40 group-hover:bg-black/50 transition-colors" />
                        <div className="absolute inset-0 flex flex-col items-center justify-center text-white p-4">
                            <Keyboard className="w-10 h-10 mb-2 stroke-[1.5]" />
                            <h3 className="text-base font-semibold text-center">Electronics</h3>
                        </div>
                    </div>
                    <div className="relative overflow-hidden rounded-2xl group cursor-pointer transition-transform hover:scale-105 h-60 row-span-2">
                        <Image src="/category/sports-outdoors.jpg" alt="Sports & Outdoors" fill className="object-cover" />
                        <div className="absolute inset-0 bg-black/40 group-hover:bg-black/50 transition-colors" />
                        <div className="absolute inset-0 flex flex-col items-center justify-center text-white p-4">
                            <Bike className="w-10 h-10 mb-2 stroke-[1.5]" />
                            <h3 className="text-base font-semibold text-center">Sports & Outdoors</h3>
                        </div>
                    </div>

                    <div className="relative overflow-hidden rounded-2xl group cursor-pointer transition-transform hover:scale-105 h-28">
                        <Image src="/category/home-kitchen.jpg" alt="Home & Kitchen" fill className="object-cover" />
                        <div className="absolute inset-0 bg-black/40 group-hover:bg-black/50 transition-colors" />
                        <div className="absolute inset-0 flex flex-col items-center justify-center text-white p-4">
                            <UtensilsCrossed className="w-10 h-10 mb-2 stroke-[1.5]" />
                            <h3 className="text-base font-semibold text-center">Home & Kitchen</h3>
                        </div>
                    </div>

                    <div className="col-span-2 relative overflow-hidden rounded-2xl group cursor-pointer transition-transform hover:scale-105 h-[133px]">
                        <Image
                            src="/category/beauty-personal-care.jpg"
                            alt="Beauty & Personal Care"
                            fill
                            className="object-cover"
                        />
                        <div className="absolute inset-0 bg-black/40 group-hover:bg-black/50 transition-colors" />
                        <div className="absolute inset-0 flex flex-col items-center justify-center text-white p-4">
                            <Sparkles className="w-10 h-10 mb-2 stroke-[1.5]" />
                            <h3 className="text-base font-semibold text-center">Beauty & Personal Care</h3>
                        </div>
                    </div>

                    <div className="relative overflow-hidden rounded-2xl group cursor-pointer transition-transform hover:scale-105 h-60 row-span-2">
                        <Image
                            src="/category/clothing-shoes-jewelry.jpg"
                            alt="Clothing, Shoes & Jewelry"
                            fill
                            className="object-cover"
                        />
                        <div className="absolute inset-0 bg-black/40 group-hover:bg-black/50 transition-colors" />
                        <div className="absolute inset-0 flex flex-col items-center justify-center text-white p-4">
                            <Shirt className="w-10 h-10 mb-2 stroke-[1.5]" />
                            <h3 className="text-base font-semibold text-center">Clothing, Shoes & Jewelry</h3>
                        </div>
                    </div>
                    <div className="relative overflow-hidden rounded-2xl group cursor-pointer transition-transform hover:scale-105 h-28">
                        <Image src="/category/baby-products.jpg" alt="Baby Products" fill className="object-cover" />
                        <div className="absolute inset-0 bg-black/40 group-hover:bg-black/50 transition-colors" />
                        <div className="absolute inset-0 flex flex-col items-center justify-center text-white p-4">
                            <Baby className="w-10 h-10 mb-2 stroke-[1.5]" />
                            <h3 className="text-base font-semibold text-center">Baby Products</h3>
                        </div>
                    </div>

                    <div className="relative overflow-hidden rounded-2xl group cursor-pointer transition-transform hover:scale-105 h-28">
                        <Image
                            src="/category/tools-home-improvement.jpg"
                            alt="Tools & Home Improvement"
                            fill
                            className="object-cover"
                        />
                        <div className="absolute inset-0 bg-black/40 group-hover:bg-black/50 transition-colors" />
                        <div className="absolute inset-0 flex flex-col items-center justify-center text-white p-4">
                            <Hammer className="w-10 h-10 mb-2 stroke-[1.5]" />
                            <h3 className="text-base font-semibold text-center">Tools & Home Improvement</h3>
                        </div>
                    </div>

                    <div className="col-span-2 relative overflow-hidden rounded-2xl group cursor-pointer transition-transform hover:scale-105 h-[133px]">
                        <Image src="/category/pet-supplies.jpg" alt="Pet Supplies" fill className="object-cover" />
                        <div className="absolute inset-0 bg-black/40 group-hover:bg-black/50 transition-colors" />
                        <div className="absolute inset-0 flex flex-col items-center justify-center text-white p-4">
                            <Dog className="w-10 h-10 mb-2 stroke-[1.5]" />
                            <h3 className="text-base font-semibold text-center">Pet Supplies</h3>
                        </div>
                    </div>
                </div>

                {/* Desktop Layout - 4 columns with equal heights */}
                <div className="hidden lg:grid lg:grid-cols-4 gap-4">
                    {/* Column 1 */}
                    <div className="flex flex-col gap-4">
                        <div className="relative overflow-hidden rounded-2xl group cursor-pointer transition-transform hover:scale-105 h-64">
                            <Image src="/category/electronics.jpg" alt="Electronics" fill className="object-cover" />
                            <div className="absolute inset-0 bg-black/40 group-hover:bg-black/50 transition-colors" />
                            <div className="absolute inset-0 flex flex-col items-center justify-center text-white p-6">
                                <Keyboard className="w-12 h-12 mb-3 stroke-[1.5]" />
                                <h3 className="text-xl font-semibold text-center">Electronics</h3>
                            </div>
                        </div>
                        <div className="relative overflow-hidden rounded-2xl group cursor-pointer transition-transform hover:scale-105 h-96">
                            <Image src="/category/home-kitchen.jpg" alt="Home & Kitchen" fill className="object-cover" />
                            <div className="absolute inset-0 bg-black/40 group-hover:bg-black/50 transition-colors" />
                            <div className="absolute inset-0 flex flex-col items-center justify-center text-white p-6">
                                <UtensilsCrossed className="w-12 h-12 mb-3 stroke-[1.5]" />
                                <h3 className="text-xl font-semibold text-center">Home & Kitchen</h3>
                            </div>
                        </div>
                    </div>

                    {/* Column 2 */}
                    <div className="flex flex-col gap-4">
                        <div className="relative overflow-hidden rounded-2xl group cursor-pointer transition-transform hover:scale-105 h-80">
                            <Image src="/category/sports-outdoors.jpg" alt="Sports & Outdoors" fill className="object-cover" />
                            <div className="absolute inset-0 bg-black/40 group-hover:bg-black/50 transition-colors" />
                            <div className="absolute inset-0 flex flex-col items-center justify-center text-white p-6">
                                <Bike className="w-12 h-12 mb-3 stroke-[1.5]" />
                                <h3 className="text-xl font-semibold text-center">Sports & Outdoors</h3>
                            </div>
                        </div>
                        <div className="relative overflow-hidden rounded-2xl group cursor-pointer transition-transform hover:scale-105 h-80">
                            <Image
                                src="/category/beauty-personal-care.jpg"
                                alt="Beauty & Personal Care"
                                fill
                                className="object-cover"
                            />
                            <div className="absolute inset-0 bg-black/40 group-hover:bg-black/50 transition-colors" />
                            <div className="absolute inset-0 flex flex-col items-center justify-center text-white p-6">
                                <Sparkles className="w-12 h-12 mb-3 stroke-[1.5]" />
                                <h3 className="text-xl font-semibold text-center">Beauty & Personal Care</h3>
                            </div>
                        </div>
                    </div>

                    {/* Column 3 */}
                    <div className="flex flex-col gap-4">
                        <div className="relative overflow-hidden rounded-2xl group cursor-pointer transition-transform hover:scale-105 h-[400px]">
                            <Image
                                src="/category/clothing-shoes-jewelry.jpg"
                                alt="Clothing, Shoes & Jewelry"
                                fill
                                className="object-cover"
                            />
                            <div className="absolute inset-0 bg-black/40 group-hover:bg-black/50 transition-colors" />
                            <div className="absolute inset-0 flex flex-col items-center justify-center text-white p-6">
                                <Shirt className="w-12 h-12 mb-3 stroke-[1.5]" />
                                <h3 className="text-xl font-semibold text-center">Clothing, Shoes & Jewelry</h3>
                            </div>
                        </div>
                        <div className="relative overflow-hidden rounded-2xl group cursor-pointer transition-transform hover:scale-105 h-60">
                            <Image src="/category/baby-products.jpg" alt="Baby Products" fill className="object-cover" />
                            <div className="absolute inset-0 bg-black/40 group-hover:bg-black/50 transition-colors" />
                            <div className="absolute inset-0 flex flex-col items-center justify-center text-white p-6">
                                <Baby className="w-12 h-12 mb-3 stroke-[1.5]" />
                                <h3 className="text-xl font-semibold text-center">Baby Products</h3>
                            </div>
                        </div>
                    </div>

                    {/* Column 4 */}
                    <div className="flex flex-col gap-4">
                        <div className="relative overflow-hidden rounded-2xl group cursor-pointer transition-transform hover:scale-105 h-64">
                            <Image
                                src="/category/tools-home-improvement.jpg"
                                alt="Tools & Home Improvement"
                                fill
                                className="object-cover"
                            />
                            <div className="absolute inset-0 bg-black/40 group-hover:bg-black/50 transition-colors" />
                            <div className="absolute inset-0 flex flex-col items-center justify-center text-white p-6">
                                <Hammer className="w-12 h-12 mb-3 stroke-[1.5]" />
                                <h3 className="text-xl font-semibold text-center">Tools & Home Improvement</h3>
                            </div>
                        </div>
                        <div className="relative overflow-hidden rounded-2xl group cursor-pointer transition-transform hover:scale-105 h-96">
                            <Image src="/category/pet-supplies.jpg" alt="Pet Supplies" fill className="object-cover" />
                            <div className="absolute inset-0 bg-black/40 group-hover:bg-black/50 transition-colors" />
                            <div className="absolute inset-0 flex flex-col items-center justify-center text-white p-6">
                                <Dog className="w-12 h-12 mb-3 stroke-[1.5]" />
                                <h3 className="text-xl font-semibold text-center">Pet Supplies</h3>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </section>
    )
}