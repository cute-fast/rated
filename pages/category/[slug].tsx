import React, { useEffect, useState } from 'react';
import { useRouter } from 'next/router';
import axios from 'axios';
import Link from 'next/link';
import { GetServerSideProps } from 'next';
import Custom404 from '../404';

export const getServerSideProps: GetServerSideProps = async () => {
  return {
    props: {},
  };
};

export default function CategoryLevel1() {
  const router = useRouter();
  const { slug } = router.query;
  const [categories, setCategories] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);
  const [notFound, setNotFound] = useState(false);

  useEffect(() => {
    if (slug) fetchCategories();
    // eslint-disable-next-line
  }, [slug]);

  const fetchCategories = async () => {
    setLoading(true);
    try {
      const res = await axios.get(`https://34.205.64.185:8000/api/category/${slug}`);
      setCategories(res.data);
      setNotFound(false);
    } catch (error) {
      if (axios.isAxiosError(error) && error.response?.status === 404) {
        setNotFound(true);
        setCategories([]);
        setLoading(false);
        return;
      }
      setCategories([]);
    }
    setLoading(false);
  };

  return (
    <div className="max-w-4xl mx-auto p-8">
      {loading ? (
        <div>Loading...</div>
      ) : notFound ? (
        <Custom404 />
      ) : (
        <>
          <h1 className="text-2xl font-bold mb-6">Subcategories</h1>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {categories.map(cat => (
              <Link key={cat.slug} href={`/category/${slug}/${cat.slug}`} className="block bg-white rounded shadow p-4 hover:bg-blue-50">
                <h2 className="text-xl font-semibold">{cat.name}</h2>
              </Link>
            ))}
          </div>
        </>
      )}
    </div>
  );
} 