import React from 'react';

type Product = {
  asin: string;
  slug: string;
  brand: string;
  name: string;
  short_name?: string;
  alink?: string;
  image_1?: string;
  image_2?: string;
  score?: number;
  price?: number;
  discount?: number;
  numOfRatings?: number;
  chosen_by?: number;
  cupon?: number;
  product_title?: string;
  subtitle?: string;
  meta_title?: string;
  meta_description?: string;
  feature1?: string[];
  feature2?: string[];
  value_money?: string;
  quality?: string;
  ease_of_use?: string;
  ftc?: string[];
  faq?: string[];
  conclusion?: string;
};

type Props = {
  products: Product[];
  page: number;
  total: number;
  pageSize: number;
  onEdit: (product: Product) => void;
  onDelete: (product: Product) => void;
  onSearch: (q: string) => void;
  onPageChange: (page: number) => void;
};

export default function ProductTable({ products, page, total, pageSize, onEdit, onDelete, onSearch, onPageChange }: Props) {
  const [search, setSearch] = React.useState('');

  const totalPages = Math.ceil(total / pageSize);

  return (
    <div>
      <div className="flex mb-4 items-center">
        <input
          type="text"
          placeholder="Search by ASIN, slug, brand, name..."
          className="border rounded px-3 py-2 mr-2"
          value={search}
          onChange={e => setSearch(e.target.value)}
        />
        <button className="bg-blue-600 text-white px-4 py-2 rounded" onClick={() => onSearch(search)}>
          Search
        </button>
      </div>
      <table className="min-w-full bg-white rounded shadow">
        <thead>
          <tr>
            <th className="p-2">ASIN</th>
            <th className="p-2">Name</th>
            <th className="p-2">Brand</th>
            <th className="p-2">Price</th>
            <th className="p-2">Score</th>
            <th className="p-2">Actions</th>
          </tr>
        </thead>
        <tbody>
          {products.map(prod => (
            <tr key={prod.asin} className="border-t">
              <td className="p-2">{prod.asin}</td>
              <td className="p-2">{prod.name}</td>
              <td className="p-2">{prod.brand}</td>
              <td className="p-2">${prod.price?.toFixed(2)}</td>
              <td className="p-2">{prod.score}</td>
              <td className="p-2">
                <button className="text-xs text-yellow-600 mr-2" onClick={() => onEdit(prod)}>Edit</button>
                <button className="text-xs text-red-600" onClick={() => onDelete(prod)}>Delete</button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
      <div className="flex justify-between items-center mt-4">
        <span>Page {page} of {totalPages}</span>
        <div className="space-x-2">
          <button disabled={page <= 1} onClick={() => onPageChange(page - 1)} className="px-3 py-1 bg-gray-200 rounded disabled:opacity-50">Prev</button>
          <button disabled={page >= totalPages} onClick={() => onPageChange(page + 1)} className="px-3 py-1 bg-gray-200 rounded disabled:opacity-50">Next</button>
        </div>
      </div>
    </div>
  );
} 