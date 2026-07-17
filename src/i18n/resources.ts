// Все переводы весят ~19KB (≈5KB gzip), поэтому бандлим их статически:
// один источник для сервера и клиента, синхронная инициализация i18next,
// мгновенное переключение языка и полный SSR без HTTP-загрузки словарей.
import enAbout from "../../public/locales/en/about.json"
import enAlumni from "../../public/locales/en/alumni.json"
import enCommon from "../../public/locales/en/common.json"
import enFooter from "../../public/locales/en/footer.json"
import enGallery from "../../public/locales/en/gallery.json"
import enNavbar from "../../public/locales/en/navbar.json"
import enPerformances from "../../public/locales/en/performances.json"
import enVocalGroup from "../../public/locales/en/vocal-group.json"

import ruAbout from "../../public/locales/ru/about.json"
import ruAlumni from "../../public/locales/ru/alumni.json"
import ruCommon from "../../public/locales/ru/common.json"
import ruFooter from "../../public/locales/ru/footer.json"
import ruGallery from "../../public/locales/ru/gallery.json"
import ruNavbar from "../../public/locales/ru/navbar.json"
import ruPerformances from "../../public/locales/ru/performances.json"
import ruVocalGroup from "../../public/locales/ru/vocal-group.json"

import heAbout from "../../public/locales/he/about.json"
import heAlumni from "../../public/locales/he/alumni.json"
import heCommon from "../../public/locales/he/common.json"
import heFooter from "../../public/locales/he/footer.json"
import heGallery from "../../public/locales/he/gallery.json"
import heNavbar from "../../public/locales/he/navbar.json"
import hePerformances from "../../public/locales/he/performances.json"
import heVocalGroup from "../../public/locales/he/vocal-group.json"

export const resources = {
  en: {
    about: enAbout,
    alumni: enAlumni,
    common: enCommon,
    footer: enFooter,
    gallery: enGallery,
    navbar: enNavbar,
    performances: enPerformances,
    "vocal-group": enVocalGroup,
  },
  ru: {
    about: ruAbout,
    alumni: ruAlumni,
    common: ruCommon,
    footer: ruFooter,
    gallery: ruGallery,
    navbar: ruNavbar,
    performances: ruPerformances,
    "vocal-group": ruVocalGroup,
  },
  he: {
    about: heAbout,
    alumni: heAlumni,
    common: heCommon,
    footer: heFooter,
    gallery: heGallery,
    navbar: heNavbar,
    performances: hePerformances,
    "vocal-group": heVocalGroup,
  },
} as const
