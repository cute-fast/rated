"use client"
import type React from "react"
import { Search } from "lucide-react"
import { useState, useEffect } from "react"
import { useRouter } from "next/router"
import axios from "axios"
import { useIsMobile } from "../../hooks/use-mobile"

export default function HeroSection() {
    const [heroSearchValue, setHeroSearchValue] = useState("")
    const [suggestions, setSuggestions] = useState<any[]>([])
    const [loadingSuggestions, setLoadingSuggestions] = useState(false)
    const router = useRouter()
    const isMobile = useIsMobile()

    useEffect(() => {
        if (heroSearchValue.length >= 2) {
            const timeoutId = setTimeout(() => {
                fetchSuggestions()
            }, 300) // Debounce 300ms

            return () => clearTimeout(timeoutId)
        } else {
            setSuggestions([])
        }
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [heroSearchValue])

    const fetchSuggestions = async () => {
        if (!heroSearchValue || heroSearchValue.length < 2) {
            setSuggestions([])
            return
        }

        setLoadingSuggestions(true)
        try {
            const [catRes] = await Promise.all([
                axios.get('https://api.rated.xyz/api/search/categories', { params: { q: heroSearchValue, size: 5 } }).catch((err) => {
                    console.error('Categories search error:', err)
                    return { data: [] }
                })
            ])

            const combined = [
                ...(catRes.data || []).map((c: any) => ({ ...c, name: c.name, type: 'Category', displayText: c.name }))
            ]
            setSuggestions(combined.slice(0, 5))
        } catch (error) {
            console.error('Error fetching suggestions:', error)
            setSuggestions([])
        } finally {
            setLoadingSuggestions(false)
        }
    }

    const handleHeroSearchChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const value = e.target.value
        setHeroSearchValue(value)
    }

    const handleHeroSearchFocus = () => {
        if (isMobile) {
            window.dispatchEvent(new CustomEvent("openMobileSearch"))
        }
    }

    const handleHeroSearchSubmit = (e?: React.FormEvent) => {
        e?.preventDefault()
        if (heroSearchValue.trim()) {
            router.push(`/search?q=${encodeURIComponent(heroSearchValue.trim())}`)
            setHeroSearchValue("")
            setSuggestions([])
        }
    }

    const handleHeroSuggestionClick = (suggestion: any) => {
        if (suggestion.type === 'Product') {
            router.push(`/product/${suggestion.slug}`)
        } else {
            router.push(`/${suggestion.slug}`)
        }
        setHeroSearchValue("")
        setSuggestions([])
    }

    return (

        <section className="px-4">
            <div className="text-white relative rounded-[16px] max-w-[1312px] pt-[118px] md:pt-[0] m-auto ">
                <div className="absolute inset-0 rounded-[16px] overflow-hidden">
                    <video
                        className="hidden md:block absolute lg:top-[-20%] xl:top-[-32%] right-[-15%] w-full object-cover object-center"
                        src="./hero.mp4"
                        poster="./hero_desktop.png"
                        preload="auto"
                        autoPlay
                        muted
                        loop
                        playsInline
                    />

                    <video
                        className="md:hidden absolute bottom-0 w-[1150px] bottom-[20px] h-auto max-w-none left-[calc(-92%+((100vw-390px)*1.5))] object-cover object-center"
                        src="./hero.mp4"
                        poster="./hero_mobile.png"
                        preload="auto"
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
                    <div className="px-4 md:px-[106px] pt-[48px] md:pt-[93px] pb-[48px] md:pb-[93px] gap-12 items-center">
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
                                <form onSubmit={handleHeroSearchSubmit} className={`flex items-center bg-white border border-[#4450FF] rounded-[8px] overflow-hidden ${heroSearchValue.length >= 2 && (loadingSuggestions || suggestions.length > 0) && !isMobile && ('rounded-b-none')}`}>
                                    <input
                                        value={heroSearchValue}
                                        onChange={handleHeroSearchChange}
                                        onFocus={handleHeroSearchFocus}
                                        onKeyDown={(e) => {
                                            if (e.key === 'Enter') {
                                                handleHeroSearchSubmit()
                                            }
                                        }}
                                        placeholder="Search"
                                        className="text-[15px] px-4 flex-1 border-0 bg-transparent text-black placeholder:text-gray-500 focus:outline-none text-base px-0 text-base"
                                    />

                                    <button type="submit" className="pl-4 pr-[15px] py-[14px]">
                                        <Search className="h-[24px] w-[24px] text-black" />
                                    </button>
                                </form>

                                {heroSearchValue.length >= 2 && (
                                    <div className="absolute top-full left-0 right-0 mt-0 bg-white rounded-b-lg shadow-lg border z-[100] max-h-120 overflow-y-auto">
                                        {loadingSuggestions ? (
                                            <div className="px-4 py-3 text-gray-500 text-sm">Loading...</div>
                                        ) : suggestions.length > 0 ? (
                                            suggestions.map((suggestion, index) => (
                                                <button
                                                    key={`${suggestion.type}-${suggestion.slug || suggestion.asin || index}`}
                                                    type="button"
                                                    onClick={() => handleHeroSuggestionClick(suggestion)}
                                                    className="w-full flex items-center gap-3 text-left hover:bg-gray-50 transition-colors border-b border-gray-100 last:border-b-0"
                                                >

                                                    <span><img src={suggestion.image_url} alt={suggestion.name} className="h-20 w-20" /></span>
                                                    <div className="flex-1 text-black font-medium">
                                                        {suggestion.displayText || suggestion.name}
                                                    </div>

                                                </button>
                                            ))
                                        ) : (
                                            <div className="px-4 py-3 text-gray-500 text-sm">No results found</div>
                                        )}
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
