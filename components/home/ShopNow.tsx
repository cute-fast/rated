import { ArrowRight } from "lucide-react"
import { useState, useRef, useEffect } from "react"
import { ChevronLeft, ChevronRight } from "lucide-react"

export default function ShopNow() {

    const imgs = ['shop_1.avif', 'shop_1.avif', 'shop_1.avif', 'shop_1.avif'];
    const hiddens = [
        'Find the pink Klarna badge at your favorite brands when you shop online.',
        'Find the pink Klarna badge at your favorite brands when you shop online.',
        'Find the pink Klarna badge at your favorite brands when you shop online.',
        'Find the pink Klarna badge at your favorite brands when you shop online.'
    ];
    const titles = ['At checkout', 'At checkout', 'At checkout', 'At checkout'];
    const links = ['Learn more', 'Learn more', 'Learn more', 'Learn more'];

    const [hoveredCard, setHoveredCard] = useState<number | null>(null)
    const handleCardHover = (cardIndex: number) => {
        setHoveredCard(cardIndex)
    }
    const handleCardLeave = () => {
        setHoveredCard(null)
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

    const maxIndex = Math.max(0, imgs.length - visibleCards)
    const canGoPrev = currentIndex > 0
    const canGoNext = currentIndex < maxIndex

    const getScrollPosition = (index: number) => {
        const cardWidth = 300
        const gap = 16

        if (index >= maxIndex) {
            // Calculate total content width and container width
            const totalContentWidth = imgs.length * (cardWidth + gap) - gap
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
        <section className="px-6 py-16">
            <div className="max-w-7xl mx-auto">
                <h3 className="text-3xl font-bold text-center mb-12">Shop now and save with Rated</h3>
                <div className="hidden lg:flex gap-6">

                    {
                        imgs.map((value, index) => (
                            <div
                                key={index}
                                className={`cursor-pointer overflow-hidden transition-all duration-300 ease-in-out ${hoveredCard === index ? "flex-[2]" : hoveredCard !== null ? "flex-[0.8]" : "flex-1"}`}
                                onMouseEnter={() => handleCardHover(index)}
                                onMouseLeave={handleCardLeave}
                            >
                                <div
                                    className={`rounded-2xl overflow-hidden flex items-center justify-center h-[333px] transition-transform duration-100 ${hoveredCard === index ? "scale-100" : ""}`}
                                >
                                    <img src={`${value}`} alt="" className="object-cover rounded-2xl h-full w-full" />
                                </div>
                                <div className="pt-6 min-h-[160px] w-[160%]">
                                    <h4 className="font-bold text-xl mb-3">{titles[index]}</h4>
                                    <div
                                        className={`overflow-hidden transition-all duration-300 ease-in-out transform-gpu ${hoveredCard === index
                                            ? "max-h-32 opacity-100 mb-4 scale-y-100 translate-y-0"
                                            : "max-h-0 opacity-0 mb-0 scale-y-0 -translate-y-2"
                                            }`}
                                        style={{ transformOrigin: "top" }}
                                    >
                                        <p className="text-gray-600">
                                            {hiddens[index]}
                                        </p>
                                    </div>
                                    <div className='transition-transform duration-300'>
                                        <a href="#" className="text-black p-0 h-auto text-base font-medium flex items-center gap-2 hover:underline">
                                            {links[index]}
                                            <ArrowRight className="w-6 h-6" />
                                        </a>
                                    </div>
                                </div>
                            </div>
                        ))
                    }
                </div>

                <div className="md:grid gap-6 md:grid-cols-2 hidden lg:hidden">
                    {
                        imgs.map((value, index) => (
                            <div key={index} className='cursor-pointer'
                                onMouseEnter={() => handleCardHover(index)}
                                onMouseLeave={handleCardLeave}
                            >
                                <div className='rounded-2xl overflow-hidden flex items-center justify-center h-[333px]'>
                                    <img src={`${value}`} alt="" className="object-cover rounded-2xl h-full w-full" />
                                </div>
                                <div className="pt-6">
                                    <h4 className={`font-bold text-xl mb-3 underline ${hoveredCard === index && 'no-underline'}`}>{titles[index]}</h4>
                                    <div className='mb-4'>
                                        <p className={`text-gray-600 underline ${hoveredCard === index && 'no-underline'}`}>
                                            {hiddens[index]}
                                        </p>
                                    </div>
                                    <div>
                                        <a href="#" className="text-black p-0 h-auto text-base font-medium flex items-center gap-2 hover:underline">
                                            {links[index]}
                                            <ArrowRight className="w-6 h-6" />
                                        </a>
                                    </div>
                                </div>
                            </div>
                        ))
                    }
                </div>

                <div className="md:hidden">
                    {
                        <div className="relative" onMouseEnter={() => setIsHovered(true)} onMouseLeave={() => setIsHovered(false)}>
                            {/* Navigation Arrows */}
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

                            {/* Cards Container */}
                            <div ref={containerRef} className="overflow-hidden">
                                <div
                                    className="flex gap-[16px] transition-transform duration-300 ease-out"
                                    style={{
                                        transform: `translateX(-${getScrollPosition(currentIndex)}px)`,
                                    }}
                                >
                                    {imgs.map((value, index) => (
                                        <div key={index} className='flex-shrink-0 w-[300px] cursor-pointer'
                                            onMouseEnter={() => handleCardHover(index)}
                                            onMouseLeave={handleCardLeave}
                                        >
                                            <div className='rounded-2xl overflow-hidden flex items-center justify-center h-[380px]'>
                                                <img src={`${value}`} alt="" className="object-cover rounded-2xl h-full w-full" />
                                            </div>
                                            <div className="pt-6">
                                                <h4 className={`font-bold text-xl mb-3 underline ${hoveredCard === index && 'no-underline'}`}>{titles[index]}</h4>
                                                <div className='mb-4'>
                                                    <p className={`text-gray-600 underline ${hoveredCard === index && 'no-underline'}`}>
                                                        {hiddens[index]}
                                                    </p>
                                                </div>
                                                <div>
                                                    <a href="#" className="text-black p-0 h-auto text-base font-medium flex items-center gap-2 hover:underline">
                                                        {links[index]}
                                                        <ArrowRight className="w-6 h-6" />
                                                    </a>
                                                </div>
                                            </div>
                                        </div>
                                    ))}
                                </div>
                            </div>
                        </div>
                    }
                </div>

            </div>
        </section>
    )
}