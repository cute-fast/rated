import React from "react";

export default function Categories() {
    const categories = [
        {
            name: "Electronics",
            icon: "/categories/icons/electronics.svg", // Replace with actual icon path
            backgroundImage: "/categories/electronics.jpg",
            height: "h-[300px]"
        },
        {
            name: "Sports & Outdoors",
            icon: "/categories/icons/sports.svg", // Replace with actual icon path
            backgroundImage: "/categories/sports-outdoors.jpg",
            height: "h-[340px]"
        },
        {
            name: "Clothing, Shoes & Jewelry",
            icon: "/categories/icons/clothing.svg", // Replace with actual icon path
            backgroundImage: "/categories/clothing.jpg",
            height: "h-[320px]"
        },
        {
            name: "Tools & Home Improvement",
            icon: "/categories/icons/tools.svg", // Replace with actual icon path
            backgroundImage: "/categories/tools.jpg",
            height: "h-[360px]"
        },
        {
            name: "Home & Kitchen",
            icon: "/categories/icons/home-kitchen.svg", // Replace with actual icon path
            backgroundImage: "/categories/home-kitchen.jpg",
            height: "h-[310px]"
        },
        {
            name: "Beauty & Personal Care",
            icon: "/categories/icons/beauty.svg", // Replace with actual icon path
            backgroundImage: "/categories/beauty.jpg",
            height: "h-[330px]"
        },
        {
            name: "Baby Products",
            icon: "/categories/icons/baby.svg", // Replace with actual icon path
            backgroundImage: "/categories/baby.jpg",
            height: "h-[350px]"
        },
        {
            name: "Pet Supplies",
            icon: "/categories/icons/pets.svg", // Replace with actual icon path
            backgroundImage: "/categories/pets.jpg",
            height: "h-[315px]"
        }
    ];

    return (
        <section className="px-6 py-16 bg-white">
            <div className="max-w-7xl mx-auto">
                <h2 className="text-4xl md:text-5xl font-bold text-center mb-12">Categories</h2>
                <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6 justify-items-center">
                    {categories.map((category, index) => (
                        <div
                            key={index}
                            className={`w-full max-w-[290px] ${category.height} rounded-xl overflow-hidden shadow-md hover:shadow-lg transition-shadow cursor-pointer relative`}
                        >
                            {/* Background Image */}
                            <div className="relative w-full h-full">
                                <img
                                    src={category.backgroundImage}
                                    alt={category.name}
                                    className="w-full h-full object-cover"
                                />
                                {/* Dark gradient overlay */}
                                <div className="absolute inset-0 bg-gradient-to-b from-black/40 via-black/50 to-black/70" />
                                
                                {/* Content */}
                                <div className="absolute inset-0 flex flex-col items-center justify-center text-white p-6">
                                    {/* Icon */}
                                    <div className="mb-6 flex items-center justify-center h-16 w-16">
                                        <img
                                            src={category.icon}
                                            alt=""
                                            className="w-full h-full object-contain filter brightness-0 invert"
                                        />
                                    </div>
                                    {/* Category Name */}
                                    <h3 className="text-lg font-semibold text-center">
                                        {category.name}
                                    </h3>
                                </div>
                            </div>
                        </div>
                    ))}
                </div>
            </div>
        </section>
    );
}

