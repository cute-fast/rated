import { Search, X } from "lucide-react"
import { useState, useEffect } from "react"
import MobileSearchPanel from "../search/MobileSearchPanel"

export default function Header() {

    const [isMobileSearchOpen, setIsMobileSearchOpen] = useState(false)
    const [isSearchOpen, setIsSearchOpen] = useState(false)
    const [searchValue, setSearchValue] = useState("")

    useEffect(() => {
        const handleOpenMobileSearch = () => {
            setIsMobileSearchOpen(true)
        }

        window.addEventListener("openMobileSearch", handleOpenMobileSearch)
        return () => window.removeEventListener("openMobileSearch", handleOpenMobileSearch)
    }, [])

    const handleMobileSearchOpen = () => {
        setIsMobileSearchOpen(true)
    }


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
                <div className="md:max-w-[1312px] relative flex items-center justify-between m-auto h-20 bg-white z-50">
                    <div className="flex items-center ">
                        <img src="./logo_black.png" alt="Rated" className="w-[75px] md:w-[112px]" />
                    </div>

                    <div className="flex items-center gap-2">
                        <div
                            className={`transition-all duration-300 ease-in-out ${isSearchOpen ? "opacity-100 translate-x-0 md:w-[350px] lg:w-[600px]" : "opacity-0 translate-x-8 pointer-events-none w-0"
                                }`}
                        >
                            <div className="relative">
                                <Search className="absolute left-4 top-1/2 transform -translate-y-1/2 text-black w-8 h-8" />
                                <input
                                    type="text"
                                    placeholder="Search for any product or brand"
                                    value={searchValue}
                                    onChange={(e) => handleSearchChange(e.target.value)}
                                    className={`w-full h-14 pl-16 pr-8 text-xl bg-gray-200 rounded-[28px] border-0 focus:outline-none ${isSearchOpen && searchValue && filteredSuggestions.length > 0 && 'rounded-b-none'}`}
                                    autoFocus={isSearchOpen}
                                />

                                {isSearchOpen && searchValue && filteredSuggestions.length > 0 && (
                                    <div className="absolute top-full left-0 right-0 bg-white rounded-lg rounded-t-none shadow-lg border z-[70] max-h-60 overflow-y-auto">
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
                        </div>

                        <button
                            onClick={() => {
                                setIsSearchOpen(!isSearchOpen)
                                if (isSearchOpen) {
                                    setSearchValue("")
                                }
                            }}
                            className='h-12 w-12 p-0 rounded-full bg-black text-white border-gray-300 transition-all duration-200 hidden lg:block'
                        >
                            <div className={`flex items-center justify-center transition-transform duration-200 ${isSearchOpen ? "rotate-90" : "rotate-0"}`}>
                                {isSearchOpen ? <X className="w-8 h-8" /> : <Search className="w-8 h-8" />}
                            </div>
                        </button>

                        <MobileSearchPanel
                            isOpen={isMobileSearchOpen}
                            onOpenChange={setIsMobileSearchOpen}
                            onOpen={handleMobileSearchOpen}
                        />

                        <button className="h-11 text-lg px-4 pr-0 text-gray-700 font-medium hover:text-black hover:bg-gray-50">
                            Categories
                        </button>
                    </div>
                </div>

            </header>
        </>
    )
}
