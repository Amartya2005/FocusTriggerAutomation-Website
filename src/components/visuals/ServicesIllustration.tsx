import styles from "./Illustration.module.css";

/**
 * Original, abstract illustration of turning requirements into software.
 * Decorative and captioned as illustrative — it depicts no client project,
 * product screen or specific technology.
 */
export function ServicesIllustration() {
  const checklistRows = [
    { y: 150, width: 110 },
    { y: 186, width: 86 },
    { y: 222, width: 100 },
    { y: 258, width: 72 },
  ];

  return (
    <figure className={styles.figure}>
      <svg className={styles.svg} viewBox="0 0 560 360" aria-hidden="true" focusable="false">
        <defs>
          <pattern id="svc-dots" width="22" height="22" patternUnits="userSpaceOnUse">
            <circle cx="2" cy="2" r="1.3" fill="#cbd5e1" />
          </pattern>
          <filter id="svc-shadow" x="-20%" y="-20%" width="140%" height="150%">
            <feDropShadow dx="0" dy="8" stdDeviation="10" floodColor="#0f172a" floodOpacity="0.10" />
          </filter>
          <marker id="svc-arrow" viewBox="0 0 10 10" refX="7" refY="5" markerWidth="7" markerHeight="7" orient="auto">
            <path d="M1 1l7 4-7 4" fill="none" stroke="#0b5fff" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round" />
          </marker>
        </defs>

        <rect x="0.5" y="0.5" width="559" height="359" rx="24" fill="#ffffff" stroke="#e2e8f0" />
        <rect x="0.5" y="0.5" width="559" height="359" rx="24" fill="url(#svc-dots)" opacity="0.7" />

        {/* Requirements */}
        <g filter="url(#svc-shadow)">
          <rect x="40" y="76" width="196" height="232" rx="16" fill="#ffffff" stroke="#e2e8f0" />
        </g>
        <text x="60" y="114" className={styles.label} fill="#0f172a">
          Your requirements
        </text>
        <line x1="40" y1="130" x2="236" y2="130" stroke="#e2e8f0" />
        {checklistRows.map((row) => (
          <g key={row.y}>
            <rect x="60" y={row.y} width="18" height="18" rx="5" fill="#e8f0ff" />
            <path
              d={`M64 ${row.y + 9.5}l3.5 3.5 6.5-7`}
              fill="none"
              stroke="#0b5fff"
              strokeWidth="2"
              strokeLinecap="round"
              strokeLinejoin="round"
            />
            <rect x="88" y={row.y + 5} width={row.width} height="8" rx="4" fill="#cbd5e1" />
          </g>
        ))}

        {/* Flow */}
        <path
          d="M248 192h56"
          fill="none"
          stroke="#0b5fff"
          strokeWidth="2"
          strokeDasharray="5 6"
          strokeLinecap="round"
          markerEnd="url(#svc-arrow)"
        />

        {/* Software */}
        <g filter="url(#svc-shadow)">
          <rect x="320" y="56" width="200" height="272" rx="16" fill="#ffffff" stroke="#e2e8f0" />
        </g>
        <circle cx="340" cy="76" r="4.5" fill="#cbd5e1" />
        <circle cx="355" cy="76" r="4.5" fill="#cbd5e1" />
        <circle cx="370" cy="76" r="4.5" fill="#cbd5e1" />
        <text x="504" y="81" textAnchor="end" className={styles.kicker} fill="#64748b">
          Working software
        </text>
        <line x1="320" y1="94" x2="520" y2="94" stroke="#e2e8f0" />
        <rect x="340" y="114" width="120" height="10" rx="5" fill="#0f172a" opacity="0.85" />
        <rect x="340" y="132" width="88" height="8" rx="4" fill="#cbd5e1" />
        <rect x="336" y="156" width="168" height="54" rx="10" fill="#f1f5f9" />
        <rect x="348" y="170" width="80" height="7" rx="3.5" fill="#94a3b8" />
        <rect x="348" y="184" width="120" height="6" rx="3" fill="#cbd5e1" />
        <rect x="336" y="220" width="168" height="54" rx="10" fill="#f1f5f9" />
        <rect x="348" y="234" width="64" height="7" rx="3.5" fill="#94a3b8" />
        <rect x="348" y="248" width="104" height="6" rx="3" fill="#cbd5e1" />
        <rect x="336" y="288" width="52" height="20" rx="6" fill="#e8f0ff" />
        <rect x="394" y="288" width="52" height="20" rx="6" fill="#e0f8f4" />
        <rect x="452" y="288" width="52" height="20" rx="6" fill="#f1f5f9" />

      </svg>
      <figcaption className={styles.caption}>
        Illustration of turning requirements into software. Not a client project or product screenshot.
      </figcaption>
    </figure>
  );
}
