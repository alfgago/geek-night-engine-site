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
import enProductArchitect from "@/data/i18n/en/product-architect.json";
import enProductScenes from "@/data/i18n/en/product-scenes.json";
import enProductAssetStudios from "@/data/i18n/en/product-asset-studios.json";
import enProductPlaytest from "@/data/i18n/en/product-playtest.json";
import enProductWorkspace from "@/data/i18n/en/product-workspace.json";
import enHowItWorks from "@/data/i18n/en/how-it-works.json";
import enPricing from "@/data/i18n/en/pricing.json";
import enContact from "@/data/i18n/en/contact.json";
import enAbout from "@/data/i18n/en/about.json";
import enCareers from "@/data/i18n/en/careers.json";
import enLaunchUpdates from "@/data/i18n/en/launch-updates.json";
import enDocs from "@/data/i18n/en/docs.json";
import enGuides from "@/data/i18n/en/guides.json";
import enStatus from "@/data/i18n/en/status.json";
import enLegal from "@/data/i18n/en/legal.json";
import enSecurity from "@/data/i18n/en/security.json";
import enDmca from "@/data/i18n/en/dmca.json";
import enNews from "@/data/i18n/en/news.json";
import esCommon from "@/data/i18n/es/common.json";
import esHome from "@/data/i18n/es/home.json";
import esProduct from "@/data/i18n/es/product.json";
import esProductArchitect from "@/data/i18n/es/product-architect.json";
import esProductScenes from "@/data/i18n/es/product-scenes.json";
import esProductAssetStudios from "@/data/i18n/es/product-asset-studios.json";
import esProductPlaytest from "@/data/i18n/es/product-playtest.json";
import esProductWorkspace from "@/data/i18n/es/product-workspace.json";
import esHowItWorks from "@/data/i18n/es/how-it-works.json";
import esPricing from "@/data/i18n/es/pricing.json";
import esContact from "@/data/i18n/es/contact.json";
import esAbout from "@/data/i18n/es/about.json";
import esCareers from "@/data/i18n/es/careers.json";
import esLaunchUpdates from "@/data/i18n/es/launch-updates.json";
import esDocs from "@/data/i18n/es/docs.json";
import esGuides from "@/data/i18n/es/guides.json";
import esStatus from "@/data/i18n/es/status.json";
import esLegal from "@/data/i18n/es/legal.json";
import esSecurity from "@/data/i18n/es/security.json";
import esDmca from "@/data/i18n/es/dmca.json";
import esNews from "@/data/i18n/es/news.json";

import { defaultLocale, isLocale, locales, localizePath, pickLocale, LOCALE_COOKIE } from "./locales";

export { defaultLocale, isLocale, locales, localizePath, pickLocale, LOCALE_COOKIE };

const dictionaries = {
  en: {
    common: enCommon,
    home: enHome,
    product: enProduct,
    "product-architect": enProductArchitect,
    "product-scenes": enProductScenes,
    "product-asset-studios": enProductAssetStudios,
    "product-playtest": enProductPlaytest,
    "product-workspace": enProductWorkspace,
    "how-it-works": enHowItWorks,
    pricing: enPricing,
    contact: enContact,
    about: enAbout,
    careers: enCareers,
    "launch-updates": enLaunchUpdates,
    docs: enDocs,
    guides: enGuides,
    status: enStatus,
    legal: enLegal,
    security: enSecurity,
    dmca: enDmca,
    news: enNews,
  },
  es: {
    common: esCommon,
    home: esHome,
    product: esProduct,
    "product-architect": esProductArchitect,
    "product-scenes": esProductScenes,
    "product-asset-studios": esProductAssetStudios,
    "product-playtest": esProductPlaytest,
    "product-workspace": esProductWorkspace,
    "how-it-works": esHowItWorks,
    pricing: esPricing,
    contact: esContact,
    about: esAbout,
    careers: esCareers,
    "launch-updates": esLaunchUpdates,
    docs: esDocs,
    guides: esGuides,
    status: esStatus,
    legal: esLegal,
    security: esSecurity,
    dmca: esDmca,
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
