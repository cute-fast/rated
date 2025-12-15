import React, { useEffect, useState } from 'react';
import axios from 'axios';
import CategoryTree from '../../components/admin/CategoryTree';
import CategoryModal from '../../components/admin/CategoryModal';

export default function CategoryManager() {
  const [categories, setCategories] = useState([]);
  const [loading, setLoading] = useState(true);
  const [modal, setModal] = useState<{ type: 'add' | 'edit' | 'delete'; category?: any; parentId?: string } | null>(null);
  const [feedback, setFeedback] = useState<string | null>(null);

  useEffect(() => {
    fetchCategories();
  }, []);

  const fetchCategories = async () => {
    setLoading(true);
    const token = localStorage.getItem('token');
    const res = await axios.get('http://34.205.64.185:8000/api/admin/categories/', {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });
    setCategories(buildTree(res.data));
    setLoading(false);
  };

  function buildTree(list: any[]) {
    const map: any = {};
    list.forEach(cat => (map[cat.slug] = { ...cat, children: [] }));
    const tree: any[] = [];
    list.forEach(cat => {
      if (cat.parent_slug && map[cat.parent_slug]) {
        map[cat.parent_slug].children.push(map[cat.slug]);
      } else {
        tree.push(map[cat.slug]);
      }
    });
    return tree;
  }

  const handleAdd = (parentSlug?: string) => setModal({ type: 'add', parentId: parentSlug });
  const handleEdit = (category: any) => setModal({ type: 'edit', category });
  const handleDelete = (category: any) => setModal({ type: 'delete', category });

  const handleModalSubmit = async (values: any) => {
    try {
      if (modal?.type === 'add') {
        await axios.post('/api/admin/categories', values);
        setFeedback('Category added!');
      } else if (modal?.type === 'edit' && modal.category) {
        await axios.patch(`/api/admin/categories/${modal.category.slug}`, values);
        setFeedback('Category updated!');
      }
      setModal(null);
      fetchCategories();
    } catch (e: any) {
      setFeedback(e.response?.data?.detail || 'Error');
    }
  };

  const handleDeleteConfirm = async () => {
    if (!modal?.category) return;
    try {
      await axios.delete(`/api/admin/categories/${modal.category.slug}`);
      setFeedback('Category deleted!');
      setModal(null);
      fetchCategories();
    } catch (e: any) {
      setFeedback(e.response?.data?.detail || 'Error');
    }
  };

  return (
    <div className="max-w-4xl mx-auto p-8">
      <h1 className="text-2xl font-bold mb-6">Category Manager</h1>
      {feedback && <div className="mb-4 text-green-700">{feedback}</div>}
      {loading ? (
        <div>Loading...</div>
      ) : (
        <CategoryTree categories={categories} onAdd={handleAdd} onEdit={handleEdit} onDelete={handleDelete} />
      )}
      <CategoryModal
        open={!!modal && (modal.type === 'add' || modal.type === 'edit')}
        onClose={() => setModal(null)}
        onSubmit={handleModalSubmit}
        initialValues={modal?.type === 'edit' ? modal.category : undefined}
        parentId={modal?.parentId}
      />
      {modal?.type === 'delete' && (
        <div className="fixed inset-0 bg-black bg-opacity-30 flex items-center justify-center z-50">
          <div className="bg-white p-6 rounded shadow w-full max-w-md">
            <h2 className="text-xl font-bold mb-4">Delete Category</h2>
            <p>Are you sure you want to delete <b>{modal.category.name}</b>?</p>
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