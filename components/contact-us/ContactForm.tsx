"use client"

import { useState, useRef, useEffect } from "react"
import ReCAPTCHA from "react-google-recaptcha"
import Image from "next/image"

export default function ContactForm() {
  const [formData, setFormData] = useState({
    firstName: "",
    email: "",
    phone: "",
    website: "",
    company: "",
    message: "",
  })
  const [recaptchaToken, setRecaptchaToken] = useState<string | null>(null)
  const recaptchaRef = useRef<ReCAPTCHA>(null)
  const recaptchaWrapperRef = useRef<HTMLDivElement>(null)

  // Get reCAPTCHA site key from environment variable or use a placeholder
  // You'll need to add NEXT_PUBLIC_RECAPTCHA_SITE_KEY to your .env.local file
  const recaptchaSiteKey = process.env.NEXT_PUBLIC_RECAPTCHA_SITE_KEY || "6LeIxAcTAAAAAJcZVRqyHh71UMIEGNQ_MXjiZKhI" // This is Google's test key

  // Calculate and apply scale to make reCAPTCHA match form field width
  useEffect(() => {
    const updateRecaptchaScale = () => {
      if (recaptchaWrapperRef.current) {
        const wrapper = recaptchaWrapperRef.current
        const recaptchaDiv = wrapper.querySelector('.g-recaptcha') as HTMLElement
        if (recaptchaDiv) {
          const wrapperWidth = wrapper.offsetWidth
          const recaptchaWidth = 340 // Fixed width of reCAPTCHA widget
          const scale = wrapperWidth / recaptchaWidth

          if (scale > 0 && scale !== Infinity) {
            recaptchaDiv.style.transform = `scale(${scale})`
            recaptchaDiv.style.transformOrigin = 'left center'
            recaptchaDiv.style.width = `${recaptchaWidth}px`
          }
        }
      }
    }

    // Update on mount and resize
    updateRecaptchaScale()
    window.addEventListener('resize', updateRecaptchaScale)

    // Also update after a short delay to ensure reCAPTCHA is loaded
    const timer = setTimeout(updateRecaptchaScale, 1000)

    return () => {
      window.removeEventListener('resize', updateRecaptchaScale)
      clearTimeout(timer)
    }
  }, [])

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    })
  }

  const handleRecaptchaChange = (token: string | null) => {
    setRecaptchaToken(token)
    // Update scale after reCAPTCHA loads
    setTimeout(() => {
      if (recaptchaWrapperRef.current) {
        const wrapper = recaptchaWrapperRef.current
        const recaptchaDiv = wrapper.querySelector('.g-recaptcha') as HTMLElement
        if (recaptchaDiv) {
          const wrapperWidth = wrapper.offsetWidth
          const recaptchaWidth = 304
          const scale = wrapperWidth / recaptchaWidth

          if (scale > 0 && scale !== Infinity) {
            recaptchaDiv.style.transform = `scale(${scale})`
            recaptchaDiv.style.transformOrigin = 'left center'
            recaptchaDiv.style.width = `${recaptchaWidth}px`
          }
        }
      }
    }, 100)
  }

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()

    if (!recaptchaToken) {
      alert("Please complete the reCAPTCHA verification")
      return
    }

    // Handle form submission here
    console.log("Form submitted:", { ...formData, recaptchaToken })

    // Reset form and reCAPTCHA after submission
    setFormData({
      firstName: "",
      email: "",
      phone: "",
      website: "",
      company: "",
      message: "",
    })
    setRecaptchaToken(null)
    recaptchaRef.current?.reset()
  }

  return (
    <section className="bg-[radial-gradient(39.11%_46.94%_at_77.47%_48.26%,rgba(18,3,172,0.15)_0%,rgba(229,236,255,0.15)_100%)] py-16 px-4">
      <div className="max-w-[1312px] mx-auto">
        <div className="flex flex-col md:flex-row md:gap-[100px]">
          <div className="flex-1 space-y-8 flex items-center m-auto">
            <div className="">
              <div className="mb-12">
                <h1 className="hidden md:block text-[48px] tracking-[0.02em] md:text-[68px] font-semibold text-[#0E033B] mb-4 text-center md:text-left md:leading-[76px]">
                  Build Brand<br />
                  Momentum With Rated
                </h1>
                <h1 className="md:hidden text-[48px] tracking-[0.02em] leading-[58px] md:text-[68px] font-semibold text-[#0E033B] mb-6 text-center md:text-left md:leading-[76px]">
                  Build Brand<br />
                  Momentum<br />
                  With Rated
                </h1>
                <p className="hidden tracking-[0.02em] md:block text-[18px] text-[#0E033B] leading-[-2px] text-center md:text-left max-w-[541px]">
                  Rated, driven by Buyer IQ, highlights the best products in every category using millions of real consumer insights.
                </p>
                <p className="max-w-[388px] md:hidden text-[18px] tracking-[0.02em] text-[#0E033B] leading-relaxed text-center md:text-left">
                  Rated, driven by Buyer IQ, highlights the best products in every category using millions of real consumer insights.
                </p>
              </div>

              <div className="hidden md:flex flex-col md:flex-row gap-6">
                <div className="">
                  <div className="flex justify-center md:justify-start mb-4">
                    <img src='/icon-shield.png' alt='Shield' width="64" />
                  </div>
                  <h3 className="text-[20px] font-bold text-[#0E033B] mb-2 text-center md:text-left">Trusted Ratings At Scale</h3>
                  <p className="text-[#0E033B] text-center md:text-left text-[15px] max-w-[325px] m-auto">
                    Millions of real consumer insights power product scores that drive confident shopping decisions.
                  </p>
                </div>

                <div className="">
                  <div className="flex justify-center md:justify-start mb-4">
                    <img src='/icon-goal.png' alt='Shield' width="64" />
                  </div>
                  <h3 className="text-xl font-bold text-[#0E033B] mb-2 text-center md:text-left">High-Intent Shoppers</h3>
                  <p className="text-[#0E033B] text-center md:text-left max-w-[325px] m-auto">
                    Data-driven comparisons attract engaged users ready to discover top-rated products.
                  </p>
                </div>

                <div className="">
                  <div className="flex justify-center md:justify-start mb-4">
                    <img src='/icon-apart.png' alt='Shield' width="64" />
                  </div>
                  <h3 className="text-xl font-bold text-[#0E033B] mb-2 text-center md:text-left">Unmatched Visibility</h3>
                  <p className="text-[#0E033B] text-center md:text-left max-w-[325px] m-auto">
                    Showcase your brand where consumner are actively searching for the best options.
                  </p>
                </div>
              </div>
            </div>

          </div>

          {/* Right Section - Contact Form */}
          <div className="m-auto">
            <div className="relative max-w-[388px]">
              {/* Buyer IQ Watermark */}
              <div className="absolute -left-[144px] -top-[20px] bottom-0 hidden md:block w-[180px]">
                <img src="./buyeriq-big.png" alt="" className="" />
              </div>

              <div className="bg-white rounded-lg p-6 md:p-8 shadow-lg relative z-10">
                <h2 className="text-2xl md:text-3xl font-bold text-[#0E033B] mb-6 text-center">
                  Partner with Rated
                </h2>

                <form onSubmit={handleSubmit} className="space-y-4">
                  <input
                    type="text"
                    name="firstName"
                    placeholder="First Name"
                    value={formData.firstName}
                    onChange={handleChange}
                    className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-[#0E033B] focus:border-transparent"
                    required
                  />

                  <input
                    type="email"
                    name="email"
                    placeholder="Email"
                    value={formData.email}
                    onChange={handleChange}
                    className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-[#0E033B] focus:border-transparent"
                    required
                  />

                  <input
                    type="tel"
                    name="phone"
                    placeholder="Phone Number"
                    value={formData.phone}
                    onChange={handleChange}
                    className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-[#0E033B] focus:border-transparent"
                  />

                  <input
                    type="url"
                    name="website"
                    placeholder="Website"
                    value={formData.website}
                    onChange={handleChange}
                    className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-[#0E033B] focus:border-transparent"
                  />

                  <input
                    type="text"
                    name="company"
                    placeholder="Company"
                    value={formData.company}
                    onChange={handleChange}
                    className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-[#0E033B] focus:border-transparent"
                  />

                  <textarea
                    name="message"
                    placeholder="Message"
                    value={formData.message}
                    onChange={handleChange}
                    rows={4}
                    className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-[#0E033B] focus:border-transparent resize-none"
                  />

                  {/* reCAPTCHA */}
                  <div className="flex flex-col gap-2">
                    <div ref={recaptchaWrapperRef} className="w-full overflow-hidden">
                      <ReCAPTCHA
                        ref={recaptchaRef}
                        sitekey={recaptchaSiteKey}
                        onChange={handleRecaptchaChange}
                      />
                    </div>
                  </div>

                  <button
                    type="submit"
                    className="w-full bg-[#0E00DE] hover:bg-[#0E033B] text-white font-bold py-4 px-6 rounded-lg transition-colors uppercase tracking-wide"
                  >
                    Submit
                  </button>
                </form>
              </div>
            </div>
          </div>

          <div className="flex justify-center mt-12 md:hidden">
            <img src="./buyeriq.png" alt="BuyerIQ" className="" />
          </div>

          <div className="md:hidden flex flex-col md:flex-row gap-6">
            <div className="">
              <div className="flex justify-center md:justify-start mb-4">
                <img src='/icon-goal.png' alt='Shield' width="64" />
              </div>
              <h3 className="text-[20px] font-bold text-[#0E033B] mb-2 text-center md:text-left">Trusted Ratings At Scale</h3>
              <p className="text-[#0E033B] text-center md:text-left text-[15px] max-w-[325px] m-auto">
                Millions of real consumer insights power product scores that drive confident shopping decisions.
              </p>
            </div>

            <div className="">
              <div className="flex justify-center md:justify-start mb-4">
                <img src='/icon-apart.png' alt='Shield' width="64" />
              </div>
              <h3 className="text-xl font-bold text-[#0E033B] mb-2 text-center md:text-left">High-Intent Shoppers</h3>
              <p className="text-[#0E033B] text-center md:text-left max-w-[325px] m-auto">
                Data-driven comparisons attract engaged users ready to discover top-rated products.
              </p>
            </div>

            <div className="">
              <div className="flex justify-center md:justify-start mb-4">
                <img src='/icon-shield.png' alt='Shield' width="64" />
              </div>
              <h3 className="text-xl font-bold text-[#0E033B] mb-2 text-center md:text-left">Unmatched Visibility</h3>
              <p className="text-[#0E033B] text-center md:text-left max-w-[325px] m-auto">
                Showcase your brand where consumner are actively searching for the best options.
              </p>
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}

