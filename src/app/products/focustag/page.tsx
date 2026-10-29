import { PageHeader } from "@/components/layout/PageHeader";
import { Button } from "@/components/ui/Button";
import { pageMetadata } from "@/lib/metadata";

// Phase 1 stub — the FocusTag product page is built in Phase 3.

export const metadata = pageMetadata({
  title: "FocusTag",
  description: "FocusTag is a product of FocusTrigger Automation Private Limited built around NFC- and QR-enabled interactions.",
  path: "/products/focustag",
});

export default function FocusTagPage() {
  return (
    <PageHeader
      eyebrow="Product"
      title="FocusTag"
      lead={<p>A FocusTrigger product built around NFC- and QR-enabled interactions.</p>}
    >
      <Button href="/contact?enquiry=focustag">Discuss FocusTag</Button>
    </PageHeader>
  );
}
