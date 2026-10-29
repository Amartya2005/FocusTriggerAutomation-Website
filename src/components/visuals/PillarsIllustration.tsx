import styles from "./PillarsIllustration.module.css";

/**
 * Original illustration of FocusTrigger's two areas of work: FocusTag's
 * phone-to-phone NFC interaction with QR fallback, and client software. It is
 * decorative and captioned as illustrative — not a FocusTag or client screenshot.
 */
export function PillarsIllustration() {
  return (
    <figure className={styles.figure}>
      <svg className={styles.svg} viewBox="0 0 560 480" aria-hidden="true" focusable="false">
        <defs>
          <pattern id="pi-dots" width="22" height="22" patternUnits="userSpaceOnUse">
            <circle cx="2" cy="2" r="1.3" fill="#cbd5e1" />
          </pattern>
          <filter id="pi-shadow" x="-20%" y="-20%" width="140%" height="150%">
            <feDropShadow dx="0" dy="8" stdDeviation="10" floodColor="#0f172a" floodOpacity="0.10" />
          </filter>
        </defs>

        {/* Canvas */}
        <rect x="0.5" y="0.5" width="559" height="479" rx="24" fill="#ffffff" stroke="#e2e8f0" />
        <rect x="0.5" y="0.5" width="559" height="479" rx="24" fill="url(#pi-dots)" opacity="0.7" />

        {/* ---- Product pillar: phone-to-phone NFC with QR fallback ---- */}
        <text x="40" y="40" className={styles.kicker} fill="#0b5fff">
          FocusTag concept
        </text>

        <Phone x={40} />
        <Phone x={392} />

        {/* Primary: NFC tap between the phones */}
        <path d="M176 140h56M328 140h56" stroke="#0b5fff" strokeWidth="2.5" strokeLinecap="round" />
        <circle cx="280" cy="140" r="36" fill="#e8f0ff" />
        <g fill="none" stroke="#0b5fff" strokeWidth="3.5" strokeLinecap="round">
          <path d="M264.4 132.3a10 10 0 0 1 0 15.4" />
          <path d="M269.6 126.2a18 18 0 0 1 0 27.6" opacity="0.6" />
          <path d="M295.6 132.3a10 10 0 0 0 0 15.4" />
          <path d="M290.4 126.2a18 18 0 0 0 0 27.6" opacity="0.6" />
        </g>
        <text x="280" y="200" textAnchor="middle" className={styles.kicker} fill="#0b5fff">
          NFC tap
        </text>

        {/* Fallback: QR code */}
        <path d="M176 248h76M308 248h76" stroke="#94a3b8" strokeWidth="2" strokeDasharray="5 6" strokeLinecap="round" />
        <rect x="256" y="224" width="48" height="48" rx="10" fill="#ffffff" stroke="#cbd5e1" />
        <g fill="#0f172a">
          <path d="M264 232h11v11h-11zM267 235v5h5v-5z" fillRule="evenodd" />
          <path d="M285 232h11v11h-11zM288 235v5h5v-5z" fillRule="evenodd" />
          <path d="M264 253h11v11h-11zM267 256v5h5v-5z" fillRule="evenodd" />
          <rect x="285" y="253" width="4" height="4" rx="0.5" />
          <rect x="292" y="257" width="4" height="4" rx="0.5" />
          <rect x="285" y="260" width="4" height="4" rx="0.5" opacity="0.6" />
        </g>
        <text x="280" y="296" textAnchor="middle" className={styles.label} fill="#334155">
          QR fallback
        </text>

        {/* ---- Services pillar: client software window ---- */}
        <g filter="url(#pi-shadow)">
          <rect x="150" y="320" width="260" height="140" rx="16" fill="#ffffff" stroke="#e2e8f0" />
        </g>
        <circle cx="170" cy="340" r="4.5" fill="#cbd5e1" />
        <circle cx="185" cy="340" r="4.5" fill="#cbd5e1" />
        <circle cx="200" cy="340" r="4.5" fill="#cbd5e1" />
        <text x="394" y="345" textAnchor="end" className={styles.kicker} fill="#64748b">
          Client software
        </text>
        <line x1="150" y1="358" x2="410" y2="358" stroke="#e2e8f0" />
        <text x="172" y="402" className={styles.code} fill="#0b5fff">
          {"</>"}
        </text>
        <rect x="238" y="378" width="146" height="10" rx="5" fill="#0f172a" opacity="0.85" />
        <rect x="238" y="396" width="112" height="8" rx="4" fill="#cbd5e1" />
        <rect x="238" y="411" width="128" height="8" rx="4" fill="#cbd5e1" />
        <rect x="172" y="428" width="66" height="18" rx="6" fill="#e8f0ff" />
        <rect x="246" y="428" width="66" height="18" rx="6" fill="#e0f8f4" />
        <rect x="320" y="428" width="66" height="18" rx="6" fill="#f1f5f9" />
      </svg>
      <figcaption className={styles.caption}>
        Illustration of FocusTrigger’s two areas of work — FocusTag’s phone-to-phone NFC interaction with QR fallback,
        and client software. Not a product screenshot.
      </figcaption>
    </figure>
  );
}

/** Phone outline with abstract screen content only (no product UI). */
function Phone({ x }: { x: number }) {
  return (
    <g transform={`translate(${x} 56)`}>
      <g filter="url(#pi-shadow)">
        <rect width="128" height="220" rx="24" fill="#0f172a" />
      </g>
      <rect x="8" y="10" width="112" height="200" rx="17" fill="#ffffff" />
      <rect x="44" y="17" width="40" height="5" rx="2.5" fill="#e2e8f0" />
      <rect x="20" y="40" width="88" height="9" rx="4.5" fill="#0f172a" opacity="0.85" />
      <rect x="20" y="57" width="64" height="7" rx="3.5" fill="#cbd5e1" />
      <rect x="18" y="78" width="92" height="50" rx="10" fill="#f1f5f9" />
      <rect x="28" y="92" width="52" height="6" rx="3" fill="#94a3b8" />
      <rect x="28" y="105" width="70" height="5" rx="2.5" fill="#cbd5e1" />
      <rect x="18" y="138" width="92" height="50" rx="10" fill="#f1f5f9" />
      <rect x="28" y="152" width="44" height="6" rx="3" fill="#94a3b8" />
      <rect x="28" y="165" width="64" height="5" rx="2.5" fill="#cbd5e1" />
    </g>
  );
}
