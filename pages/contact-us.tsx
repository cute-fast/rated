import React from 'react';
import Head from 'next/head';
import Footer from '../components/public/Footer';
import Header from '../components/public/Header';
import ContactForm from '../components/contact-us/ContactForm';
import DisclosureBanner from '../components/public/DisclosureBanner';

export default function ContactUs() {
  return (
    <>
      <Head>
        <title>Contact Us - Rated</title>
        <meta name="description" content="Contact Rated for partnerships and inquiries" />
      </Head>
      <DisclosureBanner />
      <Header />
      <ContactForm />
      <Footer />
    </>
  );
}
