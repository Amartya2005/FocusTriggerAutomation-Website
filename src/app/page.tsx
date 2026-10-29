import type { Metadata } from "next";
import { Section } from "@/components/layout/Section";
import { CTASection } from "@/components/sections/CTASection";
import { Hero } from "@/components/sections/Hero";
import { PathwayCard } from "@/components/sections/PathwayCard";
import { SectionHeading } from "@/components/sections/SectionHeading";
import { Button } from "@/components/ui/Button";
import { InteractionConcept } from "@/components/visuals/InteractionConcept";
import { PillarsIllustration } from "@/components/visuals/PillarsIllustration";
import { approach, closingCta, hero, pathways, pathwaysIntro, servicesOverview, spotlight } from "@/content/home";
import styles from "./page.module.css";

export const metadata: Metadata = {
  description:
    "FocusTrigger Automation Private Limited builds proprietary technology products, beginning with FocusTag for NFC- and QR-enabled interactions, and provides software solutions and technology services for clients.",
  alternates: { canonical: "/" },
  openGraph: { url: "/" },
};

export default function HomePage() {
  return (
    <>
      <Hero
        eyebrow={hero.eyebrow}
        title={hero.title}
        lead={hero.lead}
        visual={<PillarsIllustration />}
        actions={
          <>
            <Button href={hero.primary.href} size="lg">
              {hero.primary.label}
            </Button>
            <Button href={hero.secondary.href} variant="secondary" size="lg">
              {hero.secondary.label}
            </Button>
          </>
        }
      />

      {/* Two equal pathways: products and services */}
      <Section id="what-we-do" labelledBy="what-we-do-title">
        <SectionHeading
          id="what-we-do-title"
          eyebrow={pathwaysIntro.eyebrow}
          title={pathwaysIntro.title}
          lead={pathwaysIntro.lead}
        />
        <div className={styles.pathways}>
          {pathways.map((pathway) => (
            <PathwayCard key={pathway.id} tone={pathway.id === "products" ? "product" : "services"} {...pathway} />
          ))}
        </div>
      </Section>

      {/* FocusTag spotlight */}
      <Section id="focustag" tone="soft" labelledBy="focustag-title">
        <div className={styles.split}>
          <div className={styles.stack}>
            <SectionHeading id="focustag-title" eyebrow={spotlight.eyebrow} title={spotlight.title} lead={spotlight.lead} />
            <div className={styles.note}>
              <p className={styles.noteLabel}>{spotlight.direction.label}</p>
              <p>{spotlight.direction.text}</p>
            </div>
            <div className={styles.actions}>
              <Button href={spotlight.primary.href}>{spotlight.primary.label}</Button>
              <Button href={spotlight.secondary.href} variant="secondary">
                {spotlight.secondary.label}
              </Button>
            </div>
          </div>
          <InteractionConcept label={spotlight.conceptLabel} steps={spotlight.steps} />
        </div>
      </Section>

      {/* Software solutions & services overview */}
      <Section id="services" labelledBy="services-title">
        <div className={styles.split}>
          <div className={styles.stack}>
            <SectionHeading
              id="services-title"
              eyebrow={servicesOverview.eyebrow}
              title={servicesOverview.title}
              lead={servicesOverview.lead}
            />
            <div className={styles.actions}>
              <Button href={servicesOverview.primary.href}>{servicesOverview.primary.label}</Button>
              <Button href={servicesOverview.secondary.href} variant="secondary">
                {servicesOverview.secondary.label}
              </Button>
            </div>
          </div>
          <div className={styles.startingPoints}>
            <h3 className={styles.startingTitle}>{servicesOverview.startingPointsTitle}</h3>
            <ul role="list" className={styles.startingList}>
              {servicesOverview.startingPoints.map((point) => (
                <li key={point.title} className={styles.startingItem}>
                  <span className={styles.startingMarker} aria-hidden="true" />
                  <p>
                    <strong>{point.title}</strong> {point.text}
                  </p>
                </li>
              ))}
            </ul>
          </div>
        </div>
      </Section>

      {/* How we work — truthful principles instead of unverified proof */}
      <Section id="approach" tone="soft" labelledBy="approach-title">
        <SectionHeading id="approach-title" eyebrow={approach.eyebrow} title={approach.title} lead={approach.lead} />
        <ol role="list" className={styles.principles}>
          {approach.principles.map((principle, i) => (
            <li key={principle.title} className={styles.principle}>
              <span className={styles.principleIndex} aria-hidden="true">
                {String(i + 1).padStart(2, "0")}
              </span>
              <h3 className={styles.principleTitle}>{principle.title}</h3>
              <p className={styles.principleText}>{principle.text}</p>
            </li>
          ))}
        </ol>
      </Section>

      <CTASection id="get-started" title={closingCta.title} lead={closingCta.lead} routes={closingCta.routes} />
    </>
  );
}
