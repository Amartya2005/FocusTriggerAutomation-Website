import type { ReactNode } from "react";
import { Button } from "@/components/ui/Button";
import styles from "./ProductCard.module.css";

type Action = { label: string; href: string };

type ProductCardProps = {
  /** Short status label, e.g. "Current product". */
  status: string;
  name: string;
  summary: string;
  /** Confirmed, current capabilities only. */
  capabilities: readonly string[];
  /** Optional note for product direction, shown separately from capabilities. */
  direction?: ReactNode;
  primary: Action;
  secondary?: Action;
  visual?: ReactNode;
  headingLevel?: "h2" | "h3";
};

/** Feature-sized entry for one product in the products overview. */
export function ProductCard({
  status,
  name,
  summary,
  capabilities,
  direction,
  primary,
  secondary,
  visual,
  headingLevel: Heading = "h2",
}: ProductCardProps) {
  return (
    <article className={styles.card}>
      <div className={styles.content}>
        <p className={styles.status}>{status}</p>
        <Heading className={styles.name}>{name}</Heading>
        <p className={styles.summary}>{summary}</p>

        <div>
          <p className={styles.listLabel}>Confirmed functionality</p>
          <ul role="list" className={styles.capabilities}>
            {capabilities.map((capability) => (
              <li key={capability}>
                <CheckIcon />
                <span>{capability}</span>
              </li>
            ))}
          </ul>
        </div>

        {direction && <div className={styles.direction}>{direction}</div>}

        <div className={styles.actions}>
          <Button href={primary.href}>{primary.label}</Button>
          {secondary && (
            <Button href={secondary.href} variant="secondary">
              {secondary.label}
            </Button>
          )}
        </div>
      </div>
      {visual && <div className={styles.visual}>{visual}</div>}
    </article>
  );
}

function CheckIcon() {
  return (
    <svg aria-hidden="true" focusable="false" width="20" height="20" viewBox="0 0 20 20" fill="none">
      <circle cx="10" cy="10" r="9" fill="#e0f8f4" />
      <path d="M6 10.2l2.6 2.6L14 7.4" stroke="#0f766e" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round" />
    </svg>
  );
}
