const appBase = process.env.NEXT_PUBLIC_APP_URL || "http://127.0.0.1:8000";

export const routes = {
  home: "/",
  product: "/product",
  how: "/how-it-works",
  pricing: "/pricing",
  contact: "/contact",
  privacy: "/privacy",
  terms: "/terms",
  demo: appBase,
  login: `${appBase}/login`,
  workspace: `${appBase}/projects/new`,
};
