import React, { useEffect, useState } from 'react';
import { useRouter } from 'next/router';
import axios from 'axios';
import Head from 'next/head';
import { GetServerSideProps } from 'next';
import DisclosureBanner from '../../components/public/DisclosureBanner';
import Header from '../../components/public/Header';
import SingleProductCard from '../../components/Single/SingleProductCard';
import ProductAccordion from '../../components/Single/ProductAccordion';
import ProductCarousel from '../../components/Single/ProductCarousel';
import TrendingLists from '../../components/home/TrendingLists';
import LeafBuyerIQ from '../../components/leaf/LeafBuyerIQ';
import Newsletter from '../../components/public/Newsletter';
import Footer from '../../components/public/Footer';
import Custom404 from '../404';

export const getServerSideProps: GetServerSideProps = async () => {
  return {
    props: {},
  };
};

export default function ProductPage() {
  const router = useRouter();
  const { slug } = router.query;
  const [product, setProduct] = useState<any>(null);
  const [loading, setLoading] = useState(true);
  const [notFound, setNotFound] = useState(false);

  useEffect(() => {
    if (slug) fetchProduct();
  }, [slug]);

  const fetchProduct = async () => {
    setLoading(true);
    try {
      const res = await axios.get(`https://api.rated.xyz/api/product/${slug}`);
      const productData = {
        name: res.data.name,
        image: res.data.image_1,
        image_1: res.data.image_1,
        rating: res.data.numOfRatings,
        alink: res.data.alink,

        chosen_by: res.data.chosen_by,
        score: res.data.score,
        discount: res.data.discount,
        features: res.data.feature1,

        performance: res.data.performance? parseFloat(res.data.performance) : 10,
        reliability: res.data.reliability? parseFloat(res.data.reliability) : 10,
        value: res.data.value? parseFloat(res.data.value) : 10,
        popularity: res.data.popularity? parseFloat(res.data.popularity) : 10,
        support: res.data.support? parseFloat(res.data.support) : 10,

        faq: res.data.faq,
        ftc: res.data.ftc,
        conclusion: res.data.conclusion,
      }
      setProduct(productData);
      setNotFound(false);
      console.log(res.data)
    } catch (error) {
      if (axios.isAxiosError(error) && error.response?.status === 404) {
        setNotFound(true);
        setProduct(null);
        setLoading(false);
        return;
      }
      setProduct(null);
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

  if (!product) {
    
    return <Custom404 />;
  }
  
  return (
    <>
      <Head>
        <title>{product.meta_title || product.name || 'Product'} - Rated</title>
        <meta name="description" content={product.meta_description || product.name || ''} />
      </Head>
      <DisclosureBanner />
      <Header />
      <SingleProductCard product={product} />
      <ProductCarousel />
      <TrendingLists />
      <LeafBuyerIQ />
      <Newsletter />
      <Footer />
    </>
  );
}

