import { defineRouting } from 'next-intl/routing';

export const LOCALES = ['en', 'pl', 'nl'] as const;
export type Locale = (typeof LOCALES)[number];

export const localeNames: Record<Locale, string> = {
  en: 'English',
  pl: 'Polski',
  nl: 'Nederlands',
};

export const routing = defineRouting({
  locales: LOCALES,
  defaultLocale: 'en',
  localePrefix: 'always',
});
