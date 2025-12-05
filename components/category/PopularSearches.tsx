"use client"

import Link from "next/link"
import { Search } from "lucide-react"

const popularSearches = [
  "40hz Gaming Monitors",
  "Oled Gaming Monitor",
  "Gaming Monitor 144hz 1ms",
  "Samsung Odyssey G9",
  "Portable Monitor",
  "Apple Studio Display",
  "49 Inch Monitor",
  "Ultrawide Curved Monitor",
  "Gaming Pc And Monitor",
  "Mini Laptop",
  "49 Inch Ultrawide Monitor",
  "240hz Monitors 2560x1440",
  "4k Gaming Monitor",
  "360 Hz Monitor",
  "Ps5 Portable",
  "34 Inch Ultrawide Monitor"
]

export default function PopularSearches() {
  return (
    <section className="bg-white py-8 px-4">
      <div className="max-w-[1120px] mx-auto">
        <h2 className="text-[16px] md:text-[18px] text-2xl md:text-3xl font-bold text-[#0E033B] mb-6">Popular Searches</h2>
        
        <div className="flex flex-wrap gap-3">
          {popularSearches.map((search, index) => (
            <Link
              key={index}
              href={`/search?q=${encodeURIComponent(search)}`}
              className="inline-flex items-center gap-2 px-4 py-2 bg-[#f4f7ff] hover:bg-[#D8D8FF] rounded-lg text-[#000000] font-semibold transition-colors"
            >
              <Search className="w-4 h-4" />
              <span className="text-[11px]">{search}</span>
            </Link>
          ))}
        </div>
      </div>
    </section>
  )
}

