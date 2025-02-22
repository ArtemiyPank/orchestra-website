'use client';

import { ReactNode } from 'react';
import Navbar from '@/components/Navbar';
import Footer from '@/components/Footer';
import '@/styles/globals.css';
import '@/i18n/i18n';

export default function RootLayout({ children }: { children: ReactNode }) {
  return (
    <html lang="en">
      <body className="bg-light-color text-dark-color">
        <Navbar />
        <main className="p-8 max-w-6xl mx-auto">{children}</main>
        <Footer />
      </body>
    </html>
  );
}
