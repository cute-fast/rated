import React, { useState, useEffect } from 'react';
import axios from 'axios';
import Link from 'next/link';
import { useRouter } from 'next/router';

export default function SearchPage() {
  const router = useRouter();
  const { q } = router.query;
  const [query, setQuery] = useState('');
  const [results, setResults] = useState<any>({ products: [], categories: [] });
  const [loading, setLoading] = useState(false);
  const [suggestions, setSuggestions] = useState<any[]>([]);

  useEffect(() => {
    if (q && typeof q === 'string') {
      const decodedQuery = decodeURIComponent(q);
      setQuery(decodedQuery);
      performSearch(decodedQuery);
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [q]);

  const handleInput = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const q = e.target.value;
    setQuery(q);
    if (q.length < 2) {
      setSuggestions([]);
      return;
    }
    // Autocomplete (products + categories)

    const [prodRes, catRes] = await Promise.all([
      axios.get('https://api.rated.xyz/api/search/products', { params: { q, size: 10 } }).catch(() => ({ data: [] })),
      axios.get('https://api.rated.xyz/api/search/categories', { params: { q, size: 10 } }).catch(() => ({ data: [] })),
    ]);
    setSuggestions([
      ...prodRes.data.map((p: any) => ({ type: 'product', ...p })),
      ...catRes.data.map((c: any) => ({ type: 'category', ...c })),
    ]);
    console.log(prodRes.data);
  };

  const performSearch = async (searchQuery: string) => {
    if (!searchQuery || searchQuery.trim().length === 0) {
      setResults({ products: [], categories: [] });
      return;
    }

    setLoading(true);
    try {
      const [prodRes, catRes] = await Promise.all([
        axios.get('https://api.rated.xyz/api/search/products', { params: { q: searchQuery, size: 20 } }).catch(() => ({ data: [] })),
        axios.get('https://api.rated.xyz/api/search/categories', { params: { q: searchQuery, size: 20 } }).catch(() => ({ data: [] })),
      ]);
      setResults({ products: prodRes.data || [], categories: catRes.data || [] });
    } catch (error) {
      console.error('Search error:', error);
      setResults({ products: [], categories: [] });
    } finally {
      setLoading(false);
    }
  };

  const handleSearch = async (e: React.FormEvent) => {
    e.preventDefault();
    if (query.trim()) {
      router.push(`/search?q=${encodeURIComponent(query.trim())}`, undefined, { shallow: false });
      performSearch(query.trim());
    }
  };

  

  return (
    <div className="max-w-3xl mx-auto p-8">
      <h1 className="text-2xl font-bold mb-6">Search</h1>
      <form onSubmit={handleSearch} className="mb-4">
        <input
          type="text"
          className="border rounded px-3 py-2 w-full"
          placeholder="Search products or categories..."
          value={query}
          onChange={handleInput}
        />
        {suggestions.length > 0 && (
          <div className="bg-white border rounded shadow mt-1 absolute z-10 w-full">
            {suggestions.map((s, i) => (
              <Link
                key={i}
                href={s.type === 'product' ? `/product/${s.slug}` : `/${s.slug}`}
                className="block px-4 py-2 hover:bg-blue-50"
              >
                {s.type === 'product' ? `Product: ${s.name}` : `Category: ${s.name}`}
              </Link>
            ))}
          </div>
        )}
      </form>
      {loading ? (
        <div>Loading...</div>
      ) : (
        <>
          {results.categories.length > 0 && (
            <div className="mb-8">
              <h2 className="text-xl font-semibold mb-2">Categories</h2>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                {results.categories.map((cat: any) => (
                  <Link key={cat.slug} href={`/${cat.slug}`} className="block bg-white rounded shadow p-4 hover:bg-blue-50">
                    <h3 className="font-bold">{cat.name}</h3>
                  </Link>
                ))}
              </div>
            </div>
          )}
          {results.products.length > 0 && (
            <div>
              <h2 className="text-xl font-semibold mb-2">Products</h2>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                {results.products.map((prod: any) => (
                  <Link key={prod.slug} href={`/product/${prod.slug}`} className="block bg-white rounded shadow p-4 hover:bg-blue-50">
                    <h3 className="font-bold">{prod.name}</h3>
                    <div className="text-gray-600">Brand: {prod.brand}</div>
                    <div className="text-gray-600">ASIN: {prod.asin}</div>
                  </Link>
                ))}
              </div>
            </div>
          )}
        </>
      )}
    </div>
  );
} 