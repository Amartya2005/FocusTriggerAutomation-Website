import { PageHeader } from "@/components/layout/PageHeader";
import { pageMetadata } from "@/lib/metadata";

// Phase 1 stub — the enquiry form and its delivery states are built in Phase 5.

export const metadata = pageMetadata({
  title: "Contact",
  description: "Contact FocusTrigger Automation Private Limited about FocusTag or a software project.",
  path: "/contact",
});

export default function ContactPage() {
  return (
    <PageHeader
      eyebrow="Contact"
      title="Contact FocusTrigger"
      lead={<p>An enquiry form for FocusTag and software projects is being prepared for this page.</p>}
    />
  );
}
