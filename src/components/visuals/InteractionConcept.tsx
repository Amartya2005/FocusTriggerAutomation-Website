import styles from "./InteractionConcept.module.css";

export type InteractionMethod = {
  /** `fallback` methods are presented as alternatives, never as a later step. */
  kind: "primary" | "fallback";
  icon: "phones" | "qr";
  title: string;
  text: string;
};

type InteractionConceptProps = {
  /** Visible label stating that the model is illustrative. */
  label: string;
  methods: readonly InteractionMethod[];
};

const kindLabel: Record<InteractionMethod["kind"], string> = {
  primary: "Primary",
  fallback: "Fallback",
};

/**
 * Confirmed FocusTag interaction methods shown as a labelled concept so the
 * diagram is never read as a production interface or a detailed workflow.
 */
export function InteractionConcept({ label, methods }: InteractionConceptProps) {
  return (
    <figure className={styles.concept}>
      <figcaption className={styles.label}>
        <span className={styles.badge}>Concept</span>
        {label}
      </figcaption>
      <ul className={styles.methods} role="list">
        {methods.map((method, i) => (
          <li key={method.title} className={styles.method}>
            {i > 0 && method.kind === "fallback" && (
              <p className={styles.divider} aria-hidden="true">
                <span>or, as a fallback</span>
              </p>
            )}
            <div className={styles.row}>
              <span className={`${styles.icon} ${styles[method.kind]}`} aria-hidden="true">
                <MethodIcon icon={method.icon} />
              </span>
              <div className={styles.body}>
                <p className={`${styles.kind} ${styles[method.kind]}`}>{kindLabel[method.kind]}</p>
                <p className={styles.methodTitle}>{method.title}</p>
                <p className={styles.methodText}>{method.text}</p>
              </div>
            </div>
          </li>
        ))}
      </ul>
    </figure>
  );
}

function MethodIcon({ icon }: { icon: InteractionMethod["icon"] }) {
  const common = { width: 24, height: 24, viewBox: "0 0 24 24", fill: "none", focusable: false } as const;
  const stroke = { stroke: "currentColor", strokeWidth: 1.75, strokeLinecap: "round", strokeLinejoin: "round" } as const;

  if (icon === "phones") {
    return (
      <svg {...common}>
        <rect x="1.5" y="4.5" width="7" height="15" rx="1.75" {...stroke} />
        <rect x="15.5" y="4.5" width="7" height="15" rx="1.75" {...stroke} />
        <path d="M10.75 9.75a3.2 3.2 0 0 1 0 4.5M13.25 9.75a3.2 3.2 0 0 0 0 4.5" {...stroke} />
      </svg>
    );
  }

  return (
    <svg {...common}>
      <rect x="3" y="3" width="7" height="7" rx="1" {...stroke} />
      <rect x="14" y="3" width="7" height="7" rx="1" {...stroke} />
      <rect x="3" y="14" width="7" height="7" rx="1" {...stroke} />
      <path d="M14 14h2.5v2.5H14zM18.5 18.5H21V21h-2.5zM14 19.5h2M19.5 14H21" {...stroke} />
    </svg>
  );
}
