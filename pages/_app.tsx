import React, { useEffect, useState } from 'react'
import '../styles/globals.css'
import type { AppProps } from 'next/app'
import { useRouter } from 'next/router'

function AdminAuthWrapper({ Component, pageProps }: AppProps) {
  const router = useRouter();
  const [authChecked, setAuthChecked] = useState(false);

  useEffect(() => {
    const isAdminRoute = router.pathname.startsWith('/admin');
    const isLogin = router.pathname === '/admin/login';
    if (typeof window !== 'undefined') {
      const token = localStorage.getItem('token');
      if (isAdminRoute && !isLogin && !token) {
        router.replace('/admin/login');
        setAuthChecked(false);
        return;
      } else if (isLogin && token) {
        router.replace('/admin');
        setAuthChecked(false);
        return;
      }
    }
    setAuthChecked(true);
  }, [router.pathname]);

  if (!authChecked) {
    return null; // Or a loading spinner
  }
  return <Component {...pageProps} />;
}

function MyApp(props: AppProps) {
  return <AdminAuthWrapper {...props} />;
}

export default MyApp 