import { Suspense } from "react";
import { Section } from "@/components/layout/Section";
import { ContactEnquiry, ContactEnquiryView } from "@/components/contact/ContactEnquiry";
import { Hero } from "@/components/sections/Hero";
import { contactPage } from "@/content/contact";
import { pageMetadata } from "@/lib/metadata";
import { site } from "@/lib/site";
import styles from "./page.module.css";

export const metadata = pageMetadata({
  title: "Contact",
  description:
    "Contact FocusTrigger Automation Private Limited about FocusTag, a software project, a partnership or another question.",
  path: "/contact",
});

export default function ContactPage() {
  const { email, phone, address } = site.contact;
  const hasDirectDetails = Boolean(email || phone || address);

  return (
    <>
      <Hero eyebrow={contactPage.hero.eyebrow} title={contactPage.hero.title} lead={contactPage.hero.lead} />

      <Section id="enquiry" labelledBy="enquiry-types-title">
        {/* useSearchParams needs a Suspense boundary for static rendering; the fallback is the same view with no type selected. */}
        <Suspense fallback={<ContactEnquiryView initialType={null} />}>
          <ContactEnquiry />
        </Suspense>
      </Section>

      {/* Direct details appear only once the company confirms them in site.contact. */}
      {hasDirectDetails && (
        <Section id="direct-contact" tone="soft" spacing="compact" labelledBy="direct-contact-title">
          <h2 id="direct-contact-title" className={styles.directTitle}>
            Other ways to reach us
          </h2>
          <dl className={styles.details}>
            {email && (
              <div>
                <dt>Email</dt>
                <dd>
                  <a href={`mailto:${email}`}>{email}</a>
                </dd>
              </div>
            )}
            {phone && (
              <div>
                <dt>Phone</dt>
                <dd>
                  <a href={`tel:${phone.replace(/\s+/g, "")}`}>{phone}</a>
                </dd>
              </div>
            )}
            {address && (
              <div>
                <dt>Address</dt>
                <dd>{address}</dd>
              </div>
            )}
          </dl>
        </Section>
      )}
    </>
  );
}
