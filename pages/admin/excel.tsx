import React, { useRef, useState } from 'react';
import axios from 'axios';

export default function ExcelManager() {
  const [feedback, setFeedback] = useState<string | null>(null);
  const [loading, setLoading] = useState(false);
  const fileInputRef = useRef<HTMLInputElement>(null);

  const handleImport = async (type: 'categories' | 'products') => {
    const files = fileInputRef.current?.files;
    if (!files || files.length === 0) return setFeedback('Please select file(s).');

    setLoading(true);
    setFeedback(null);

    const results: string[] = [];
    for (let i = 0; i < files.length; i++) {
      const file = files[i];
      const formData = new FormData();
      formData.append('file', file);
      try {
        const token = localStorage.getItem("token");
        await axios.post(`https://34.205.64.185:8000/api/admin/excel/${type}/import`, formData, {
          headers: { 
            Authorization: `Bearer ${token}`,
            'Content-Type': 'multipart/form-data' 
          },
        });
        results.push(`${file.name}: Success`);
      } catch (e: any) {
        results.push(`${file.name}: ${e.response?.data?.detail || 'Import failed'}`);
      }
    }
    setFeedback(results.join('\n'));
    setLoading(false);
  };

  const handleExport = async (type: 'categories' | 'products') => {
    setLoading(true);
    setFeedback(null);
    try {
      const token = localStorage.getItem("token");
      const res = await axios.get(`https://34.205.64.185:8000/api/admin/excel/${type}/export`, { 
        responseType: 'blob',
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });
      const url = window.URL.createObjectURL(new Blob([res.data]));
      const link = document.createElement('a');
      link.href = url;
      link.setAttribute('download', `${type}.xlsx`);
      document.body.appendChild(link);
      link.click();
      link.remove();
      setFeedback(`${type === 'categories' ? 'Categories' : 'Products'} exported!`);
    } catch (e: any) {
      setFeedback(e.response?.data?.detail || 'Export failed');
    }
    setLoading(false);
  };

  return (
    <div className="max-w-2xl mx-auto p-8">
      <h1 className="text-2xl font-bold mb-6">Excel Import/Export</h1>
      {feedback && <div className="mb-4 text-green-700">{feedback}</div>}
      <div className="mb-6">
        <input type="file" ref={fileInputRef} accept=".xlsx" className="mb-2" multiple />
        <div className="flex space-x-4">
          <button
            onClick={() => handleImport('categories')}
            className="px-4 py-2 bg-blue-600 text-white rounded disabled:opacity-50"
            disabled={loading}
          >
            Import Categories
          </button>
          <button
            onClick={() => handleImport('products')}
            className="px-4 py-2 bg-blue-600 text-white rounded disabled:opacity-50"
            disabled={loading}
          >
            Import Products
          </button>
        </div>
      </div>
      <div className="mb-6">
        <div className="flex space-x-4">
          <button
            onClick={() => handleExport('categories')}
            className="px-4 py-2 bg-green-600 text-white rounded disabled:opacity-50"
            disabled={loading}
          >
            Export Categories
          </button>
          <button
            onClick={() => handleExport('products')}
            className="px-4 py-2 bg-green-600 text-white rounded disabled:opacity-50"
            disabled={loading}
          >
            Export Products
          </button>
        </div>
      </div>
    </div>
  );
} 