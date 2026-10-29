import type { ReactNode } from "react";
import { Eyebrow } from "@/components/ui/Eyebrow";
import { Container } from "./Container";
import styles from "./PageHeader.module.css";

type PageHeaderProps = {
  title: string;
  /** Short label above the title identifying the section, e.g. "Products". */
  eyebrow?: string;
  lead?: ReactNode;
  /** Calls to action or other content shown below the lead. */
  children?: ReactNode;
};

/** Introductory block for inner pages; owns the page's single `<h1>`. */
export function PageHeader({ title, eyebrow, lead, children }: PageHeaderProps) {
  return (
    <div className={styles.pageHeader}>
      <Container size="narrow" className={styles.inner}>
        {eyebrow && <Eyebrow>{eyebrow}</Eyebrow>}
        <h1 className={styles.title}>{title}</h1>
        {lead && <div className={styles.lead}>{lead}</div>}
        {children && <div className={styles.actions}>{children}</div>}
      </Container>
    </div>
  );
}
