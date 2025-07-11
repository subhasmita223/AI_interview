// app/dashboard/layout.jsx

import React from 'react';
import Header from './_components/Header';

export const metadata = {
  title: 'Dashboard | PrepGen',
  description: 'Manage your AI mock interviews.',
};

export default function DashboardLayout({ children }) {
  return (
    <div>
      <Header />
      <div className="mx-5 md:mx-20 lg:mx-36 py-8">
        {children}
      </div>
    </div>
  );
}
