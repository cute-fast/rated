import React, { useState } from 'react';
import axios from 'axios';
import ProductTable from '../../components/admin/ProductTable';
import ProductModal from '../../components/admin/ProductModal';

export default function ProductManager() {
  const [products, setProducts] = useState([]);
  const [page, setPage] = useState(1);
  const [total, setTotal] = useState(0);
  const [pageSize] = useState(50);
  const [loading, setLoading] = useState(false);
  const [search, setSearch] = useState('');
  const [modal, setModal] = useState<{ type: 'add' | 'edit' | 'delete'; product?: any } | null>(null);
  const [feedback, setFeedback] = useState<string | null>(null);

  // Use Elasticsearch-backed search endpoint
  const fetchProducts = async (q: string, pageNum = 1) => {
    setLoading(true);
    try {
      const res = await axios.get(`https://34.205.64.185:8000/api/search/products`, {
        params: { q, size: pageSize, from: (pageNum - 1) * pageSize },
      });
      setProducts(res.data);
      setTotal(res.data.length); // Elasticsearch endpoint may not return total, adjust if needed
    } catch (e) {
      setProducts([]);
      setTotal(0);
    }
    setLoading(false);
  };

  const handleSearch = (q: string) => {
    setSearch(q);
    setPage(1);
    if (q.trim().length > 0) {
      fetchProducts(q, 1);
    } else {
      setProducts([]);
      setTotal(0);
    }
  };

  const handlePageChange = (newPage: number) => {
    setPage(newPage);
    if (search.trim().length > 0) {
      fetchProducts(search, newPage);
    }
  };

  const handleAdd = () => setModal({ type: 'add' });
  const handleEdit = (product: any) => setModal({ type: 'edit', product });
  const handleDelete = (product: any) => setModal({ type: 'delete', product });

  const handleModalSubmit = async (values: any) => {
    try {
      const token = localStorage.getItem('token');
      if (modal?.type === 'add') {
        await axios.post('https://34.205.64.185:8000/api/admin/products', values, {
          headers:{
            Authorization: `Bearer ${token}`
          }
        });
        setFeedback('Product added!');
      } else if (modal?.type === 'edit' && modal.product) {
        await axios.patch(`https://34.205.64.185:8000/api/admin/products/${modal.product.asin}`, values, {
          headers:{
            Authorization: `Bearer ${token}`
          }
        });
        setFeedback('Product updated!');
      }
      setModal(null);
      if (search.trim().length > 0) fetchProducts(search, page);
    } catch (e: any) {
      setFeedback(e.response?.data?.detail || 'Error');
    }
  };

  const handleDeleteConfirm = async () => {
    if (!modal?.product) return;
    try {
      const token = localStorage.getItem('token');
      await axios.delete(`https://34.205.64.185:8000/api/admin/products/${modal.product.asin}`, {
        headers:{
          Authorization: `Bearer ${token}`
        }
      });
      setFeedback('Product deleted!');
      setModal(null);
      if (search.trim().length > 0) fetchProducts(search, page);
    } catch (e: any) {
      setFeedback(e.response?.data?.detail || 'Error');
    }
  };

  return (
    <div className="max-w-6xl mx-auto p-8">
      <h1 className="text-2xl font-bold mb-6">Product Manager</h1>
      {feedback && <div className="mb-4 text-green-700">{feedback}</div>}
      <button className="mb-4 px-4 py-2 bg-blue-600 text-white rounded" onClick={handleAdd}>Add Product</button>
      <div className="mb-4">
        <input
          type="text"
          className="border rounded px-3 py-2 w-full"
          placeholder="Search products..."
          value={search}
          onChange={e => handleSearch(e.target.value)}
        />
      </div>
      {loading ? (
        <div>Loading...</div>
      ) : (
        products.length > 0 ? (
          <ProductTable
            products={products}
            page={page}
            total={total}
            pageSize={pageSize}
            onEdit={handleEdit}
            onDelete={handleDelete}
            onSearch={handleSearch}
            onPageChange={handlePageChange}
          />
        ) : (
          search.trim().length > 0 && <div>No products found.</div>
        )
      )}
      <ProductModal
        open={!!modal && (modal.type === 'add' || modal.type === 'edit')}
        onClose={() => setModal(null)}
        onSubmit={handleModalSubmit}
        initialValues={modal?.type === 'edit' ? modal.product : undefined}
      />
      {modal?.type === 'delete' && (
        <div className="fixed inset-0 bg-black bg-opacity-30 flex items-center justify-center z-50">
          <div className="bg-white p-6 rounded shadow w-full max-w-md">
            <h2 className="text-xl font-bold mb-4">Delete Product</h2>
            <p>Are you sure you want to delete <b>{modal.product.name}</b>?</p>
            <div className="flex justify-end space-x-2 mt-4">
              <button onClick={() => setModal(null)} className="px-4 py-2 bg-gray-200 rounded">Cancel</button>
              <button onClick={handleDeleteConfirm} className="px-4 py-2 bg-red-600 text-white rounded">Delete</button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
} 