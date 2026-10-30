"use client";

import Link from "next/link";
import { usePathname, useRouter, useSearchParams } from "next/navigation";
import { useState } from "react";
import { Button } from "@/components/ui/Button";
import { contactPage, enquiryHref, enquiryMailto, enquiryTypes, parseEnquiryType, type EnquiryTypeId } from "@/content/contact";
import { site } from "@/lib/site";
import { ContactForm } from "./ContactForm";
import styles from "./ContactEnquiry.module.css";

/** Reads `?enquiry=` and renders the enquiry chooser plus the form (or its unavailable state). */
export function ContactEnquiry() {
  const searchParams = useSearchParams();
  return <ContactEnquiryView initialType={parseEnquiryType(searchParams.get("enquiry"))} />;
}

/** Static-render fallback and the shared view; `initialType` comes from the URL. */
export function ContactEnquiryView({ initialType }: { initialType: EnquiryTypeId | null }) {
  const router = useRouter();
  const pathname = usePathname();
  const [selected, setSelected] = useState<EnquiryTypeId | null>(initialType);
  const [lastInitial, setLastInitial] = useState(initialType);

  // Follow the URL when the visitor uses an enquiry link or browser history.
  if (initialType !== lastInitial) {
    setLastInitial(initialType);
    setSelected(initialType);
  }

  function choose(id: EnquiryTypeId | null) {
    setSelected(id);
    router.replace(id ? enquiryHref(id) : pathname, { scroll: false });
  }

  const selectedType = enquiryTypes.find((type) => type.id === selected) ?? null;
  const { formEndpoint: endpoint, email } = site.contact;

  return (
    <div className={styles.layout}>
      <div className={styles.types}>
        <h2 id="enquiry-types-title" className={styles.heading}>
          {contactPage.types.title}
        </h2>
        <p className={styles.lead}>{contactPage.types.lead}</p>
        <ul role="list" className={styles.typeList} aria-labelledby="enquiry-types-title">
          {enquiryTypes.map((type) => {
            const isSelected = type.id === selected;
            return (
              <li key={type.id}>
                <Link
                  href={enquiryHref(type.id)}
                  scroll={false}
                  replace
                  className={`${styles.typeLink} ${isSelected ? styles.typeSelected : ""}`}
                  aria-current={isSelected ? "true" : undefined}
                >
                  <span className={styles.typeText}>
                    <span className={styles.typeLabel}>{type.label}</span>{" "}
                    <span className={styles.typeDescription}>{type.description}</span>
                  </span>
                  <span className={styles.typeIndicator} aria-hidden="true">
                    {isSelected ? (
                      <svg width="20" height="20" viewBox="0 0 20 20" fill="none" focusable="false">
                        <circle cx="10" cy="10" r="9" fill="currentColor" />
                        <path className={styles.typeCheck} d="M6 10.2l2.6 2.6L14 7.4" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round" />
                      </svg>
                    ) : (
                      <svg width="20" height="20" viewBox="0 0 20 20" fill="none" focusable="false">
                        <circle cx="10" cy="10" r="8.25" stroke="currentColor" strokeWidth="1.5" />
                      </svg>
                    )}
                  </span>
                </Link>
              </li>
            );
          })}
        </ul>
      </div>

      <div className={styles.panel}>
        {endpoint ? (
          <>
            <h2 className={styles.heading}>{contactPage.form.title}</h2>
            <ContactForm endpoint={endpoint} enquiryType={selected} onEnquiryTypeChange={choose} />
            {email && (
              <p className={styles.altEmail}>
                {contactPage.form.emailAlternative}{" "}
                <a href={enquiryMailto(email, selectedType?.label ?? null)}>{email}</a>
              </p>
            )}
          </>
        ) : email ? (
          <div className={styles.channel}>
            <MailIcon />
            <h2 className={styles.heading}>{contactPage.email.title}</h2>
            <p className={styles.channelText}>{contactPage.email.text}</p>
            <p className={styles.address}>
              <span className={styles.addressLabel}>Email</span>
              <a href={`mailto:${email}`} className={styles.addressLink}>
                {email}
              </a>
            </p>
            <Button href={enquiryMailto(email, selectedType?.label ?? null)} size="lg">
              {contactPage.email.actionLabel}
              {selectedType && <span className="visually-hidden">{` about: ${selectedType.label}`}</span>}
            </Button>
            <p className={styles.note}>{contactPage.email.note}</p>
            <Guidance type={selectedType} />
          </div>
        ) : (
          <div className={styles.channel}>
            <MailIcon />
            <h2 className={styles.heading}>{contactPage.unavailable.title}</h2>
            <p className={styles.channelText}>{contactPage.unavailable.text}</p>
            <Guidance type={selectedType} />
          </div>
        )}
      </div>
    </div>
  );
}

function Guidance({ type }: { type: (typeof enquiryTypes)[number] | null }) {
  return (
    <div aria-live="polite" className={styles.guidanceRegion}>
      {type && (
        <div className={styles.guidance}>
          <p className={styles.guidanceLabel}>
            Enquiry type: <strong>{type.label}</strong>
          </p>
          <p>When you get in touch, it helps to include:</p>
          <ul className={styles.guidanceList}>
            {type.guidance.map((item) => (
              <li key={item}>{item}</li>
            ))}
          </ul>
        </div>
      )}
    </div>
  );
}

function MailIcon() {
  return (
    <span className={styles.channelIcon} aria-hidden="true">
      <svg width="24" height="24" viewBox="0 0 24 24" fill="none" focusable="false">
        <rect x="3" y="5" width="18" height="14" rx="2.5" stroke="currentColor" strokeWidth="1.75" />
        <path d="M3.5 7l8.5 6 8.5-6" stroke="currentColor" strokeWidth="1.75" strokeLinecap="round" strokeLinejoin="round" />
      </svg>
    </span>
  );
}
