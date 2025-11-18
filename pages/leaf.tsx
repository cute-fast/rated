import React from 'react';
import Head from 'next/head';
import Header from '../components/public/Header';
import Footer from '../components/public/Footer';
import DisclosureBanner from '../components/public/DisclosureBanner';
import Newsletter from '../components/public/Newsletter';
import LeafHero from '../components/leaf/LeafHero';
import LeafMain from '../components/leaf/LeafMain';
import { monitors } from '../data/monitors';
import LeafFAQs from '../components/leaf/LeafFAQs';
import LeafBuyerIQ from '../components/leaf/LeafBuyerIQ';

export default function Leaf() {
    return (
        <>
            <Head>
                <title>All Categories - Rated</title>
                <meta name="description" content="Browse all product categories on Rated" />
            </Head>
            <DisclosureBanner />
            <Header />
            <LeafHero />
            <LeafMain products={monitors} />
            <LeafFAQs />
            <LeafBuyerIQ />
            <Newsletter />
            <Footer />
        </>
    );
}

