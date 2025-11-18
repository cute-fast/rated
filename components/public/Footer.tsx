"use client"

import { Facebook, Instagram, Linkedin } from "lucide-react"

export default function FooterSection() {


  return (
    <footer className="bg-[#0E033B] text-white px-4 py-12">
      <div className="max-w-[1312px] mx-auto">
        <div className="flex flex-col md:grid md:grid-cols-[1fr_2fr_1fr_1fr_1fr] gap-8 md:gap-12 mb-12">
          {/* Logo and Description - centered on mobile */}
          <div className="md:col-span-1 md:text-left flex items-center">
            <h2 className="text-3xl md:text-4xl font-bold mb-4">Rated</h2>
          </div>
          <div className="md:col-span-1 md:text-left flex items-center md:pr-4">
            Rated is your intelligent product-discovery platform. We cut through the noise by analyzing millions of
            reviews, specs, and performance signals to highlight the best-in-class options.
          </div>

          {/* Follow Us - centered on mobile, 4 icons in a row */}
          <div className="md:col-start-5 md:row-start-1 flex  items-center md:items-start justify-center md:justify-end">
            <div className="">
              <h4 className="font-semibold text-base mb-4 text-center md:text-left">Follow Us</h4>
              <div className="flex md:grid md:grid-cols-2 md:w-[120px]">
                <a
                  href="#"
                  className="border border-white/40 hover:border-white hover:bg-white/10 transition-all p-3 flex items-center justify-center w-12 h-12 md:aspect-square md:w-auto md:h-auto"
                >
                  <Facebook className="h-5 w-5" />
                </a>
                <a
                  href="#"
                  className="border border-white/40 hover:border-white hover:bg-white/10 transition-all p-3 flex items-center justify-center w-12 h-12 md:aspect-square md:w-auto md:h-auto"
                >
                  <svg className="h-5 w-5" fill="currentColor" viewBox="0 0 24 24">
                    <path d="M18.244 2.25h3.308l-7.227 8.26 8.502 11.24H16.17l-5.214-6.817L4.99 21.75H1.68l7.73-8.835L1.254 2.25H8.08l4.713 6.231zm-1.161 17.52h1.833L7.084 4.126H5.117z" />
                  </svg>
                </a>
                <a
                  href="#"
                  className="border border-white/40 hover:border-white hover:bg-white/10 transition-all p-3 flex items-center justify-center w-12 h-12 md:aspect-square md:w-auto md:h-auto"
                >
                  <Instagram className="h-5 w-5" />
                </a>
                <a
                  href="#"
                  className="border border-white/40 hover:border-white hover:bg-white/10 transition-all p-3 flex items-center justify-center w-12 h-12 md:aspect-square md:w-auto md:h-auto"
                >
                  <Linkedin className="h-5 w-5" />
                </a>
              </div>
            </div>

          </div>

          {/* Company and More - 2 columns side by side on mobile */}
          <div className="grid grid-cols-2 gap-8 md:contents">
            {/* Company Column */}
            <div className="md:flex md:justify-end">
              <div>
                <h4 className="font-semibold text-base mb-4">Company</h4>
                <ul className="space-y-2.5 text-gray-300 text-sm">
                  <li>
                    <a href="#" className="hover:text-white transition-colors">
                      About
                    </a>
                  </li>
                  <li>
                    <a href="#" className="hover:text-white transition-colors">
                      Contact Us
                    </a>
                  </li>
                  <li>
                    <a href="#" className="hover:text-white transition-colors">
                      Sell With Rated
                    </a>
                  </li>
                  <li>
                    <a href="#" className="hover:text-white transition-colors">
                      Partnerships
                    </a>
                  </li>
                </ul>
              </div>
            </div>


            {/* More Column */}
            <div className="md:flex md:justify-end">
              <div>
                <h4 className="font-semibold text-base mb-4">More</h4>
                <ul className="space-y-2.5 text-gray-300 text-sm">
                  <li>
                    <a href="#" className="hover:text-white transition-colors">
                      Categories
                    </a>
                  </li>
                  <li>
                    <a href="#" className="hover:text-white transition-colors">
                      Top Rated Lists
                    </a>
                  </li>
                  <li>
                    <a href="#" className="hover:text-white transition-colors">
                      Ratings
                    </a>
                  </li>
                  <li>
                    <a href="#" className="hover:text-white transition-colors">
                      BuyerIQ
                    </a>
                  </li>
                </ul>
              </div>
            </div>


          </div>
        </div>

        <div className="border-t border-white/10 pt-6 flex flex-col md:flex-row justify-between items-center gap-4 text-sm">
          <div className="flex flex-row md:flex-row items-center gap-3 md:gap-6 text-gray-300 text-center">
            <a href="#" className="hover:text-white transition-colors">
              Terms of Use
            </a>
            <a href="#" className="hover:text-white transition-colors">
              Privacy policy
            </a>
            <a href="#" className="hover:text-white transition-colors">
              CCPA
            </a>
            <a href="#" className="hover:text-white transition-colors">
              Cookie Policy
            </a>
          </div>
          <p className="text-gray-300 text-center md:text-right">© 2025 Rated.xyz All Rights Reserved.</p>
        </div>
      </div>
    </footer>
  )
}
