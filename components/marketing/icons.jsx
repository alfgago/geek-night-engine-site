export function Icon({ d, size = 14, fill = false, stroke = 1.6, style }) {
  return (
    <svg
      width={size}
      height={size}
      viewBox="0 0 24 24"
      fill={fill ? "currentColor" : "none"}
      stroke="currentColor"
      strokeWidth={stroke}
      strokeLinecap="round"
      strokeLinejoin="round"
      style={{ flex: "0 0 auto", display: "block", ...style }}
      aria-hidden="true"
    >
      {typeof d === "string" ? <path d={d} /> : d}
    </svg>
  );
}

export const I = {
  logo: (
    <g>
      <path d="M4 5h6v6H4z" />
      <path d="M14 5h6v6h-6z" opacity="0.6" />
      <path d="M4 13h6v6H4z" opacity="0.6" />
      <path d="M14 13h6v6h-6z" />
    </g>
  ),
  search:
    "M11 4a7 7 0 1 0 4.32 12.51l3.59 3.59 1.42-1.42-3.59-3.59A7 7 0 0 0 11 4Zm0 2a5 5 0 1 1 0 10 5 5 0 0 1 0-10Z",
  plus: "M12 5v14M5 12h14",
  chevDown: "m6 9 6 6 6-6",
  chevRight: "m9 6 6 6-6 6",
  close: "M18 6 6 18M6 6l12 12",
  check: "m5 12 5 5L20 7",
  play: "M8 5v14l11-7z",
  spark:
    "m12 2 2.39 6.97L21 11l-5.5 4.5L17 22l-5-3.5L7 22l1.5-6.5L3 11l6.61-2.03L12 2z",
  share: "M4 12v8a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2v-8M16 6l-4-4-4 4M12 2v13",
  upload: "M21 15v4a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2v-4M17 8l-5-5-5 5M12 3v12",
  history: "M3 12a9 9 0 1 0 9-9 M3 3v6h6 M12 7v5l4 2",
  settings:
    "M12 15a3 3 0 1 0 0-6 3 3 0 0 0 0 6z M19.4 15a1.65 1.65 0 0 0 .33 1.82l.06.06a2 2 0 0 1-2.83 2.83l-.06-.06a1.65 1.65 0 0 0-1.82-.33 1.65 1.65 0 0 0-1 1.51V21a2 2 0 0 1-4 0v-.09a1.65 1.65 0 0 0-1-1.51 1.65 1.65 0 0 0-1.82.33l-.06.06a2 2 0 0 1-2.83-2.83l.06-.06a1.65 1.65 0 0 0 .33-1.82 1.65 1.65 0 0 0-1.51-1H3a2 2 0 0 1 0-4h.09A1.65 1.65 0 0 0 4.6 9a1.65 1.65 0 0 0-.33-1.82l-.06-.06a2 2 0 0 1 2.83-2.83l.06.06a1.65 1.65 0 0 0 1.82.33H9a1.65 1.65 0 0 0 1-1.51V3a2 2 0 0 1 4 0v.09a1.65 1.65 0 0 0 1 1.51 1.65 1.65 0 0 0 1.82-.33l.06-.06a2 2 0 0 1 2.83 2.83l-.06.06a1.65 1.65 0 0 0-.33 1.82V9c0 .68.39 1.27 1 1.51H21a2 2 0 0 1 0 4h-.09a1.65 1.65 0 0 0-1.51 1z",
  user: "M20 21v-2a4 4 0 0 0-4-4H8a4 4 0 0 0-4 4v2 M12 11a4 4 0 1 0 0-8 4 4 0 0 0 0 8z",
  users:
    "M17 21v-2a4 4 0 0 0-4-4H5a4 4 0 0 0-4 4v2 M23 21v-2a4 4 0 0 0-3-3.87 M16 3.13a4 4 0 0 1 0 7.75 M9 11a4 4 0 1 0 0-8 4 4 0 0 0 0 8z",
  bell: "M6 8a6 6 0 0 1 12 0c0 7 3 9 3 9H3s3-2 3-9 M13.7 21a2 2 0 0 1-3.4 0",
  alert:
    "M12 9v4M12 17h.01M10.29 3.86 1.82 18a2 2 0 0 0 1.71 3h16.94a2 2 0 0 0 1.71-3L13.71 3.86a2 2 0 0 0-3.42 0z",
  cube:
    "M21 16V8a2 2 0 0 0-1-1.73l-7-4a2 2 0 0 0-2 0l-7 4A2 2 0 0 0 3 8v8a2 2 0 0 0 1 1.73l7 4a2 2 0 0 0 2 0l7-4A2 2 0 0 0 21 16z M3.27 6.96 12 12.01l8.73-5.05 M12 22.08V12",
  sparkles:
    "m12 3 1.91 5.85L20 11l-6.09.92L12 17l-1.91-5.08L4 11l6.09-2.15L12 3zM18 17l1 3 3 1-3 1-1 3-1-3-3-1 3-1 1-3z",
  wave: "M2 12c2 0 2-4 4-4s2 8 4 8 2-8 4-8 2 8 4 8 2-4 4-4",
  speaker: "M11 5 6 9H2v6h4l5 4V5zM15 9a4 4 0 0 1 0 6 M19 6a8 8 0 0 1 0 12",
  chat: "M21 15a2 2 0 0 1-2 2H7l-4 4V5a2 2 0 0 1 2-2h14a2 2 0 0 1 2 2z",
  historyAlt: "M3 12a9 9 0 1 0 9-9 M3 3v6h6 M12 7v5l4 2",
  branch:
    "M6 3v12 M6 21a3 3 0 1 0 0-6 3 3 0 0 0 0 6z M6 6a3 3 0 1 1 0-3 3 3 0 0 1 0 3z M18 9a3 3 0 1 1 0-3 3 3 0 0 1 0 3z M18 9c0 4-6 4-6 8",
  build:
    "M14.7 6.3a4 4 0 0 1 5 5l-9.4 9.4-5.3.3.3-5.3 9.4-9.4z M13 8l3 3",
  doctor:
    "M8 2v4 M16 2v4 M3 9h18 M3 6h18a1 1 0 0 1 1 1v13a1 1 0 0 1-1 1H3a1 1 0 0 1-1-1V7a1 1 0 0 1 1-1z M9 14h2v2h2v-2h2v-2h-2v-2h-2v2H9v2z",
  zap: "M13 2 3 14h7l-1 8 10-12h-7l1-8z",
  pin: "M12 17v5 M5 2h14l-2 4v8l-4 3-4-3V6L7 2",
  link: "M10 13a5 5 0 0 0 7 0l3-3a5 5 0 0 0-7-7l-1 1 M14 11a5 5 0 0 0-7 0l-3 3a5 5 0 0 0 7 7l1-1",
  eye: "M2 12s3.5-7 10-7 10 7 10 7-3.5 7-10 7S2 12 2 12z M12 15a3 3 0 1 0 0-6 3 3 0 0 0 0 6z",
  send: "m22 2-7 20-4-9-9-4 20-7z",
  game: "M6 12h4 M8 10v4 M15 13h.01 M18 11h.01 M2 8a3 3 0 0 1 3-3h14a3 3 0 0 1 3 3v8a3 3 0 0 1-3 3 6 6 0 0 1-3-1l-1.5-1H8.5L7 18a6 6 0 0 1-3 1 3 3 0 0 1-3-3V8z",
  diamond: "M12 2 2 12l10 10 10-10z",
  layers:
    "m12 2 10 5-10 5L2 7l10-5z m10 10-10 5L2 12 m20 5-10 5-10-5",
  cpu: "M4 9h16v6H4z M9 4h6v3 M9 17v3h6v-3 M4 9 1 9 M4 15H1 M23 9h-3 M23 15h-3",
  download: "M21 15v4a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2v-4M7 10l5 5 5-5M12 15V3",
};

export function Logo({ size = 22, color = "var(--lime)" }) {
  return (
    <svg width={size} height={size} viewBox="0 0 24 24" style={{ display: "block" }} aria-hidden="true">
      <rect x="3" y="3" width="7" height="7" rx="1.5" fill={color} />
      <rect x="14" y="3" width="7" height="7" rx="1.5" fill="currentColor" opacity="0.35" />
      <rect x="3" y="14" width="7" height="7" rx="1.5" fill="currentColor" opacity="0.35" />
      <rect x="14" y="14" width="7" height="7" rx="1.5" fill={color} />
    </svg>
  );
}

export function Avatar({ initials, color, size = 22, title, style }) {
  return (
    <div
      className="avatar"
      title={title}
      style={{ width: size, height: size, background: color, fontSize: size * 0.43, ...style }}
    >
      {initials}
    </div>
  );
}

export const PEOPLE = {
  noor: { initials: "NA", color: "#c8f73c", name: "Noor Aydin" },
  sam: { initials: "SP", color: "#74d6c8", name: "Sam Patel" },
  jade: { initials: "JR", color: "#b794f6", name: "Jade Rivers" },
  kai: { initials: "KO", color: "#f5a524", name: "Kai Okonkwo" },
  rin: { initials: "RM", color: "#e26464", name: "Rin Matsuda" },
  you: { initials: "YU", color: "#f4efe4", name: "You" },
};
