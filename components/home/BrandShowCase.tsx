import React from "react"
import { useEffect, useRef, useState } from "react"
import { ChevronLeft, ChevronRight } from "lucide-react"

export default function BrandShowCase() {

    const [isVisible, setIsVisible] = useState(false)
    const sectionRef = useRef<HTMLElement>(null)

    const heightVariations = ["h-48", "h-56", "h-64", "h-72"]

    const brands = [
        {
            name: "New Balance",
            cashback: "4%",
            image: "b_coach_back.avif",
            logo: "b_coach.avif",
            height: heightVariations[0]
        },

        {
            name: "Expedia",
            cashback: null,
            image: "b_coach_back.avif",
            logo: "b_coach.avif",
            height: heightVariations[1]
        },

        {
            name: "Macy's",
            cashback: "2%",
            image: "b_coach_back.avif",
            logo: "b_coach.avif",
            height: heightVariations[2]
        },

        {
            name: "Nike",
            cashback: null,
            image: "b_coach_back.avif",
            logo: "b_coach.avif",
            height: heightVariations[3]
        },

        {
            name: "ULTA",
            cashback: "2%",
            image: "b_coach_back.avif",
            logo: "b_coach.avif",
            height: heightVariations[1]
        },

        {
            name: "Booking.com",
            cashback: "2%",
            image: "b_coach_back.avif",
            logo: "b_coach.avif",
            height: heightVariations[2],
        },

        {
            name: "Coach",
            cashback: "1%",
            image: "b_coach_back.avif",
            logo: "b_coach.avif",
            height: heightVariations[0]
        },

        {
            name: "Target",
            cashback: "2%",
            image: "b_coach_back.avif",
            logo: "b_coach.avif",
            height: heightVariations[3]
        },

        {
            name: "StubHub",
            cashback: "4%",
            image: "b_coach_back.avif",
            logo: "b_coach.avif",
            height: heightVariations[3],
        },

        {
            name: "TEMU",
            cashback: "15%",
            image: "b_coach_back.avif",
            logo: "b_coach.avif",
            height: heightVariations[1]
        },

        {
            name: "Foot Locker",
            cashback: null,
            image: "b_coach_back.avif",
            logo: "b_coach.avif",
            height: heightVariations[2],
        },

        {
            name: "Ticketmaster",
            cashback: "2%",
            image: "b_coach_back.avif",
            logo: "b_coach.avif",
            height: heightVariations[0],
        },
        // Column 4
        {
            name: "Walmart",
            cashback: null,
            image: "b_coach_back.avif",
            logo: "b_coach.avif",
            height: heightVariations[0]
        },

        {
            name: "eBay",
            cashback: "1%",
            image: "b_coach_back.avif",
            logo: "b_coach.avif",
            height: heightVariations[1]
        },

        {
            name: "Amazon",
            cashback: null,
            image: "b_coach_back.avif",
            logo: "b_coach.avif",
            height: heightVariations[2]
        },

        {
            name: "Home Depot",
            cashback: "3%",
            image: "b_coach_back.avif",
            logo: "b_coach.avif",
            height: heightVariations[3],
        },
    ]

    useEffect(() => {
        const observer = new IntersectionObserver(
            ([entry]) => {
                if (entry.isIntersecting) {
                    setIsVisible(true)
                }
            },
            { threshold: 0.1 },
        )

        if (sectionRef.current) {
            observer.observe(sectionRef.current)
        }

        return () => observer.disconnect()
    }, [])

    const getColumnBrands = (columnIndex: number) => {
        const startIndex = columnIndex * 4
        return brands.slice(startIndex, startIndex + 4)
    }



    const containerRef = useRef<HTMLDivElement>(null)
    const [currentIndex, setCurrentIndex] = useState(0)
    const [isHovered, setIsHovered] = useState(false)

    // Calculate how many cards can fit in the container
    const getVisibleCards = () => {
        if (!containerRef.current) return 1
        const containerWidth = containerRef.current.offsetWidth
        const cardWidth = 280
        const gap = 16
        return Math.floor((containerWidth + gap) / (cardWidth + gap))
    }

    const [visibleCards, setVisibleCards] = useState(1)

    useEffect(() => {
        const updateVisibleCards = () => {
            setVisibleCards(getVisibleCards())
        }

        updateVisibleCards()
        window.addEventListener("resize", updateVisibleCards)
        return () => window.removeEventListener("resize", updateVisibleCards)
    }, [])

    const maxIndex = Math.max(0, brands.length - visibleCards)
    const canGoPrev = currentIndex > 0
    const canGoNext = currentIndex < maxIndex

    const getScrollPosition = (index: number) => {
        const cardWidth = 300
        const gap = 16

        if (index >= maxIndex) {
            // Calculate total content width and container width
            const totalContentWidth = brands.length * (cardWidth + gap) - gap
            const containerWidth = containerRef.current?.offsetWidth || 0

            // Align last card to right edge by scrolling to show the rightmost cards
            return Math.max(0, totalContentWidth - containerWidth)
        }

        return index * (cardWidth + gap)
    }

    const goToPrev = () => {
        if (canGoPrev) {
            setCurrentIndex(Math.max(0, currentIndex - 1))
        }
    }

    const goToNext = () => {
        if (canGoNext) {
            setCurrentIndex(Math.min(maxIndex, currentIndex + 1))
        }
    }

    return (
        <section ref={sectionRef} className="px-6 py-16">
            <div className="max-w-7xl mx-auto relative">
                <div className="hidden md:block h-[150px] absolute left-0 right-0 bottom-0 z-30 bg-gradient-to-b from-white/0 to-white"></div>
                <h3 className="text-3xl font-bold text-center mb-12">Shop your favorite brands</h3>
                <div className="grid hidden md:grid md:grid-cols-3 lg:grid-cols-4 gap-4 overflow-hidden h-[850px]">
                    {[0, 1, 2, 3].map((columnIndex) => (
                        <div
                            key={columnIndex}
                            className={`space-y-4 ${isVisible ? "animate-in slide-in-from-bottom duration-700" : "opacity-0"}`}
                            style={{ animationDelay: `${columnIndex * 150}ms` }}
                        >
                            {getColumnBrands(columnIndex).map((brand, brandIndex) => (
                                <div
                                    key={`${columnIndex}-${brandIndex}`}
                                    className={`${brand.height} rounded-3xl overflow-hidden cursor-pointer relative group`}
                                >
                                    <div className="p-0 h-full relative">
                                        <div
                                            className="absolute inset-0 bg-cover bg-center"
                                            style={{ backgroundImage: `url('${brand.image}')` }}
                                        />
                                        <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-transparent to-black/40" />

                                        {brand.cashback && (
                                            <div className="absolute top-3 left-3 bg-green-500 text-white text-xs font-semibold px-3 py-1 rounded-full">
                                                {brand.cashback} cashback
                                            </div>
                                        )}

                                        <div className="absolute inset-0 flex items-center justify-center">
                                            <div className="w-30 h-30 bg-white rounded-full overflow-hidden flex items-center justify-center shadow-lg">
                                                <img src={brand.logo} alt={brand.name} className="" />
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            ))}
                        </div>
                    ))}
                </div>

                <div className="md:hidden relative" onMouseEnter={() => setIsHovered(true)} onMouseLeave={() => setIsHovered(false)}>
                    {isHovered && canGoPrev && (
                        <button
                            onClick={goToPrev}
                            className="absolute left-6 top-1/2 -translate-y-1/2 z-10 w-10 h-10 bg-white/90 backdrop-blur-sm rounded-full shadow-lg flex items-center justify-center hover:bg-white transition-all duration-200"
                            aria-label="Previous cards"
                        >
                            <ChevronLeft className="w-5 h-5 text-gray-700" />
                        </button>
                    )}

                    {isHovered && canGoNext && (
                        <button
                            onClick={goToNext}
                            className="absolute right-6 top-1/2 -translate-y-1/2 z-10 w-10 h-10 bg-white/90 backdrop-blur-sm rounded-full shadow-lg flex items-center justify-center hover:bg-white transition-all duration-200"
                            aria-label="Next cards"
                        >
                            <ChevronRight className="w-5 h-5 text-gray-700" />
                        </button>
                    )}

                    <div ref={containerRef} className="overflow-hidden">
                        <div
                            className="flex gap-[16px] transition-transform duration-300 ease-out"
                            style={{
                                transform: `translateX(-${getScrollPosition(currentIndex)}px)`,
                            }}
                        >
                            {brands.map((brand, brandindex) => (
                                <div key={brandindex} className="flex-shrink-0 w-[300px] h-[380px] rounded-3xl overflow-hidden cursor-pointer relative">
                                    <div className="p-0 h-full relative">
                                        <div
                                            className="absolute inset-0 bg-cover bg-center"
                                            style={{ backgroundImage: `url('${brand.image}')` }}
                                        />
                                        <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-transparent to-black/40"/>

                                        {brand.cashback && (
                                            <div className="absolute top-3 left-3 bg-green-500 text-white text-xs font-semibold px-3 py-1 rounded-full">
                                                {brand.cashback} cashback
                                            </div>
                                        )}

                                        <div className="absolute inset-0 flex items-center justify-center">
                                            <div className="w-30 h-30 bg-white rounded-full overflow-hidden flex items-center justify-center shadow-lg">
                                                <img src={brand.logo} alt={brand.name} className="" />
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            ))
                            }
                        </div>
                    </div>

                </div>
            </div>
        </section>
    )

}