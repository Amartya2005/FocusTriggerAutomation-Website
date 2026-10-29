import { PageHeader } from "@/components/layout/PageHeader";
import { Button } from "@/components/ui/Button";
import { pageMetadata } from "@/lib/metadata";

// Phase 1 stub — the Products overview is built in Phase 3.

export const metadata = pageMetadata({
  title: "Products",
  description: "Proprietary technology products built by FocusTrigger Automation Private Limited, beginning with FocusTag.",
  path: "/products",
});

export default function ProductsPage() {
  return (
    <PageHeader
      eyebrow="Products"
      title="Products"
      lead={<p>Products built by FocusTrigger, beginning with FocusTag.</p>}
    >
      <Button href="/products/focustag">View FocusTag</Button>
    </PageHeader>
  );
}
