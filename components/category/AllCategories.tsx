"use client"

import { useState } from "react"
import Link from "next/link"

interface Category {
  name: string
  slug: string
  icon: string
  icon2: string
  backgroundImage: string
  featuredSubCategories: string[]
  allSubCategories: string[]
}

const categories: Category[] = [
  {
    name: "Home & Kitchen",
    slug: "home-kitchen",
    icon: "/categories/home-kitchen.png",
    icon2: "/categories/home-kitchen-b.png",
    backgroundImage: "/categories/home-kitchen.jpg",
    featuredSubCategories: ["Patio, Lawn & Garden", "Electronics", "Kitchen & Dining", "Home Decor", "Storage & Organization"],
    allSubCategories: [
      "Patio, Lawn & Garden",
      "Appliances",
      "Kitchen & Dining",
      "Home Decor",
      "Furniture",
      "Storage & Organization",
      "Smart Home",
      "Cleaning Supplies",
      "Bath",
      "Lighting",
      "Floor Care",
      "Seasonal Decor"
    ]
  },
  {
    name: "Appliances",
    slug: "appliances",
    icon: "/icons/refrigerator.svg",
    icon2: "/icons/refrigerator-b.svg",
    backgroundImage: "/categories/appliances.jpg",
    featuredSubCategories: ["Kitchen Appliances", "Home Appliances", "Small Appliances", "Major Appliances", "Smart Appliances"],
    allSubCategories: [
      "Kitchen Appliances",
      "Refrigerators",
      "Ranges & Ovens",
      "Dishwashers",
      "Home Appliances",
      "Washers & Dryers",
      "Vacuum & Floor Care",
      "Air Quality",
      "Small Appliances",
      "Coffee & Espresso",
      "Blenders & Processors",
      "Smart Appliances"
    ]
  },
  {
    name: "Tools & Home Improvement",
    slug: "tools-home-improvement",
    icon: "/icons/paint-roller.svg",
    icon2: "/icons/paint-roller-b.svg",
    backgroundImage: "/categories/tools.jpg",
    featuredSubCategories: ["Power Tools", "Hand Tools", "Hardware", "Paint & Supplies", "Building Materials"],
    allSubCategories: [
      "Power Tools",
      "Hand Tools",
      "Hardware",
      "Paint & Supplies",
      "Building Materials",
      "Electrical",
      "Plumbing",
      "Safety & Security",
      "Lighting",
      "Heating & Cooling",
      "Outdoor Power",
      "Smart Home"
    ]
  },
  {
    name: "Patio, Lawn & Garden",
    slug: "patio-lawn-garden",
    icon: "/icons/plant.svg",
    icon2: "/icons/plant-b.svg",
    backgroundImage: "/categories/patio.jpg",
    featuredSubCategories: ["Outdoor Furniture", "Garden Tools", "Planters", "Lawn Care", "BBQ & Grilling"],
    allSubCategories: [
      "Outdoor Furniture",
      "Garden Tools",
      "Planters",
      "Lawn Care",
      "BBQ & Grilling",
      "Outdoor Decor",
      "Pools & Spas",
      "Outdoor Lighting",
      "Patio Heaters",
      "Pest Control",
      "Irrigation",
      "Seasonal Plants"
    ]
  },
  {
    name: "Electronics",
    slug: "electronics",
    icon: "/icons/grid.svg",
    icon2: "/icons/grid-b.svg",
    backgroundImage: "/categories/electronics.jpg",
    featuredSubCategories: ["Computers", "Audio", "TV & Video", "Cameras", "Gaming"],
    allSubCategories: [
      "Computers",
      "Laptops",
      "Tablets",
      "Monitors",
      "Audio",
      "Headphones",
      "Speakers",
      "TV & Video",
      "Cameras",
      "Smart Home",
      "Wearables",
      "Gaming"
    ]
  },
  {
    name: "Cell Phones & Accessories",
    slug: "cell-phones-accessories",
    icon: "/icons/smartphone.svg",
    icon2: "",
    backgroundImage: "/categories/phones.jpg",
    featuredSubCategories: ["Smartphones", "Cases & Covers", "Chargers", "Headphones", "Screen Protectors"],
    allSubCategories: [
      "Smartphones",
      "Unlocked Phones",
      "5G Devices",
      "Cases & Covers",
      "Screen Protectors",
      "Chargers & Cables",
      "Headphones",
      "Power Banks",
      "Wearables",
      "Car Accessories",
      "Camera Lenses",
      "Replacement Parts"
    ]
  },
  {
    name: "Video Games",
    slug: "video-games",
    icon: "/icons/game-controller.svg",
    icon2: "",
    backgroundImage: "/categories/games.jpg",
    featuredSubCategories: ["Console Games", "PC Games", "Gaming Accessories", "Gaming Consoles", "Gaming Chairs"],
    allSubCategories: [
      "Console Games",
      "PlayStation",
      "Xbox",
      "Nintendo",
      "PC Games",
      "VR & AR",
      "Gaming Accessories",
      "Controllers",
      "Headsets",
      "Gaming Consoles",
      "Gaming Chairs",
      "Merch & Collectibles"
    ]
  },
  {
    name: "Software",
    slug: "software",
    icon: "/icons/laptop.svg",
    icon2: "",
    backgroundImage: "/categories/software.jpg",
    featuredSubCategories: ["Operating Systems", "Productivity", "Security", "Creative Software", "Business Software"],
    allSubCategories: [
      "Operating Systems",
      "Productivity",
      "Office Suites",
      "Security",
      "Antivirus",
      "VPN",
      "Creative Software",
      "Photo & Video",
      "Design Tools",
      "Business Software",
      "Developer Tools",
      "Education"
    ]
  }
]

export default function AllCategories() {
  const [expandedCategories, setExpandedCategories] = useState<Record<string, boolean>>({})
  const [activeMobileCategory, setActiveMobileCategory] = useState<Category | null>(null)

  const toggleCategory = (slug: string) => {
    setExpandedCategories((prev) => ({
      ...prev,
      [slug]: !prev[slug]
    }))
  }
  return (
    <section className="bg-white pt-4 px-4">
      <div className="max-w-[1312px] mx-auto">
        {/* Breadcrumbs */}
        <nav className="flex items-center gap-2 text-sm text-gray-500 py-[16px]">
          <Link href="/" className="hover:text-[#0E033B]">Home</Link>
          <span>›</span>
          {!activeMobileCategory && (
            <span className="text-[#0E033B] font-medium">All Categories</span>
          )}
          {activeMobileCategory && (
            <>
              <button
                type="button"
                onClick={() => setActiveMobileCategory(null)}
                className="text-[#4E49FF] font-medium hover:text-[#0E033B]"
              >
                All Categories
              </button>
              <span>›</span>
              <span className="text-[#0E033B] font-semibold">{activeMobileCategory.name}</span>
            </>
          )}
        </nav>
        {!activeMobileCategory && (
        <h2 className="text-[32px] md:text-[48px] font-bold text-[#0E033B] mt-0">All Categories</h2>
        )}
        <div className="md:pt-[32px] md:px-[96px]">
          
          {/* Mobile View */}
          <div className="md:hidden">
            {!activeMobileCategory ? (
              <div className="bg-white border border-r-0 border-l-0 border-gray-300 divide-y divide-gray-300 shadow-sm">
                {categories.map((category) => (
                  <button
                    key={category.slug}
                    type="button"
                    onClick={() => setActiveMobileCategory(category)}
                    className="w-full py-5 flex items-center justify-between gap-4 hover:bg-gray-300 transition-colors"
                  >
                    <div className="flex items-center gap-3">
                      <div className="flex items-center justify-center">
                        <img src={category.icon2} alt={category.name} className="w-6 h-6 object-contain" />
                      </div>
                      <span className="text-[15px] text-[#0E033B]">{category.name}</span>
                    </div>
                    <svg className="w-4 h-4 text-[#0E033B]" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" d="M9 5l7 7-7 7" />
                    </svg>
                  </button>
                ))}
              </div>
            ) : (
              <div className="">
                <button
                  type="button"
                  onClick={() => setActiveMobileCategory(null)}
                  className="flex items-center gap-2 text-[#4E49FF] font-semibold"
                >
                  <svg className="w-4 h-4" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" d="M15 19l-7-7 7-7" />
                  </svg>
                  All Categories
                </button>

                <div className="my-0">
                  <h3 className="text-[32px] font-bold text-[#0E033B] py-4 border border-l-0 border-b-0 border-r-0 border-gray-300">{activeMobileCategory.name}</h3>
                  <div className="bg-white border border-gray-300 border-l-0 border-r-0 divide-y divide-gray-300 shadow-sm">
                    {activeMobileCategory.allSubCategories.map((subCat) => (
                      <Link
                        key={subCat}
                        href={`/category/${activeMobileCategory.slug}/${subCat.toLowerCase().replace(/\s+/g, '-')}`}
                        className="py-4 flex items-center justify-between hover:bg-gray-300 transition-colors"
                      >
                        <span className="text-[#0E033B]">{subCat}</span>
                        <svg className="w-4 h-4 text-[#0E033B]" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24">
                          <path strokeLinecap="round" strokeLinejoin="round" d="M9 5l7 7-7 7" />
                        </svg>
                      </Link>
                    ))}
                  </div>
                </div>
              </div>
            )}
          </div>

          {/* Desktop View */}
          <div className="hidden md:grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
            {categories.map((category) => (
              <div key={category.slug} className="flex flex-col">
                {/* Category Card */}
                <Link href={`/category/${category.slug}`} className="group">
                  <div className="relative h-[142px] rounded-xl overflow-hidden mb-4">
                    {/* Background Image with Dark Overlay */}
                    <div
                      className="absolute inset-0 bg-cover bg-center"
                      style={{
                        backgroundImage: `url(${category.backgroundImage})`
                      }}
                    >
                      <div className="absolute inset-0 bg-gradient-to-b from-black/70 via-black/60 to-black/70 group-hover:from-black/80 group-hover:via-black/70 group-hover:to-black/80 transition-all"></div>
                    </div>

                    {/* Icon and Category Name */}
                    <div className="relative h-full flex flex-col items-center justify-center text-white p-4">
                      <div className="mb-4 flex items-center justify-center">
                        <div className="w-[40px] h-[40px] flex items-center justify-center">
                          <img
                            src={category.icon}
                            alt={category.name}
                            className="w-full h-full object-contain filter brightness-0 invert"
                            onError={(e) => {
                              // Fallback to a simple icon if image doesn't exist
                              const target = e.target as HTMLImageElement
                              target.style.display = 'none'
                            }}
                          />
                        </div>
                      </div>
                      <h3 className="text-[15px] leading-[23px] font-bold text-center">{category.name}</h3>
                    </div>
                  </div>
                </Link>

                {/* Sub-categories List */}
                <div className="space-y-1.5 mt-2">
                  {(expandedCategories[category.slug] ? category.allSubCategories : category.featuredSubCategories).map((subCat, index) => (
                    <Link
                      key={index}
                      href={`/category/${category.slug}/${subCat.toLowerCase().replace(/\s+/g, '-')}`}
                      className="block text-sm text-gray-700 hover:text-[#0E033B] transition-colors leading-relaxed"
                    >
                      {subCat}
                    </Link>
                  ))}

                  <button
                    type="button"
                    onClick={() => toggleCategory(category.slug)}
                    className="mt-3 text-sm font-semibold text-[#0E033B] underline hover:no-underline"
                  >
                    {expandedCategories[category.slug] ? "Show Less" : `Show All (${category.allSubCategories.length})`}
                  </button>
                </div>
              </div>
            ))}
          </div>

        </div>

        
      </div>
    </section>
  )
}

