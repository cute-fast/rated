import { ChevronDown, Facebook, Twitter, Send } from 'lucide-react';
import { useState, useEffect, useRef } from 'react';
import ProductAccordion from './ProductAccordion';

export default function SingleProductCard({ product }) {
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

    // Share functionality
    const handleShare = (platform) => {
        const url = typeof window !== 'undefined' ? window.location.href : '';
        const title = product.name || '';
        const text = product.name || '';

        switch (platform) {
            case 'facebook':
                window.open(`https://www.facebook.com/sharer/sharer.php?u=${encodeURIComponent(url)}`, '_blank');
                break;
            case 'twitter':
                window.open(`https://twitter.com/intent/tweet?url=${encodeURIComponent(url)}&text=${encodeURIComponent(text)}`, '_blank');
                break;
            case 'pinterest':
                window.open(`https://pinterest.com/pin/create/button/?url=${encodeURIComponent(url)}&description=${encodeURIComponent(text)}`, '_blank');
                break;
            case 'email':
                window.location.href = `mailto:?subject=${encodeURIComponent(text)}&body=${encodeURIComponent(url)}`;
                break;
        }
    };

    return (
        <section className='px-4 pt-[64px]'>
            <div className="max-w-[1124px] mx-auto flex flex-col md:flex-row gap-[24px] md:gap-[64px] items-start">
                {/* Product Image and Accordion - Left side on desktop */}
                <div className="w-full md:max-w-[600px] flex flex-col gap-8">
                    {/* Product Image */}
                    <div className="flex justify-center">
                        <img
                            src={product.image_1}
                            alt={product.name}
                            className="w-full max-w-[600px] h-auto object-contain"
                        />
                    </div>
                    {/* Product Accordion */}
                    <div className="py-8">
                        <ProductAccordion noWrapper={true} />
                    </div>
                </div>

                {/* Product Information - Right side on desktop (sticky on scroll) */}
                <div className="w-full flex-1 flex flex-col md:sticky md:top-[96px] md:self-start">
                    {/* Product Title */}
                    <h3 className="font-bold text-[18px] text-gray-900 mb-4 md:text-left">
                        {product.name || product.product_title || 'Product'}
                    </h3>

                    {/* Rating Section */}
                    <div className="mb-6">
                        {/* Score and stars on same row */}
                        <div className="flex items-center gap-3">
                            <div className="text-5xl lg:text-[48px] font-bold text-gray-900 leading-none">
                                {(product.rating || product.score || 0).toFixed(1)}
                            </div>

                            <div className="flex flex-col">
                                {/* Stars */}
                                <div className="flex gap-1">
                                    {[...Array(5)].map((_, i) => {
                                        const rating = product.rating || product.score || 0;
                                        const starValue = rating / 2;
                                        const filledStars = Math.floor(starValue);
                                        const partialFill = starValue - filledStars;
                                        const isFullyFilled = i < filledStars;
                                        const isPartiallyFilled = i === filledStars && partialFill > 0;
                                        const fillPercentage = isPartiallyFilled ? partialFill * 100 : (isFullyFilled ? 100 : 0);

                                        return (
                                            <div key={i} className="relative w-5 h-5">
                                                <svg
                                                    className="w-5 h-5 text-gray-300 absolute inset-0"
                                                    fill="currentColor"
                                                    viewBox="0 0 20 20"
                                                >
                                                    <path d="M10 15l-5.878 3.09 1.123-6.545L.489 6.91l6.572-.955L10 0l2.939 5.955 6.572.955-4.756 4.635 1.123 6.545z" />
                                                </svg>
                                                <svg
                                                    className="w-5 h-5 text-[#16CA92] absolute inset-0"
                                                    fill="currentColor"
                                                    viewBox="0 0 20 20"
                                                    style={{
                                                        clipPath: `inset(0 ${100 - fillPercentage}% 0 0)`
                                                    }}
                                                >
                                                    <path d="M10 15l-5.878 3.09 1.123-6.545L.489 6.91l6.572-.955L10 0l2.939 5.955 6.572.955-4.756 4.635 1.123 6.545z" />
                                                </svg>
                                            </div>
                                        );
                                    })}
                                </div>

                                {/* Buyer IQ score button below stars */}
                                <div ref={mobileDropdownRef}>
                                    <button
                                        className="flex items-center justify-start gap-1 text-gray-700 font-medium text-sm w-full cursor-pointer"
                                        onClick={() => setShowBuyerIQ(!showBuyerIQ)}
                                    >
                                        <strong>Buyer IQ</strong> score  <ChevronDown className={`w-4 h-4 transition-transform ${showBuyerIQ ? 'rotate-180' : ''}`} strokeWidth={3} />
                                    </button>
                                </div>
                            </div>
                        </div>

                        {/* Buyer IQ expandable content */}
                        {showBuyerIQ && (
                            <div className="w-full mb-4">
                                <div className="space-y-3">
                                    {product.performance !== undefined && (
                                        <div>
                                            <div className="flex justify-between items-center mb-1">
                                                <span className="text-[#06012D] text-[15px] font-weight-700 font-bold">Performance</span>
                                                <span className="text-[#06012D] text-[15px] font-weight-700 font-bold">{product.performance.toFixed(1)}/10</span>
                                            </div>
                                            <div className="font-weight-400 text-[11px] text-[#06012D] mb-2 text-left">Delivers results that match everyday expectations</div>
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
                                            <div className="font-weight-400 text-[11px] text-[#06012D] mb-2 text-left">Dependable through repeated use</div>
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
                                            <div className="font-weight-400 text-[11px] text-[#06012D] mb-2 text-left">Gives strong quality and features for the price paid</div>
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
                                            <div className="font-weight-400 text-[11px] text-[#06012D] mb-2 text-left">Highly rated and recommended by real buyers</div>
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
                                            <div className="font-weight-400 text-[11px] text-[#06012D] mb-2 text-left">Quick, helpful service with clear warranty coverage</div>
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

                    {/* Product Features */}
                    <div className="mb-6">
                        <ul className="flex flex-col gap-[5px]">
                            {product.features && product.features.length > 0 ? (
                                product.features.slice(0, 3).map((feature, index) => (
                                    <li key={index} className="flex items-center gap-3 text-sm lg:text-base text-gray-700">
                                        <img src="icon-checker.png" alt="Check" className="w-4 h-4 flex-shrink-0 mt-0.5" />
                                        <span className='text-[13px] leading-none'>{feature}</span>
                                    </li>
                                ))
                            ) : (
                                <li className="flex items-center gap-3 text-sm lg:text-base text-gray-700">
                                    <img src="icon-checker.png" alt="Check" className="w-4 h-4 flex-shrink-0 mt-0.5" />
                                    <span className='text-[13px]'>Product Feature Goes Here Long Product Feature Goes Here</span>
                                </li>
                            )}
                        </ul>
                    </div>

                    {/* Action Section */}
                    <div className="mb-6">
                        {product.discount && product.discount > 0 && (
                            <div className="mb-2 flex items-center gap-2 justify-center">
                                <div className="text-[13px] text-gray-600">
                                    3K+ bought in past month
                                </div>
                                <div className="bg-[#DCFCE7] text-[#0A6339] font-bold text-[13px] px-1 rounded-tl-lg rounded-br-lg">
                                    {product.discount}% OFF
                                </div>
                            </div>
                        )}

                        <button className="w-full bg-[#16CA92] hover:bg-teal-600 text-white font-bold py-3 rounded-lg transition-colors text-base lg:text-lg mb-2">
                            CHECK PRICE
                        </button>

                        <div className="flex justify-between">
                            <div className="flex items-center justify-center gap-2 text-gray-700 text-[13px]">
                                <div className='font-semibold'>Available on</div>
                                <img src='/brands/logo_amazon.png' alt="Amazon" className="h-4 -mb-2" />
                            </div>

                            <div className="flex items-center justify-end gap-4">
                                <span className="text-gray-700 font-medium text-[13px]">Share</span>
                                <button
                                    onClick={() => handleShare('facebook')}
                                    className="text-gray-600 hover:text-[#1877F2] transition-colors"
                                    aria-label="Share on Facebook"
                                >
                                    <Facebook className="w-4 h-4" />
                                </button>
                                <button
                                    onClick={() => handleShare('pinterest')}
                                    className="text-gray-600 hover:text-[#BD081C] transition-colors"
                                    aria-label="Share on Pinterest"
                                >
                                    <svg className="w-4 h-4" fill="currentColor" viewBox="0 0 24 24">
                                        <path d="M12 0C5.373 0 0 5.373 0 12s5.373 12 12 12 12-5.373 12-12S18.627 0 12 0zm0 19c-.721 0-1.418-.109-2.076-.312.286-.465.713-1.227.876-1.878.085-.35.575-2.338.575-2.338s-.146-.293-.146-.71c0-1.334.773-2.33 1.736-2.33.819 0 1.215.615 1.215 1.353 0 .824-.524 2.053-.794 3.19-.226.958.48 1.744 1.424 1.744 1.708 0 2.823-1.802 2.823-4.399 0-1.821-1.305-3.096-3.17-3.096-2.16 0-3.428 1.621-3.428 3.297 0 .612.235 1.27.529 1.628a.24.24 0 0 1 .056.23c-.06.252-.195.796-.222.909-.035.146-.116.177-.268.107-1.001-.466-1.624-1.926-1.624-3.1 0-2.523 1.834-4.84 5.286-4.84 2.775 0 4.932 1.977 4.932 4.62 0 2.757-1.739 4.976-4.151 4.976-.811 0-1.573-.421-1.834-.98l-.498 1.902c-.181.695-.669 1.566-.995 2.097A12 12 0 0 0 12 19z" />
                                    </svg>
                                </button>
                                <button
                                    onClick={() => handleShare('twitter')}
                                    className="text-gray-600 hover:text-[#1DA1F2] transition-colors"
                                    aria-label="Share on Twitter"
                                >
                                    <Twitter className="w-4 h-4" />
                                </button>
                                <button
                                    onClick={() => handleShare('email')}
                                    className="text-gray-600 hover:text-gray-900 transition-colors"
                                    aria-label="Share via Email"
                                >
                                    <Send className="w-4 h-4" />
                                </button>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </section>
    );
}

