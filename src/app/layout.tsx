'use client';

import { ReactNode, useEffect } from 'react';
import Navbar from '@/components/Navbar';
import Footer from '@/components/Footer';
import '@/styles/globals.css';
import '@/i18n/i18n';
import { useTranslation } from 'react-i18next';

export default function RootLayout({ children }: { children: ReactNode }) {
  const { i18n } = useTranslation();

  useEffect(() => {
    const currentLang = i18n.language;
    const direction = i18n.dir(currentLang);
    
    document.documentElement.lang = currentLang;
    document.documentElement.dir = direction;

    // Добавляем или удаляем класс 'rtl' в зависимости от направления
    document.body.classList.toggle('rtl', direction === 'rtl');
  }, [i18n, i18n.language]);

  return (
    <html lang={i18n.language} dir={i18n.dir()}>
      <body className="bg-light-color text-dark-color transition-colors">
        <Navbar />
        <main className="p-8 max-w-6xl mx-auto">{children}</main>
        <Footer />
      </body>
    </html>
  );
}
