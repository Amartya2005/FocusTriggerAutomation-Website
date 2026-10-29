import { Section } from "@/components/layout/Section";
import { Button } from "@/components/ui/Button";
import { SectionHeading } from "./SectionHeading";
import styles from "./CTASection.module.css";

export type CTARoute = {
  title: string;
  text: string;
  action: { label: string; href: string };
};

type CTASectionProps = {
  id: string;
  title: string;
  lead?: string;
  /** One route renders a single call to action; two give visitors a choice of pathway. */
  routes: CTARoute[];
};

/** Closing call-to-action band on a dark surface. */
export function CTASection({ id, title, lead, routes }: CTASectionProps) {
  const headingId = `${id}-title`;

  return (
    <Section id={id} tone="dark" labelledBy={headingId}>
      <div className={styles.layout}>
        <SectionHeading id={headingId} title={title} lead={lead} />
        <ul role="list" className={styles.routes}>
          {routes.map((route) => (
            <li key={route.title} className={styles.route}>
              <h3 className={styles.routeTitle}>{route.title}</h3>
              <p className={styles.routeText}>{route.text}</p>
              <Button href={route.action.href} className={styles.routeAction}>
                {route.action.label}
              </Button>
            </li>
          ))}
        </ul>
      </div>
    </Section>
  );
}
