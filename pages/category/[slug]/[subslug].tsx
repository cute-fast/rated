import React, { useEffect, useState } from 'react';
import { useRouter } from 'next/router';
import axios from 'axios';
import Link from 'next/link';
import { GetServerSideProps } from 'next';
import Custom404 from '../../404';

export const getServerSideProps: GetServerSideProps = async () => {
  return {
    props: {},
  };
};

export default function CategoryLevel2() {
  const router = useRouter();
  const { slug, subslug } = router.query;
  const [leaves, setLeaves] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);
  const [notFound, setNotFound] = useState(false);

  useEffect(() => {
    if (slug && subslug) fetchLeaves();
    // eslint-disable-next-line
  }, [slug, subslug]);

  const fetchLeaves = async () => {
    setLoading(true);
    try {
      const res = await axios.get(`https://34.205.64.185:8000/api/category/${slug}/${subslug}`);
      setLeaves(res.data);
      setNotFound(false);
    } catch (error) {
      if (axios.isAxiosError(error) && error.response?.status === 404) {
        setNotFound(true);
        setLeaves([]);
        setLoading(false);
        return;
      }
      setLeaves([]);
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
          <h1 className="text-2xl font-bold mb-6">Top 10 Categories</h1>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {leaves.map(leaf => (
              <Link key={leaf.slug} href={`/${leaf.slug}`} className="block bg-white rounded shadow p-4 hover:bg-blue-50">
                <h2 className="text-xl font-semibold">{leaf.name}</h2>
              </Link>
            ))}
          </div>
        </>
      )}
    </div>
  );
} 