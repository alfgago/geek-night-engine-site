const appBase = process.env.NEXT_PUBLIC_APP_URL || "http://127.0.0.1:8000";

export const routes = {
  home: "/",
  product: "/product",
  how: "/how-it-works",
  pricing: "/pricing",
  news: "/news",
  contact: "/contact",
  privacy: "/privacy",
  terms: "/terms",
  newsletter: "/#newsletter",
  demo: appBase,
  login: `${appBase}/login`,
  workspace: `${appBase}/projects/new`,
};
