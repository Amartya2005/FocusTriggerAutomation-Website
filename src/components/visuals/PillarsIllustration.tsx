import { PhoneOutline } from "./PhoneOutline";
import styles from "./Illustration.module.css";

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
            <circle className={styles.fLine} cx="2" cy="2" r="1.3" />
          </pattern>
          <filter id="pi-shadow" x="-20%" y="-20%" width="140%" height="150%">
            <feDropShadow className={styles.flood} dx="0" dy="8" stdDeviation="10" floodOpacity="0.10" />
          </filter>
        </defs>

        {/* Canvas */}
        <rect className={`${styles.fSurface} ${styles.sBorder}`} x="0.5" y="0.5" width="559" height="479" rx="24" />
        <rect x="0.5" y="0.5" width="559" height="479" rx="24" fill="url(#pi-dots)" opacity="0.7" />

        {/* ---- Product pillar: phone-to-phone NFC with QR fallback ---- */}
        <text x="40" y="40" className={`${styles.kicker} ${styles.fAccent}`}>
          FocusTag concept
        </text>

        <PhoneOutline x={40} y={56} shadowFilterId="pi-shadow" />
        <PhoneOutline x={392} y={56} shadowFilterId="pi-shadow" />

        {/* Primary: NFC tap between the phones */}
        <path className={styles.sAccent} d="M176 140h56M328 140h56" strokeWidth="2.5" strokeLinecap="round" />
        <circle className={styles.fAccentSoft} cx="280" cy="140" r="36" />
        <g className={styles.sAccent} fill="none" strokeWidth="3.5" strokeLinecap="round">
          <path d="M264.4 132.3a10 10 0 0 1 0 15.4" />
          <path d="M269.6 126.2a18 18 0 0 1 0 27.6" opacity="0.6" />
          <path d="M295.6 132.3a10 10 0 0 0 0 15.4" />
          <path d="M290.4 126.2a18 18 0 0 0 0 27.6" opacity="0.6" />
        </g>
        <text x="280" y="200" textAnchor="middle" className={`${styles.kicker} ${styles.fAccent}`}>
          NFC tap
        </text>

        {/* Fallback: QR code */}
        <path className={styles.sMuted} d="M176 248h76M308 248h76" strokeWidth="2" strokeDasharray="5 6" strokeLinecap="round" />
        <rect className={`${styles.fSurface} ${styles.sLine}`} x="256" y="224" width="48" height="48" rx="10" />
        <g className={styles.fInk}>
          <path d="M264 232h11v11h-11zM267 235v5h5v-5z" fillRule="evenodd" />
          <path d="M285 232h11v11h-11zM288 235v5h5v-5z" fillRule="evenodd" />
          <path d="M264 253h11v11h-11zM267 256v5h5v-5z" fillRule="evenodd" />
          <rect x="285" y="253" width="4" height="4" rx="0.5" />
          <rect x="292" y="257" width="4" height="4" rx="0.5" />
          <rect x="285" y="260" width="4" height="4" rx="0.5" opacity="0.6" />
        </g>
        <text x="280" y="296" textAnchor="middle" className={`${styles.label} ${styles.fText}`}>
          QR fallback
        </text>

        {/* ---- Services pillar: client software window ---- */}
        <g filter="url(#pi-shadow)">
          <rect className={`${styles.fSurface} ${styles.sBorder}`} x="150" y="320" width="260" height="140" rx="16" />
        </g>
        <circle className={styles.fLine} cx="170" cy="340" r="4.5" />
        <circle className={styles.fLine} cx="185" cy="340" r="4.5" />
        <circle className={styles.fLine} cx="200" cy="340" r="4.5" />
        <text x="394" y="345" textAnchor="end" className={`${styles.kicker} ${styles.fTextMuted}`}>
          Client software
        </text>
        <line className={styles.sBorder} x1="150" y1="358" x2="410" y2="358" />
        <text x="172" y="402" className={`${styles.code} ${styles.fAccent}`}>
          {"</>"}
        </text>
        <rect className={styles.fInk} x="238" y="378" width="146" height="10" rx="5" opacity="0.85" />
        <rect className={styles.fLine} x="238" y="396" width="112" height="8" rx="4" />
        <rect className={styles.fLine} x="238" y="411" width="128" height="8" rx="4" />
        <rect className={styles.fAccentSoft} x="172" y="428" width="66" height="18" rx="6" />
        <rect className={styles.fCream} x="246" y="428" width="66" height="18" rx="6" />
        <rect className={styles.fPanel} x="320" y="428" width="66" height="18" rx="6" />
      </svg>
      <figcaption className={styles.caption}>
        Illustration of FocusTrigger’s two areas of work — FocusTag’s phone-to-phone NFC interaction with QR fallback,
        and client software. Not a product screenshot.
      </figcaption>
    </figure>
  );
}
