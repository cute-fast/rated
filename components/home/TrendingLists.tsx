import React, { useState, useRef, useEffect } from "react";
import { ChevronLeft, ChevronRight } from "lucide-react";

export default function TrendingLists() {
    const trendingItems = [
        {
            name: "Wireless Earbuds",
            image: "/trandinglist/wireless earbuds.png"
        },
        {
            name: "Kid's Tablets",
            image: "/trandinglist/kid tablet.png"
        },
        {
            name: "Air Purifiers",
            image: "/trandinglist/air purifier.png"
        },
        {
            name: "Robotic Pool Cleaners",
            image: "/trandinglist/pool cleaner.png"
        },
        {
            name: "Hair Dryers",
            image: "/trandinglist/hair dryer.png"
        }
    ];

    const containerRef = useRef<HTMLDivElement>(null);
    const [currentIndex, setCurrentIndex] = useState(0);
    const [isHovered, setIsHovered] = useState(false);

    // Calculate how many cards can fit in the container
    const getVisibleCards = () => {
        if (!containerRef.current) return 1;
        const containerWidth = containerRef.current.offsetWidth;
        const cardWidth = 190;
        const gap = 24; // gap-6 = 24px
        return Math.floor((containerWidth + gap) / (cardWidth + gap));
    };

    const [visibleCards, setVisibleCards] = useState(1);

    useEffect(() => {
        const updateVisibleCards = () => {
            setVisibleCards(getVisibleCards());
        };

        updateVisibleCards();
        window.addEventListener("resize", updateVisibleCards);
        return () => window.removeEventListener("resize", updateVisibleCards);
    }, []);

    const maxIndex = Math.max(0, trendingItems.length - visibleCards);
    const canGoPrev = currentIndex > 0;
    const canGoNext = currentIndex < maxIndex;

    const getScrollPosition = (index: number) => {
        const cardWidth = 190;
        const gap = 24;

        if (index >= maxIndex) {
            // Calculate total content width and container width
            const totalContentWidth = trendingItems.length * (cardWidth + gap) - gap;
            const containerWidth = containerRef.current?.offsetWidth || 0;

            // Align last card to right edge by scrolling to show the rightmost cards
            return Math.max(0, totalContentWidth - containerWidth);
        }

        return index * (cardWidth + gap);
    };

    const goToPrev = () => {
        if (canGoPrev) {
            setCurrentIndex(Math.max(0, currentIndex - 1));
        }
    };

    const goToNext = () => {
        if (canGoNext) {
            setCurrentIndex(Math.min(maxIndex, currentIndex + 1));
        }
    };

    return (
        <section className="px-4 py-16 bg-white">
            <div className="max-w-7xl mx-auto">
                <div className="text-center mb-12">
                    <p className="text-[18px] uppercase text-gray-600 mb-2">TOP RATED</p>
                    <h2 className="text-[32px] md:text-[48px] font-bold">Trending Lists</h2>
                </div>
                
                {/* Desktop View - Show all cards */}
                <div className="hidden lg:flex flex-wrap justify-center gap-6">
                    {trendingItems.map((item, index) => (
                        <div
                            key={index}
                            className="w-[190px] h-[224px] bg-white rounded-lg overflow-hidden  cursor-pointer px-[7px] pt-[11px]"
                        >
                            <div className="w-full h-[190px] flex items-center justify-center bg-[#F9F9F9] border border-[#E5ECFF] rounded-[16px] shadow-lg">
                                <img
                                    src={item.image}
                                    alt={item.name}
                                    className="w-full h-full object-contain"
                                />
                            </div>
                            <div className="h-[34px] flex items-center justify-center">
                                <p className="text-sm font-medium text-center px-2">{item.name}</p>
                            </div>
                        </div>
                    ))}
                </div>

                {/* Mobile View - Carousel */}
                <div className="lg:hidden">
                    <div 
                        className="relative" 
                        onMouseEnter={() => setIsHovered(true)} 
                        onMouseLeave={() => setIsHovered(false)}
                    >
                        {/* Navigation Arrows */}
                        {isHovered && canGoPrev && (
                            <button
                                onClick={goToPrev}
                                className="absolute left-0 top-1/2 -translate-y-1/2 z-10 w-10 h-10 bg-white/90 backdrop-blur-sm rounded-full shadow-lg flex items-center justify-center hover:bg-white transition-all duration-200"
                                aria-label="Previous cards"
                            >
                                <ChevronLeft className="w-5 h-5 text-gray-700" />
                            </button>
                        )}

                        {isHovered && canGoNext && (
                            <button
                                onClick={goToNext}
                                className="absolute right-0 top-1/2 -translate-y-1/2 z-10 w-10 h-10 bg-white/90 backdrop-blur-sm rounded-full shadow-lg flex items-center justify-center hover:bg-white transition-all duration-200"
                                aria-label="Next cards"
                            >
                                <ChevronRight className="w-5 h-5 text-gray-700" />
                            </button>
                        )}

                        {/* Cards Container */}
                        <div ref={containerRef} className="overflow-hidden">
                            <div
                                className="flex gap-6 transition-transform duration-300 ease-out"
                                style={{
                                    transform: `translateX(-${getScrollPosition(currentIndex)}px)`,
                                }}
                            >
                                {trendingItems.map((item, index) => (
                                    <div
                                        key={index}
                                        className="flex-shrink-0 w-[190px] h-[224px] bg-white rounded-lg shadow-md overflow-hidden hover:shadow-lg transition-shadow cursor-pointer"
                                    >
                                        <div className="w-full h-[190px] flex items-center justify-center bg-gray-50">
                                            <img
                                                src={item.image}
                                                alt={item.name}
                                                className="w-full h-full object-contain p-4"
                                            />
                                        </div>
                                        <div className="h-[34px] flex items-center justify-center">
                                            <p className="text-sm font-medium text-center px-2">{item.name}</p>
                                        </div>
                                    </div>
                                ))}
                            </div>
                        </div>

                        {/* Progress Indicator Bar */}
                        <div className="mt-8 w-full flex justify-center">
                            <div className="relative w-full max-w-md h-1 overflow-hidden">
                                {/* Full bar background (light gray) */}
                                <div className="absolute inset-0 bg-gray-200" />
                                
                                {/* Progress segment (dark) with smooth fade edges */}
                                <div 
                                    className="absolute inset-y-0 left-0 transition-all duration-300 ease-out"
                                    style={{
                                        width: `${maxIndex > 0 ? ((currentIndex + 1) / (maxIndex + 1)) * 100 : 100}%`,
                                        background: '#000000',
                                        boxShadow: 'inset 0 0 2px rgba(0,0,0,0.1)'
                                    }}
                                />
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </section>
    );
}

