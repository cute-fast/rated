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
    <div className="bg-[linear-gradient(to_right,_rgba(255,154,3,0.15)_0%,_rgba(222,0,215,0.15)_33%,_rgba(0,155,222,0.15)_66%,_rgba(0,0,255,0.15)_100%)] py-[28px] overflow-hidden">
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
