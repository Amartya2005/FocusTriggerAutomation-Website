import styles from "./Illustration.module.css";

type PhoneOutlineProps = {
  x: number;
  y: number;
  /** Id of an SVG drop-shadow filter defined by the parent illustration. */
  shadowFilterId?: string;
};

/**
 * Generic phone outline (128×220 SVG units) with abstract screen content only.
 * Used inside illustrations; it never depicts real FocusTag UI.
 */
export function PhoneOutline({ x, y, shadowFilterId }: PhoneOutlineProps) {
  return (
    <g transform={`translate(${x} ${y})`}>
      <g filter={shadowFilterId ? `url(#${shadowFilterId})` : undefined}>
        <rect className={styles.fInk} width="128" height="220" rx="24" />
      </g>
      <rect className={styles.fSurface} x="8" y="10" width="112" height="200" rx="17" />
      <rect className={styles.fBorder} x="44" y="17" width="40" height="5" rx="2.5" />
      <rect className={styles.fInk} x="20" y="40" width="88" height="9" rx="4.5" opacity="0.85" />
      <rect className={styles.fLine} x="20" y="57" width="64" height="7" rx="3.5" />
      <rect className={styles.fPanel} x="18" y="78" width="92" height="50" rx="10" />
      <rect className={styles.fMuted} x="28" y="92" width="52" height="6" rx="3" />
      <rect className={styles.fLine} x="28" y="105" width="70" height="5" rx="2.5" />
      <rect className={styles.fPanel} x="18" y="138" width="92" height="50" rx="10" />
      <rect className={styles.fMuted} x="28" y="152" width="44" height="6" rx="3" />
      <rect className={styles.fLine} x="28" y="165" width="64" height="5" rx="2.5" />
    </g>
  );
}
