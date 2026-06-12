export function GNEMark({ size = 36, glow = true }) {
  return (
    <svg
      width={size}
      height={size}
      viewBox="0 0 32 32"
      style={{
        display: "block",
        filter: glow ? "drop-shadow(0 0 6px rgba(200,247,60,0.5))" : "none",
      }}
      aria-hidden="true"
    >
      <rect x="2" y="2" width="28" height="28" rx="3" fill="none" stroke="var(--lime)" strokeWidth="1.6" />
      <rect x="7" y="7" width="5" height="5" fill="var(--lime)" />
      <rect x="14" y="7" width="5" height="5" fill="var(--lime)" opacity="0.35" />
      <rect x="21" y="7" width="3" height="5" fill="var(--lime)" opacity="0.6" />
      <rect x="7" y="14" width="5" height="5" fill="var(--lime)" opacity="0.35" />
      <rect x="14" y="14" width="5" height="5" fill="var(--lime)" />
      <rect x="21" y="14" width="3" height="5" fill="var(--lime)" opacity="0.35" />
      <rect x="7" y="21" width="5" height="3" fill="var(--lime)" opacity="0.6" />
      <rect x="14" y="21" width="5" height="3" fill="var(--lime)" />
      <rect x="21" y="21" width="3" height="3" fill="var(--lime)" opacity="0.35" />
    </svg>
  );
}

export function GNELockup({ size = 22, color = "var(--fg-0)" }) {
  return (
    <span className="gne-row" style={{ gap: 9 }}>
      <GNEMark size={size + 4} />
      <span style={{ fontSize: size, fontWeight: 600, letterSpacing: 0, color }}>Geek</span>
      <span
        style={{
          fontSize: size,
          fontWeight: 400,
          letterSpacing: 0,
          color: "var(--lime)",
          fontStyle: "italic",
          textShadow: "0 0 6px var(--lime-edge)",
        }}
      >
        Engine
      </span>
    </span>
  );
}
