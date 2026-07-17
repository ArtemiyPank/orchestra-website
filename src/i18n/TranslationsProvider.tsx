"use client"

import { type ReactNode, useState, useEffect } from "react"
import { createInstance, type i18n as I18nInstance } from "i18next"
import { I18nextProvider, initReactI18next } from "react-i18next"
import { resources } from "./resources"
import { defaultLocale, namespaces, type Locale } from "./settings"

interface TranslationsProviderProps {
  locale: Locale
  children: ReactNode
}

// Создаём инстанс синхронно (initImmediate: false) с уже забандленными
// словарями: SSR-вывод и первый клиентский рендер совпадают байт-в-байт,
// поэтому нет ни hydration mismatch, ни состояний "Loading...".
const createI18n = (locale: Locale): I18nInstance => {
  const instance = createInstance()
  instance.use(initReactI18next).init({
    lng: locale,
    fallbackLng: defaultLocale,
    resources,
    ns: namespaces as unknown as string[],
    defaultNS: "about",
    interpolation: { escapeValue: false },
    initImmediate: false,
  })
  return instance
}

export default function TranslationsProvider({ locale, children }: TranslationsProviderProps) {
  const [i18n] = useState(() => createI18n(locale))

  // При клиентском переходе между локалями (next/link) инстанс переживает
  // навигацию — синхронизируем язык с URL.
  useEffect(() => {
    if (i18n.language !== locale) {
      i18n.changeLanguage(locale)
    }
  }, [locale, i18n])

  return <I18nextProvider i18n={i18n}>{children}</I18nextProvider>
}
