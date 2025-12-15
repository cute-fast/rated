import React, { useEffect, useState } from 'react';
import axios from 'axios';
import AdminModal from '../../components/admin/AdminModal';

export default function AdminManager() {
  const [admins, setAdmins] = useState([]);
  const [loading, setLoading] = useState(true);
  const [modal, setModal] = useState<{ type: 'add' | 'edit' | 'delete'; admin?: any } | null>(null);
  const [feedback, setFeedback] = useState<string | null>(null);

  useEffect(() => {
    fetchAdmins();
  }, []);

  const fetchAdmins = async () => {
    setLoading(true);
    const token = localStorage.getItem("token");
    try {
      const res = await axios.get('https://34.205.64.185:8000/api/admin/admins', {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });
      setAdmins(res.data);
    } catch (e: any) {
      setFeedback(e.response?.data?.detail || 'Error fetching admins');
    }
    setLoading(false);
  };

  const handleAdd = () => setModal({ type: 'add' });
  const handleEdit = (admin: any) => setModal({ type: 'edit', admin });
  const handleDelete = (admin: any) => setModal({ type: 'delete', admin });
  const API_BASE_URL = process.env.NEXT_PUBLIC_API_BASE_URL;

  const handleModalSubmit = async (values: any) => {
    const token = localStorage.getItem("token");
    try {
      if (modal?.type === 'add') {

        await axios.post(`${API_BASE_URL}/api/admin/admins`, values, {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        });
        setFeedback('Admin added!');
      } else if (modal?.type === 'edit' && modal.admin) {
        await axios.patch(`${API_BASE_URL}/api/admin/admins/${modal.admin.id}`, values);
        setFeedback('Admin updated!');
      }
      setModal(null);
      fetchAdmins();
    } catch (e: any) {
      setFeedback(e.response?.data?.detail || 'Error');
    }
  };

  const handleDeleteConfirm = async () => {
    if (!modal?.admin) return;
    try {
      await axios.delete(`/api/admin/admins/${modal.admin.id}`);
      setFeedback('Admin deleted!');
      setModal(null);
      fetchAdmins();
    } catch (e: any) {
      setFeedback(e.response?.data?.detail || 'Error');
    }
  };

  return (
    <div className="max-w-2xl mx-auto p-8">
      <h1 className="text-2xl font-bold mb-6">Admin Manager</h1>
      {feedback && <div className="mb-4 text-green-700">{feedback}</div>}
      <button className="mb-4 px-4 py-2 bg-blue-600 text-white rounded" onClick={handleAdd}>Add Admin</button>
      {loading ? (
        <div>Loading...</div>
      ) : (
        <table className="min-w-full bg-white rounded shadow">
          <thead>
            <tr>
              <th className="p-2">Email</th>
              <th className="p-2">Role</th>
              <th className="p-2">Actions</th>
            </tr>
          </thead>
          <tbody>
            {admins.map((admin: any) => (
              <tr key={admin.id} className="border-t">
                <td className="p-2">{admin.email}</td>
                <td className="p-2">{admin.role}</td>
                <td className="p-2">
                  <button className="text-xs text-yellow-600 mr-2" onClick={() => handleEdit(admin)}>Edit</button>
                  <button className="text-xs text-red-600" onClick={() => handleDelete(admin)}>Delete</button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      )}
      <AdminModal
        open={!!modal && (modal.type === 'add' || modal.type === 'edit')}
        onClose={() => setModal(null)}
        onSubmit={handleModalSubmit}
        initialValues={modal?.type === 'edit' ? modal.admin : undefined}
      />
      {modal?.type === 'delete' && (
        <div className="fixed inset-0 bg-black bg-opacity-30 flex items-center justify-center z-50">
          <div className="bg-white p-6 rounded shadow w-full max-w-md">
            <h2 className="text-xl font-bold mb-4">Delete Admin</h2>
            <p>Are you sure you want to delete <b>{modal.admin.email}</b>?</p>
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