import type { ReactNode } from "react";
import { Container } from "@/components/layout/Container";
import { Eyebrow } from "@/components/ui/Eyebrow";
import styles from "./Hero.module.css";

type HeroProps = {
  title: string;
  eyebrow?: string;
  lead?: ReactNode;
  /** Buttons or links shown below the lead. */
  actions?: ReactNode;
  /** Illustration or product visual shown beside the copy on wide screens, below it on narrow ones. */
  visual?: ReactNode;
  /** Accent treatment: company-wide, product (FocusTag) or services pages. */
  variant?: "corporate" | "product" | "services";
  /** Optional breadcrumb trail shown above the eyebrow on nested pages. */
  breadcrumbs?: ReactNode;
};

/** Page-opening section that owns the page's single `<h1>`. */
export function Hero({ title, eyebrow, lead, actions, visual, variant = "corporate", breadcrumbs }: HeroProps) {
  return (
    <section className={`${styles.hero} ${styles[variant]}`} aria-labelledby="hero-title">
      <Container className={visual ? styles.withVisual : styles.single}>
        <div className={styles.content}>
          {breadcrumbs && <div className={styles.breadcrumbs}>{breadcrumbs}</div>}
          {eyebrow && <Eyebrow>{eyebrow}</Eyebrow>}
          <h1 id="hero-title" className={styles.title}>
            {title}
          </h1>
          {lead && <p className={styles.lead}>{lead}</p>}
          {actions && <div className={styles.actions}>{actions}</div>}
        </div>
        {visual && <div className={styles.visual}>{visual}</div>}
      </Container>
    </section>
  );
}
