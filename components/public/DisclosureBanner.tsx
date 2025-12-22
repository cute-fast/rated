"use client"

import { useState } from "react"
import { X } from "lucide-react";

export default function DisclosureBanner() {
  const [isModalOpen, setIsModalOpen] = useState(false)
  const [isMobileDisclosureOpen, setIsMobileDisclosureOpen] = useState(false)

  const handleDisclosureClick = () => {
    // Toggle mobile disclosure (for mobile view)
    setIsMobileDisclosureOpen(!isMobileDisclosureOpen)
    // Open modal for desktop view
    setIsModalOpen(true)
  }

  const disclosureContent = (
    <>
      <div className="border-t border-gray-300 mb-4"></div>
      <h2 className="text-[13px] leading-[16px] mb-4">
        Advertising Disclosure
      </h2>
      <div className="text-[#0E033B] text-sm leading-relaxed space-y-3">
        <p>
          Rated may receive compensation when you use our links or when brands support our work.
          This support helps keep the site free, while our product evaluations and scoring remain
          independent.
          Some placements are sponsored and clearly identified as such. Sponsorship may influence
          where or how offers appear, but it does not affect our scoring methodology.
          You will never pay extra by using our links. We do not cover every brand or product
          available, and the inclusion of a listing does not imply endorsement.
          Information, including pricing and availability, may change at any time without notice.
          Please review our Terms of Use for additional details.
        </p>
      </div>
    </>
  )

  return (
    <>
      <div className="hidden md:block bg-[#0E033B] py-3 px-4 text-center text-[13px] leading-[16px] text-white">
        <p>
          When you buy through our links, we may earn a commission.{" "}
          <button
            onClick={handleDisclosureClick}
            className="underline hover:opacity-80 transition-opacity cursor-pointer"
          >
            Ad Disclosure
          </button>
        </p>
      </div>
      <div className="md:hidden bg-[#0E033B] text-white py-3 px-4 text-center text-sm">
        <div className="h-[16px]"></div>
        <p>
          <button
            onClick={handleDisclosureClick}
            className="underline hover:opacity-80 transition-opacity cursor-pointer"
          >
            Ad Disclosure
          </button>
        </p>
      </div>

      {/* Mobile inline disclosure */}
      {isMobileDisclosureOpen && (
        <div className="md:hidden bg-gray-100 border border-gray-300 px-4 py-6">
          {disclosureContent}
        </div>
      )}

      {/* Desktop modal */}
      {isModalOpen && (
        <div
          className="hidden md:flex fixed inset-0 bg-black/50 items-center justify-center z-[100] p-4"
          onClick={() => {
            setIsModalOpen(false)
            setIsMobileDisclosureOpen(false)
          }}
        >
          <div
            className="bg-[#F4F7FF] rounded-lg max-w-2xl w-full p-6 md:p-8 relative max-h-[90vh] overflow-y-auto"
            onClick={(e) => e.stopPropagation()}
          >
            <button
              onClick={() => {
                setIsModalOpen(false)
                setIsMobileDisclosureOpen(false)
              }}
              className="absolute top-4 right-4 text-[#0E033B] hover:opacity-70 transition-opacity text-2xl font-bold leading-none"
              aria-label="Close"
            >
              <X className="w-6 h-6" />
            </button>

            <h2 className="text-[15px] leading-[25px] font-hurme-bold font-bold text-[#06012D] mb-6 pr-8">
              Advertising Disclosure
            </h2>

            <div className="text-[#06012D] text-[15px] leading-[25px] md:text-base leading-relaxed space-y-4">
                Rated may receive compensation when you use our links or when brands support our work.
                This support helps keep the site free, while our product evaluations and scoring remain
                independent.
                Some placements are sponsored and clearly identified as such. Sponsorship may influence
                where or how offers appear, but it does not affect our scoring methodology.
                You will never pay extra by using our links. We do not cover every brand or product
                available, and the inclusion of a listing does not imply endorsement.
                Information, including pricing and availability, may change at any time without notice.
                Please review our Terms of Use for additional details.
            </div>
          </div>
        </div>
      )}
    </>
  )
}

