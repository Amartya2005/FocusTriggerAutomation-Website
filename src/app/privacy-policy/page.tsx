import { PageHeader } from "@/components/layout/PageHeader";
import { Prose } from "@/components/layout/Prose";
import { Section } from "@/components/layout/Section";
import { pageMetadata } from "@/lib/metadata";
import { site } from "@/lib/site";

/*
 * DRAFT — awaiting company and legal review (see IMPLEMENTATION_NOTES.md →
 * Phase 5 → Privacy Policy). Every statement describes behaviour verified in
 * this codebase and its production build. The enquiry-form and contact
 * sections follow site.contact, so enabling the form or publishing an email
 * changes this page — and requires the policy to be reviewed again.
 */

export const metadata = pageMetadata({
  title: "Privacy Policy",
  description: "How the FocusTrigger Automation Private Limited website handles information about visitors.",
  path: "/privacy-policy",
});

export default function PrivacyPolicyPage() {
  const formEnabled = Boolean(site.contact.formEndpoint);
  const privacyEmail = site.contact.email;

  return (
    <>
      <PageHeader
        eyebrow="Legal"
        title="Privacy Policy"
        lead={<p>How the {site.legalName} website handles information about the people who visit it.</p>}
      />

      <Section id="policy" labelledBy="policy-scope" containerSize="narrow">
        <Prose>
          <h2 id="policy-scope">About this policy</h2>
          <p>
            This policy explains how information is handled when you visit the website of {site.legalName} (“{site.name}”,
            “we”). It applies to this website only.
          </p>

          <h2>Information you provide</h2>
          {formEnabled ? (
            <>
              <p>
                If you send an enquiry through the contact form, the details you enter are sent to the service that
                processes the form so that {site.name} can respond to your enquiry. These details are:
              </p>
              <ul>
                <li>your name and email address;</li>
                <li>your organisation and phone number, if you choose to provide them;</li>
                <li>the enquiry type you select and your message.</li>
              </ul>
              <p>Please do not include sensitive personal information in your message.</p>
            </>
          ) : (
            <p>
              This website does not currently offer a contact form or any other way to submit personal information
              through the site.
            </p>
          )}

          <h2>Cookies and browser storage</h2>
          <p>
            This website does not set cookies, and it does not use your browser’s local or session storage to identify
            or track you.
          </p>

          <h2>Analytics, advertising and third-party content</h2>
          <p>
            This website does not use analytics or advertising services. Pages, fonts and images are delivered from
            this website itself; it does not load scripts, fonts or other content from third-party services while you
            browse.
          </p>

          <h2>Technical information</h2>
          <p>
            As with any website, your browser sends standard technical information — such as your IP address, browser
            type and the page requested — to the server that delivers this website, because this is needed to deliver
            the pages to you.
          </p>

          <h2>Changes to this policy</h2>
          <p>We will update this page if the way this website handles information changes.</p>

          {privacyEmail && (
            <>
              <h2>Contact</h2>
              <p>
                Questions about this policy can be sent to <a href={`mailto:${privacyEmail}`}>{privacyEmail}</a>.
              </p>
            </>
          )}
        </Prose>
      </Section>
    </>
  );
}
