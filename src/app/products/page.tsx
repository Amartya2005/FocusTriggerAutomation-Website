import { Section } from "@/components/layout/Section";
import { CTASection } from "@/components/sections/CTASection";
import { Hero } from "@/components/sections/Hero";
import { ProductCard } from "@/components/sections/ProductCard";
import { SectionHeading } from "@/components/sections/SectionHeading";
import { PhoneToPhoneIllustration } from "@/components/visuals/PhoneToPhoneIllustration";
import { focustag, focustagContactHref } from "@/content/focustag";
import { pageMetadata } from "@/lib/metadata";
import styles from "./page.module.css";

export const metadata = pageMetadata({
  title: "Products",
  description:
    "Proprietary products built by FocusTrigger Automation Private Limited. The first is FocusTag, which supports direct phone-to-phone NFC interaction with a QR code as a fallback.",
  path: "/products",
});

export default function ProductsPage() {
  return (
    <>
      <Hero
        variant="product"
        eyebrow="Products"
        title="Products built by FocusTrigger"
        lead="Alongside software work for clients, FocusTrigger develops its own technology products. The first is FocusTag."
      />

      <Section id="current-products" labelledBy="current-products-title">
        <SectionHeading
          id="current-products-title"
          eyebrow="Portfolio"
          title="Current product"
          lead="FocusTrigger’s product portfolio begins with FocusTag."
        />
        <div className={styles.productList}>
          <ProductCard
            status="Current product"
            name={focustag.name}
            headingLevel="h3"
            summary={focustag.summary}
            capabilities={focustag.confirmed.map((item) => item.title)}
            direction={
              <p>
                <strong>Product direction:</strong> {focustag.vision.join(" and ").toLowerCase()} — the broader vision for
                FocusTag, not current functionality.
              </p>
            }
            primary={{ label: "Explore FocusTag", href: focustag.href }}
            secondary={{ label: "Ask about FocusTag", href: focustagContactHref }}
            visual={<PhoneToPhoneIllustration />}
          />
        </div>
      </Section>

      <CTASection
        id="products-next"
        title="Talk to FocusTrigger"
        lead="Ask about FocusTag, or tell us about software you need built."
        routes={[
          {
            title: "Interested in FocusTag?",
            text: "Tell us about your organisation and how you are considering FocusTag.",
            action: { label: "Ask about FocusTag", href: focustagContactHref },
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
