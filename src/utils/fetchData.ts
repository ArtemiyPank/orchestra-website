import programs from "@/data/programs.json";
import alumni from "@/data/alumni.json";
import { Program } from "@/types/Program";
import { Alumni } from "@/types/Alumni";

const availableLocales = ["en", "ru", "he"] as const;
type Locale = (typeof availableLocales)[number]; // "en" | "ru" | "he"

export const fetchData = <T extends "programs" | "alumni">(
  type: T,
  locale: Locale
): T extends "programs" ? Program[] : Alumni[] => {
  if (!availableLocales.includes(locale)) {
    console.warn(`Unsupported locale: ${locale}, defaulting to "en"`);
    locale = "en";
  }

  if (type === "programs") {
    return programs[locale] as never;
  }

  if (type === "alumni") {
    return alumni[locale] as never;
  }

  return [] as never;
};
