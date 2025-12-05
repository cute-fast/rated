"use client"
import type React from "react"
import { Search, ArrowRight } from "lucide-react"
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

    return (

        <section className="px-4">
            <div className="text-white relative rounded-[16px] max-w-[1312px] pt-[118px] md:pt-[0] m-auto ">
                <div className="absolute inset-0 rounded-[16px] overflow-hidden">
                    <video
                        className="hidden md:block absolute lg:top-[-20%] xl:top-[-32%] right-[-15%] w-full object-cover object-center"
                        src="./hero.mp4"
                        autoPlay
                        muted
                        loop
                        playsInline
                    />
                    
                    <video
                        className="md:hidden absolute bottom-0 w-[1312px] h-auto max-w-none left-[-40%] object-cover object-center"
                        src="./hero.mp4"
                        autoPlay
                        muted
                        loop
                        playsInline
                    />
                </div>

                <div className="hidden md:block absolute inset-0 rounded-[16px] bg-[linear-gradient(-90deg,rgba(14,0,222,0)_44%,rgba(10,1,133,1)_63%,rgba(6,1,45,1)_100%)] z-[1]">
                </div>
                <div className="md:hidden absolute inset-0 rounded-[16px] bg-[linear-gradient(211deg,rgba(14,0,222,0)_26%,rgba(10,1,133,1)_62%,rgba(6,1,45,1)_75%)] z-[1]">
                </div>

                <div className="max-w-8xl mx-auto relative z-[10]">
                    <div className="px-4 md:px-[106px] pt-[93px] pb-[48px] md:pb-[93px] gap-12 items-center">
                        <div>
                            <h1 className="hidden md:block text-[48px] md:text-[68px] font-bold mb-4 leading-[76px] tracking-[0.02em]">
                                Smart Shopping,
                                <br />
                                Simplified
                            </h1>
                            <h1 className="md:hidden text-[48px] md:text-[68px] font-bold mb-6 leading-[58px] tracking-[0.02em]">
                                Smart<br />Shopping,
                                <br />
                                Simplified
                            </h1>
                            {/* <h1 className="md:hidden text-[48px] font-bold mb-6 leading-tight">
                                Smart<br />
                                Shopping,
                                <br />
                                Simplified
                            </h1> */}
                            <p className="hidden md:block text-[15px] text-white mb-6">
                                Discover top-rated products, powered by big data
                                <br />and millions of consumer insights
                            </p>
                            <p className="md:hidden text-[15px] text-white mb-6">
                                Discover top-rated products, powered by big data
                                and millions of consumer insights
                            </p>
                            <div className="relative w-full md:max-w-[392px] z-[100]">
                                <div className={`flex items-center bg-white border border-[#4450FF] rounded-[8px] overflow-hidden ${showHeroSuggestions && filteredSuggestions.length > 0 && !isMobile && ('rounded-b-none')}`}>

                                    <input
                                        value={heroSearchValue}
                                        onChange={handleHeroSearchChange}
                                        onFocus={handleHeroSearchFocus}
                                        placeholder="Search"
                                        className="text-[15px] px-4 flex-1 border-0 bg-transparent text-black placeholder:text-gray-500 focus:outline-none text-base px-0 text-base"
                                    />

                                    <div className="pl-4 pr-[15px] py-[14px]">
                                        <Search className="h-[24px] w-[24px] text-black" />
                                    </div>

                                </div>

                                {showHeroSuggestions && filteredSuggestions.length > 0 && (
                                    <div className="absolute top-full left-0 right-0 mt-0 bg-white rounded-b-lg shadow-lg border z-[100] max-h-120 overflow-y-auto">
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
