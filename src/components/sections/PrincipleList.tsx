import styles from "./PrincipleList.module.css";

export type Principle = { title: string; text: string };

/** Numbered working principles in a three-column row (stacked on mobile). */
export function PrincipleList({ principles }: { principles: readonly Principle[] }) {
  return (
    <ol role="list" className={styles.principles}>
      {principles.map((principle, i) => (
        <li key={principle.title} className={styles.principle}>
          <span className={styles.index} aria-hidden="true">
            {String(i + 1).padStart(2, "0")}
          </span>
          <h3 className={styles.title}>{principle.title}</h3>
          <p className={styles.text}>{principle.text}</p>
        </li>
      ))}
    </ol>
  );
}
