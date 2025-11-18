import React, { useState, useEffect } from 'react';

interface Props {
  open: boolean;
  onClose: () => void;
  onSubmit: (values: any) => void;
  initialValues?: any;
  parentId?: string;
}

export default function CategoryModal({ open, onClose, onSubmit, initialValues, parentId }: Props) {
  const [form, setForm] = useState({
    name: '',
    slug: '',
    image_url: '',
    is_leaf: false,
    meta_title: '',
    meta_description: '',
    category_title: '',
    subtitle: '',
    sponsor_asin: '',
    product_asins: '',
    faq: '',
  });

  useEffect(() => {
    if (initialValues) {
      setForm({
        name: initialValues.name || '',
        slug: initialValues.slug || '',
        image_url: initialValues.image_url || '',
        is_leaf: initialValues.is_leaf || false,
        meta_title: initialValues.meta_title || '',
        meta_description: initialValues.meta_description || '',
        category_title: initialValues.category_title || '',
        subtitle: initialValues.subtitle || '',
        sponsor_asin: initialValues.sponsor_asin || '',
        product_asins: (initialValues.product_asins || []).join(',') || '',
        faq: (initialValues.faq || []).join(',') || '',
      });
    } else {
      setForm({
        name: '', slug: '', image_url: '', is_leaf: false, 
        meta_title: '', meta_description: '', category_title: '', subtitle: '',
        sponsor_asin: '', product_asins: '', faq: '',
      });
    }
  }, [initialValues, open]);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value, type } = e.target;
    const checked = (e.target as HTMLInputElement).checked;
    setForm(f => ({ ...f, [name]: type === 'checkbox' ? checked : value }));
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    const values = {
      ...form,
      parent_slug: parentId || initialValues?.parent_slug || null,
      product_asins: form.product_asins.split(',').map((s: string) => s.trim()).filter(Boolean),
      faq: form.faq.split(',').map((s: string) => s.trim()).filter(Boolean),
    };
    onSubmit(values);
  };

  if (!open) return null;
  return (
    <div className="fixed inset-0 bg-black bg-opacity-30 flex items-center justify-center z-50">
      <form onSubmit={handleSubmit} className="bg-white p-6 rounded shadow w-full max-w-md">
        <h2 className="text-xl font-bold mb-4">{initialValues ? 'Edit' : 'Add'} Category</h2>
        <div className="mb-3">
          <label className="block mb-1">Name</label>
          <input name="name" value={form.name} onChange={handleChange} className="w-full border rounded px-2 py-1" required />
        </div>
        <div className="mb-3">
          <label className="block mb-1">Slug</label>
          <input name="slug" value={form.slug} onChange={handleChange} className="w-full border rounded px-2 py-1" required />
        </div>
        <div className="mb-3">
          <label className="block mb-1">Image URL</label>
          <input name="image_url" value={form.image_url} onChange={handleChange} className="w-full border rounded px-2 py-1" />
        </div>
        <div className="mb-3">
          <label className="block mb-1">Meta Title</label>
          <input name="meta_title" value={form.meta_title} onChange={handleChange} className="w-full border rounded px-2 py-1" />
        </div>
        <div className="mb-3">
          <label className="block mb-1">Meta Description</label>
          <textarea name="meta_description" value={form.meta_description} onChange={handleChange} className="w-full border rounded px-2 py-1" />
        </div>
        <div className="mb-3">
          <label className="block mb-1">Category Title</label>
          <input name="category_title" value={form.category_title} onChange={handleChange} className="w-full border rounded px-2 py-1" />
        </div>
        <div className="mb-3">
          <label className="block mb-1">Subtitle</label>
          <input name="subtitle" value={form.subtitle} onChange={handleChange} className="w-full border rounded px-2 py-1" />
        </div>
        <div className="mb-3 flex items-center">
          <input type="checkbox" name="is_leaf" checked={form.is_leaf} onChange={handleChange} className="mr-2" />
          <label>Is Leaf (Top 10)</label>
        </div>
        {form.is_leaf && (
          <>
            <div className="mb-3">
              <label className="block mb-1">Sponsor ASIN</label>
              <input name="sponsor_asin" value={form.sponsor_asin} onChange={handleChange} className="w-full border rounded px-2 py-1" />
            </div>
            <div className="mb-3">
              <label className="block mb-1">Product ASINs (comma separated, max 10)</label>
              <input name="product_asins" value={form.product_asins} onChange={handleChange} className="w-full border rounded px-2 py-1" />
            </div>
            <div className="mb-3">
              <label className="block mb-1">FAQ (comma separated)</label>
              <textarea name="faq" value={form.faq} onChange={handleChange} className="w-full border rounded px-2 py-1" />
            </div>
          </>
        )}
        <div className="flex justify-end space-x-2 mt-4">
          <button type="button" onClick={onClose} className="px-4 py-2 bg-gray-200 rounded">Cancel</button>
          <button type="submit" className="px-4 py-2 bg-blue-600 text-white rounded">Save</button>
        </div>
      </form>
    </div>
  );
} 