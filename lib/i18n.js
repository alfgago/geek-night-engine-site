/**
 * Dictionary loader for the marketing site.
 *
 * Namespaced JSON dictionaries are wired through a static import map so
 * everything resolves at build time (SSG-safe — no fs access or dynamic
 * imports at runtime). `data/i18n/es/*` must keep an identical key
 * structure to `data/i18n/en/*`; the contract tests enforce this.
 */
import enCommon from "@/data/i18n/en/common.json";
import enHome from "@/data/i18n/en/home.json";
import enProduct from "@/data/i18n/en/product.json";
import enHowItWorks from "@/data/i18n/en/how-it-works.json";
import enPricing from "@/data/i18n/en/pricing.json";
import enContact from "@/data/i18n/en/contact.json";
import enLegal from "@/data/i18n/en/legal.json";
import enNews from "@/data/i18n/en/news.json";
import esCommon from "@/data/i18n/es/common.json";
import esHome from "@/data/i18n/es/home.json";
import esProduct from "@/data/i18n/es/product.json";
import esHowItWorks from "@/data/i18n/es/how-it-works.json";
import esPricing from "@/data/i18n/es/pricing.json";
import esContact from "@/data/i18n/es/contact.json";
import esLegal from "@/data/i18n/es/legal.json";
import esNews from "@/data/i18n/es/news.json";

import { defaultLocale, isLocale, locales, localizePath, pickLocale, LOCALE_COOKIE } from "./locales";

export { defaultLocale, isLocale, locales, localizePath, pickLocale, LOCALE_COOKIE };

const dictionaries = {
  en: {
    common: enCommon,
    home: enHome,
    product: enProduct,
    "how-it-works": enHowItWorks,
    pricing: enPricing,
    contact: enContact,
    legal: enLegal,
    news: enNews,
  },
  es: {
    common: esCommon,
    home: esHome,
    product: esProduct,
    "how-it-works": esHowItWorks,
    pricing: esPricing,
    contact: esContact,
    legal: esLegal,
    news: esNews,
  },
};

export function getDictionary(lang, namespace) {
  const locale = isLocale(lang) ? lang : defaultLocale;
  const dictionary = dictionaries[locale][namespace];

  if (!dictionary) {
    throw new Error(`Unknown i18n namespace "${namespace}" for locale "${locale}"`);
  }

  return dictionary;
}

/**
 * Minimal `{placeholder}` interpolation so numbers, prices, and emails can
 * live in exactly one place (data/marketing-data.js) while the surrounding
 * copy is translated.
 */
export function format(template, vars = {}) {
  if (typeof template !== "string") {
    return template;
  }

  return template.replace(/\{(\w+)\}/g, (match, key) =>
    Object.prototype.hasOwnProperty.call(vars, key) ? String(vars[key]) : match,
  );
}
