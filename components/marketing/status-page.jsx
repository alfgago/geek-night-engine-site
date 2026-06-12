import { format, getDictionary } from "@/lib/i18n";
import { CtaStrip, PageHero, SiteFooter, SiteNav } from "./chrome";
import { Icon, I } from "./icons";

const APP_HEALTH_URL = "https://app.geekengine.ai/up";

/**
 * Probes the app platform's health endpoint from our edge. A 200 within the
 * timeout is "operational"; anything else (non-200, network error, timeout)
 * is reported honestly as "unreachable from our edge" rather than a hard
 * outage claim. Revalidates every 60s so the page stays fresh without
 * hammering the upstream.
 */
async function probeAppPlatform() {
  try {
    const controller = new AbortController();
    const timeout = setTimeout(() => controller.abort(), 3000);
    const response = await fetch(APP_HEALTH_URL, {
      signal: controller.signal,
      next: { revalidate: 60 },
    });
    clearTimeout(timeout);
    return response.ok ? "operational" : "degraded";
  } catch {
    return "degraded";
  }
}

export async function StatusPage({ lang }) {
  const t = getDictionary(lang, "status");
  const appState = await probeAppPlatform();
  const checkedAt = new Date().toISOString().replace("T", " ").slice(0, 16) + " UTC";

  return (
    <>
      <SiteNav lang={lang} current="status" />
      <PageHero lang={lang} eyebrow={t.hero.eyebrow} heading={t.hero.heading} sub={t.hero.sub} />
      <section className="site-section" style={{ background: "var(--bg-1)" }}>
        <div style={{ maxWidth: 860, margin: "0 auto" }}>
          <div data-anim="reveal" className="label-cap" style={{ marginBottom: 16 }}>
            {t.rows.label}
          </div>
          <div className="card" style={{ padding: 0, background: "var(--bg-2)", border: "1px solid var(--border-1)", overflow: "hidden" }}>
            <StatusRow
              name={t.rows.appPlatform}
              tone={appState === "operational" ? "lime" : "amber"}
              value={appState === "operational" ? t.rows.operational : t.rows.degraded}
            />
            <StatusRow name={t.rows.marketingSite} tone="lime" value={t.rows.marketingValue} last />
          </div>
          <div data-anim="reveal" className="mono" style={{ fontSize: 11.5, color: "var(--fg-3)", marginTop: 16 }}>
            {format(t.rows.lastChecked, { time: checkedAt })}
          </div>
          <p data-anim="reveal" className="pretty" style={{ fontSize: 13.5, lineHeight: 1.65, color: "var(--fg-2)", margin: "20px 0 0", maxWidth: 640 }}>
            {t.note}
          </p>
        </div>
      </section>
      <CtaStrip lang={lang} heading={t.ctaStrip.heading} sub={t.ctaStrip.sub} cta={t.ctaStrip.cta} />
      <SiteFooter lang={lang} />
    </>
  );
}

function StatusRow({ name, tone, value, last }) {
  return (
    <div
      className="gne-row"
      style={{
        padding: "18px 22px",
        gap: 14,
        borderBottom: last ? "none" : "1px solid var(--border-1)",
      }}
    >
      <span className={`dot ${tone}`} />
      <span style={{ fontSize: 15, fontWeight: 500, color: "var(--fg-0)" }}>{name}</span>
      <div style={{ flex: 1 }} />
      <span className={`chip ${tone}`} style={{ gap: 6 }}>
        <Icon d={tone === "lime" ? I.check : I.alert} size={11} stroke={2.4} /> {value}
      </span>
    </div>
  );
}
