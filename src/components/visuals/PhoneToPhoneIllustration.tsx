import { PhoneOutline } from "./PhoneOutline";
import styles from "./Illustration.module.css";

/**
 * Original concept illustration of FocusTag's confirmed interaction model:
 * direct phone-to-phone NFC, with a QR code as a fallback. Decorative and
 * captioned as illustrative — it is not a FocusTag screenshot and shows no
 * workflow or outcome beyond the interaction itself.
 */
export function PhoneToPhoneIllustration({ caption }: { caption?: string }) {
  return (
    <figure className={styles.figure}>
      <svg className={styles.svg} viewBox="0 0 560 380" aria-hidden="true" focusable="false">
        <defs>
          <pattern id="p2p-dots" width="22" height="22" patternUnits="userSpaceOnUse">
            <circle className={styles.fLine} cx="2" cy="2" r="1.3" />
          </pattern>
          <filter id="p2p-shadow" x="-20%" y="-20%" width="140%" height="150%">
            <feDropShadow className={styles.flood} dx="0" dy="8" stdDeviation="10" floodOpacity="0.10" />
          </filter>
        </defs>

        <rect className={`${styles.fSurface} ${styles.sBorder}`} x="0.5" y="0.5" width="559" height="379" rx="24" />
        <rect x="0.5" y="0.5" width="559" height="379" rx="24" fill="url(#p2p-dots)" opacity="0.7" />

        <text x="48" y="44" className={`${styles.kicker} ${styles.fAccentStrong}`}>
          FocusTag interaction concept
        </text>

        <PhoneOutline x={48} y={70} shadowFilterId="p2p-shadow" />
        <PhoneOutline x={384} y={70} shadowFilterId="p2p-shadow" />

        {/* Primary: direct NFC tap between the phones */}
        <path className={styles.sAccent} d="M184 150h52M324 150h52" strokeWidth="2.5" strokeLinecap="round" />
        <circle className={styles.fAccentSoft} cx="280" cy="150" r="38" />
        <g className={styles.sAccent} fill="none" strokeWidth="3.5" strokeLinecap="round">
          <path d="M264.4 142.3a10 10 0 0 1 0 15.4" />
          <path d="M269.6 136.2a18 18 0 0 1 0 27.6" opacity="0.6" />
          <path d="M295.6 142.3a10 10 0 0 0 0 15.4" />
          <path d="M290.4 136.2a18 18 0 0 0 0 27.6" opacity="0.6" />
        </g>
        <text x="280" y="212" textAnchor="middle" className={`${styles.kicker} ${styles.fAccent}`}>
          NFC tap
        </text>
        <text x="280" y="231" textAnchor="middle" className={`${styles.small} ${styles.fText}`}>
          primary
        </text>

        {/* Fallback: QR code */}
        <path className={styles.sMuted} d="M184 282h68M308 282h68" strokeWidth="2" strokeDasharray="5 6" strokeLinecap="round" />
        <rect className={`${styles.fSurface} ${styles.sLine}`} x="252" y="254" width="56" height="56" rx="10" />
        <g className={styles.fInk}>
          <path d="M261 263h13v13h-13zM264.5 266.5v6h6v-6z" fillRule="evenodd" />
          <path d="M286 263h13v13h-13zM289.5 266.5v6h6v-6z" fillRule="evenodd" />
          <path d="M261 288h13v13h-13zM264.5 291.5v6h6v-6z" fillRule="evenodd" />
          <rect x="286" y="288" width="5" height="5" rx="0.5" />
          <rect x="294" y="293" width="5" height="5" rx="0.5" />
          <rect x="286" y="296" width="5" height="5" rx="0.5" opacity="0.6" />
        </g>
        <text x="280" y="336" textAnchor="middle" className={`${styles.label} ${styles.fText}`}>
          QR code
        </text>
        <text x="280" y="355" textAnchor="middle" className={`${styles.small} ${styles.fText}`}>
          fallback
        </text>
      </svg>
      <figcaption className={styles.caption}>
        {caption ??
          "Illustrative concept of FocusTag’s interaction model: phone-to-phone NFC, with a QR code as a fallback. Not a product screenshot."}
      </figcaption>
    </figure>
  );
}
