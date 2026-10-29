import { Section } from "@/components/layout/Section";
import { CTASection } from "@/components/sections/CTASection";
import { FaqList } from "@/components/sections/FaqList";
import { Hero } from "@/components/sections/Hero";
import { ProcessSteps } from "@/components/sections/ProcessSteps";
import { SectionHeading } from "@/components/sections/SectionHeading";
import { ServiceCard } from "@/components/sections/ServiceCard";
import { Button } from "@/components/ui/Button";
import { ServicesIllustration } from "@/components/visuals/ServicesIllustration";
import { serviceAreas, servicesPage, softwareContactHref } from "@/content/services";
import { pageMetadata } from "@/lib/metadata";
import styles from "./page.module.css";

export const metadata = pageMetadata({
  title: "Software Solutions & Services",
  description:
    "FocusTrigger Automation Private Limited develops software solutions and provides technology services for clients, alongside building its own products such as FocusTag.",
  path: "/services",
});

const { hero, positioning, overview, audiences, engineering, engagement, faq, cta } = servicesPage;

export default function ServicesPage() {
  return (
    <>
      <Hero
        variant="services"
        eyebrow={hero.eyebrow}
        title={hero.title}
        lead={hero.lead}
        visual={<ServicesIllustration />}
        actions={
          <>
            <Button href={softwareContactHref} size="lg">
              Discuss a project
            </Button>
            <Button href="#how-engagements-begin" variant="secondary" size="lg">
              How engagements begin
            </Button>
          </>
        }
      />

      {/* Positioning: one company, two pillars */}
      <Section id="who-we-are" labelledBy="who-we-are-title">
        <div className={styles.split}>
          <div className={styles.stack}>
            <SectionHeading id="who-we-are-title" eyebrow={positioning.eyebrow} title={positioning.title} />
            {positioning.paragraphs.map((text) => (
              <p key={text} className={styles.body}>
                {text}
              </p>
            ))}
          </div>
          <ul role="list" className={styles.pillars} aria-label="FocusTrigger’s two pillars">
            {positioning.pillars.map((pillar) => (
              <li key={pillar.label} className={`${styles.pillar} ${pillar.current ? styles.pillarCurrent : ""}`}>
                <div className={styles.pillarHead}>
                  <p className={styles.pillarLabel}>{pillar.label}</p>
                  {pillar.current && <span className={styles.pillarBadge}>This page</span>}
                </div>
                <p className={styles.pillarText}>{pillar.text}</p>
                {pillar.href && (
                  <Button href={pillar.href} variant="text" className={styles.pillarLink}>
                    {pillar.linkLabel} <span aria-hidden="true">→</span>
                  </Button>
                )}
              </li>
            ))}
          </ul>
        </div>
      </Section>

      {/* Service areas — rendered from content, so confirmed categories slot in without layout changes */}
      <Section id="what-we-offer" tone="soft" labelledBy="what-we-offer-title">
        <SectionHeading id="what-we-offer-title" eyebrow={overview.eyebrow} title={overview.title} lead={overview.lead} />
        <div className={styles.serviceGrid}>
          {serviceAreas.map((area) => (
            <ServiceCard key={area.title} title={area.title} description={area.description} examples={area.examples} />
          ))}
        </div>
      </Section>

      {/* Audiences */}
      <Section id="who-we-work-with" labelledBy="who-we-work-with-title">
        <SectionHeading
          id="who-we-work-with-title"
          eyebrow={audiences.eyebrow}
          title={audiences.title}
          lead={audiences.lead}
        />
        <ul role="list" className={styles.audiences}>
          {audiences.items.map((item) => (
            <li key={item.title} className={styles.audience}>
              <h3 className={styles.audienceTitle}>{item.title}</h3>
              <p className={styles.audienceText}>{item.text}</p>
            </li>
          ))}
        </ul>
      </Section>

      {/* Engineering experience — evidence limited to FocusTrigger's own confirmed product */}
      <Section id="engineering" tone="soft" labelledBy="engineering-title">
        <div className={styles.split}>
          <SectionHeading id="engineering-title" eyebrow={engineering.eyebrow} title={engineering.title} lead={engineering.lead} />
          <article className={styles.evidence}>
            <p className={styles.evidenceLabel}>{engineering.evidence.label}</p>
            <h3 className={styles.evidenceTitle}>{engineering.evidence.title}</h3>
            <p className={styles.evidenceText}>{engineering.evidence.text}</p>
            <Button href={engineering.evidence.href} variant="text" className={styles.evidenceLink}>
              {engineering.evidence.linkLabel} <span aria-hidden="true">→</span>
            </Button>
          </article>
        </div>
      </Section>

      {/* How engagements begin */}
      <Section id="how-engagements-begin" labelledBy="how-engagements-begin-title">
        <SectionHeading
          id="how-engagements-begin-title"
          eyebrow={engagement.eyebrow}
          title={engagement.title}
          lead={engagement.lead}
        />
        <div className={styles.process}>
          <ProcessSteps steps={engagement.steps} />
        </div>
      </Section>

      <Section id="faq" tone="soft" labelledBy="services-faq-title" containerSize="narrow">
        <SectionHeading id="services-faq-title" eyebrow="FAQ" title="Questions about working with FocusTrigger" />
        <div className={styles.faq}>
          <FaqList items={faq.map((item) => ({ question: item.question, answer: <p>{item.answer}</p> }))} />
        </div>
      </Section>

      <CTASection id="services-next" title={cta.title} lead={cta.lead} routes={[cta.route]} />
    </>
  );
}
