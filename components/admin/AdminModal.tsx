import React, { useState, useEffect } from 'react';

interface Props {
  open: boolean;
  onClose: () => void;
  onSubmit: (values: any) => void;
  initialValues?: any;
}

export default function AdminModal({ open, onClose, onSubmit, initialValues }: Props) {
  const [form, setForm] = useState({
    email: '',
    password: '',
    role: 'editor',
  });

  useEffect(() => {
    if (initialValues) {
      setForm({
        email: initialValues.email || '',
        password: '',
        role: initialValues.role || 'editor',
      });
    } else {
      setForm({ email: '', password: '', role: 'editor' });
    }
  }, [initialValues, open]);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
    const { name, value } = e.target;
    setForm(f => ({ ...f, [name]: value }));
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!form.email || (!initialValues && !form.password)) return;
    const values = { ...form };
    if (!form.password) delete values.password;
    onSubmit(values);
  };

  if (!open) return null;
  return (
    <div className="fixed inset-0 bg-black bg-opacity-30 flex items-center justify-center z-50">
      <form onSubmit={handleSubmit} className="bg-white p-6 rounded shadow w-full max-w-md">
        <h2 className="text-xl font-bold mb-4">{initialValues ? 'Edit' : 'Add'} Admin</h2>
        <div className="mb-3">
          <label className="block mb-1">Email</label>
          <input name="email" type="email" value={form.email} onChange={handleChange} className="w-full border rounded px-2 py-1" required disabled={!!initialValues} />
        </div>
        <div className="mb-3">
          <label className="block mb-1">Password {initialValues ? <span className="text-xs text-gray-500">(leave blank to keep current)</span> : ''}</label>
          <input name="password" type="password" value={form.password} onChange={handleChange} className="w-full border rounded px-2 py-1" required={!initialValues} />
        </div>
        <div className="mb-3">
          <label className="block mb-1">Role</label>
          <select name="role" value={form.role} onChange={handleChange} className="w-full border rounded px-2 py-1">
            <option value="default">Default</option>
            <option value="editor">Editor</option>
          </select>
        </div>
        <div className="flex justify-end space-x-2 mt-4">
          <button type="button" onClick={onClose} className="px-4 py-2 bg-gray-200 rounded">Cancel</button>
          <button type="submit" className="px-4 py-2 bg-blue-600 text-white rounded">Save</button>
        </div>
      </form>
    </div>
  );
}