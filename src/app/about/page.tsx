import { Section } from "@/components/layout/Section";
import { CapabilityComparison } from "@/components/sections/CapabilityComparison";
import { CTASection } from "@/components/sections/CTASection";
import { Hero } from "@/components/sections/Hero";
import { PathwayCard } from "@/components/sections/PathwayCard";
import { PrincipleList } from "@/components/sections/PrincipleList";
import { SectionHeading } from "@/components/sections/SectionHeading";
import { Button } from "@/components/ui/Button";
import { aboutPage } from "@/content/about";
import { focustag, focustagContactHref } from "@/content/focustag";
import { approach, pathways } from "@/content/home";
import { pageMetadata } from "@/lib/metadata";
import styles from "./page.module.css";

export const metadata = pageMetadata({
  title: "About",
  description:
    "About FocusTrigger Automation Private Limited: a technology company that builds its own products, beginning with FocusTag, and develops software solutions for clients.",
  path: "/about",
});

const { hero, pillars, product, glance, cta } = aboutPage;

export default function AboutPage() {
  return (
    <>
      <Hero eyebrow={hero.eyebrow} title={hero.title} lead={hero.lead} />

      {/* Two pillars */}
      <Section id="pillars" labelledBy="pillars-title">
        <SectionHeading id="pillars-title" eyebrow={pillars.eyebrow} title={pillars.title} lead={pillars.lead} />
        <div className={styles.pathways}>
          {pathways.map((pathway) => (
            <PathwayCard key={pathway.id} tone={pathway.id === "products" ? "product" : "services"} {...pathway} />
          ))}
        </div>
      </Section>

      {/* FocusTag: current functionality vs vision */}
      <Section id="our-product" tone="soft" labelledBy="our-product-title">
        <SectionHeading id="our-product-title" eyebrow={product.eyebrow} title={product.title} lead={product.lead} />
        <div className={styles.comparison}>
          <CapabilityComparison
            current={{ title: "Confirmed functionality", items: focustag.confirmed }}
            vision={{
              title: "Product vision",
              items: focustag.vision,
              note: <p>These themes describe the direction of FocusTag’s development, not current features.</p>,
            }}
          />
        </div>
        <div className={styles.actions}>
          <Button href={focustag.href}>Explore FocusTag</Button>
          <Button href={focustagContactHref} variant="secondary">
            Ask about FocusTag
          </Button>
        </div>
      </Section>

      {/* How we work (shared with the homepage) */}
      <Section id="how-we-work" labelledBy="how-we-work-title">
        <SectionHeading id="how-we-work-title" eyebrow={approach.eyebrow} title={approach.title} lead={approach.lead} />
        <PrincipleList principles={approach.principles} />
      </Section>

      {/* Confirmed company facts only */}
      <Section id="at-a-glance" tone="soft" labelledBy="at-a-glance-title">
        <SectionHeading id="at-a-glance-title" eyebrow={glance.eyebrow} title={glance.title} />
        <dl className={styles.facts}>
          {glance.items.map((item) => (
            <div key={item.term} className={styles.fact}>
              <dt>{item.term}</dt>
              <dd>{item.detail}</dd>
            </div>
          ))}
        </dl>
      </Section>

      <CTASection
        id="about-next"
        title={cta.title}
        lead={cta.lead}
        routes={[
          {
            title: "Explore FocusTag",
            text: focustag.summary,
            action: { label: "Explore FocusTag", href: focustag.href },
          },
          {
            title: "Get in touch",
            text: "Find out how to contact FocusTrigger about FocusTag, a software project or a partnership.",
            action: { label: "Contact FocusTrigger", href: "/contact" },
          },
        ]}
      />
    </>
  );
}
