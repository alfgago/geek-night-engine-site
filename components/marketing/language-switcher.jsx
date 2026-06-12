"use client";

import { useRouter, usePathname } from "next/navigation";
import { isLocale, locales, LOCALE_COOKIE } from "@/lib/locales";

/**
 * EN | ES locale toggle, used in the desktop nav and the mobile overlay.
 * - Renders real links (crawlable) to the same path under the other locale.
 * - On click: persists NEXT_LOCALE for a year (the middleware reads it for
 *   future locale-less requests) and client-navigates, preserving the
 *   current pathname, query string, and hash.
 * - Current locale is highlighted (lime) and exposed via aria-current +
 *   aria-pressed-equivalent semantics for assistive tech.
 */
export function LanguageSwitcher({ lang, label, names, onNavigate }) {
  const router = useRouter();
  const pathname = usePathname() || "/";

  function pathFor(targetLocale) {
    const segments = pathname.split("/");
    if (isLocale(segments[1])) {
      segments[1] = targetLocale;
    } else {
      segments.splice(1, 0, targetLocale);
    }
    return segments.join("/") || `/${targetLocale}`;
  }

  function switchTo(event, targetLocale) {
    event.preventDefault();
    document.cookie = `${LOCALE_COOKIE}=${targetLocale}; path=/; max-age=31536000; samesite=lax`;

    const target = `${pathFor(targetLocale)}${window.location.search}${window.location.hash}`;
    if (onNavigate) {
      onNavigate();
    }
    router.push(target);
  }

  return (
    <span className="lang-switch" role="group" aria-label={label}>
      {locales.map((locale) => {
        const active = locale === lang;
        return (
          <a
            key={locale}
            href={pathFor(locale)}
            lang={locale}
            className="lang-switch-option"
            data-active={active}
            aria-current={active ? "true" : undefined}
            aria-label={names?.[`${locale}Full`] || locale}
            onClick={(event) => switchTo(event, locale)}
          >
            {names?.[locale] || locale.toUpperCase()}
          </a>
        );
      })}
    </span>
  );
}
