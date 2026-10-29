import styles from "./PillarsIllustration.module.css";

/**
 * Original illustration of FocusTrigger's two areas of work: an NFC/QR
 * interaction (FocusTag concept) and client software. It is decorative and
 * captioned as illustrative — it is not a FocusTag or client screenshot.
 */
export function PillarsIllustration() {
  return (
    <figure className={styles.figure}>
      <svg className={styles.svg} viewBox="0 0 560 460" aria-hidden="true" focusable="false">
        <defs>
          <pattern id="pi-dots" width="22" height="22" patternUnits="userSpaceOnUse">
            <circle cx="2" cy="2" r="1.3" fill="#cbd5e1" />
          </pattern>
          <filter id="pi-shadow" x="-20%" y="-20%" width="140%" height="150%">
            <feDropShadow dx="0" dy="8" stdDeviation="10" floodColor="#0f172a" floodOpacity="0.10" />
          </filter>
          <marker id="pi-arrow" viewBox="0 0 10 10" refX="7" refY="5" markerWidth="7" markerHeight="7" orient="auto">
            <path d="M1 1l7 4-7 4" fill="none" stroke="#0b5fff" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round" />
          </marker>
        </defs>

        {/* Canvas */}
        <rect x="0.5" y="0.5" width="559" height="459" rx="24" fill="#ffffff" stroke="#e2e8f0" />
        <rect x="0.5" y="0.5" width="559" height="459" rx="24" fill="url(#pi-dots)" opacity="0.7" />

        {/* ---- Product pillar: NFC / QR point ---- */}
        <text x="40" y="44" className={styles.kicker} fill="#0b5fff">
          FocusTag concept
        </text>
        <g filter="url(#pi-shadow)">
          <rect x="40" y="58" width="176" height="168" rx="18" fill="#ffffff" stroke="#e2e8f0" />
        </g>
        {/* NFC symbol */}
        <circle cx="74" cy="122" r="6" fill="#0b5fff" />
        <path d="M84.6 111.4a15 15 0 0 1 0 21.2" fill="none" stroke="#0b5fff" strokeWidth="4.5" strokeLinecap="round" />
        <path d="M91.7 104.3a25 25 0 0 1 0 35.4" fill="none" stroke="#0b5fff" strokeWidth="4.5" strokeLinecap="round" opacity="0.7" />
        <path d="M98.7 97.3a35 35 0 0 1 0 49.4" fill="none" stroke="#0b5fff" strokeWidth="4.5" strokeLinecap="round" opacity="0.45" />
        {/* Stylised (non-scannable) QR glyph */}
        <g fill="#0f172a">
          <path d="M132 96h18v18h-18zM137 101v8h8v-8z" fillRule="evenodd" />
          <path d="M168 96h18v18h-18zM173 101v8h8v-8z" fillRule="evenodd" />
          <path d="M132 132h18v18h-18zM137 137v8h8v-8z" fillRule="evenodd" />
          <rect x="155" y="119" width="7" height="7" rx="1" />
          <rect x="167" y="125" width="7" height="7" rx="1" />
          <rect x="179" y="119" width="7" height="7" rx="1" />
          <rect x="155" y="137" width="7" height="7" rx="1" />
          <rect x="173" y="143" width="7" height="7" rx="1" />
          <rect x="161" y="149" width="7" height="7" rx="1" opacity="0.6" />
        </g>
        <line x1="62" y1="176" x2="194" y2="176" stroke="#e2e8f0" />
        <text x="128" y="203" textAnchor="middle" className={styles.label} fill="#334155">
          NFC tag · QR code
        </text>

        {/* Connector: tap or scan */}
        <path
          d="M224 132c34-36 70-38 104-14"
          fill="none"
          stroke="#0b5fff"
          strokeWidth="2"
          strokeDasharray="5 6"
          strokeLinecap="round"
          markerEnd="url(#pi-arrow)"
        />
        <text x="276" y="92" textAnchor="middle" className={styles.kicker} fill="#0b5fff">
          Tap or scan
        </text>

        {/* Phone with an abstract digital response */}
        <g filter="url(#pi-shadow)">
          <rect x="340" y="40" width="176" height="300" rx="28" fill="#0f172a" />
        </g>
        <rect x="350" y="52" width="156" height="276" rx="20" fill="#ffffff" />
        <rect x="408" y="60" width="40" height="6" rx="3" fill="#e2e8f0" />
        <circle cx="428" cy="118" r="28" fill="#e0f8f4" />
        <path d="M416 118l8 8 16-17" fill="none" stroke="#0f766e" strokeWidth="4" strokeLinecap="round" strokeLinejoin="round" />
        <rect x="370" y="164" width="116" height="10" rx="5" fill="#0f172a" opacity="0.85" />
        <rect x="384" y="184" width="88" height="8" rx="4" fill="#cbd5e1" />
        <rect x="366" y="210" width="124" height="46" rx="10" fill="#f1f5f9" />
        <rect x="378" y="224" width="70" height="7" rx="3.5" fill="#94a3b8" />
        <rect x="378" y="238" width="96" height="6" rx="3" fill="#cbd5e1" />
        <rect x="366" y="264" width="124" height="46" rx="10" fill="#f1f5f9" />
        <rect x="378" y="278" width="58" height="7" rx="3.5" fill="#94a3b8" />
        <rect x="378" y="292" width="88" height="6" rx="3" fill="#cbd5e1" />
        <text x="428" y="370" textAnchor="middle" className={styles.label} fill="#334155">
          Digital response
        </text>

        {/* ---- Services pillar: client software window ---- */}
        <g filter="url(#pi-shadow)">
          <rect x="40" y="262" width="260" height="160" rx="16" fill="#ffffff" stroke="#e2e8f0" />
        </g>
        <circle cx="60" cy="282" r="4.5" fill="#cbd5e1" />
        <circle cx="75" cy="282" r="4.5" fill="#cbd5e1" />
        <circle cx="90" cy="282" r="4.5" fill="#cbd5e1" />
        <text x="284" y="287" textAnchor="end" className={styles.kicker} fill="#64748b">
          Client software
        </text>
        <line x1="40" y1="300" x2="300" y2="300" stroke="#e2e8f0" />
        <text x="62" y="348" className={styles.code} fill="#0b5fff">
          {"</>"}
        </text>
        <rect x="128" y="322" width="146" height="10" rx="5" fill="#0f172a" opacity="0.85" />
        <rect x="128" y="341" width="112" height="8" rx="4" fill="#cbd5e1" />
        <rect x="128" y="357" width="128" height="8" rx="4" fill="#cbd5e1" />
        <rect x="62" y="382" width="66" height="22" rx="6" fill="#e8f0ff" />
        <rect x="136" y="382" width="66" height="22" rx="6" fill="#e0f8f4" />
        <rect x="210" y="382" width="66" height="22" rx="6" fill="#f1f5f9" />
      </svg>
      <figcaption className={styles.caption}>
        Illustration of FocusTrigger’s two areas of work — an NFC/QR interaction and client software. Not a product
        screenshot.
      </figcaption>
    </figure>
  );
}
