"use client"

import { useState, useEffect } from "react"
import Link from "next/link"
import axios from "axios"

interface SubCategory {
  name: string
  slug: string
}

interface Category {
  name: string
  slug: string
  level2s: SubCategory[]
}

interface CategoryWithUI extends Category {
  icon: string
  icon2: string
  backgroundImage: string
}

// Default images/icons mapping - can be enhanced later
const getCategoryAssets = (slug: string) => {
  const assets: Record<string, { icon: string; icon2: string; backgroundImage: string }> = {
    "appliances": {
      icon: "/categories/appliances.png",
      icon2: "/categories/appliances-b.png",
      backgroundImage: "/categories/appliances.jpg"
    },
    "arts-crafts-sewing": {
      icon: "/categories/arts-crafts-sewing.png",
      icon2: "/categories/arts-crafts-sewing-b.png",
      backgroundImage: "/categories/arts-crafts-sewing.jpg"
    },
    "audible-books-originals": {
      icon: "/categories/audible-books-originals.png",
      icon2: "/categories/audible-books-originals-b.png",
      backgroundImage: "/categories/audible-books-originals.jpg"
    },
    "automotive": {
      icon: "/categories/automotive.png",
      icon2: "/categories/automotive-b.png",
      backgroundImage: "/categories/automotive.jpg"
    },
    "baby-products": {
      icon: "/categories/baby-products.png",
      icon2: "/categories/baby-products-b.png",
      backgroundImage: "/categories/baby-products.jpg"
    },
    "beauty-personal-care": {
      icon: "/categories/beauty-personal-care.png",
      icon2: "/categories/beauty-personal-care-b.png",
      backgroundImage: "/categories/beauty-personal-care.jpg"
    },
    "books": {
      icon: "/categories/books.png",
      icon2: "/categories/books-b.png",
      backgroundImage: "/categories/books.jpg"
    },
    "cell-phones-accessories-p": {
      icon: "/categories/cell-phones-accessories.png",
      icon2: "/categories/cell-phones-accessories-b.png",
      backgroundImage: "/categories/cell-phones-accessories.jpg"
    },
    "clothing-shoes-jewelry": {
      icon: "/categories/clothing-shoes-jewelry.png",
      icon2: "/categories/clothing-shoes-jewelry-b.png",
      backgroundImage: "/categories/clothing-shoes-jewelry.jpg"
    },
    "digital-music": {
      icon: "/categories/digital-music.png",
      icon2: "/categories/digital-music-b.png",
      backgroundImage: "/categories/digital-music.jpg"
    },
    "electronics": {
      icon: "/categories/electronics.png",
      icon2: "/categories/electronics-b.png",
      backgroundImage: "/categories/electronics.jpg"
    },
    "grocery-gourmet-food": {
      icon: "/categories/grocery-gourmet-food.png",
      icon2: "/categories/grocery-gourmet-food-b.png",
      backgroundImage: "/categories/grocery-gourmet-food.jpg"
    },
    "handmade-products": {
      icon: "/categories/handmade-products.png",
      icon2: "/categories/handmade-products-b.png",
      backgroundImage: "/categories/handmade-products.jpg"
    },
    "health-household": {
      icon: "/categories/health-household.png",
      icon2: "/categories/health-household-b.png",
      backgroundImage: "/categories/health-household.jpg"
    },
    "home-kitchen-p": {
      icon: "/categories/home-kitchen.png",
      icon2: "/categories/home-kitchen-b.png",
      backgroundImage: "/categories/home-kitchen.jpg"
    },
    "industrial-scientific": {
      icon: "/categories/industrial-scientific.png",
      icon2: "/categories/industrial-scientific-b.png",
      backgroundImage: "/categories/industrial-scientific.jpg"
    },
    "musical-instruments": {
      icon: "/categories/musical-instruments.png",
      icon2: "/categories/musical-instruments-b.png",
      backgroundImage: "/categories/musical-instruments.jpg"
    },
    "office-products": {
      icon: "/categories/office-products.png",
      icon2: "/categories/office-products-b.png",
      backgroundImage: "/categories/office-products.jpg"
    },
    "other-p": {
      icon: "/categories/other.png",
      icon2: "/categories/other-b.png",
      backgroundImage: "/categories/other.jpg"
    },
    "patio-lawn-garden": {
      icon: "/categories/patio-lawn-garden.png",
      icon2: "/categories/patio-lawn-garden-b.png",
      backgroundImage: "/categories/patio-lawn-garden.jpg"
    },
    "pet-supplies": {
      icon: "/categories/pet-supplies.png",
      icon2: "/categories/pet-supplies-b.png",
      backgroundImage: "/categories/pet-supplies.jpg"
    },
    "prime-video": {
      icon: "/categories/prime-video.png",
      icon2: "/categories/prime-video-b.png",
      backgroundImage: "/categories/prime-video.jpg"
    },
    "software": {
      icon: "/categories/software.png",
      icon2: "/categories/software-b.png",
      backgroundImage: "/categories/software.jpg"
    },
    "sports-outdoors-p": {
      icon: "/categories/sports-outdoors.png",
      icon2: "/categories/sports-outdoors-b.png",
      backgroundImage: "/categories/sports-outdoors.jpg"
    },
    "tools-home-improvement": {
      icon: "/categories/tools-home-improvement.png",
      icon2: "/categories/tools-home-improvement-b.png",
      backgroundImage: "/categories/tools-home-improvement.jpg"
    },
    "toys-games": {
      icon: "/categories/toys-games.png",
      icon2: "/categories/toys-games-b.png",
      backgroundImage: "/categories/toys-games.jpg"
    },
    "video-games": {
      icon: "/categories/video-games.png",
      icon2: "/categories/video-games-b.png",
      backgroundImage: "/categories/video-games.jpg"
    }
  }
  
  return assets[slug] || {
    icon: "/icons/grid.svg",
    icon2: "/icons/grid.svg",
    backgroundImage: "/categories/electronics.jpg"
  }
}

export default function AllCategories() {
  const [categories, setCategories] = useState<CategoryWithUI[]>([])
  const [loading, setLoading] = useState(true)
  const [expandedCategories, setExpandedCategories] = useState<Record<string, boolean>>({})
  const [activeMobileCategory, setActiveMobileCategory] = useState<CategoryWithUI | null>(null)

  useEffect(() => {
    fetchCategories()
  }, [])

  const fetchCategories = async () => {
    try {
      const res = await axios.get('https://34.205.64.185:8000/api/home')
      const categoriesData: Category[] = res.data
      
      // Transform backend data to include UI assets
      const categoriesWithUI: CategoryWithUI[] = categoriesData.map((cat) => {
        const assets = getCategoryAssets(cat.slug)
        
        return {
          ...cat,
          ...assets
        }
      })
      
      setCategories(categoriesWithUI)
    } catch (error) {
      console.error('Error fetching categories:', error)
    } finally {
      setLoading(false)
    }
  }

  const toggleCategory = (slug: string) => {
    setExpandedCategories((prev) => ({
      ...prev,
      [slug]: !prev[slug]
    }))
  }

  if (loading) {
    return (
      <section className="bg-white pt-4 px-4 md:pb-16">
        <div className="max-w-[1312px] mx-auto">
          <div className="py-8 text-center">
            <p className="text-gray-600">Loading categories...</p>
          </div>
        </div>
      </section>
    )
  }

  return (
    <section className="bg-white pt-4 px-4 md:pb-16">
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
        <h2 className="text-[32px] md:text-[48px] font-bold text-[#0E033B] mt-0 mb-6">All Categories</h2>
        )}
        <div className="md:pt-[32px] md:px-[96px]">
          
          {/* Mobile View */}
          <div className="md:hidden">
            {!activeMobileCategory ? (
              <div className="bg-white border border-r-0 border-l-0 border-gray-300 divide-y divide-gray-300 shadow-sm">
                {categories.length > 0 ? (
                  categories.map((category) => (
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
                  ))
                ) : (
                  <div className="py-8 text-center text-gray-500">
                    <p>No categories found</p>
                  </div>
                )}
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
                    {activeMobileCategory.level2s.length > 0 ? (
                      activeMobileCategory.level2s.map((subCat) => (
                        <Link
                          key={subCat.slug}
                          href={`/category/${activeMobileCategory.slug}/${subCat.slug}`}
                          className="py-4 flex items-center justify-between hover:bg-gray-300 transition-colors"
                        >
                          <span className="text-[#0E033B]">{subCat.name}</span>
                          <svg className="w-4 h-4 text-[#0E033B]" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24">
                            <path strokeLinecap="round" strokeLinejoin="round" d="M9 5l7 7-7 7" />
                          </svg>
                        </Link>
                      ))
                    ) : (
                      <div className="py-8 text-center text-gray-500">
                        <p>No subcategories found</p>
                      </div>
                    )}
                  </div>
                </div>
              </div>
            )}
          </div>

          {/* Desktop View */}
          <div className="hidden md:grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
            {categories.length > 0 ? (
              categories.map((category) => (
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
                    {(expandedCategories[category.slug] 
                      ? category.level2s 
                      : category.level2s.slice(0, 5)
                    ).map((subCat) => (
                      <Link
                        key={subCat.slug}
                        href={`/category/${category.slug}/${subCat.slug}`}
                        className="block text-sm text-gray-700 hover:text-[#0E033B] transition-colors leading-relaxed"
                      >
                        {subCat.name}
                      </Link>
                    ))}

                    {category.level2s.length > 5 && (
                      <button
                        type="button"
                        onClick={() => toggleCategory(category.slug)}
                        className="mt-3 text-sm text-[#0E00DE] no-underline hover:underline"
                      >
                        {expandedCategories[category.slug] ? "Show Less" : `Show All (${category.level2s.length})`}
                      </button>
                    )}
                  </div>
                </div>
              ))
            ) : (
              <div className="col-span-full py-8 text-center text-gray-500">
                <p>No categories found</p>
              </div>
            )}
          </div>

        </div>

        
      </div>
    </section>
  )
}

