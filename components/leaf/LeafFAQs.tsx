import { useState } from 'react';
import { Plus, Minus } from 'lucide-react';

interface FAQItem {
  id: number;
  question: string;
  answer: string;
}

export default function LeafFAQs() {

  const faqItems: FAQItem[] = [
    {
      id: 1,
      question: "Can I change or cancel my order?",
      answer: "Yes, you can change or cancel your order within 24 hours of purchase. After that period, the order enters processing and cannot be modified. Contact our support team for assistance."
    },
    {
      id: 2,
      question: "Can I change or cancel my order?",
      answer: "Yes, you can change or cancel your order within 24 hours of purchase. After that period, the order enters processing and cannot be modified. Contact our support team for assistance."
    },
    {
      id: 3,
      question: "Can I change or cancel my order?",
      answer: "Yes, you can change or cancel your order within 24 hours of purchase. After that period, the order enters processing and cannot be modified. Contact our support team for assistance."
    },
    {
      id: 4,
      question: "Can I change or cancel my order?",
      answer: "Yes, you can change or cancel your order within 24 hours of purchase. After that period, the order enters processing and cannot be modified. Contact our support team for assistance."
    },
    {
      id: 5,
      question: "Can I change or cancel my order?",
      answer: "Yes, you can change or cancel your order within 24 hours of purchase. After that period, the order enters processing and cannot be modified. Contact our support team for assistance."
    }
  ];

  const [openId, setOpenId] = useState<number | null>(null);

  const toggleFAQ = (id: number) => {
    setOpenId(openId === id ? null : id);
  };

  return (
    <div className="py-16 px-6">
      <div className="max-w-[960px] mx-auto">
        <h2 className="text-3xl font-bold bg-[#F4F7FF] pl-6 pr-4 py-4">FAQs</h2>

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
                <span className="text-[15px] font-bold text-gray-900 text-left">
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
                  <p className="text-gray-700 leading-relaxed">
                    {item.answer}
                  </p>
                </div>
              )}
            </div>
          ))}
        </div>

        <div className="py-8 text-center">
          <h3 className="text-2xl font-bold text-gray-900 mb-3">
            Your Shortcut To Smarter Buys
          </h3>
          <p className="text-[15px] text-gray-700 leading-relaxed">
            Top Rated is built to save you time and frustration. We identify the products that consistently exceed expectations by merging expert research with real-world data. Our essential highlights, performance breakdowns, and simple side-by-side comparisons so you can make a confident choice faster. Whether it's over 600 product categories, top-rated delivers the clarity you need to buy smart.
          </p>
        </div>
      </div>
    </div>
  );
}