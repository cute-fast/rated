import { useState } from 'react';
import { Plus, Minus } from 'lucide-react';

interface FAQItem {
  id: number;
  question: string;
  answer: string;
}

export default function LeafFAQs({ faqData }: { faqData: any[] }) {

  // Process faqData array - pairs of [question, answer, question, answer, ...]
  const faqItems: FAQItem[] = faqData.reduce((acc, item, index) => {
    if (index % 2 === 0) {
      acc.push({
        id: acc.length + 1,
        question: item,
        answer: faqData[index + 1] || ""
      });
    }
    return acc;
  }, []);

  const [openId, setOpenId] = useState<number | null>(null);

  const toggleFAQ = (id: number) => {
    setOpenId(openId === id ? null : id);
  };

  return (
    <div className="pb-16 pt-12 md:pt-[88px] px-6">
      <div className="max-w-[960px] mx-auto">
        <h2 className="font-hurme-semibold font-semibold text-[20px] leading-[24px] tracking-normal md:text-[24px] md:leading-[29px] md:tracking-[0.48px] h-[49px] bg-[#F4F7FF] items-center flex pl-5">FAQs</h2>

        <div className="mb-8">
          {faqItems.map((item) => (
            <div
              key={item.id}
              className="border-b border-gray-200 overflow-hidden hover:border-gray-300 transition-colors"
            >
              <button
                onClick={() => toggleFAQ(item.id)}
                className="w-full px-6 py-[30px] flex items-center justify-between hover:bg-gray-50 transition-colors"
              >
                <span className="font-hurme-bold font-bold text-[15px] leading-[23px] text-[#06012D] text-left">
                  {item.question}
                </span>
                {openId === item.id ? (
                  <Minus className="w-5 h-5 text-black flex-shrink-0 ml-4" />
                ) : (
                  <Plus className="w-5 h-5 text-black flex-shrink-0 ml-4" />
                )}
              </button>

              {openId === item.id && (
                <div className="px-6 py-4 border-t border-gray-200 bg-gray-50">
                  <p className="content-text">
                    {item.answer}
                  </p>
                </div>
              )}
            </div>
          ))}
        </div>

        <div className="pt-10 pb-6 text-center">
          <h3 className="font-semibold font-hurme-semibold mb-3 text-[24px] leading-[29px] md:text-[36px] md:leading-[43px] md:tracking-[0.72px]">
            Your Shortcut To<br className='md:hidden' /> Smarter Buys
          </h3>
          <p className="content-text text-[#06012D] leading-relaxed">
            Top Rated is built to save you time and frustration. We identify the products that consistently exceed expectations by merging expert research with real-world data. Our essential highlights, performance breakdowns, and simple side-by-side comparisons so you can make a confident choice faster. Whether it's over 600 product categories, top-rated delivers the clarity you need to buy smart.
          </p>
        </div>
      </div>
    </div>
  );
}