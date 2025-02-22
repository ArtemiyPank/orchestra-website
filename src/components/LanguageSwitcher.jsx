'use client';

import { useTranslation } from 'react-i18next';
import { useEffect } from 'react';

const LanguageSwitcher = () => {
  const { i18n } = useTranslation();

  const changeLanguage = (lang) => {
    i18n.changeLanguage(lang);
    document.documentElement.lang = lang;
    document.documentElement.dir = i18n.dir(lang);
  };

  useEffect(() => {
    document.documentElement.dir = i18n.dir();
  }, [i18n.language]);

  return (
    <div className="flex gap-4 rtl:flex-row-reverse">
      {['en', 'ru', 'he'].map((lang) => (
        <button
          key={lang}
          className={`p-1 transition ${
            i18n.language === lang ? 'font-bold text-primary-color' : 'text-gray-700'
          } hover:text-primary-color`}
          onClick={() => changeLanguage(lang)}
        >
          {lang.toUpperCase()}
        </button>
      ))}
    </div>
  );
};

export default LanguageSwitcher;
