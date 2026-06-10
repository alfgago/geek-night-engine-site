# Geek Night Engine Marketing Site

Public marketing and legal site for Geek Night Engine, implemented in Next.js App Router.

The site is a faithful port of the reference prototype in `../design-reference/marketing-site/*`. Keep that directory as the visual and copy source of truth when making future changes.

## Routes

- `/` - Home
- `/product` - Product architecture and module previews
- `/how-it-works` - Four-stage production pipeline
- `/pricing` - Plans, credits, add-ons, and FAQ
- `/news` - Launch updates and product news
- `/contact` - Support channels and workspace ticket form
- `/privacy` - Privacy Policy
- `/terms` - Terms & Conditions

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
app/
  layout.jsx
  globals.css
  page.jsx
  product/page.jsx
  how-it-works/page.jsx
  pricing/page.jsx
  news/page.jsx
  contact/page.jsx
  privacy/page.jsx
  terms/page.jsx
components/marketing/
  chrome.jsx
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
  news-posts.js
lib/
  site-links.js
```

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

The animation component is client-only and mounted once from `app/layout.jsx`.

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
