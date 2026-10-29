import { PageHeader } from "@/components/layout/PageHeader";
import { pageMetadata } from "@/lib/metadata";

// Phase 1 stub — the About page is built in Phase 5.

export const metadata = pageMetadata({
  title: "About",
  description:
    "About FocusTrigger Automation Private Limited, a technology company building proprietary products and software solutions.",
  path: "/about",
});

export default function AboutPage() {
  return (
    <PageHeader
      eyebrow="About"
      title="About FocusTrigger"
      lead={
        <p>
          FocusTrigger Automation Private Limited builds its own technology products and provides software solutions for
          clients.
        </p>
      }
    />
  );
}
