"use client"

import type React from "react"
import DisclosureBanner from "../components/public/DisclosureBanner"
import Header from "../components/public/Header"
import Privacy from "../components/privacy-policy/Privacy"
import Newsletter from "../components/public/Newsletter"
import Footer from '../components/public/Footer';
import Head from "next/head"

export default function PrivacyPolicy() {
    return (
        <>
            <Head>
                <title>New Page - Rated</title>
                <meta name="description" content="New page with updated header design" />
            </Head>
            <DisclosureBanner />
            <Header />
            <Privacy />
            <Newsletter />
            <Footer />
        </>
    )
}