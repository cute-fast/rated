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
                <div className="flex items-center gap-0 h-6">
                    <div className="bg-[#06012D]">
                        
                    </div>
                    <div className="bg-[#06012D] w-10 h-6 flex items-center justify-center">
                        {product.rank && (
                            <span className="text-white text-[15px]">{product.rank}</span>
                        )}
                    </div>
                    <div className="bg-[#06012D] w-[12px] h-6 mr-[-6px]" style={{ clipPath: "polygon(0 0, 100% 0, 0 100%)" }}></div>
                    {product.badge && (
                        <>
                            <div className="bg-[#16CA92] w-[12px] h-6" style={{ clipPath: "polygon(100% 100%, 0 100%, 100% 0)" }}></div>
                            <div className="bg-[#16CA92] text-white font-semibold px-4 h-6 flex items-center text-[13px] rounded-br-lg">
                                {product.badge}
                            </div>
                        </>
                    )}
                </div>

                <div className="p-6 flex flex-col md:flex-row items-center md:gap-6">
                    {/* Mobile: Image first, centered */}
                    <div className="w-full flex justify-center mb-4 md:w-auto md:mb-0 order-1 md:order-1">
                        <img src={`/images/${product.image}`} alt="Product" className="w-full max-w-[300px] h-auto md:w-[120px] md:h-[120px] object-contain" />
                    </div>

                    {/* Mobile: Rating section after image, Desktop: after product info */}
                    <div className="w-full mb-4 md:w-[135px] md:mb-0 md:text-left order-2 md:order-3">
                        {/* Mobile: Score and stars on same row */}
                        <div className="flex items-center justify-center md:flex-col md:items-start gap-3 md:gap-0">
                            <div className="text-5xl lg:text-6xl font-bold text-gray-900">
                                {product.rating.toFixed(1)}
                            </div>

                            <div className="flex flex-col md:flex-row md:mt-0">
                                <Star rating={product.rating} />
                                
                                {/* Mobile: Buyer IQ score button below stars */}
                                <div className="mt-2 md:hidden" ref={mobileDropdownRef}>
                                    <button
                                        className="flex items-center justify-start gap-1 text-gray-700 font-medium text-sm w-full"
                                        onClick={() => setShowBuyerIQ(!showBuyerIQ)}
                                    >
                                        Buyer IQ score <ChevronDown className={`w-4 h-4 transition-transform ${showBuyerIQ ? 'rotate-180' : ''}`} />
                                    </button>
                                </div>
                            </div>
                        </div>

                        {/* Desktop: Buyer IQ score below everything */}
                        <div className="relative mt-2 hidden md:block">
                            <button
                                className="flex items-center justify-start gap-1 text-gray-700 font-medium text-sm w-full"
                                onMouseEnter={() => setShowBuyerIQ(true)}
                                onMouseLeave={() => setShowBuyerIQ(false)}
                            >
                                Buyer IQ score <ChevronDown className={`w-4 h-4 transition-transform duration-200 ${showBuyerIQ ? 'rotate-180' : ''}`} />
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
                    <div className="mb-6 w-full md:mb-0 md:w-[395px] md:flex-1 order-4 md:order-2">
                        <h3 className="font-bold text-lg lg:text-xl text-gray-900 mb-4 md:text-left">
                            {product.name}
                        </h3>

                        <ul className="flex flex-col gap-[5px]">
                            {product.features.slice(0, 3).map((feature, index) => (
                                <li key={index} className="flex items-center gap-3 text-sm lg:text-base text-gray-700">
                                    <img src="icon-checker.png" alt="Check" className="w-4 h-4 flex-shrink-0 mt-0.5" />
                                    <span className='text-[13px]'>{feature}</span>
                                </li>
                            ))}
                        </ul>
                    </div>

                    {/* Action section */}
                    <div className="text-center w-full md:w-[259px] order-4 md:order-4">
                        {product.discount > 0 && (
                            <div className="mb-3 flex items-center justify-center gap-2">
                                <div className="text-[13px] text-gray-600">
                                    3K+ bought in past month
                                </div>
                                <div className="bg-[#DCFCE7] text-[#0A6339] font-bold text-[13px] px-1 rounded">
                                    {product.discount}% OFF
                                </div>
                            </div>
                        )}

                        <button className="w-full bg-[#16CA92] hover:bg-teal-600 text-white font-bold py-3 rounded-lg transition-colors text-base lg:text-lg mb-3">
                            CHECK PRICE
                        </button>

                        <div className="flex items-center justify-center gap-2 text-gray-700 text-[13px]">
                            <div className='font-semibold'>Available on</div>
                            <img src='/brands/logo_amazon.png' alt="Amazon" className="h-4 -mb-2" />
                        </div>
                    </div>
                </div>
            </div>
        </>
    )
}