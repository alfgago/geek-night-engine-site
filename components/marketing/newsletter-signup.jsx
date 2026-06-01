"use client";

import { useId, useState } from "react";
import { Icon, I } from "./icons";

const provider = process.env.NEXT_PUBLIC_NEWSLETTER_PROVIDER || "Newsletter";
const formAction = process.env.NEXT_PUBLIC_NEWSLETTER_FORM_ACTION || "";
const formMethod = process.env.NEXT_PUBLIC_NEWSLETTER_FORM_METHOD || "post";
const emailField = process.env.NEXT_PUBLIC_NEWSLETTER_EMAIL_FIELD || "email";
const sourceField = process.env.NEXT_PUBLIC_NEWSLETTER_SOURCE_FIELD || "";
const sourceValue = process.env.NEXT_PUBLIC_NEWSLETTER_SOURCE_VALUE || "next-site";
const tagField = process.env.NEXT_PUBLIC_NEWSLETTER_TAG_FIELD || "";
const tagValue = process.env.NEXT_PUBLIC_NEWSLETTER_TAG_VALUE || "";

export function NewsletterSignup({ id = "newsletter", eyebrow = "Newsletter", heading, sub, compact = false }) {
  const emailId = useId();
  const [status, setStatus] = useState("");
  const isConfigured = Boolean(formAction);

  function handleSubmit(event) {
    if (isConfigured) {
      return;
    }

    event.preventDefault();
    setStatus("Newsletter signup is almost ready. Check back soon or email hey@geeknight.engine.");
  }

  return (
    <div
      id={id}
      data-anim="reveal"
      className="card"
      style={{
        padding: compact ? "18px 18px" : "28px 28px",
        background: "linear-gradient(135deg, rgba(200,247,60,0.08), rgba(116,214,200,0.04)), var(--bg-2)",
        border: "1px solid var(--lime-edge)",
        boxShadow: compact ? "none" : "0 24px 70px -40px rgba(200,247,60,0.45)",
        textAlign: "left",
      }}
    >
      <div className="label-cap" style={{ marginBottom: 10, color: "var(--lime)" }}>
        {eyebrow}
      </div>
      {heading && (
        <h2
          className="pretty"
          style={{
            fontSize: compact ? 22 : "clamp(28px, 4vw, 40px)",
            lineHeight: 1.08,
            letterSpacing: 0,
            margin: 0,
            fontWeight: 600,
          }}
        >
          {heading}
        </h2>
      )}
      {sub && (
        <p className="pretty" style={{ fontSize: compact ? 13.5 : 15.5, lineHeight: 1.6, color: "var(--fg-1)", margin: "14px 0 20px" }}>
          {sub}
        </p>
      )}
      <form
        action={isConfigured ? formAction : "#newsletter"}
        method={formMethod}
        onSubmit={handleSubmit}
        className="gne-row"
        style={{ gap: 8, alignItems: "stretch", flexWrap: "wrap" }}
      >
        <label htmlFor={emailId} className="label-cap" style={{ position: "absolute", width: 1, height: 1, overflow: "hidden", clip: "rect(0 0 0 0)" }}>
          Email address
        </label>
        <input
          id={emailId}
          className="input"
          name={emailField}
          type="email"
          autoComplete="email"
          required
          placeholder="you@studio.com"
          style={{ minHeight: 42, flex: "1 1 260px", background: "rgba(12,12,10,0.72)" }}
        />
        {sourceField && <input type="hidden" name={sourceField} value={sourceValue} />}
        {tagField && tagValue && <input type="hidden" name={tagField} value={tagValue} />}
        <button type="submit" className="btn primary lg" style={{ minHeight: 42, padding: "0 18px", flex: "0 0 auto" }}>
          <Icon d={I.bell} size={13} /> Subscribe
        </button>
      </form>
      <div className="mono" style={{ marginTop: 12, fontSize: 11, lineHeight: 1.5, color: "var(--fg-3)" }}>
        {status || `Product access is coming soon. Subscribe for launch notes through ${provider}.`}
      </div>
    </div>
  );
}
