import { NextResponse } from "next/server";
import { isLocale, pickLocale, LOCALE_COOKIE } from "./lib/locales";

/**
 * Locale-prefix middleware.
 *
 * Requests that already carry a supported locale segment (/en/..., /es/...)
 * pass through. Anything else is 307-redirected to the best locale:
 *   1. the NEXT_LOCALE cookie when present and valid (set client-side by
 *      the language switcher — the middleware only reads it), else
 *   2. the Accept-Language header (es* → es, everything else → en).
 *
 * Static assets, API routes, Next internals, and metadata files are skipped
 * via the matcher below.
 */
export function middleware(request) {
  const { pathname, search } = request.nextUrl;

  const firstSegment = pathname.split("/")[1];
  if (isLocale(firstSegment)) {
    return NextResponse.next();
  }

  const cookieLocale = request.cookies.get(LOCALE_COOKIE)?.value;
  const locale = isLocale(cookieLocale)
    ? cookieLocale
    : pickLocale(request.headers.get("accept-language"));

  const url = request.nextUrl.clone();
  url.pathname = pathname === "/" ? `/${locale}` : `/${locale}${pathname}`;
  url.search = search;

  return NextResponse.redirect(url, 307);
}

export const config = {
  // Skip API routes, Next internals, and any path with a file extension
  // (sitemap.xml, robots.txt, icon.svg, fonts, images, ...).
  matcher: ["/((?!api|_next|.*\\..*).*)"],
};
