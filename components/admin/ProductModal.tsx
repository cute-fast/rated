import React, { useState, useEffect } from 'react';

interface Props {
  open: boolean;
  onClose: () => void;
  onSubmit: (values: any) => void;
  initialValues?: any;
}

export default function ProductModal({ open, onClose, onSubmit, initialValues }: Props) {
  const [form, setForm] = useState({
    asin: '',
    slug: '',
    brand: '',
    name: '',
    short_name: '',
    alink: '',
    image_1: '',
    image_2: '',
    score: '',
    price: '',
    discount: '',
    numOfRatings: '',
    chosen_by: '',
    cupon: '',
    product_title: '',
    subtitle: '',
    meta_title: '',
    meta_description: '',
    feature1: [''],
    feature2: [''],
    value_money: '',
    quality: '',
    ease_of_use: '',
    ftc: [''],
    faq: [''],
    conclusion: '',
  });

  const [tab, setTab] = useState(0);
  const tabList = [
    { label: 'Basic Info' },
    { label: 'Meta Info' },
    { label: 'Features' },
    { label: 'FTC' },
    { label: 'FAQ' },
  ];

  useEffect(() => {
    if (initialValues) {
      setForm({
        asin: initialValues.asin || '',
        slug: initialValues.slug || '',
        brand: initialValues.brand || '',
        name: initialValues.name || '',
        short_name: initialValues.short_name || '',
        alink: initialValues.alink || '',
        image_1: initialValues.image_1 || '',
        image_2: initialValues.image_2 || '',
        score: initialValues.score?.toString() || '',
        price: initialValues.price?.toString() || '',
        discount: initialValues.discount?.toString() || '',
        numOfRatings: initialValues.numOfRatings?.toString() || '',
        chosen_by: initialValues.chosen_by?.toString() || '',
        cupon: initialValues.cupon?.toString() || '',
        product_title: initialValues.product_title || '',
        subtitle: initialValues.subtitle || '',
        meta_title: initialValues.meta_title || '',
        meta_description: initialValues.meta_description || '',
        feature1: Array.isArray(initialValues.feature1) ? (initialValues.feature1.length ? initialValues.feature1 : ['']) : [''],
        feature2: Array.isArray(initialValues.feature2) ? (initialValues.feature2.length ? initialValues.feature2 : ['']) : [''],
        value_money: initialValues.value_money || '',
        quality: initialValues.quality || '',
        ease_of_use: initialValues.ease_of_use || '',
        ftc: Array.isArray(initialValues.ftc) ? (initialValues.ftc.length ? initialValues.ftc : ['']) : [''],
        faq: Array.isArray(initialValues.faq) ? (initialValues.faq.length ? initialValues.faq : ['']) : [''],
        conclusion: initialValues.conclusion || '',
      });
    } else {
      setForm({
        asin: '', slug: '', brand: '', name: '', short_name: '', alink: '', image_1: '', image_2: '',
        score: '', price: '', discount: '', numOfRatings: '', chosen_by: '', cupon: '',
        product_title: '', subtitle: '', meta_title: '', meta_description: '',
        feature1: [''], feature2: [''], value_money: '', quality: '', ease_of_use: '', ftc: [''], faq: [''], conclusion: '',
      });
    }
  }, [initialValues, open]);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target;
    setForm(f => ({ ...f, [name]: value }));
  };

  // Dynamic list handlers (array only)
  const handleListChange = (field: string, idx: number, value: string) => {
    setForm(f => {
      const arr = Array.isArray(f[field]) ? [...f[field]] : [''];
      arr[idx] = value;
      return { ...f, [field]: arr };
    });
  };
  const handleListAdd = (field: string) => {
    setForm(f => {
      const arr = Array.isArray(f[field]) ? [...f[field]] : [''];
      arr.push('');
      return { ...f, [field]: arr };
    });
  };
  const handleListRemove = (field: string, idx: number) => {
    setForm(f => {
      const arr = Array.isArray(f[field]) ? [...f[field]] : [''];
      arr.splice(idx, 1);
      return { ...f, [field]: arr.length ? arr : [''] };
    });
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    const values = {
      ...form,
      score: form.score ? parseFloat(form.score) : undefined,
      price: form.price ? parseFloat(form.price) : undefined,
      discount: form.discount ? parseFloat(form.discount) : undefined,
      numOfRatings: form.numOfRatings ? parseInt(form.numOfRatings) : undefined,
      chosen_by: form.chosen_by ? parseInt(form.chosen_by) : undefined,
      cupon: form.cupon ? parseFloat(form.cupon) : undefined,
      feature1: form.feature1.filter((s: string) => s.trim() !== ''),
      feature2: form.feature2.filter((s: string) => s.trim() !== ''),
      ftc: form.ftc.filter((s: string) => s.trim() !== ''),
      faq: form.faq.filter((s: string) => s.trim() !== ''),
    };
    onSubmit(values);
  };

  if (!open) return null;
  return (
    <div className="fixed inset-0 bg-black bg-opacity-30 flex items-center justify-center z-50">
      <div className="bg-white rounded shadow w-full max-w-2xl max-h-[90vh] overflow-y-auto relative">
        <button
          type="button"
          onClick={onClose}
          className="absolute top-3 right-3 text-gray-500 hover:text-gray-700 text-2xl font-bold"
          aria-label="Close"
        >
          ×
        </button>
        <form onSubmit={handleSubmit} className="p-6">
          <h2 className="text-xl font-bold mb-4 sticky top-0 bg-white z-10 pb-2">{initialValues ? 'Edit' : 'Add'} Product</h2>
          {/* Tab Bar */}
          <div className="flex mb-6 border-b">
            {tabList.map((t, i) => (
              <button
                key={t.label}
                type="button"
                className={`px-4 py-2 -mb-px border-b-2 ${tab === i ? 'border-blue-600 text-blue-600 font-semibold' : 'border-transparent text-gray-500'} focus:outline-none`}
                onClick={() => setTab(i)}
              >
                {t.label}
              </button>
            ))}
          </div>
          {/* Tab Content */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            {/* Basic Info Tab */}
            {tab === 0 && <>
              <div className="mb-3">
                <label className="block mb-1">ASIN</label>
                <input name="asin" value={form.asin} onChange={handleChange} className="w-full border rounded px-2 py-1" required disabled={!!initialValues} />
              </div>
              <div className="mb-3">
                <label className="block mb-1">Slug</label>
                <input name="slug" value={form.slug} onChange={handleChange} className="w-full border rounded px-2 py-1" required />
              </div>
              <div className="mb-3">
                <label className="block mb-1">Brand</label>
                <input name="brand" value={form.brand} onChange={handleChange} className="w-full border rounded px-2 py-1" required />
              </div>
              <div className="mb-3">
                <label className="block mb-1">Name</label>
                <input name="name" value={form.name} onChange={handleChange} className="w-full border rounded px-2 py-1" required />
              </div>
              <div className="mb-3">
                <label className="block mb-1">Short Name</label>
                <input name="short_name" value={form.short_name} onChange={handleChange} className="w-full border rounded px-2 py-1" />
              </div>
              <div className="mb-3">
                <label className="block mb-1">Amazon Link</label>
                <input name="alink" value={form.alink} onChange={handleChange} className="w-full border rounded px-2 py-1" />
              </div>
              <div className="mb-3">
                <label className="block mb-1">Image 1</label>
                <input name="image_1" value={form.image_1} onChange={handleChange} className="w-full border rounded px-2 py-1" />
              </div>
              <div className="mb-3">
                <label className="block mb-1">Image 2</label>
                <input name="image_2" value={form.image_2} onChange={handleChange} className="w-full border rounded px-2 py-1" />
              </div>
              <div className="mb-3">
                <label className="block mb-1">Score</label>
                <input name="score" type="number" step="0.1" value={form.score} onChange={handleChange} className="w-full border rounded px-2 py-1" />
              </div>
              <div className="mb-3">
                <label className="block mb-1">Price</label>
                <input name="price" type="number" step="0.01" value={form.price} onChange={handleChange} className="w-full border rounded px-2 py-1" />
              </div>
              <div className="mb-3">
                <label className="block mb-1">Discount</label>
                <input name="discount" type="number" step="0.01" value={form.discount} onChange={handleChange} className="w-full border rounded px-2 py-1" />
              </div>
              <div className="mb-3">
                <label className="block mb-1">Number of Ratings</label>
                <input name="numOfRatings" type="number" value={form.numOfRatings} onChange={handleChange} className="w-full border rounded px-2 py-1" />
              </div>
              <div className="mb-3">
                <label className="block mb-1">Chosen By</label>
                <input name="chosen_by" type="number" value={form.chosen_by} onChange={handleChange} className="w-full border rounded px-2 py-1" />
              </div>
              <div className="mb-3">
                <label className="block mb-1">cupon</label>
                <input name="cupon" type="number" step="0.01" value={form.cupon} onChange={handleChange} className="w-full border rounded px-2 py-1" />
              </div>
            </>}
            {/* Meta Info Tab */}
            {tab === 1 && <>
              <div className="mb-3 md:col-span-2">
                <label className="block mb-1">Product Title</label>
                <input name="product_title" value={form.product_title} onChange={handleChange} className="w-full border rounded px-2 py-1" />
              </div>
              <div className="mb-3 md:col-span-2">
                <label className="block mb-1">Subtitle</label>
                <input name="subtitle" value={form.subtitle} onChange={handleChange} className="w-full border rounded px-2 py-1" />
              </div>
              <div className="mb-3 md:col-span-2">
                <label className="block mb-1">Meta Title</label>
                <input name="meta_title" value={form.meta_title} onChange={handleChange} className="w-full border rounded px-2 py-1" />
              </div>
              <div className="mb-3 md:col-span-2">
                <label className="block mb-1">Meta Description</label>
                <textarea name="meta_description" value={form.meta_description} onChange={handleChange} className="w-full border rounded px-2 py-1" />
              </div>
            </>}
            {/* Features Tab */}
            {tab === 2 && <>
              <div className="mb-3 md:col-span-2">
                <label className="block mb-1">Feature 1</label>
                {form.feature1.map((val: string, idx: number) => (
                  <div key={idx} className="flex items-center mb-1">
                    <input
                      type="text"
                      className="w-full border rounded px-2 py-1"
                      value={val}
                      onChange={e => handleListChange('feature1', idx, e.target.value)}
                    />
                    <button type="button" className="ml-2 text-red-500" onClick={() => handleListRemove('feature1', idx)} disabled={form.feature1.length === 1}>×</button>
                  </div>
                ))}
                <button type="button" className="text-blue-600 mt-1" onClick={() => handleListAdd('feature1')}>+ Add Feature</button>
              </div>
              <div className="mb-3 md:col-span-2">
                <label className="block mb-1">Feature 2</label>
                {form.feature2.map((val: string, idx: number) => (
                  <div key={idx} className="flex items-center mb-1">
                    <input
                      type="text"
                      className="w-full border rounded px-2 py-1"
                      value={val}
                      onChange={e => handleListChange('feature2', idx, e.target.value)}
                    />
                    <button type="button" className="ml-2 text-red-500" onClick={() => handleListRemove('feature2', idx)} disabled={form.feature2.length === 1}>×</button>
                  </div>
                ))}
                <button type="button" className="text-blue-600 mt-1" onClick={() => handleListAdd('feature2')}>+ Add Feature</button>
              </div>
              <div className="mb-3">
                <label className="block mb-1">Value for Money</label>
                <input name="value_money" value={form.value_money} onChange={handleChange} className="w-full border rounded px-2 py-1" />
              </div>
              <div className="mb-3">
                <label className="block mb-1">Quality</label>
                <input name="quality" value={form.quality} onChange={handleChange} className="w-full border rounded px-2 py-1" />
              </div>
              <div className="mb-3">
                <label className="block mb-1">Ease of Use</label>
                <input name="ease_of_use" value={form.ease_of_use} onChange={handleChange} className="w-full border rounded px-2 py-1" />
              </div>
            </>}
            {/* FTC Tab */}
            {tab === 3 && <>
              <div className="mb-3 md:col-span-2">
                <label className="block mb-1">FTC</label>
                {form.ftc.map((val: string, idx: number) => (
                  <div key={idx} className="flex items-center mb-1">
                    <input
                      type="text"
                      className="w-full border rounded px-2 py-1"
                      value={val}
                      onChange={e => handleListChange('ftc', idx, e.target.value)}
                    />
                    <button type="button" className="ml-2 text-red-500" onClick={() => handleListRemove('ftc', idx)} disabled={form.ftc.length === 1}>×</button>
                  </div>
                ))}
                <button type="button" className="text-blue-600 mt-1" onClick={() => handleListAdd('ftc')}>+ Add FTC</button>
              </div>
            </>}
            {/* FAQ Tab (includes Conclusion) */}
            {tab === 4 && <>
              <div className="mb-3 md:col-span-2">
                <label className="block mb-1">FAQ</label>
                {form.faq.map((val: string, idx: number) => (
                  <div key={idx} className="flex items-center mb-1">
                    <input
                      type="text"
                      className="w-full border rounded px-2 py-1"
                      value={val}
                      onChange={e => handleListChange('faq', idx, e.target.value)}
                    />
                    <button type="button" className="ml-2 text-red-500" onClick={() => handleListRemove('faq', idx)} disabled={form.faq.length === 1}>×</button>
                  </div>
                ))}
                <button type="button" className="text-blue-600 mt-1" onClick={() => handleListAdd('faq')}>+ Add FAQ</button>
              </div>
              <div className="mb-3 md:col-span-2">
                <label className="block mb-1">Conclusion</label>
                <textarea name="conclusion" value={form.conclusion} onChange={handleChange} className="w-full border rounded px-2 py-1" />
              </div>
            </>}
          </div>
          <div className="flex justify-end space-x-2 mt-6 sticky bottom-0 bg-white pt-4 z-10">
            <button type="button" onClick={onClose} className="px-4 py-2 bg-gray-200 rounded">Cancel</button>
            <button type="submit" className="px-4 py-2 bg-blue-600 text-white rounded">Save</button>
          </div>
        </form>
      </div>
    </div>
  );
} 