import { ChevronLeft, ChevronRight } from 'lucide-react';
import { useState, useRef, useEffect } from 'react';

export default function ProductCarousel({ products = [] }) {
    const containerRef = useRef<HTMLDivElement>(null);
    const [currentIndex, setCurrentIndex] = useState(0);
    const [isHovered, setIsHovered] = useState(false);
    const [cardWidth, setCardWidth] = useState(230); // Default to mobile width

    // Mock products if none provided
    const mockProducts = products.length > 0 ? products : [
        {
            name: "27 inch 2K QHD(2560x1440) PC Screen, 165Hz Gaming Monitor, 1ms Without...",
            image: "/images/product (1).png",
            rating: 5,
            reviews: 169
        },
        {
            name: "Samsung 27-Inch Odyssey G3 (G30D) Series FHD Gaming Monitor, 1ms, 180Hz...",
            image: "/images/product (1).png",
            rating: 5,
            reviews: 169
        },
        {
            name: "LG 27GS50F-B 27-inch FHD (1920 x 1080) Ultragear Gaming Monitor with 180Hz...",
            image: "/images/product (1).png",
            rating: 5,
            reviews: 169
        },
        {
            name: "acer Nitro 27 Inch WQHD 2560 x 1440 IPS Gaming Monitor | AMD FreeSync...",
            image: "/images/product (1).png",
            rating: 5,
            reviews: 169
        }
    ];

    const gap = 16;

    // Update card width based on screen size
    useEffect(() => {
        const updateCardWidth = () => {
            if (window.innerWidth >= 768) {
                setCardWidth(308); // Desktop width
            } else {
                setCardWidth(230); // Mobile width
            }
        };

        updateCardWidth();
        window.addEventListener("resize", updateCardWidth);
        return () => window.removeEventListener("resize", updateCardWidth);
    }, []);

    // Calculate how many cards can fit
    const getVisibleCards = () => {
        if (!containerRef.current) return 1;
        const containerWidth = containerRef.current.offsetWidth;
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
    }, [cardWidth]);

    const maxIndex = Math.max(0, mockProducts.length - visibleCards);
    const canGoPrev = currentIndex > 0;
    const canGoNext = currentIndex < maxIndex;

    const getScrollPosition = (index: number) => {
        if (index >= maxIndex) {
            const totalContentWidth = mockProducts.length * (cardWidth + gap) - gap;
            const containerWidth = containerRef.current?.offsetWidth || 0;
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
        <section className='px-4'>
            <div className="max-w-[1307px] mx-auto py-8">
                <div className="text-center mb-12">
                    <p className="text-lg leading-[18px] uppercase color-[#06012D] tracking-wider">TOP RATED</p>
                    <h2 className="text-[32px] md:font-semibold text-[48px] leading-[58px] tracking-[0.02em]">Similar Products</h2>
                </div>
                <div
                    className="relative"
                    onMouseEnter={() => setIsHovered(true)}
                    onMouseLeave={() => setIsHovered(false)}
                >
                    {/* Navigation Arrows */}
                    {isHovered && canGoPrev && (
                        <button
                            onClick={goToPrev}
                            className="absolute left-0 top-1/2 -translate-y-1/2 z-10 w-10 h-10 bg-white rounded shadow-lg flex items-center justify-center hover:bg-gray-50 transition-all duration-200 border border-gray-200"
                            aria-label="Previous products"
                        >
                            <ChevronLeft className="w-5 h-5 text-gray-700" />
                        </button>
                    )}

                    {isHovered && canGoNext && (
                        <button
                            onClick={goToNext}
                            className="absolute right-0 top-1/2 -translate-y-1/2 z-10 w-10 h-10 bg-white rounded shadow-lg flex items-center justify-center hover:bg-gray-50 transition-all duration-200 border border-gray-200"
                            aria-label="Next products"
                        >
                            <ChevronRight className="w-5 h-5 text-gray-700" />
                        </button>
                    )}

                    {/* Cards Container */}
                    <div ref={containerRef} className="overflow-hidden">
                        <div
                            className="flex gap-4 transition-transform duration-300 ease-in-out"
                            style={{
                                transform: `translateX(-${getScrollPosition(currentIndex)}px)`
                            }}
                        >
                            {mockProducts.map((product, index) => (
                                <div
                                    key={index}
                                    className="flex-shrink-0 bg-white rounded-lg p-4"
                                    style={{ width: `${cardWidth}px` }}
                                >
                                    {/* Product Image */}
                                    <div className="w-full h-[200px] mb-4 flex items-center justify-center">
                                        <img
                                            src={product.image || '/images/placeholder.png'}
                                            alt={product.name}
                                            className="w-full h-full object-contain"
                                        />
                                    </div>

                                    {/* Product Title */}
                                    <h4 className="font-semibold text-sm text-gray-900 mb-3 line-clamp-2 min-h-[40px] text-center">
                                        {product.name}
                                    </h4>

                                    {/* Rating and Reviews */}
                                    <div className="flex justify-center items-center gap-2 mb-3">
                                        <div className="flex gap-0.5">
                                            {[...Array(5)].map((_, i) => (
                                                <svg
                                                    key={i}
                                                    className="w-4 h-4 text-gray-900"
                                                    fill="currentColor"
                                                    viewBox="0 0 20 20"
                                                >
                                                    <path d="M10 15l-5.878 3.09 1.123-6.545L.489 6.91l6.572-.955L10 0l2.939 5.955 6.572.955-4.756 4.635 1.123 6.545z" />
                                                </svg>
                                            ))}
                                        </div>
                                        <span className="text-xs text-gray-600">
                                            {product.reviews || 169} Reviews
                                        </span>
                                    </div>

                                    {/* CHECK PRICE Button */}
                                    <button className="w-[124px] h-[32px] flex items-center justify-center mx-auto bg-[#16CA92] hover:bg-teal-600 text-white text-[14px] leading-5 font-bold py-2 rounded-lg transition-colors tracking-widest">
                                        CHECK PRICE
                                    </button>
                                </div>
                            ))}
                        </div>
                    </div>
                </div>
            </div>
        </section>

    );
}

