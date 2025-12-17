import React, { useEffect, useState } from 'react';
import Head from 'next/head';
import HeroSection from '../components/home/HeroSection';
import Footer from '../components/public/Footer';
import Header from '../components/public/Header';
import CategoryList from '../components/home/CategoryList';
import PartnerBrands from '../components/home/Partnerbrands';
import StatsTicker from '../components/home/StatsTicker';
import TrendingLists from '../components/home/TrendingLists';
import Feature from '../components/home/Feature';
import Newsletter from '../components/public/Newsletter';
import DisclosureBanner from '../components/public/DisclosureBanner';

export default function NewPage() {
  const [isReady, setIsReady] = useState(false);

  useEffect(() => {
    if (typeof window === 'undefined') return;

    if (document.readyState === 'complete') {
      setIsReady(true);
      return;
    }

    const handleLoad = () => setIsReady(true);
    window.addEventListener('load', handleLoad);

    return () => {
      window.removeEventListener('load', handleLoad);
    };
  }, []);

  if (!isReady) {
    // Simple full-screen loader so the page only shows once everything is ready
    return (
      <div className="min-h-screen w-full flex items-center justify-center bg-white">
        <span className="text-gray-500 text-sm">Loading…</span>
      </div>
    );
  }

  return (
    <>
      <Head>
        <title>New Page - Rated</title>
        <meta name="description" content="New page with updated header design" />
      </Head>
      <DisclosureBanner />
      <Header />
      <HeroSection />
      <TrendingLists />
      <StatsTicker />
      <Feature />
      <CategoryList />
      <PartnerBrands />
      <Newsletter />
      <Footer />
    </>
  );
}
