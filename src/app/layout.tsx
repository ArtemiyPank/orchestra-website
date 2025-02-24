// src/app/layout.tsx
'use client';

import { ReactNode, useEffect, useState } from 'react';
import Navbar from '@/components/Navbar';
import Footer from '@/components/Footer';
import '@/styles/globals.css';
import '@/i18n/i18n';
import { useTranslation } from 'react-i18next';

export default function RootLayout({ children }: { children: ReactNode }) {
  const { i18n } = useTranslation();
  const [isClient, setIsClient] = useState(false);

  useEffect(() => {
    setIsClient(true);

    // Исправляем прокрутку
    document.body.style.overflow = 'auto';
    document.documentElement.style.overflow = 'auto';
  }, []);

  if (!isClient) {
    return <div className="text-center p-4">Loading interface...</div>;
  }
  

  const currentLang = i18n.language || 'en';
  const isRTL = currentLang === 'he'; // Определяем, нужно ли зеркалить интерфейс

  return (
    <html lang={currentLang} dir={isRTL ? 'rtl' : 'ltr'}>
      <body className={`bg-light-color text-dark-color transition-colors min-h-screen overflow-auto ${isRTL ? 'rtl' : 'ltr'}`}>
        <Navbar />
        <main className="p-8 max-w-6xl mx-auto">{children}</main>
        <Footer />
      </body>
    </html>
  );
}
