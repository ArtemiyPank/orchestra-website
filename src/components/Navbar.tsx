// src/components/Navbar.tsx
"use client";

import Link from 'next/link';
import { useTranslation } from 'react-i18next';
import LanguageSwitcher from './LanguageSwitcher';

const Navbar = () => {
  const { t, i18n, ready } = useTranslation('navbar');

  if (!ready) {
    return null;
  }

  const isRTL = i18n.language === 'he';

  return (
    <nav className="bg-white shadow-md p-4 flex items-center justify-between">
      {!isRTL && (
        <div className="flex gap-8">
          <Link href="/about" className="text-lg font-semibold">
            {t('about', { defaultValue: 'About' })}
          </Link>
          <Link href="/programs" className="text-lg font-semibold">
            {t('programs', { defaultValue: 'Programs' })}
          </Link>
          <Link href="/alumni" className="text-lg font-semibold">
            {t('alumni', { defaultValue: 'Alumni' })}
          </Link>
        </div>
      )}

      <LanguageSwitcher />

      {isRTL && (
        <div className="flex gap-8">
          <Link href="/about" className="text-lg font-semibold">
            {t('about', { defaultValue: 'About' })}
          </Link>
          <Link href="/programs" className="text-lg font-semibold">
            {t('programs', { defaultValue: 'Programs' })}
          </Link>
          <Link href="/alumni" className="text-lg font-semibold">
            {t('alumni', { defaultValue: 'Alumni' })}
          </Link>
        </div>
      )}
    </nav>
  );
};

export default Navbar;
