"use client";

import Link from 'next/link';
import { usePathname } from 'next/navigation';
import LanguageSwitcher from './LanguageSwitcher';
import { useTranslation } from 'react-i18next';
import { Suspense } from 'react';

const Navbar = () => {
  const pathname = usePathname();
  const { t, i18n } = useTranslation('navbar');

  const navItems = [
    { path: '/about', label: t('about', { fallback: 'About' }) },
    { path: '/programs', label: t('programs', { fallback: 'Programs' }) },
    { path: '/alumni', label: t('alumni', { fallback: 'Alumni' }) }
  ];

  const isRTL = i18n.dir() === 'rtl';

  return (
    <Suspense fallback={<div>Loading...</div>}>
      <nav className={`bg-white shadow-md p-4 flex items-center justify-between ${isRTL ? 'rtl' : ''}`}>
        
        {/* Навигационные ссылки */}
        <div className="flex gap-8">
          {navItems.map(({ path, label }) => (
            <Link
              key={path}
              href={path}
              className={`text-lg font-semibold transition ${
                pathname === path ? 'text-primary-color underline' : 'text-gray-700'
              } hover:text-primary-color`}
            >
              {label}
            </Link>
          ))}
        </div>

        {/* Переключатель языков */}
        <div className="flex gap-4 rtl:flex-row-reverse">
          <LanguageSwitcher />
        </div>

      </nav>
    </Suspense>
  );
};

export default Navbar;
