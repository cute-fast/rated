import React, { useState } from 'react';
import axios from 'axios';
import Link from 'next/link';

export default function SearchPage() {
  const [query, setQuery] = useState('');
  const [results, setResults] = useState<any>({ products: [], categories: [] });
  const [loading, setLoading] = useState(false);
  const [suggestions, setSuggestions] = useState<any[]>([]);

  const handleInput = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const q = e.target.value;
    setQuery(q);
    if (q.length < 2) {
      setSuggestions([]);
      return;
    }
    // Autocomplete (products + categories)

    const [prodRes, catRes] = await Promise.all([
      axios.get('http://localhost:8000/api/search/products', { params: { q, size: 10 } }),
      axios.get('http://localhost:8000/api/search/categories', { params: { q, size: 10 } }),
    ]);
    setSuggestions([
      ...prodRes.data.map((p: any) => ({ type: 'product', ...p })),
      ...catRes.data.map((c: any) => ({ type: 'category', ...c })),
    ]);
    console.log(prodRes.data);
  };

  const handleSearch = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    const [prodRes, catRes] = await Promise.all([
      axios.get('http://localhost:8000/api/search/products', { params: { q: query, size: 10 } }),
      axios.get('http://localhost:8000/api/search/categories', { params: { q: query, size: 10 } }),
    ]);
    setResults({ products: prodRes.data, categories: catRes.data });
    setLoading(false);
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