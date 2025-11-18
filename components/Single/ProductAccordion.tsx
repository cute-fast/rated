import { ChevronDown, ChevronUp } from 'lucide-react';
import { useState } from 'react';

interface AccordionSection {
    title: string;
    content: string | React.ReactNode;
}

export default function ProductAccordion() {
    const [openSection, setOpenSection] = useState<string>('description');

    const sections: AccordionSection[] = [
        {
            title: 'Description',
            content: (
                <>
                    <p className="text-gray-600 mb-4">
                        Lorem ipsum dolor sit amet, consectetuer adipiscing elit. Donec odio. Quisque volutpat mattis eros. Nullam malesuada erat ut turpis. Suspendisse urna nibh, viverra non, semper suscipit, posuere a, pede.
                    </p>
                    <p className="text-gray-600">
                        Donec nec justo eget felis facilisis fermentum. Aliquam porttitor mauris sit amet orci. Aenean dignissim pellentesque felis.
                    </p>
                </>
            )
        },
        {
            title: 'Factors to Consider',
            content: (
                <p className="text-gray-600">
                    Factors to consider when choosing this product include performance, reliability, value, popularity, and support. Each factor plays a crucial role in determining the overall quality and user satisfaction.
                </p>
            )
        },
        {
            title: 'Measured Metrics',
            content: (
                <p className="text-gray-600">
                    Our comprehensive metrics include performance scores, reliability ratings, value assessments, popularity rankings, and support quality evaluations. These metrics are based on real user reviews and expert analysis.
                </p>
            )
        },
        {
            title: 'FAQ',
            content: (
                <div className="space-y-4">
                    <div>
                        <h4 className="font-semibold text-gray-900 mb-2">What is the warranty period?</h4>
                        <p className="text-gray-600">The product comes with a standard 1-year warranty covering manufacturing defects.</p>
                    </div>
                    <div>
                        <h4 className="font-semibold text-gray-900 mb-2">Is this product compatible with my system?</h4>
                        <p className="text-gray-600">Please check the product specifications to ensure compatibility with your system requirements.</p>
                    </div>
                </div>
            )
        },
        {
            title: 'Bottom Line',
            content: (
                <p className="text-gray-600">
                    Overall, this product offers excellent value for money with strong performance across all key metrics. It is highly recommended for users seeking a reliable and well-supported solution.
                </p>
            )
        }
    ];

    const toggleSection = (title: string) => {
        setOpenSection(openSection === title.toLowerCase().replace(/\s+/g, '-') ? '' : title.toLowerCase().replace(/\s+/g, '-'));
    };

    return (
        <section className='px-4'>
            <div className="max-w-[1124px] mx-auto py-8">
                <div className="w-full md:max-w-[600px]">
                    <div className="bg-white rounded-lg">
                        {sections.map((section, index) => {
                            const sectionId = section.title.toLowerCase().replace(/\s+/g, '-');
                            const isOpen = openSection === sectionId;

                            return (
                                <div key={sectionId}>
                                    <button
                                        onClick={() => toggleSection(section.title)}
                                        className="w-full flex items-center justify-between py-4 px-0 text-left hover:bg-gray-50 transition-colors"
                                    >
                                        <h3 className="font-bold text-gray-900 text-lg">
                                            {section.title}
                                        </h3>
                                        {isOpen ? (
                                            <ChevronUp className="w-5 h-5 text-gray-700 flex-shrink-0" />
                                        ) : (
                                            <ChevronDown className="w-5 h-5 text-gray-700 flex-shrink-0" />
                                        )}
                                    </button>

                                    {isOpen && (
                                        <div className="pb-4 px-0 animate-fadeIn">
                                            {typeof section.content === 'string' ? (
                                                <p className="text-gray-600">{section.content}</p>
                                            ) : (
                                                section.content
                                            )}
                                        </div>
                                    )}

                                    {index < sections.length - 1 && (
                                        <hr className="border-gray-200" />
                                    )}
                                </div>
                            );
                        })}
                    </div>
                </div>
            </div>
        </section>
    );
}


