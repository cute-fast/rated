"use client"

export default function Feature() {
  return (
    <section className="relative overflow-hidden bg-[linear-gradient(to_top_right,_#fcfdff_0%,_#e5ecff_100%)]">
      {/* Grid Background Pattern */}

      <div className="max-w-[1440px] relative z-10 mx-auto">
        <div className="py-8 flex flex-col-reverse md:py-0  md:flex-row items-center">
          {/* Left Content */}
          <div className="md:flex-1 flex justify-center">
            <div className="max-w-[600px] py-8">
              <div className="flex items-center justify-center">
                <h4 className="inline-flex text-4xl font-bold w-[144px] bg-[linear-gradient(270deg,#D76528_-1.41%,#C2418B_33.68%,#9E53D6_68.76%,#1D70D1_98.84%)] bg-clip-text text-transparent text-center mb-3">
                  Buyer IQ
                </h4>
              </div>

              <h2 className="mb-6 font-bold text-5xl lg:text-[48px] text-center leading-[58px] tracking-[0.02em]">The Science of Smart Shopping</h2>
              <p className="hidden md:block mb-8 text-sm leading-relaxed text-center">
                Behind every score is Buyer IQ - an engine that explores millions of data points from trusted
                sources to reveal the top-rated products - powered by real buyer feedback, not lab tests.
              </p>
              <div className="flex justify-center">
                <div className="h-12 p-[2px] rounded-lg bg-gradient-to-r from-[#3D00A6] via-[#E500FF] to-[#080078]">
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
