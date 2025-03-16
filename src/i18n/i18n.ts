import i18n from 'i18next'
import { initReactI18next } from 'react-i18next'

if (typeof window !== 'undefined') {
  // Только в браузере
  // eslint-disable-next-line @typescript-eslint/no-require-imports
  const HttpBackend = require('i18next-http-backend').default
  // eslint-disable-next-line @typescript-eslint/no-require-imports
  const LanguageDetector = require('i18next-browser-languagedetector').default

  i18n
    .use(HttpBackend)
    .use(LanguageDetector)
    .use(initReactI18next)
    .init({
      debug: false,
      fallbackLng: 'en',
      supportedLngs: ['en', 'ru', 'he'],
      ns: ['about', 'alumni', 'footer', 'gallery', 'navbar', 'performances'],
      defaultNS: 'about',
      interpolation: { escapeValue: false },
      backend: {
        loadPath: '/locales/{{lng}}/{{ns}}.json',
      },
      detection: {
        order: ['path', 'cookie', 'localStorage', 'navigator'],
        caches: ['cookie'],
      },
    })
} else {
  // Сервер: без backend, просто инициализация
  i18n
    .use(initReactI18next)
    .init({
      debug: false,
      fallbackLng: 'en',
      supportedLngs: ['en', 'ru', 'he'],
      ns: ['about', 'alumni', 'footer', 'gallery', 'navbar', 'performances'],
      defaultNS: 'about',
      interpolation: { escapeValue: false },
    })
}

export default i18n
