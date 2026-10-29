import { Section } from "@/components/layout/Section";
import { CapabilityComparison } from "@/components/sections/CapabilityComparison";
import { CTASection } from "@/components/sections/CTASection";
import { FaqList, type FaqItem } from "@/components/sections/FaqList";
import { Hero } from "@/components/sections/Hero";
import { SectionHeading } from "@/components/sections/SectionHeading";
import { Breadcrumbs } from "@/components/ui/Breadcrumbs";
import { Button } from "@/components/ui/Button";
import { InteractionConcept } from "@/components/visuals/InteractionConcept";
import { PhoneToPhoneIllustration } from "@/components/visuals/PhoneToPhoneIllustration";
import { focustag, focustagContactHref } from "@/content/focustag";
import { pageMetadata } from "@/lib/metadata";
import styles from "./page.module.css";

export const metadata = pageMetadata({
  title: "FocusTag",
  description:
    "FocusTag, a product of FocusTrigger Automation Private Limited, supports direct phone-to-phone NFC interaction with a QR code as a fallback.",
  path: "/products/focustag",
});

/** General technology background — not FocusTag specifications. */
const technologies = [
  {
    term: "NFC (near-field communication)",
    text: "A short-range wireless technology built into many smartphones. It works when two devices are held very close together.",
  },
  {
    term: "QR code",
    text: "A machine-readable pattern that can be scanned with a phone’s camera.",
  },
];

const faqs: FaqItem[] = [
  {
    question: "What is FocusTag?",
    answer: (
      <p>
        FocusTag is a product of FocusTrigger Automation Private Limited. It supports direct phone-to-phone NFC
        interaction, with a QR code as a fallback.
      </p>
    ),
  },
  {
    question: "Is NFC the only way to use FocusTag?",
    answer: (
      <p>No. A direct NFC tap between two phones is the primary interaction, and a QR code is available as a fallback.</p>
    ),
  },
  {
    question: "Are smart-campus productivity and spatial-compliance features available now?",
    answer: (
      <p>
        These themes describe FocusTag’s broader product vision. Only the functionality listed under “Available now” on
        this page is presented as current.
      </p>
    ),
  },
  {
    question: "How can my organisation find out more?",
    answer: (
      <>
        <p>Get in touch through the contact page to discuss FocusTag for your organisation.</p>
        <p>
          <Button href={focustagContactHref} variant="text">
            Contact FocusTrigger about FocusTag <span aria-hidden="true">→</span>
          </Button>
        </p>
      </>
    ),
  },
];

export default function FocusTagPage() {
  return (
    <>
      <Hero
        variant="product"
        breadcrumbs={<Breadcrumbs items={[{ label: "Products", href: "/products" }, { label: focustag.name }]} />}
        eyebrow="A FocusTrigger product"
        title={focustag.name}
        lead={focustag.summary}
        visual={<PhoneToPhoneIllustration />}
        actions={
          <>
            <Button href={focustagContactHref} size="lg">
              Discuss FocusTag
            </Button>
            <Button href="#how-it-works" variant="secondary" size="lg">
              How it works
            </Button>
          </>
        }
      />

      {/* Confirmed interaction model */}
      <Section id="how-it-works" labelledBy="how-it-works-title">
        <SectionHeading
          id="how-it-works-title"
          eyebrow="How it works"
          title="Two ways to interact"
          lead="FocusTag’s primary interaction is a direct NFC tap between two phones. A QR code is available as a fallback."
        />
        <div className={styles.split}>
          <InteractionConcept label={focustag.interactionModelLabel} methods={focustag.interactionMethods} />
          <div className={styles.background}>
            <h3 className={styles.backgroundTitle}>
              Background: the technologies
            </h3>
            <dl className={styles.terms}>
              {technologies.map((item) => (
                <div key={item.term} className={styles.term}>
                  <dt>{item.term}</dt>
                  <dd>{item.text}</dd>
                </div>
              ))}
            </dl>
            <p className={styles.backgroundNote}>General descriptions of the technologies, not FocusTag specifications.</p>
          </div>
        </div>
      </Section>

      {/* Current functionality vs product vision */}
      <Section id="capabilities" tone="soft" labelledBy="capabilities-title">
        <SectionHeading
          id="capabilities-title"
          eyebrow="Today and next"
          title="What FocusTag does today, and where it is heading"
          lead="Confirmed functionality is listed separately from the product vision."
        />
        <div className={styles.comparison}>
          <CapabilityComparison
            current={{ title: "Confirmed functionality", items: focustag.confirmed }}
            vision={{
              title: "Product vision",
              items: focustag.vision,
              note: (
                <p>
                  These themes describe the direction of FocusTag’s development. They are not presented as current
                  features, and specific capabilities will be listed as available only once confirmed.
                </p>
              ),
            }}
          />
        </div>
      </Section>

      <Section id="faq" labelledBy="faq-title" containerSize="narrow">
        <SectionHeading id="faq-title" eyebrow="FAQ" title="Questions about FocusTag" />
        <div className={styles.faq}>
          <FaqList items={faqs} />
        </div>
      </Section>

      <CTASection
        id="focustag-next"
        title="Discuss FocusTag"
        lead="Tell us about your organisation and how you are considering FocusTag."
        routes={[
          {
            title: "Interested in FocusTag?",
            text: "Ask about FocusTag for your organisation, including whether a demonstration or pilot is possible.",
            action: { label: "Discuss FocusTag", href: focustagContactHref },
          },
          {
            title: "Need software built?",
            text: "FocusTrigger also develops software solutions and provides technology services for clients.",
            action: { label: "Explore services", href: "/services" },
          },
        ]}
      />
    </>
  );
}
