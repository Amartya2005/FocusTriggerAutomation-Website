import { Button } from "@/components/ui/Button";
import styles from "./PathwayCard.module.css";

type Action = { label: string; href: string };

export type PathwayCardProps = {
  /** `product` and `services` share one structure but carry distinct accents. */
  tone: "product" | "services";
  index: string;
  label: string;
  title: string;
  description: string;
  audience: string;
  primary: Action;
  secondary: Action;
  headingLevel?: "h2" | "h3";
};

/** One of the two equal business-pillar entry points (products or services). */
export function PathwayCard({
  tone,
  index,
  label,
  title,
  description,
  audience,
  primary,
  secondary,
  headingLevel: Heading = "h3",
}: PathwayCardProps) {
  return (
    <article className={`${styles.card} ${styles[tone]}`}>
      <div className={styles.top}>
        <span className={styles.icon} aria-hidden="true">
          {tone === "product" ? <ProductIcon /> : <ServicesIcon />}
        </span>
        <span className={styles.index} aria-hidden="true">
          {index}
        </span>
      </div>

      <p className={styles.label}>{label}</p>
      <Heading className={styles.title}>{title}</Heading>
      <p className={styles.description}>{description}</p>

      <div className={styles.audience}>
        <p className={styles.audienceLabel}>Relevant for</p>
        <p>{audience}</p>
      </div>

      <div className={styles.actions}>
        <Button href={primary.href}>{primary.label}</Button>
        <Button href={secondary.href} variant="text">
          {secondary.label}
          <span aria-hidden="true">→</span>
        </Button>
      </div>
    </article>
  );
}

function ProductIcon() {
  return (
    <svg width="28" height="28" viewBox="0 0 28 28" fill="none" focusable="false">
      <rect x="3" y="3" width="22" height="22" rx="6" stroke="currentColor" strokeWidth="2" />
      <circle cx="10" cy="14" r="2" fill="currentColor" />
      <path d="M14 9.5a6.5 6.5 0 0 1 0 9M17.5 7a10 10 0 0 1 0 14" stroke="currentColor" strokeWidth="2" strokeLinecap="round" />
    </svg>
  );
}

function ServicesIcon() {
  return (
    <svg width="28" height="28" viewBox="0 0 28 28" fill="none" focusable="false">
      <rect x="3" y="5" width="22" height="18" rx="4" stroke="currentColor" strokeWidth="2" />
      <path d="M11 11l-3 3 3 3M17 11l3 3-3 3" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
    </svg>
  );
}
