"use client"
import type React from "react"
import { Search, X, ArrowRight } from "lucide-react"
import { useState } from "react"
import { useIsMobile } from "../../hooks/use-mobile"

export default function HeroSection() {
    const [heroSearchValue, setHeroSearchValue] = useState("")
    const [showHeroSuggestions, setShowHeroSuggestions] = useState(false)
    // console.log("useIsMobile =", useIsMobile)
    const isMobile = useIsMobile()
    // console.log(isMobile);

    const searchSuggestions = [
        { name: "Specialized", type: "Brand" },
        { name: "Special Effects", type: "in Fancy Dresses" },
        { name: "PC Specialist", type: "Brand" },
        { name: "Lens Filters Special Applications", type: "in Camera Lens Filters" },
        { name: "Special Sparkle", type: "Brand" },
        { name: "Special Essentials", type: "Brand" },
        { name: "Special Ingredient", type: "Brand" },
        { name: "Special Ingredients", type: "Brand" },
        { name: "Special Kitty", type: "Brand" },
        { name: "Special Lite", type: "Brand" },
    ]

    const filteredSuggestions = searchSuggestions.filter((suggestion) =>
        suggestion.name.toLowerCase().includes(heroSearchValue.toLowerCase()),
    )

    const handleHeroSearchChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const value = e.target.value
        setHeroSearchValue(value)
        setShowHeroSuggestions(value.length > 0)
    }

    const handleHeroSearchFocus = () => {
        if (isMobile) {
            window.dispatchEvent(new CustomEvent("openMobileSearch"))
        }
    }

    const handleHeroSuggestionClick = (suggestion: string) => {
        setHeroSearchValue(suggestion)
        setShowHeroSuggestions(false)
    }

    const clearHeroSearch = () => {
        setHeroSearchValue("")
        setShowHeroSuggestions(false)
    }

    return (

        <section className="px-4">
            <div className="text-white relative rounded-3xl max-w-[1312px] pt-[118px] md:pt-[0] m-auto">
                <img className="hidden md:block absolute top-0 left-0 w-full h-full object-cover object-center rounded-3xl" src="./hero_desktop.png" alt="Hero Desktop" />
                <img className="md:hidden absolute top-0 left-0 w-full h-full object-cover object-center rounded-3xl" src="./hero_mobile.png" alt="Hero Desktop" />
                <div className="max-w-8xl mx-auto relative">
                    <div className="px-4 md:px-[106px] py-14 gap-12 items-center">
                        <div>
                            <h1 className="text-[48px] md:text-[68px] font-bold mb-6 leading-tight">
                                Smart Shopping,
                                <br />
                                Simplified
                            </h1>
                            {/* <h1 className="md:hidden text-[48px] font-bold mb-6 leading-tight">
                                Smart<br />
                                Shopping,
                                <br />
                                Simplified
                            </h1> */}
                            <p className="hidden md:block text-[15px] text-white mb-8">
                                Discover top-rated products, powered by big data
                                <br />and millions of consumer insights
                            </p>
                            <p className="md:hidden text-[15px text-white mb-8">
                                Discover top-rated products, powered by big data
                                and millions of consumer insights
                            </p>
                            <div className="relative max-w-[390px]">
                                <div className={`flex items-center bg-white rounded-[5px] overflow-hidden ${showHeroSuggestions && filteredSuggestions.length > 0 && !isMobile && ('rounded-b-none')}`}>
                                    
                                    <input
                                        value={heroSearchValue}
                                        onChange={handleHeroSearchChange}
                                        onFocus={handleHeroSearchFocus}
                                        placeholder="Search"
                                        className="text-xl px-4 flex-1 border-0 bg-transparent text-black placeholder:text-gray-500 focus:outline-none text-base py-4 px-0 text-base"
                                    />
                                    {heroSearchValue && (
                                        <button
                                            onClick={clearHeroSearch}
                                            className="h-10 w-10 p-0 text-gray-400 hover:text-gray-800 hover:bg-gray-100 rounded-full flex items-center justify-center"
                                        >
                                            <X className="h-8 w-8" />
                                        </button>
                                    )}
                                    
                                    <div className="pl-4 pr-2 py-4">
                                        <Search className="h-8 w-8 text-black" />
                                    </div>

                                </div>

                                {showHeroSuggestions && filteredSuggestions.length > 0 && !isMobile && (
                                    <div className="absolute top-full left-0 right-0 mt-0 bg-white rounded-b
                                -lg shadow-lg border z-50 max-h-120 overflow-y-auto">
                                        {filteredSuggestions.map((suggestion, index) => (
                                            <button
                                                key={index}
                                                onClick={() => handleHeroSuggestionClick(suggestion.name)}
                                                className="w-full flex items-center gap-3 text-left hover:bg-gray-50 transition-colors border-b border-gray-100 last:border-b-0"
                                            >
                                                <div className="w-[56px] bg-gray-100 py-3 px-5 h-12">
                                                    <Search className="h-4 w-4 text-black flex-shrink-0" />
                                                </div>

                                                <div className="flex-1 text-black font-medium">
                                                    {suggestion.name}
                                                </div>
                                                <div className="border-l text-center w-[150px] text-gray-500 text-sm ml-2 h-12 py-3">{suggestion.type}</div>

                                            </button>
                                        ))}
                                    </div>
                                )}
                            </div>
                        </div>
                        {/* <div className="flex justify-center">
                        <div className="relative">
                            <img
                                src="https://hebbkx1anhila5yf.public.blob.vercel-storage.com/image-O01vqc18wIv3rCtxYwM5jNOtil9Uic.png"
                                alt="Hand holding smartphone with price comparison app"
                                className="w-96 h-auto"
                            />
                        </div>
                    </div> */}
                    </div>
                </div>
            </div>

        </section>
    )
}
