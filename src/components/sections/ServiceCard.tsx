import styles from "./ServiceCard.module.css";

type ServiceCardProps = {
  title: string;
  description: string;
  /** Confirmed examples only; omitted until the company supplies them. */
  examples?: readonly string[];
  headingLevel?: "h3" | "h4";
};

/** One service area. Cards share a grid, so the number of areas can change freely. */
export function ServiceCard({ title, description, examples, headingLevel: Heading = "h3" }: ServiceCardProps) {
  return (
    <article className={styles.card}>
      <span className={styles.icon} aria-hidden="true">
        <svg width="24" height="24" viewBox="0 0 24 24" fill="none" focusable="false">
          <rect x="3" y="4.5" width="18" height="15" rx="3" stroke="currentColor" strokeWidth="1.75" />
          <path d="M10 10l-2.5 2.5L10 15M14 10l2.5 2.5L14 15" stroke="currentColor" strokeWidth="1.75" strokeLinecap="round" strokeLinejoin="round" />
        </svg>
      </span>
      <Heading className={styles.title}>{title}</Heading>
      <p className={styles.description}>{description}</p>
      {examples && examples.length > 0 && (
        <ul className={styles.examples}>
          {examples.map((example) => (
            <li key={example}>{example}</li>
          ))}
        </ul>
      )}
    </article>
  );
}
