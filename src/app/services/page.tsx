import { PageHeader } from "@/components/layout/PageHeader";
import { Button } from "@/components/ui/Button";
import { pageMetadata } from "@/lib/metadata";

// Phase 1 stub — the Services page is built in Phase 4.

export const metadata = pageMetadata({
  title: "Software Solutions & Services",
  description: "Software solutions and technology services for clients from FocusTrigger Automation Private Limited.",
  path: "/services",
});

export default function ServicesPage() {
  return (
    <PageHeader
      eyebrow="Services"
      title="Software Solutions & Services"
      lead={<p>Software solutions and technology services from FocusTrigger.</p>}
    >
      <Button href="/contact?enquiry=software">Discuss a project</Button>
    </PageHeader>
  );
}
