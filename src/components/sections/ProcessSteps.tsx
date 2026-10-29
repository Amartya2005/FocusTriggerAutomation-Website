import styles from "./ProcessSteps.module.css";

export type ProcessStep = { title: string; text: string };

/**
 * Ordered sequence of steps (horizontal on wide screens, vertical on narrow).
 * Use only for processes the company actually follows.
 */
export function ProcessSteps({ steps }: { steps: readonly ProcessStep[] }) {
  return (
    <ol role="list" className={styles.steps}>
      {steps.map((step, i) => (
        <li key={step.title} className={styles.step}>
          <span className={styles.number} aria-hidden="true">
            {i + 1}
          </span>
          <div className={styles.body}>
            <h3 className={styles.title}>{step.title}</h3>
            <p className={styles.text}>{step.text}</p>
          </div>
        </li>
      ))}
    </ol>
  );
}
