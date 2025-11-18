'use client';

import DisclosureBanner from "../components/public/DisclosureBanner";
import Header from "../components/public/Header";
import Newsletter from "../components/public/Newsletter";
import Footer from '../components/public/Footer';
import MainHero from "../components/meet-rated/MainHero";
import Comment from "../components/meet-rated/Comment";
import RatedPartner from "../components/meet-rated/RatedPartner";

export default function MeetRated() {
    return (
        <>
            <DisclosureBanner />
            <Header />
            <MainHero />
            <Comment />
            <RatedPartner />
            <Newsletter />
            <Footer />
        </>
    );
}
