# Geek Engine Marketing Site

Public marketing and legal site for Geek Engine, implemented in Next.js App Router.

The site is a faithful port of the reference prototype in `../design-reference/marketing-site/*`. Keep that directory as the visual and copy source of truth when making future changes.

## Routes

All marketing routes are served under a locale segment (`/en/...` and `/es/...`). Requests without a locale prefix are 307-redirected by `middleware.js` using the `NEXT_LOCALE` cookie when present, otherwise the `Accept-Language` header (`es*` → `/es`, default `/en`).

- `/{lang}` - Home
- `/{lang}/product` - Product architecture and module previews
- `/{lang}/how-it-works` - Four-stage production pipeline
- `/{lang}/pricing` - Plans, credits, add-ons, and FAQ
- `/{lang}/news` - Launch updates and product news
- `/{lang}/contact` - Support channels and workspace ticket form
- `/{lang}/privacy` - Privacy Policy
- `/{lang}/terms` - Terms & Conditions

## Commands

```powershell
npm install
npm run dev
npm run build
npm run start
```

Default local URL:

```text
http://127.0.0.1:3000
```

## Environment

```text
NEXT_PUBLIC_APP_URL=http://127.0.0.1:8000
NEXT_PUBLIC_NEWSLETTER_PROVIDER=Brevo
NEXT_PUBLIC_NEWSLETTER_FORM_ACTION=https://YOUR_BREVO_FORM_ACTION_URL
NEXT_PUBLIC_NEWSLETTER_FORM_METHOD=post
NEXT_PUBLIC_NEWSLETTER_EMAIL_FIELD=EMAIL
```

`NEXT_PUBLIC_APP_URL` controls product-app/demo link targets. Launch, login, and registration-style CTAs currently point to the newsletter because product access is marked coming soon.

`NEXT_PUBLIC_NEWSLETTER_*` controls the hosted newsletter form. For an MVP, Brevo is the recommended default because its free tier is generous for early waitlists, including 300 daily email sends. Paste the public form `action` URL from your Brevo signup form embed and keep private API keys out of `NEXT_PUBLIC_*` variables. Brevo's default email field is commonly `EMAIL`; confirm the field name in the generated embed if you customize the form.

The Laravel/Inertia app has the inverse variable:

```text
VITE_MARKETING_URL=https://your-marketing-domain.example
```

That value controls the Privacy Policy and Terms & Conditions links rendered in the product app auth screen.

## Structure

```text
middleware.js            locale redirect (cookie -> Accept-Language -> en)
app/
  globals.css
  sitemap.js             lists /en and /es trees with hreflang alternates
  robots.js
  [lang]/
    layout.jsx           html shell, fonts, generateStaticParams(en|es)
    page.jsx
    opengraph-image.jsx  per-locale OG image (dictionary copy)
    product/page.jsx
    how-it-works/page.jsx
    pricing/page.jsx
    news/page.jsx
    news/[slug]/page.jsx
    contact/page.jsx
    privacy/page.jsx
    terms/page.jsx
components/marketing/
  chrome.jsx
  language-switcher.jsx
  newsletter-signup.jsx
  icons.jsx
  hero-product-mock.jsx
  module-previews.jsx
  marketing-animations.jsx
  home-page.jsx
  product-page.jsx
  how-it-works-page.jsx
  pricing-page.jsx
  news-page.jsx
  contact-page.jsx
  legal-page.jsx
data/
  marketing-data.js      canonical pricing numbers + contact emails
  news-posts.js          canonical post records (slug, dates, source URLs)
  i18n/{en,es}/*.json    per-namespace dictionaries (identical key trees)
lib/
  locales.js             locale list, Accept-Language parser, path helper
  i18n.js                static dictionary import map + getDictionary/format
  site-links.js
```

## Internationalization

- Locales: `en` (default) and `es`. `lib/i18n.js` resolves namespaced dictionaries (`common`, `home`, `product`, `how-it-works`, `pricing`, `contact`, `legal`, `news`, `news-posts`) through static imports, so SSG works without runtime fs access.
- `data/i18n/es/*` must keep the exact key structure of `data/i18n/en/*`; `tests/i18n-contract.test.mjs` enforces recursive key parity and placeholder parity.
- Pricing numbers, storage quotas, and contact emails live only in `data/marketing-data.js` and are interpolated into dictionary strings via `{placeholders}` — never hard-code them in dictionaries.
- The language switcher (`components/marketing/language-switcher.jsx`) sets the `NEXT_LOCALE` cookie for a year and navigates to the same path under the other locale. The middleware only reads the cookie.
- Product-UI mockups (`hero-product-mock.jsx`, `module-previews.jsx`, `previews.jsx`, and the pinned pipeline stages) deliberately stay in English: they simulate the in-app workspace, which ships in English.
- The Spanish dictionaries currently contain English copy as structural placeholders awaiting translation. Spanish legal copy (`data/i18n/es/legal.json`) must be reviewed by counsel before launch.

## Design System

Design tokens live in `app/globals.css` and mirror the reference token file:

- warm near-black surface scale
- phosphor lime primary accent
- amber, red, cyan, and violet support accents
- Geist / Geist Mono font pairing
- 4px to 16px radius scale
- shared primitives for buttons, chips, cards, rows, labels, placeholders, avatars, scanlines, and checker backgrounds

Reusable page chrome lives in `components/marketing/chrome.jsx`:

- `SiteNav`
- `PageHero`
- `CtaStrip`
- `SiteFooter`
- brand mark and lockup components

Page modules keep repeated copy in arrays and map to card/module components for maintainability.

## Animation

`components/marketing/marketing-animations.jsx` ports the reference GSAP behavior:

- hero word reveal
- scroll reveal
- card stagger/tilt
- pricing hover lift and featured pulse
- pinned pipeline scrub on `/how-it-works`
- footer wordmark rise
- CTA glow pulse

The animation component is client-only and mounted once from `app/[lang]/layout.jsx`. It re-binds on `usePathname()` changes, which include the locale segment, so triggers tear down and rebuild correctly when switching languages.

## Legal Pages

The Privacy Policy and Terms & Conditions pages are implementation-ready drafts based on the product app's actual data flows:

- accounts and organizations
- projects, GDDs, prompts, snapshots, assets, and build logs
- AI processing
- playtest links, feedback, and telemetry
- billing, credits, and subscriptions
- support/contact requests

Before production, review these pages against the final legal entity, mailing address, vendor list, data retention schedule, subscription flow, launch jurisdictions, and counsel guidance.

## Maintenance Notes

- Preserve copy/design parity with `../design-reference/marketing-site/*` unless the user explicitly asks for a redesign.
- Keep product-app links centralized in `lib/site-links.js`.
- Keep legal links in both `SiteFooter` and `inertia-app/resources/js/features/auth/LoginScreen.jsx`.
- Avoid adding app-dashboard logic to this site. The authenticated product app remains in `../inertia-app`.
