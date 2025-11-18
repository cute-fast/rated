"use client";

import React from "react";
import dynamic from "next/dynamic";

const Marquee = dynamic(() => import("react-fast-marquee"), {
  ssr: false,
});

const stats = [
  { label: "Categories", value: "20K+" },
  { label: "Products", value: "275K+" },
  { label: "Brands", value: "9,000+" },
  { label: "Top Lists", value: "100K+" },
  { label: "Reviews", value: "245M+" },
  { label: "Social Signals", value: "25B+ annually" },
];

export default function StatsTicker() {
  return (
    <div className="bg-gradient-to-r from-purple-200 via-blue-200 to-purple-200 py-8 overflow-hidden">
      <Marquee speed={50} gradient={false} pauseOnHover={false}>
        {[...stats, ...stats].map((stat, i) => (
          <div key={i} className="flex items-center space-x-2 mx-4 md:mx-8 whitespace-nowrap">
            <span className="text-[24px] font-bold text-gray-800">{stat.label}:</span>
            <span className="text-[24px] font-bold text-gray-900">{stat.value}</span>
          </div>
        ))}
      </Marquee>
    </div>
  );
}
