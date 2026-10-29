import type { ReactNode } from "react";
import styles from "./CapabilityComparison.module.css";

type CapabilityComparisonProps = {
  current: {
    title: string;
    items: readonly { title: string; text: string }[];
  };
  vision: {
    title: string;
    items: readonly string[];
    note: ReactNode;
  };
};

/**
 * Keeps confirmed, current functionality visibly separate from product
 * direction. Status is conveyed by text labels and structure, not colour alone.
 */
export function CapabilityComparison({ current, vision }: CapabilityComparisonProps) {
  return (
    <div className={styles.grid}>
      <div className={`${styles.panel} ${styles.current}`}>
        <p className={styles.badge}>Available now</p>
        <h3 className={styles.title}>{current.title}</h3>
        <ul role="list" className={styles.list}>
          {current.items.map((item) => (
            <li key={item.title} className={styles.item}>
              <span className={styles.marker} aria-hidden="true">
                <svg width="20" height="20" viewBox="0 0 20 20" fill="none" focusable="false">
                  <path d="M5.5 10.2l3 3 6-6.4" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
                </svg>
              </span>
              <div>
                <p className={styles.itemTitle}>{item.title}</p>
                <p className={styles.itemText}>{item.text}</p>
              </div>
            </li>
          ))}
        </ul>
      </div>

      <div className={`${styles.panel} ${styles.vision}`}>
        <p className={styles.badge}>Product vision · not current features</p>
        <h3 className={styles.title}>{vision.title}</h3>
        <ul role="list" className={styles.list}>
          {vision.items.map((item) => (
            <li key={item} className={styles.item}>
              <span className={styles.marker} aria-hidden="true">
                <svg width="20" height="20" viewBox="0 0 20 20" fill="none" focusable="false">
                  <path d="M4 10h11M11 6l4 4-4 4" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
                </svg>
              </span>
              <p className={styles.itemTitle}>{item}</p>
            </li>
          ))}
        </ul>
        <div className={styles.note}>{vision.note}</div>
      </div>
    </div>
  );
}
