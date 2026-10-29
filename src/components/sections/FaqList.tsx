import type { ReactNode } from "react";
import styles from "./FaqList.module.css";

export type FaqItem = { question: string; answer: ReactNode };

/**
 * FAQ accordion built on native `<details>`/`<summary>`: keyboard and
 * screen-reader support without client-side JavaScript. Only include answers
 * supported by confirmed information.
 */
export function FaqList({ items }: { items: readonly FaqItem[] }) {
  return (
    <div className={styles.list}>
      {items.map((item) => (
        <details key={item.question} className={styles.item}>
          <summary className={styles.question}>
            <span>{item.question}</span>
            <svg className={styles.icon} aria-hidden="true" focusable="false" width="20" height="20" viewBox="0 0 20 20" fill="none">
              <path d="M5 7.5l5 5 5-5" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round" />
            </svg>
          </summary>
          <div className={styles.answer}>{item.answer}</div>
        </details>
      ))}
    </div>
  );
}
