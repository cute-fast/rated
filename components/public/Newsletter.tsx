"use client"

import type React from "react"
import { useState } from "react"

export default function Newsletter() {
  const [email, setEmail] = useState("")
  const [agreed, setAgreed] = useState(false)

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    if (email && agreed) {
      console.log("Newsletter signup:", email)
      // handle signup logic here
    }
  }

  return (
    <section className="relative overflow-hidden py-20 bg-[linear-gradient(180deg,_#110145_2%,_rgba(17,1,69,0.2)_60%,_#110145_100%)]">
      {/* Starry background effect */}
      <div className="absolute inset-0 -z-10">
        <img
          className="absolute hidden md:block inset-0 object-cover w-full h-full"
          src="/Newsletter.png"
        />
        <img
          className="absolute md:hidden inset-0 object-cover w-full h-full"
          src="/Newsletter-mobile.png"
        />
      </div>

      <div className="container relative z-10 mx-auto max-w-4xl px-8 text-center">
        <h2 className="mb-1 text-2xl font-bold text-white md:text-2xl">
          Rated Updates & Insights
        </h2>
        <p className="mb-4 text-lg text-white/90">
          Get exclusive product insights, fresh finds, and expert picks.
        </p>

        <form onSubmit={handleSubmit} className="mx-auto max-w-2xl">
          <div className="flex flex-col gap-4 md:gap-0 sm:flex-row">
            <input
              type="email"
              placeholder="you@example.com"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              className="h-12 md:flex-1 rounded-lg md:rounded-r-none border-0 bg-white px-4 text-base text-gray-900 placeholder:text-gray-500 focus:outline-none"
              required
            />
            <div className="h-12 p-[2px] rounded-lg md:rounded-l-none bg-gradient-to-r from-[#3D00A6] via-[#E500FF] to-[#080078]">
              <button
                type="submit"
                className="h-full w-full rounded-lg md:rounded-l-none bg-[#0E00DE] px-8 text-base font-semibold text-white hover:bg-blue-700"
              >
                SIGN UP
              </button>
            </div>
          </div>

          <div className="mt-4 flex items-center justify-center gap-2">
            <label className="flex items-center cursor-pointer">
              {/* Hidden native checkbox */}
              <input
                type="checkbox"
                checked={agreed}
                onChange={(e) => setAgreed(e.target.checked)}
                className="peer hidden"
              />

              {/* Custom circular checkbox */}
              <div className="w-4 h-4 rounded-full border-2 border-white/80 flex items-center justify-center
                    peer-checked:bg-[#ABBDFF] peer-checked:border-[#ABBDFF] transition-all">
                {/* Checkmark */}
                {agreed && (
                  <svg
                    className="w-4 h-4 text-black"
                    fill="none"
                    stroke="currentColor"
                    strokeWidth="2"
                    viewBox="0 0 24 24"
                  >
                    <path strokeLinecap="round" strokeLinejoin="round" d="M5 13l4 4L19 7" />
                  </svg>
                )}
              </div>

              <span className="text-[#ABBDFF] ml-2 text-sm text-white/80">
                I agree to the{" "}
                <a href="#" className="underline hover:text-white">Terms of Use</a> and{" "}
                <a href="#" className="underline hover:text-white">Privacy Policy</a>.
              </span>
            </label>
          </div>

        </form>
      </div>
    </section>
  )
}
