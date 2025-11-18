"use client"

export default function Feature() {
  return (
    <section className="relative overflow-hidden bg-[linear-gradient(to_top_right,_#fcfdff_0%,_#e5ecff_100%)]">
      {/* Grid Background Pattern */}
      <div
        className="absolute inset-0"
        style={{
          backgroundImage: `linear-gradient(to right, rgba(236, 72, 153, 0.1) 1px, transparent 1px)`,
          backgroundSize: "80px 100%",
        }}
      />

      <div className="max-w-[1440px] relative z-10 mx-auto">
        <div className="py-8 flex flex-col-reverse md:py-0  md:flex-row items-center">
          {/* Left Content */}
          <div className="md:flex-1 flex justify-center">
            <div className="max-w-xl py-8">
              <h4 className="text-4xl font-bold bg-gradient-to-r from-[#D76528] via-[#C2418B] to-[#1D70D1] bg-clip-text text-transparent text-center">
                Buyer IQ
              </h4>

              <h2 className="mb-6 font-bold text-gray-900 text-5xl lg:text-6xl text-center">The Science of Smart Shopping</h2>
              <p className="hidden md:block mb-8 text-sm leading-relaxed text-gray-700 text-center">
                Behind every score is Buyer IQ - an engine that explores millions of data points from trusted
                sources to reveal the top-rated products - powered by real buyer feedback, not lab tests.
              </p>
              <div className="flex justify-center">
                <div className="h-12 p-[2px] rounded-lg bg-gradient-to-r from-[#3D00A6] via-[#E500FF] to-[#080078] w-[176px]">
                  <button
                    type="submit"
                    className="h-full rounded-lg bg-[#0E00DE] px-8 text-base font-semibold text-white hover:bg-blue-700"
                  >
                    LEARN MORE
                  </button>
                </div>
              </div>
            </div>

          </div>

          {/* Right Image */}
          <div className="hidden md:block relative">
            <img
              src="/hand_phone.png"
              alt="Hand holding phone showing app performance"
              className="hidden md:block max-h-[532px]"
            />
          </div>
          <div className="md:hidden relative w-full">
            <img
              src="/hand_phone_mobile.png"
              alt="Hand holding phone showing app performance"
              className="md:hidden w-full max-h-[450px] "
            />
          </div>

        </div>
      </div>
    </section>
  )
}
