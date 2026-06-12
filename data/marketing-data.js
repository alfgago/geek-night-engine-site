/**
 * Locale-independent marketing data.
 *
 * Single source of truth for pricing numbers, contact emails, and other
 * values that must stay identical across every locale. Translated copy
 * lives in `data/i18n/{lang}/*.json` and interpolates these values, so
 * EN/ES pricing can never drift apart.
 *
 * Keep these numbers consistent with `inertia-app` `PricingCatalog` and
 * the root `PRICING.md`.
 */

export const pricingNumbers = {
  // 1,000 credits == $1.00 of background processing / AI consumption.
  creditUnit: { credits: "1,000", value: "$1.00" },
  // Studio Pro native store export costs this many credits per export.
  storeExportCredits: "250",
  tiers: {
    hobbyist: {
      // Free tier: 5,000 credits granted on signup, then refills to
      // 1,500/month (does not accumulate).
      price: "$0",
      priceAnnual: "$0",
      seats: "1",
      credits: "5,000",
      monthlyCredits: "1,500",
      storageGb: "1",
      storageOveragePerGb: null,
    },
    core: {
      price: "$29",
      priceAnnual: "$290",
      seats: "3",
      credits: "30,000",
      storageGb: "25",
      storageOveragePerGb: "$0.50",
    },
    studio: {
      price: "$99",
      priceAnnual: "$990",
      seats: "10",
      credits: "100,000",
      storageGb: "100",
      storageOveragePerGb: "$0.40",
    },
  },
  addOns: {
    seat: { cost: "$10", bonusCredits: "5,000" },
    credits: { cost: "$1.50", unitCredits: "1,000" },
    database: { cost: "$19" },
  },
};

export const contacts = {
  support: "hey@geekengine.ai",
  studios: "studios@geekengine.ai",
  privacy: "privacy@geekengine.ai",
  legal: "legal@geekengine.ai",
  dmca: "dmca@geekengine.ai",
  statusHost: "status.geekengine.ai",
};
