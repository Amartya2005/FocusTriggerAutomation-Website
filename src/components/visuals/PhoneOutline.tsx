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
