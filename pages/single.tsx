import React from 'react';
import DisclosureBanner from '../components/public/DisclosureBanner';
import Header from '../components/public/Header';
import SingleProductCard from '../components/Single/SingleProductCard';
import ProductCarousel from '../components/Single/ProductCarousel';
import TrendingLists from '../components/home/TrendingLists';
import LeafBuyerIQ from '../components/leaf/LeafBuyerIQ';
import Newsletter from '../components/public/Newsletter';
import Footer from '../components/public/Footer';
export default function SinglePage() {
  
  const mockProduct = {
    name: "LG UltraGear QHD 27-Inch Gaming Monitor 27GL83A-B - IPS 1ms (GtG), With HDR 10 Compatibility, NVIDIA G-SYNC",
    image: "/images/product (4).png",
    image_1: "/images/product (1).png",
    rating: 8.9,
    score: 8.9,
    discount: 25,
    features: [
      "144 Hz refresh rate for ultra-smooth gameplay",
      "1 ms (GtG) IPS panel minimizes motion blur",
      "NVIDIA G-SYNC & FreeSync compatible tear-free display"
    ],
    performance: 8.5,
    reliability: 9.2,
    value: 8.7,
    popularity: 9.1,
    support: 8.3
  };

  return (
    <>
    <DisclosureBanner />
    <Header />
    <SingleProductCard product={mockProduct} />
    <ProductCarousel />
    <TrendingLists />
    <LeafBuyerIQ />
    <Newsletter />
    <Footer />
    </>
  );
}

