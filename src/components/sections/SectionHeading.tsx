import type { ReactNode } from "react";
import { Eyebrow } from "@/components/ui/Eyebrow";
import styles from "./SectionHeading.module.css";

type SectionHeadingProps = {
  title: string;
  /** Id for the heading so the enclosing section can reference it via `labelledBy`. */
  id?: string;
  eyebrow?: string;
  lead?: ReactNode;
  align?: "start" | "center";
  className?: string;
};

/** Eyebrow, `<h2>` and lead paragraph used at the top of a page section. */
export function SectionHeading({ title, id, eyebrow, lead, align = "start", className }: SectionHeadingProps) {
  const classes = [styles.heading, align === "center" && styles.center, className].filter(Boolean).join(" ");

  return (
    <div className={classes}>
      {eyebrow && <Eyebrow>{eyebrow}</Eyebrow>}
      <h2 id={id} className={styles.title}>
        {title}
      </h2>
      {lead && <p className={styles.lead}>{lead}</p>}
    </div>
  );
}
