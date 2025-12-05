"use client"

export default function LeafBuyerIQ() {
    return (
        <section 
            className="relative overflow-hidden bg-[#FCFDFF]"
            style={{
                background: 'radial-gradient(40.93% 58.91% at 21.22% 46.23%, rgba(18, 3, 172, 0.15) 0%, rgba(229, 236, 255, 0.15) 100%), #FCFDFF'
            }}
        >

            <div className="max-w-[1440px] relative z-10 mx-auto">
                <div className="py-8 flex flex-col md:py-0 md:flex-row items-center md:h-[398px] md:justify-between">
                    {/* Desktop Image - positioned absolutely, hand coming from left */}
                    <div className="overflow-hidden hidden md:block relative w-[588px] h-[400px] flex-none order-0 ml-[-25px]">
                        <img
                            src="/hand_phone.png"
                            alt="Hand holding phone showing app performance"
                            className="absolute rounded-2xl object-contain"
                            style={{
                                width: '659px',
                                height: '517px',
                                left: 'calc(50% - 659px/2 + 15px)',
                                top: 'calc(50% - 517px/2 + 0.5px)',
                                transform: 'rotate(45deg)',
                            }}
                        />
                    </div>
                    {/* Mobile Image */}
                    <div className="md:hidden relative w-full">
                        <img
                            src="/hand_phone_mobile.png"
                            alt="Hand holding phone showing app performance"
                            className="w-full max-h-[450px] rounded-2xl"
                        />
                    </div>

                    <div className="md:flex-1 flex justify-center">
                        <div className="max-w-xl py-8">
                            <div className="flex justify-center">

                            <h4 className="inline-flex text-4xl font-bold w-[144px] bg-[linear-gradient(270deg,#D76528_-1.41%,#C2418B_33.68%,#9E53D6_68.76%,#1D70D1_98.84%)] bg-clip-text text-transparent text-center mb-3">
                                Buyer IQ
                            </h4>
                            </div>
                            <h2 className="mb-6 font-bold text-gray-900 text-[48px] md:text-[48px] leading-[38px] md:leading-[58px] text-center">The Science of<br />Smart Shopping</h2>
                            <div className="flex justify-center">
                                <div className="h-12 p-[2px] rounded-lg bg-gradient-to-r from-[#3D00A6] via-[#E500FF] to-[#080078] w-[170px]">
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

                </div>
            </div>
        </section>
    )
}
