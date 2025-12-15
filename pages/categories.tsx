import React from 'react';
import Head from 'next/head';
import Header from '../components/public/Header';
import Footer from '../components/public/Footer';
import DisclosureBanner from '../components/public/DisclosureBanner';
import PopularSearches from '../components/category/PopularSearches';
import AllCategories from '../components/category/AllCategories';
import Newsletter from '../components/public/Newsletter';
import LeafBuyerIQ from '../components/leaf/LeafBuyerIQ';
import SmarterBuy from '../components/category/SmarterBuy';

export default function CategoryPage() {
  return (
    <>
      <Head>
        <title>All Categories - Rated</title>
        <meta name="description" content="Browse all product categories on Rated" />
      </Head>
      <DisclosureBanner />
      <Header />
      <AllCategories />
      <PopularSearches />
      <SmarterBuy />
      <LeafBuyerIQ />
      <Newsletter />
      <Footer />
    </>
  );
}

