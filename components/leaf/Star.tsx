export default function Star({ rating }) {

    return (
        <>
            <div className="flex justify-center gap-1 mt-2">
                {
                    [...Array(5)].map((_, i) => {
                        const starValue = rating / 2; // Convert 10-point scale to 5-star scale
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
                    }
                    )

                }
            </div>
        </>
    )
}