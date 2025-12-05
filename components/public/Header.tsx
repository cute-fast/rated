import { Search, X } from "lucide-react"
import { useState, useEffect } from "react"
import Link from "next/link"

// Mobile Search Input Component (for second row)
function MobileSearchInput({ onClose }: { onClose: () => void }) {
    const [searchValue, setSearchValue] = useState("")

    const searchSuggestions = [
        { text: "Clothing", type: "Category" },
        { text: "Nike", type: "Brand" },
        { text: "Shoes", type: "Category" },
        { text: "Apple", type: "Brand" },
        { text: "Electronics", type: "Category" },
        { text: "Samsung", type: "Brand" },
    ]

    const filteredSuggestions = searchSuggestions.filter((suggestion) =>
        suggestion.text.toLowerCase().includes(searchValue.toLowerCase()),
    )

    return (
        <div className="relative w-full">
            <Search className="absolute left-4 top-1/2 transform -translate-y-1/2 w-5 h-5 text-[#0E033B]" />
            <input
                type="text"
                placeholder="Search for any product or brand"
                value={searchValue}
                onChange={(e) => setSearchValue(e.target.value)}
                className={`w-full h-10 pl-12 pr-4 text-base bg-white rounded-[4px] border border-[#0E033B] text-[#0E033B] placeholder:text-[#0E033B] focus:outline-none focus:ring-2 focus:ring-[#0E033B] focus:ring-offset-0 ${searchValue && filteredSuggestions.length > 0 && 'rounded-b-none'}`}
                autoFocus
            />

            {searchValue && filteredSuggestions.length > 0 && (
                <div className="absolute top-full left-0 right-0 bg-white rounded-lg rounded-t-none shadow-lg border border-t-0 border-[#0E033B] z-[70] max-h-60 overflow-y-auto mt-1">
                    {filteredSuggestions.map((suggestion, index) => (
                        <div
                            key={index}
                            className="flex items-center gap-3 px-4 py-3 hover:bg-gray-50 cursor-pointer border-b last:border-b-0"
                            onClick={() => {
                                setSearchValue(suggestion.text)
                            }}
                        >
                            <Search className="w-4 h-4 text-gray-400" />
                            <span className="text-gray-900">{suggestion.text}</span>
                            <span className="text-sm text-gray-500 ml-auto">{suggestion.type}</span>
                        </div>
                    ))}
                </div>
            )}
        </div>
    )
}

export default function Header() {

    const [isMobileSearchOpen, setIsMobileSearchOpen] = useState(false)
    const [isSearchOpen, setIsSearchOpen] = useState(false)
    const [searchValue, setSearchValue] = useState("")


    const searchSuggestions = [
        { text: "Clothing", type: "Category" },
        { text: "Nike", type: "Brand" },
        { text: "Shoes", type: "Category" },
        { text: "Apple", type: "Brand" },
        { text: "Electronics", type: "Category" },
        { text: "Samsung", type: "Brand" },
    ]

    const filteredSuggestions = searchSuggestions.filter((suggestion) =>
        suggestion.text.toLowerCase().includes(searchValue.toLowerCase()),
    )

    const handleSearchChange = (value: string) => {
        setSearchValue(value)
    }

    const closeSearch = () => {
        setIsSearchOpen(false)
        setSearchValue("")
    }

    return (
        <>
            <header className="px-4 border-b border-gray-300">
                {/* Desktop Layout - Always visible on desktop */}
                <div className="md:max-w-[1312px] hidden lg:flex items-center justify-between m-auto h-20 bg-white z-50">
                    <div className="flex items-center">
                        <Link href="/">
                            <img src="./logo_black.png" alt="Rated" className="w-[75px] md:w-[112px]" />
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
                            <div className="flex items-center gap-2">
                                <div className="relative w-[350px] xl:w-[600px]">
                                    <Search className="absolute left-4 top-1/2 transform -translate-y-1/2 w-5 h-5 text-[#0E033B]" />
                                    <input
                                        type="text"
                                        placeholder="Search for any product or brand"
                                        value={searchValue}
                                        onChange={(e) => handleSearchChange(e.target.value)}
                                        className={`w-full h-10 pl-12 pr-4 text-lg bg-white rounded-[4px] border border-[#0E033B] text-[#0E033B] placeholder:text-[#0E033B] focus:outline-none focus:ring-2 focus:ring-[#0E033B] focus:ring-offset-0 ${isSearchOpen && searchValue && filteredSuggestions.length > 0 && 'rounded-b-none'}`}
                                        autoFocus={isSearchOpen}
                                    />

                                    {isSearchOpen && searchValue && filteredSuggestions.length > 0 && (
                                        <div className="absolute top-full left-0 right-0 bg-white rounded-lg rounded-t-none shadow-lg border border-t-0 border-[#0E033B] z-[70] max-h-60 overflow-y-auto">
                                            {filteredSuggestions.map((suggestion, index) => (
                                                <div
                                                    key={index}
                                                    className="flex items-center gap-3 px-4 py-3 hover:bg-gray-50 cursor-pointer border-b last:border-b-0"
                                                    onClick={() => {
                                                        setSearchValue(suggestion.text)
                                                    }}
                                                >
                                                    <Search className="w-4 h-4 text-gray-400" />
                                                    <span className="text-gray-900">{suggestion.text}</span>
                                                    <span className="text-sm text-gray-500 ml-auto">{suggestion.type}</span>
                                                </div>
                                            ))}
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
                        <button className="h-11 text-lg text-[#0E033B] font-medium hover:text-black hover:bg-gray-50 flex items-center gap-2">
                            All Categories
                        </button>
                    </div>
                </div>

                {/* Mobile Layout */}
                <div className="md:max-w-[1312px] block lg:hidden m-auto bg-white z-50">
                    {!isMobileSearchOpen ? (
                        <div className="h-20 flex items-center justify-between">
                            <div className="flex items-center">
                                <Link href="/">
                                    <img src="./logo_black.png" alt="Rated" className="w-[75px] md:w-[112px]" />
                                </Link>
                            </div>

                            <div className="flex items-center gap-2">
                                {/* Mobile Search Icon */}
                                <button
                                    onClick={() => setIsMobileSearchOpen(true)}
                                    className="h-10 w-10 p-0 flex items-center justify-center text-[#0E033B] hover:bg-gray-300 rounded transition-colors"
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
                            <div className="h-20 flex items-center justify-between">
                                <div className="flex items-center">
                                    <Link href="/">
                                        <img src="./logo_black.png" alt="Rated" className="w-[75px] md:w-[112px]" />
                                    </Link>
                                </div>

                                <div className="flex items-center gap-2">
                                    <button
                                        onClick={() => setIsMobileSearchOpen(false)}
                                        className="h-10 w-10 p-0 rounded-[4px] bg-[#0E033B] text-white hover:bg-[#0a0230] transition-colors duration-200 flex items-center justify-center flex-shrink-0"
                                    >
                                        <X className="w-5 h-5" />
                                    </button>
                                    <button className="h-11 text-lg text-[#0E033B] font-medium hover:text-black hover:bg-gray-50 flex items-center gap-2">
                                        All Categories
                                    </button>
                                </div>
                            </div>

                            {/* Second Row: Mobile Search Bar */}
                            <div className="pb-4 w-full">
                                <MobileSearchInput onClose={() => setIsMobileSearchOpen(false)} />
                            </div>
                        </>
                    )}
                </div>

            </header>
        </>
    )
}
