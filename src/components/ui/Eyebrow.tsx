import type { ReactNode } from "react";
import styles from "./Eyebrow.module.css";

/** Small uppercase label above a heading. Adapts its colour on dark sections. */
export function Eyebrow({ children, className }: { children: ReactNode; className?: string }) {
  return <p className={[styles.eyebrow, className].filter(Boolean).join(" ")}>{children}</p>;
}
