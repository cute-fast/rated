import React from 'react';
import Link from 'next/link';
import AdminTopbar from '../../components/admin/AdminTopbar';

const sidebarLinks = [
  { href: '/admin/categories-manager', label: 'Category Manager' },
  { href: '/admin/products', label: 'Product Manager' },
  { href: '/admin/excel', label: 'Excel Import/Export' },
  { href: '/admin/admins', label: 'Admin Manager' },
  { href: '/admin/indexing', label: 'Search Indexing' },
];

export default function AdminDashboard() {
  return (
    <div className="min-h-screen flex bg-gray-100">
      <aside className="w-64 bg-white shadow h-screen p-6">
        <h2 className="text-xl font-bold mb-8">Admin Dashboard</h2>
        <nav>
          <ul className="space-y-4">
            {sidebarLinks.map(link => (
              <li key={link.href}>
                <Link href={link.href} className="text-gray-700 hover:text-blue-600">
                  {link.label}
                </Link>
              </li>
            ))}
          </ul>
        </nav>
      </aside>
      <main className="flex-1 p-8">
        <AdminTopbar />
        <section>
          {/* TODO: Render selected admin tool here */}
          <div className="bg-white rounded shadow p-6">Select a tool from the sidebar.</div>
        </section>
      </main>
    </div>
  );
} 