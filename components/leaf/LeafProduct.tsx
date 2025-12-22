import { ChevronDown } from 'lucide-react';
import { useState, useEffect, useRef } from 'react';
import Star from './Star';

export default function LeafProduct({ product }) {
    const [showBuyerIQ, setShowBuyerIQ] = useState(false);
    const mobileDropdownRef = useRef(null);

    // Close dropdown when clicking outside on mobile
    useEffect(() => {
        const handleClickOutside = (event) => {
            if (mobileDropdownRef.current && !mobileDropdownRef.current.contains(event.target) && window.innerWidth < 768) {
                setShowBuyerIQ(false);
            }
        };

        if (showBuyerIQ) {
            document.addEventListener('mousedown', handleClickOutside);
        }

        return () => {
            document.removeEventListener('mousedown', handleClickOutside);
        };
    }, [showBuyerIQ]);
    return (
        <>
            <div className={`bg-white rounded-xl border bg-gray-100 hover:shadow-md transition-shadow ${showBuyerIQ ? 'overflow-visible' : 'overflow-hidden'} relative`}>
                <div className="relative w-[136px] h-[24px]">
                    {/* Number section (product.rank) */}
                    {product.rank && (
                        <>
                            <div className="absolute left-0 top-0 w-[25px] h-[24px] bg-[#06012D] rounded-tl-xl flex items-center justify-center">
                                <span
                                    className="font-hurme text-white text-[15px] font-bold text-edge-cap"
                                    style={{ lineHeight: '23px' }}
                                >
                                    {product.rank}
                                </span>
                            </div>
                            {/* Triangular edge pointing right */}
                            <div className="absolute left-[21px] top-0 w-[11px] h-[24px] bg-[#06012D]"
                                style={{clipPath: "polygon(0 0, 100% 0, 40% 100%, 0 100%)" }}>
                            </div>
                        </>
                    )}

                    {/* Badge section (product.badge) - starts with gap/slit after rank */}
                    {product.badge && (
                        <>
                            {/* Gap/slit visible here - badge starts after the gap */}
                            {/* Triangular edge pointing left on badge */}
                            <div
                                className="absolute left-[29px] top-0 w-[10px] h-[24px] bg-[#16CA92]"
                                style={{clipPath: "polygon(60% 0, 100% 0, 100% 100%, 0 100%)" }}
                            ></div>
                            <div
                                className="absolute left-[37px] top-0 w-[92px] h-[24px] bg-[#16CA92] flex items-center justify-center"
                                style={{
                                    transform: 'rotate(180deg)',
                                    borderRadius: '8px 0 0 0'
                                }}
                            >
                                <span
                                    className="font-hurme-semibold text-white text-[13px] leading-[38px] tracking-[0.39px] md:tracking-normal font-bold text-edge-cap"
                                    style={{
                                        lineHeight: '16px',
                                        transform: 'rotate(180deg)',
                                        letterSpacing: '0.1em'
                                    }}
                                >
                                    {product.badge}
                                </span>
                            </div>
                        </>
                    )}
                </div>

                <div className="px-4 pt-[4px] pb-3 flex flex-col md:flex-row items-center">
                    {/* Mobile: Image first, centered */}
                    <div className="w-full flex justify-center mb-4 md:w-auto md:mb-0 order-1 md:order-1 md:mr-4">
                        <img src={`${product.image}`} alt="Product" className="w-full max-w-[300px] h-auto md:w-[120px] md:h-[120px] object-contain" />
                    </div>

                    {/* Mobile: Rating section after image, Desktop: after product info */}
                    <div className="w-full mb-4 md:w-[135px] md:mb-0 md:text-left order-2 md:order-3 md:mr-20">
                        {/* Mobile: Score and stars on same row */}
                        <div className="flex items-center justify-center md:flex-col md:items-center gap-3 md:gap-0">
                            <div className="text-5xl lg:text-[48px] font-bold text-gray-900">
                                {product.rating.toFixed(1)}
                            </div>

                            <div className="flex flex-col md:flex-row md:mt-0">
                                <Star rating={product.rating} />

                                {/* Mobile: Buyer IQ score button below stars */}
                                <div className="mt-2 md:hidden" ref={mobileDropdownRef}>
                                    <button
                                        className="flex items-center justify-center gap-1 text-gray-700 font-medium text-sm w-full"
                                        onClick={() => setShowBuyerIQ(!showBuyerIQ)}
                                    >
                                        <strong>Buyer IQ</strong> score <ChevronDown className={`w-4 h-4 transition-transform ${showBuyerIQ ? 'rotate-180' : ''}`} strokeWidth={3} />
                                    </button>
                                </div>
                            </div>
                        </div>

                        {/* Desktop: Buyer IQ score below everything */}
                        <div className="relative hidden md:block">
                            <button
                                className="flex items-center justify-center gap-1 text-gray-700 font-medium text-sm w-full"
                                onMouseEnter={() => setShowBuyerIQ(true)}
                                onMouseLeave={() => setShowBuyerIQ(false)}
                            >
                                <strong>Buyer IQ</strong> score <ChevronDown className={`w-4 h-4 transition-transform duration-200 ${showBuyerIQ ? 'rotate-180' : ''}`} strokeWidth={3} />
                            </button>

                            {showBuyerIQ && (
                                <div
                                    className="absolute top-full left-0 transform md:transform-none mt-2 bg-white rounded-lg shadow-lg border border-gray-200 p-4 z-[9999] min-w-[325px] animate-fadeIn"
                                    onMouseEnter={() => setShowBuyerIQ(true)}
                                    onMouseLeave={() => setShowBuyerIQ(false)}
                                >
                                    <div className="space-y-3">
                                        {product.performance !== undefined && (

                                            <div>
                                                <div className="flex justify-between items-center mb-1">
                                                    <span className="text-[#06012D] text-[15px] font-weight-700 font-bold">Performance</span>
                                                    <span className="text-[#06012D] text-[15px] font-weight-700 font-bold">{product.performance.toFixed(1)}/10</span>
                                                </div>
                                                <div className=" font-weight-400 text-[11px] text-[#06012D] mb-2 text-left">Delivers results that match everyday expectations</div>
                                                <div className="w-full bg-gray-200 rounded-full h-2">
                                                    <div
                                                        className="h-2 rounded-full transition-all"
                                                        style={{
                                                            width: `${(product.performance / 10) * 100}%`,
                                                            backgroundColor: '#D76528'
                                                        }}
                                                    />
                                                </div>
                                            </div>
                                        )}

                                        {product.reliability !== undefined && (
                                            <div>
                                                <div className="flex justify-between items-center mb-1">
                                                    <span className="text-[#06012D] text-[15px] font-weight-700 font-bold">Reliability</span>
                                                    <span className="text-[#06012D] text-[15px] font-weight-700 font-bold">{product.reliability.toFixed(1)}/10</span>
                                                </div>
                                                <div className=" font-weight-400 text-[11px] text-[#06012D] mb-2 text-left">Dependable through repeated use</div>
                                                <div className="w-full bg-gray-200 rounded-full h-2">
                                                    <div
                                                        className="h-2 rounded-full transition-all"
                                                        style={{
                                                            width: `${(product.reliability / 10) * 100}%`,
                                                            backgroundColor: '#00C386'
                                                        }}
                                                    />
                                                </div>
                                            </div>
                                        )}

                                        {product.value !== undefined && (
                                            <div>
                                                <div className="flex justify-between items-center mb-1">
                                                    <span className="text-[#06012D] text-[15px] font-weight-700 font-bold">Value</span>
                                                    <span className="text-[#06012D] text-[15px] font-weight-700 font-bold">{product.value.toFixed(1)}/10</span>
                                                </div>
                                                <div className=" font-weight-400 text-[11px] text-[#06012D] mb-2 text-left">Gives strong quality and features for the price paid</div>
                                                <div className="w-full bg-gray-200 rounded-full h-2">
                                                    <div
                                                        className="h-2 rounded-full transition-all"
                                                        style={{
                                                            width: `${(product.value / 10) * 100}%`,
                                                            backgroundColor: '#C2418B'
                                                        }}
                                                    />
                                                </div>
                                            </div>
                                        )}

                                        {product.popularity !== undefined && (
                                            <div>
                                                <div className="flex justify-between items-center mb-1">
                                                    <span className="text-[#06012D] text-[15px] font-weight-700 font-bold">Popularity</span>
                                                    <span className="text-[#06012D] text-[15px] font-weight-700 font-bold">{product.popularity.toFixed(1)}/10</span>
                                                </div>
                                                <div className=" font-weight-400 text-[11px] text-[#06012D] mb-2 text-left">Highly rated and recommended by real buyers</div>
                                                <div className="w-full bg-gray-200 rounded-full h-2">
                                                    <div
                                                        className="h-2 rounded-full transition-all"
                                                        style={{
                                                            width: `${(product.popularity / 10) * 100}%`,
                                                            backgroundColor: '#9E53D6'
                                                        }}
                                                    />
                                                </div>
                                            </div>
                                        )}

                                        {product.support !== undefined && (
                                            <div>
                                                <div className="flex justify-between items-center mb-1">
                                                    <span className="text-[#06012D] text-[15px] font-weight-700 font-bold">Support</span>
                                                    <span className="text-[#06012D] text-[15px] font-weight-700 font-bold">{product.support.toFixed(1)}/10</span>
                                                </div>
                                                <div className=" font-weight-400 text-[11px] text-[#06012D] mb-2 text-left">Quick, helpful service with clear warranty coverage</div>
                                                <div className="w-full bg-gray-200 rounded-full h-2">
                                                    <div
                                                        className="h-2 rounded-full transition-all"
                                                        style={{
                                                            width: `${(product.support / 10) * 100}%`,
                                                            backgroundColor: '#1D70D1'
                                                        }}
                                                    />
                                                </div>
                                            </div>
                                        )}
                                    </div>
                                </div>
                            )}
                        </div>
                    </div>

                    {/* Mobile: Buyer IQ score expandable content - appears below rating section */}
                    {showBuyerIQ && (
                        <div className="w-full mb-4 md:hidden order-3">
                            <div className="space-y-3">
                                {product.performance !== undefined && (
                                    <div>
                                        <div className="flex justify-between items-center mb-1">
                                            <span className="text-[#06012D] text-[15px] font-weight-700 font-bold">Performance</span>
                                            <span className="text-[#06012D] text-[15px] font-weight-700 font-bold">{product.performance.toFixed(1)}/10</span>
                                        </div>
                                        <div className=" font-weight-400 text-[11px] text-[#06012D] mb-2 text-left">Delivers results that match everyday expectations</div>
                                        <div className="w-full bg-gray-200 rounded-full h-2">
                                            <div
                                                className="h-2 rounded-full transition-all"
                                                style={{
                                                    width: `${(product.performance / 10) * 100}%`,
                                                    backgroundColor: '#D76528'
                                                }}
                                            />
                                        </div>
                                    </div>
                                )}

                                {product.reliability !== undefined && (
                                    <div>
                                        <div className="flex justify-between items-center mb-1">
                                            <span className="text-[#06012D] text-[15px] font-weight-700 font-bold">Reliability</span>
                                            <span className="text-[#06012D] text-[15px] font-weight-700 font-bold">{product.reliability.toFixed(1)}/10</span>
                                        </div>
                                        <div className=" font-weight-400 text-[11px] text-[#06012D] mb-2 text-left">Dependable through repeated use</div>
                                        <div className="w-full bg-gray-200 rounded-full h-2">
                                            <div
                                                className="h-2 rounded-full transition-all"
                                                style={{
                                                    width: `${(product.reliability / 10) * 100}%`,
                                                    backgroundColor: '#00C386'
                                                }}
                                            />
                                        </div>
                                    </div>
                                )}

                                {product.value !== undefined && (
                                    <div>
                                        <div className="flex justify-between items-center mb-1">
                                            <span className="text-[#06012D] text-[15px] font-weight-700 font-bold">Value</span>
                                            <span className="text-[#06012D] text-[15px] font-weight-700 font-bold">{product.value.toFixed(1)}/10</span>
                                        </div>
                                        <div className=" font-weight-400 text-[11px] text-[#06012D] mb-2 text-left">Gives strong quality and features for the price paid</div>
                                        <div className="w-full bg-gray-200 rounded-full h-2">
                                            <div
                                                className="h-2 rounded-full transition-all"
                                                style={{
                                                    width: `${(product.value / 10) * 100}%`,
                                                    backgroundColor: '#C2418B'
                                                }}
                                            />
                                        </div>
                                    </div>
                                )}

                                {product.popularity !== undefined && (
                                    <div>
                                        <div className="flex justify-between items-center mb-1">
                                            <span className="text-[#06012D] text-[15px] font-weight-700 font-bold">Popularity</span>
                                            <span className="text-[#06012D] text-[15px] font-weight-700 font-bold">{product.popularity.toFixed(1)}/10</span>
                                        </div>
                                        <div className=" font-weight-400 text-[11px] text-[#06012D] mb-2 text-left">Highly rated and recommended by real buyers</div>
                                        <div className="w-full bg-gray-200 rounded-full h-2">
                                            <div
                                                className="h-2 rounded-full transition-all"
                                                style={{
                                                    width: `${(product.popularity / 10) * 100}%`,
                                                    backgroundColor: '#9E53D6'
                                                }}
                                            />
                                        </div>
                                    </div>
                                )}

                                {product.support !== undefined && (
                                    <div>
                                        <div className="flex justify-between items-center mb-1">
                                            <span className="text-[#06012D] text-[15px] font-weight-700 font-bold">Support</span>
                                            <span className="text-[#06012D] text-[15px] font-weight-700 font-bold">{product.support.toFixed(1)}/10</span>
                                        </div>
                                        <div className=" font-weight-400 text-[11px] text-[#06012D] mb-2 text-left">Quick, helpful service with clear warranty coverage</div>
                                        <div className="w-full bg-gray-200 rounded-full h-2">
                                            <div
                                                className="h-2 rounded-full transition-all"
                                                style={{
                                                    width: `${(product.support / 10) * 100}%`,
                                                    backgroundColor: '#1D70D1'
                                                }}
                                            />
                                        </div>
                                    </div>
                                )}
                            </div>
                        </div>
                    )}

                    {/* Mobile: Product info after rating, Desktop: after image */}
                    <div className="mb-6 w-full md:mb-0 md:w-[395px] md:flex-1 order-4 md:order-2 md:mr-20">
                        <h3 className="font-bold font-hurme-bold text-[15px] leading-[23px] text-[#06012D] mb-[8px] md:text-left tracking-normal">
                            {product.name}
                        </h3>

                        <ul className="flex flex-col">
                            {product.features.slice(0, 3).map((feature, index) => (
                                <li key={index} className="flex items-center gap-3 text-sm lg:text-base text-gray-700">
                                    <img src="icon-checker.png" alt="Check" className="w-4 h-4 flex-shrink-0 mt-0.5" />
                                    <span className='text-[13px] leading-[16px]'>{feature}</span>
                                </li>
                            ))}
                        </ul>
                    </div>

                    {/* Action section */}
                    <div className="text-center w-full md:w-[259px] order-4 md:order-4">
                        {product.discount > 0 && (
                            <div className="mb-2 flex items-center justify-center gap-2">
                                {
                                    product.chosen_by && (
                                        <div className="text-[13px] leading-[16px] text-[#676767]">
                                            {product.chosen_by/1000 > 0 ? `${(product.chosen_by/1000).toFixed(0)}K+ bought in past month` : `${product.chosen_by} bought in past month`}
                                        </div>
                                    )
                                }

                                <div className="bg-[#DCFCE7] text-[#0A6339] font-bold text-[13px] leading-[16px] px-1 rounded-tl-lg rounded-br-lg">
                                    {product.discount}% OFF
                                </div>
                            </div>
                        )}

                        <a href={product.alink} target="_blank" className="flex items-center justify-center block w-full h-[40px] bg-[#16CA92] hover:bg-teal-600 text-white font-bold rounded-lg transition-colors text-base lg:text-lg mb-2">
                            CHECK PRICE
                        </a>

                        <div className="flex items-center justify-center gap-2 text-[#06012D] text-[13px]">
                            <div>Available on</div>
                            <img src='/brands/logo_amazon.png' alt="Amazon" className="h-4 mt-[-4px] -mb-3" />
                        </div>
                    </div>
                </div>
            </div>
        </>
    )
}