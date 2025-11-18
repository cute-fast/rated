import { Search, ArrowLeft } from "lucide-react"
import { useState, useEffect } from "react"
import Link from "next/link"

interface MobileSearchPanelProps {
  isOpen: boolean
  onOpenChange: (open: boolean) => void
  onOpen: () => void
}

export default function MobileSearchPanel({ isOpen, onOpenChange, onOpen }: MobileSearchPanelProps) {
  const [searchValue, setSearchValue] = useState("")

  const searchSuggestions = [
    { text: "Clothing", type: "category", slug: "/clothing" },
    { text: "Nike", type: "product", slug: "/nike" },
    { text: "Shoes", type: "category", slug: "/shoes" },
    { text: "Apple", type: "product", slug: "/apple" },
    { text: "Electronics", type: "category", slug: "/electronics" },
    { text: "Samsung", type: "product", slug: "/sumsung" },
  ]

  const filteredSuggestions = searchSuggestions.filter((suggestion) =>
    suggestion.text.toLowerCase().includes(searchValue.toLowerCase()),
  )

  const handleSearchChange = (value: string) => {
    setSearchValue(value)
  }

  const handleClose = () => {
    onOpenChange(false)
    setSearchValue("")
  }

  const handleSearchSubmit = () => {
    // Handle search submission logic here
    console.log("Search submitted:", searchValue)
    // onOpenChange(false)
    setSearchValue("")
  }

  useEffect(() => {
    const handleEscape = (e: KeyboardEvent) => {
      if (e.key === "Escape" && isOpen) {
        handleClose()
      }
    }

    if (isOpen) {
      document.addEventListener("keydown", handleEscape)
      document.body.style.overflow = "hidden"
    } else {
      document.body.style.overflow = "unset"
    }

    return () => {
      document.removeEventListener("keydown", handleEscape)
      document.body.style.overflow = "unset"
    }
  }, [isOpen])

  return (
    <>
      <button
        onClick={onOpen}
        className="h-12 w-12 p-0 rounded-full text-white border border-gray-300 hover:bg-gray-700 block lg:hidden bg-black transition-colors duration-200"
      >
        <Search className="w-8 h-8 mx-auto" />
      </button>

      {isOpen && (
        <div className="fixed inset-0 z-50 bg-white">
          <div className="flex flex-col h-full">
            <div className="flex items-center gap-4 px-6 py-6">
              <button
                onClick={handleClose}
                className="h-10 w-10 p-0 rounded-full hover:bg-gray-100 transition-colors duration-200"
              >
                <ArrowLeft className="w-6 h-6 mx-auto" />
              </button>

              <div className="flex-1">
                <input
                  type="text"
                  placeholder="Search products"
                  value={searchValue}
                  onChange={(e) => handleSearchChange(e.target.value)}
                  className="w-full h-12 px-0 text-lg bg-transparent border-0 focus:outline-none placeholder:text-gray-400 text-gray-900"
                  autoFocus
                  onKeyDown={(e) => e.key === "Enter" && handleSearchSubmit()}
                />
              </div>

              <button
                onClick={handleSearchSubmit}
                className="h-10 w-10 p-0 rounded-full bg-black text-white hover:bg-gray-800 transition-colors duration-200"
              >
                <ArrowLeft className="w-6 h-6 rotate-180 mx-auto" />
              </button>
            </div>

            <div className="flex-1 overflow-y-auto px-6">
              {searchValue && filteredSuggestions.length > 0 && (
                <div className="space-y-1">
                  {filteredSuggestions.map((suggestion, index) => (
                    <Link
                      key={index}
                      className="flex items-center gap-3 px-4 py-4 hover:bg-gray-200 cursor-pointer rounded-lg transition-colors duration-200"
                      href={suggestion.type === 'product' ? `/product/${suggestion.slug}` : `/${suggestion.slug}`}
                    >
                      <Search className="w-5 h-5 text-gray-400" />
                      <span className="text-gray-900 text-base">{suggestion.text}</span>
                      <span className="text-sm text-gray-500 ml-auto">{suggestion.type}</span>
                    </Link>
                  ))}
                </div>
              )}
            </div>
          </div>
        </div>
      )}
    </>
  )
}