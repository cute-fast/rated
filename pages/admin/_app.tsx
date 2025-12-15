import React, { useEffect, useState } from 'react';
import { useRouter } from 'next/router';
import axios from 'axios';
import { removeToken } from '../../lib/auth';

function AdminApp({ Component, pageProps }: any) {
  const router = useRouter();
  const [authChecked, setAuthChecked] = useState(false);

  useEffect(() => {
    async function checkAuth() {
      if (router.pathname === '/admin/login') {
        setAuthChecked(true);
        return;
      }
      const token = typeof window !== 'undefined' ? localStorage.getItem('token') : null;
      if (!token) {
        router.replace('/admin/login');
        setAuthChecked(false);
        return;
      }
      try {
        await axios.get('https://34.205.64.185:8000/api/admin/me', {
          headers: { Authorization: `Bearer ${token}` },
        });
        setAuthChecked(true);
      } catch (error) {
        removeToken();
        router.replace('/admin/login');
        setAuthChecked(false);
      }
    }
    checkAuth();
  }, [router.pathname]);

  if (!authChecked) {
    return null; // Or a loading spinner
  }
  return <Component {...pageProps} />;
}

export default AdminApp; 