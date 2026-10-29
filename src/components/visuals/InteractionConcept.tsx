import styles from "./InteractionConcept.module.css";

export type InteractionStep = {
  icon: "tap" | "point" | "respond";
  title: string;
  text: string;
};

type InteractionConceptProps = {
  /** Visible label stating that the sequence is illustrative. */
  label: string;
  steps: readonly InteractionStep[];
};

/**
 * Generic NFC/QR interaction sequence. Always labelled as a concept so it is
 * never read as verified FocusTag functionality.
 */
export function InteractionConcept({ label, steps }: InteractionConceptProps) {
  return (
    <figure className={styles.concept}>
      <figcaption className={styles.label}>
        <span className={styles.badge}>Concept</span>
        {label}
      </figcaption>
      <ol className={styles.steps} role="list">
        {steps.map((step, i) => (
          <li key={step.title} className={styles.step}>
            <span className={styles.icon} aria-hidden="true">
              <StepIcon icon={step.icon} />
            </span>
            <div>
              <p className={styles.stepTitle}>
                <span className="visually-hidden">{`Step ${i + 1}: `}</span>
                {step.title}
              </p>
              <p className={styles.stepText}>{step.text}</p>
            </div>
          </li>
        ))}
      </ol>
    </figure>
  );
}

function StepIcon({ icon }: { icon: InteractionStep["icon"] }) {
  const common = { width: 24, height: 24, viewBox: "0 0 24 24", fill: "none", focusable: false } as const;
  const stroke = { stroke: "currentColor", strokeWidth: 2, strokeLinecap: "round", strokeLinejoin: "round" } as const;

  switch (icon) {
    case "tap":
      return (
        <svg {...common}>
          <rect x="6" y="2.5" width="12" height="19" rx="2.5" {...stroke} />
          <path d="M10.5 18.5h3" {...stroke} />
          <path d="M14.5 8a3.5 3.5 0 0 1 0 5M16.5 6a6.5 6.5 0 0 1 0 9" {...stroke} />
        </svg>
      );
    case "point":
      return (
        <svg {...common}>
          <path d="M12 21s-6.5-5.6-6.5-11a6.5 6.5 0 0 1 13 0c0 5.4-6.5 11-6.5 11z" {...stroke} />
          <circle cx="12" cy="10" r="2.5" {...stroke} />
        </svg>
      );
    case "respond":
      return (
        <svg {...common}>
          <rect x="3" y="4" width="18" height="14" rx="2.5" {...stroke} />
          <path d="M8.5 11l2.5 2.5 4.5-5" {...stroke} />
          <path d="M9 21h6" {...stroke} />
        </svg>
      );
  }
}
