import type { ReactNode } from "react";
import styles from "./Container.module.css";

type ContainerProps = {
  children: ReactNode;
  /** `narrow` caps line length for long-form text (~760px). */
  size?: "default" | "narrow";
  as?: "div" | "header" | "footer" | "nav";
  className?: string;
};

export function Container({ children, size = "default", as: Tag = "div", className }: ContainerProps) {
  const classes = [styles.container, size === "narrow" && styles.narrow, className]
    .filter(Boolean)
    .join(" ");

  return <Tag className={classes}>{children}</Tag>;
}
