import { Search, X } from "lucide-react"
import { useState, useEffect } from "react"
import Link from "next/link"
import { useRouter } from "next/router"
import axios from "axios"

// Mobile Search Input Component (for second row)
function MobileSearchInput({ 
    searchValue, 
    onSearchChange, 
    onSearchSubmit, 
    suggestions, 
    loadingSuggestions, 
    onSuggestionClick 
}: { 
    searchValue: string
    onSearchChange: (value: string) => void
    onSearchSubmit: (e?: React.FormEvent) => void
    suggestions: any[]
    loadingSuggestions: boolean
    onSuggestionClick: (suggestion: any) => void
    onClose: () => void 
}) {
    return (
        <div className="relative w-full">
            <form onSubmit={onSearchSubmit} className="relative">
                <Search className="absolute left-4 top-1/2 transform -translate-y-1/2 w-5 h-5 text-[#0E033B]" />
                <input
                    type="text"
                    placeholder="Search for any product or brand"
                    value={searchValue}
                    onChange={(e) => onSearchChange(e.target.value)}
                    onKeyDown={(e) => {
                        if (e.key === 'Enter') {
                            onSearchSubmit()
                        }
                    }}
                    className={`w-full h-10 pl-12 pr-4 text-base bg-white rounded-[4px] border border-[#0E033B] text-[#0E033B] placeholder:text-[#0E033B] focus:outline-none focus:ring-0 ${searchValue && searchValue.length >= 2 && (loadingSuggestions || suggestions.length > 0) && 'rounded-b-none'}`}
                    autoFocus
                />
            </form>

            {searchValue && searchValue.length >= 2 && (
                <div className="absolute top-full left-0 right-0 bg-white rounded-lg rounded-t-none shadow-lg border border-t-0 border-[#0E033B] z-[70] max-h-60 overflow-y-auto mt-1">
                    {loadingSuggestions ? (
                        <div className="px-4 py-3 text-gray-500 text-sm">Loading...</div>
                    ) : suggestions.length > 0 ? (
                        suggestions.map((suggestion, index) => (
                            <div
                                key={`${suggestion.type}-${suggestion.slug || suggestion.asin || index}`}
                                className="flex items-center gap-3 px-4 py-3 hover:bg-gray-50 cursor-pointer border-b last:border-b-0"
                                onClick={() => onSuggestionClick(suggestion)}
                            >
                                <Search className="w-4 h-4 text-gray-400" />
                                <span className="text-gray-900">{suggestion.displayText || suggestion.name}</span>
                                <span className="text-sm text-gray-500 ml-auto">{suggestion.type}</span>
                            </div>
                        ))
                    ) : (
                        <div className="px-4 py-3 text-gray-500 text-sm">No results found</div>
                    )}
                </div>
            )}
        </div>
    )
}

export default function Header() {

    const [isMobileSearchOpen, setIsMobileSearchOpen] = useState(false)
    const [isSearchOpen, setIsSearchOpen] = useState(false)
    const [searchValue, setSearchValue] = useState("")
    const [suggestions, setSuggestions] = useState<any[]>([])
    const [loadingSuggestions, setLoadingSuggestions] = useState(false)
    const router = useRouter()

    useEffect(() => {
        if (searchValue.length >= 2) {
            const timeoutId = setTimeout(() => {
                fetchSuggestions()
            }, 300) // Debounce 300ms

            return () => clearTimeout(timeoutId)
        } else {
            setSuggestions([])
        }
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [searchValue])

    const fetchSuggestions = async () => {
        if (!searchValue || searchValue.length < 2) {
            setSuggestions([])
            return
        }

        setLoadingSuggestions(true)
        try {
            const [prodRes, catRes] = await Promise.all([
                axios.get('https://api.rated.xyz/api/search/products', { params: { q: searchValue, size: 5 } }).catch((err) => {
                    console.error('Products search error:', err)
                    return { data: [] }
                }),
                axios.get('https://api.rated.xyz/api/search/categories', { params: { q: searchValue, size: 5 } }).catch((err) => {
                    console.error('Categories search error:', err)
                    return { data: [] }
                })
            ])

            console.log('Search results:', { products: prodRes.data, categories: catRes.data })

            const combined = [
                ...(prodRes.data || []).map((p: any) => ({ ...p, type: 'Product', displayText: p.name })),
                ...(catRes.data || []).map((c: any) => ({ ...c, type: 'Category', displayText: c.name }))
            ]
            setSuggestions(combined.slice(0, 10))
            console.log('Combined suggestions:', combined)
        } catch (error) {
            console.error('Error fetching suggestions:', error)
            setSuggestions([])
        } finally {
            setLoadingSuggestions(false)
        }
    }

    const handleSearchChange = (value: string) => {
        setSearchValue(value)
    }

    const handleSearchSubmit = (e?: React.FormEvent) => {
        e?.preventDefault()
        if (searchValue.trim()) {
            router.push(`/search?q=${encodeURIComponent(searchValue.trim())}`)
            closeSearch()
        }
    }

    const handleSuggestionClick = (suggestion: any) => {
        if (suggestion.type === 'Product') {
            router.push(`/product/${suggestion.slug}`)
        } else {
            router.push(`/${suggestion.slug}`)
        }
        closeSearch()
    }

    const closeSearch = () => {
        setIsSearchOpen(false)
        setIsMobileSearchOpen(false)
        setSearchValue("")
        setSuggestions([])
    }

    return (
        <>
            <header className="px-4">
                {/* Desktop Layout - Always visible on desktop */}
                <div className="md:max-w-[1312px] hidden lg:flex items-center justify-between m-auto h-[60px] bg-white z-50">
                    <div className="flex items-center">
                        <Link href="/">
                            <img src="/logo_black.png" alt="Rated" className="w-[75px] md:w-[112px]" />
                        </Link>
                    </div>

                    <div className="flex items-center gap-2">
                        {/* Desktop Search Icon - Default state */}
                        {!isSearchOpen && (
                            <button
                                onClick={() => setIsSearchOpen(true)}
                                className="flex items-center justify-center h-10 w-10 text-[#0E033B] hover:bg-gray-300 rounded transition-colors"
                            >
                                <Search className="w-5 h-5 stroke-[1.5]" />
                            </button>
                        )}

                        {/* Desktop Search Bar - Expanded state */}
                        {isSearchOpen && (
                            <div className="flex items-center gap-1">
                                <div className="relative w-[350px] xl:w-[600px]">
                                    <form onSubmit={handleSearchSubmit} className="relative">
                                        <Search className="absolute left-4 top-1/2 transform -translate-y-1/2 w-5 h-5 text-[#0E033B]" />
                                        <input
                                            type="text"
                                            placeholder="Search for any product or brand"
                                            value={searchValue}
                                            onChange={(e) => handleSearchChange(e.target.value)}
                                            onKeyDown={(e) => {
                                                if (e.key === 'Enter') {
                                                    handleSearchSubmit()
                                                }
                                            }}
                                            className={`focus:outline-none focus:ring-0 w-full h-10 pl-12 pr-4 text-lg bg-white rounded-[4px] border border-[#0E033B] text-[#0E033B] placeholder:text-[#0E033B] focus:outline-none focus:ring-0 ${isSearchOpen && searchValue && searchValue.length >= 2 && (loadingSuggestions || suggestions.length > 0) && 'rounded-b-none'}`}
                                            autoFocus={isSearchOpen}
                                        />
                                    </form>

                                    {isSearchOpen && searchValue && searchValue.length >= 2 && (
                                        <div className="absolute top-full left-0 right-0 bg-white rounded-lg rounded-t-none shadow-lg border border-t-0 border-[#0E033B] z-[70] max-h-60 overflow-y-auto">
                                            {loadingSuggestions ? (
                                                <div className="px-4 py-3 text-gray-500 text-sm">Loading...</div>
                                            ) : suggestions.length > 0 ? (
                                                suggestions.map((suggestion, index) => (
                                                    <div
                                                        key={`${suggestion.type}-${suggestion.slug || suggestion.asin || index}`}
                                                        className="flex items-center gap-3 px-4 py-3 hover:bg-gray-50 cursor-pointer border-b last:border-b-0"
                                                        onClick={() => handleSuggestionClick(suggestion)}
                                                    >
                                                        <Search className="w-4 h-4 text-gray-400" />
                                                        <span className="text-gray-900">{suggestion.displayText || suggestion.name}</span>
                                                        <span className="text-sm text-gray-500 ml-auto">{suggestion.type}</span>
                                                    </div>
                                                ))
                                            ) : (
                                                <div className="px-4 py-3 text-gray-500 text-sm">No results found</div>
                                            )}
                                        </div>
                                    )}
                                </div>

                                <button
                                    onClick={closeSearch}
                                    className="h-10 w-10 p-0 rounded-[4px] bg-[#0E033B] text-white hover:bg-[#0a0230] transition-colors duration-200 flex items-center justify-center flex-shrink-0"
                                >
                                    <X className="w-5 h-5" />
                                </button>
                            </div>
                        )}

                        {/* All Categories - Desktop */}
                        <a href="/categories" className="h-11 text-lg text-[#0E033B] font-medium hover:text-black hover:bg-gray-50 flex items-center gap-2">
                            All Categories
                        </a>
                    </div>
                </div>

                {/* Mobile Layout */}
                <div className="md:max-w-[1312px] block lg:hidden m-auto bg-white z-50">
                    {!isMobileSearchOpen ? (
                        <div className="h-[56px] flex items-center justify-between">
                            <div className="flex items-center">
                                <Link href="/">
                                    <img src="/logo_black.png" alt="Rated" className="w-[75px] md:w-[112px]" />
                                </Link>
                            </div>

                            <div className="flex items-center gap-2">
                                {/* Mobile Search Icon */}
                                <button
                                    onClick={() => setIsMobileSearchOpen(true)}
                                    className="h-6 w-6 p-0 flex items-center justify-center text-[#0E033B] hover:bg-gray-300 rounded transition-colors"
                                >
                                    <Search className="w-5 h-5 stroke-[1.5]" />
                                </button>

                                <button className="h-11 text-lg text-[#0E033B] font-medium hover:text-black hover:bg-gray-50 flex items-center gap-2">
                                    All Categories
                                </button>
                            </div>
                        </div>
                    ) : (
                        <>
                            {/* First Row: Logo and Close Button + All Categories - Same height as closed state */}
                            <div className="h-[56px] flex items-center justify-between">
                                <div className="flex items-center">
                                    <Link href="/">
                                        <img src="./logo_black.png" alt="Rated" className="w-[75px] md:w-[112px]" />
                                    </Link>
                                </div>

                                <div className="flex items-center gap-2">
                                    <button
                                        onClick={() => setIsMobileSearchOpen(false)}
                                        className="h-6 w-6 p-0 rounded-[4px] bg-[#0E033B] text-white hover:bg-[#0a0230] transition-colors duration-200 flex items-center justify-center flex-shrink-0"
                                    >
                                        <X className="w-5 h-5" />
                                    </button>
                                    <button className="h-11 text-lg text-[#0E033B] font-medium hover:text-black hover:bg-gray-50 flex items-center gap-2">
                                        All Categories
                                    </button>
                                </div>
                            </div>

                            {/* Second Row: Mobile Search Bar */}
                            <div className="w-full">
                                <MobileSearchInput 
                                    searchValue={searchValue}
                                    onSearchChange={handleSearchChange}
                                    onSearchSubmit={handleSearchSubmit}
                                    suggestions={suggestions}
                                    loadingSuggestions={loadingSuggestions}
                                    onSuggestionClick={handleSuggestionClick}
                                    onClose={() => setIsMobileSearchOpen(false)} 
                                />
                            </div>
                        </>
                    )}
                </div>

            </header>
        </>
    )
}
