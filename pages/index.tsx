import React from 'react';
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
