import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { useRouter } from 'next/router';
import { removeToken } from '../../lib/auth';

export default function AdminTopbar() {
  const [admin, setAdmin] = useState<{ email: string; role: string } | null>(null);
  const router = useRouter();

  useEffect(() => {
    axios.get('http://localhost:8000/api/admin/me', {
      headers: { Authorization: `Bearer ${localStorage.getItem('token')}` },
    })
      .then(res => setAdmin(res.data))
      .catch(() => setAdmin(null));
  }, []);

  const handleLogout = () => {
    removeToken();
    router.push('/admin/login');
  };

  return (
    <header className="mb-8 flex justify-between items-center">
      <div>
        {admin ? (
          <span className="text-gray-700">{admin.email} <span className="text-xs text-gray-500">({admin.role})</span></span>
        ) : (
          <span className="text-gray-400">Loading...</span>
        )}
      </div>
      <button onClick={handleLogout} className="bg-red-600 text-white px-4 py-2 rounded">Logout</button>
    </header>
  );
} 