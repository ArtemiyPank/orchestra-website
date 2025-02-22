// src/components/LanguageSwitcher.tsx
"use client";

import { useTranslation } from 'react-i18next';

const LanguageSwitcher = () => {
  const { i18n } = useTranslation();

  const changeLanguage = (lng: string) => {
    i18n.changeLanguage(lng);
  };

  const isRTL = i18n.language === 'he';

  return (
    <div className={`flex space-x-2 ${isRTL ? 'flex-row-reverse space-x-reverse' : ''}`}>
      <button
        onClick={() => changeLanguage('en')}
        className={`px-4 py-2 mx-2 rounded ${i18n.language === 'en' ? 'bg-primary-color text-white' : 'bg-light-color'}`}
      >
        EN
      </button>
      <button
        onClick={() => changeLanguage('ru')}
        className={`px-4 py-2 rounded ${i18n.language === 'ru' ? 'bg-primary-color text-white' : 'bg-light-color'}`}
      >
        RU
      </button>
      <button
        onClick={() => changeLanguage('he')}
        className={`px-4 py-2 rounded ${i18n.language === 'he' ? 'bg-primary-color text-white' : 'bg-light-color'}`}
      >
        HE
      </button>
    </div>
  );
};

export default LanguageSwitcher;
