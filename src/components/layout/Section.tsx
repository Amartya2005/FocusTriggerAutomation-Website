import type { ReactNode } from "react";
import { Container } from "./Container";
import styles from "./Section.module.css";

type SectionProps = {
  children: ReactNode;
  /** Background treatment. `dark` is for occasional contrast sections only. */
  tone?: "default" | "soft" | "dark";
  spacing?: "default" | "compact";
  containerSize?: "default" | "narrow";
  id?: string;
  /** Id of the heading that names this section, for assistive technology. */
  labelledBy?: string;
  className?: string;
};

export function Section({
  children,
  tone = "default",
  spacing = "default",
  containerSize = "default",
  id,
  labelledBy,
  className,
}: SectionProps) {
  const classes = [styles.section, styles[tone], spacing === "compact" && styles.compact, className]
    .filter(Boolean)
    .join(" ");

  return (
    <section id={id} aria-labelledby={labelledBy} className={classes}>
      <Container size={containerSize}>{children}</Container>
    </section>
  );
}
