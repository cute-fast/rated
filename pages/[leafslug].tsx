import React, { useEffect, useState } from 'react';
import { useRouter } from 'next/router';
import axios from 'axios';
import Head from 'next/head';
import { GetServerSideProps } from 'next';
import Header from '../components/public/Header';
import Footer from '../components/public/Footer';
import DisclosureBanner from '../components/public/DisclosureBanner';
import Newsletter from '../components/public/Newsletter';
import LeafHero from '../components/leaf/LeafHero';
import LeafMain from '../components/leaf/LeafMain';
import LeafFAQs from '../components/leaf/LeafFAQs';
import LeafBuyerIQ from '../components/leaf/LeafBuyerIQ';
import Custom404 from './404';

export const getServerSideProps: GetServerSideProps = async () => {
  return {
    props: {},
  };
};

export default function LeafCategoryPage() {
  const router = useRouter();
  const { leafslug } = router.query;
  const [data, setData] = useState<any>(null);
  const [loading, setLoading] = useState(true);
  const [notFound, setNotFound] = useState(false);

  useEffect(() => {
    if (leafslug) fetchLeaf();
    // eslint-disable-next-line
  }, [leafslug]);

  const fetchLeaf = async () => {
    setLoading(true);
    try {
      const res = await axios.get(`https://api.rated.xyz/api/${leafslug}`);
      console.log(res.data);
      setData(res.data);
      setNotFound(false);
    } catch (error) {
      if (axios.isAxiosError(error) && error.response?.status === 404) {
        setNotFound(true);
        setData(null);
        setLoading(false);
        return;
      }
      setData(null);
    }
    setLoading(false);
  };

  if (notFound) {
    return <Custom404 />;
  }

  if (loading) {
    return (
      <>
        <DisclosureBanner />
        <Header />
        <div className="flex items-center justify-center min-h-screen">
          <div className="text-gray-600">Loading...</div>
        </div>
        <Footer />
      </>
    );
  }

  if (!data) {
    return <Custom404 />;
  }


  const titleData = {
    title: data.category_title || '',
    subtitle: data.subtitle || ''
  };

  const mappedProducts = data.main_products?.map((product: any, index: number) => {
    
    
    return {
      id: index + 1,
      image: product.image_1,
      rank: String(index + 1),
      name: product.name || '',
      specs: product.short_name || '',
      rating: product.score || 0,
      totalReviews: product.numOfRatings || 0,
      features: product.feature2 || [],
      discount: product.discount || 0,
      originalPrice: product.price || 0,
      availability: product.alink ? 'Available on Amazon' : '',
      badge: index === 0 && data.sponsor_asin ? 'Promoted' : undefined,
      chosen_by: product.chosen_by ? product.chosen_by : null,
      performance: product.performance ? parseFloat(product.performance) : 10,
      reliability: product.reliability ? parseFloat(product.reliability) : 10,
      value: product.value ? parseFloat(product.value) : 10,
      popularity: product.popularity ? product.popularity : 10,
      support: product.support ? parseFloat(product.support) : 10,
      slug: product.slug || '',
      alink: product.alink.split("?")[0] || ''
    };
  }) || [];

  // Add sponsor product at the top if it exists
  if (data.sponsor_product && data.sponsor_asin) {

    const sponsorProduct = {
      id: 0,
      image: data.sponsor_product.image_1,
      rank: '★',
      name: data.sponsor_product.name || '',
      specs: data.sponsor_product.short_name || '',
      rating: data.sponsor_product.score || 0,
      totalReviews: data.sponsor_product.numOfRatings || 0,
      features: data.sponsor_product.feature2 || [],
      discount: data.sponsor_product.discount || 0,
      originalPrice: data.sponsor_product.price || 0,
      availability: data.sponsor_product.alink ? 'Available on Amazon' : '',
      badge: 'Promoted',
      chosen_by: data.sponsor_product.chosen_by ? data.sponsor_product.chosen_by : null,
      performance: data.sponsor_product.performance ? parseFloat(data.sponsor_product.performance) : 10,
      reliability: data.sponsor_product.reliability ? parseFloat(data.sponsor_product.reliability) : 10,
      value: data.sponsor_product.value ? parseFloat(data.sponsor_product.value) : 10,
      popularity: data.sponsor_product.popularity ? data.sponsor_product.popularity : 10,
      support: data.sponsor_product.support ? parseFloat(data.sponsor_productduct.support) : 10,
      slug: data.sponsor_product.slug || '',
      alink: data.sponsor_product.alink.split("?")[0] || ''

    };
    mappedProducts.unshift(sponsorProduct);
  }

  const faqData = data.faq || [];


  return (
    <>
      <Head>
        <title>{data.meta_title || data.category_title}</title>
        <meta name="description" content={data.meta_description || data.subtitle || ''} />
      </Head>
      <DisclosureBanner />
      <Header />
      <LeafHero titleData={titleData} />
      <LeafMain products={mappedProducts} />
      <LeafFAQs faqData={faqData} />
      <LeafBuyerIQ />
      <Newsletter />
      <Footer />
    </>
  );
}

