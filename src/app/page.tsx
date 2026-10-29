import type { Metadata } from "next";
import { PageHeader } from "@/components/layout/PageHeader";
import { Button } from "@/components/ui/Button";
import { site } from "@/lib/site";

// Phase 1 stub — the full homepage is built in Phase 2.

export const metadata: Metadata = {
  alternates: { canonical: "/" },
  openGraph: { url: "/" },
};

export default function HomePage() {
  return (
    <PageHeader
      eyebrow={site.legalName}
      title="Technology products and software solutions"
      lead={
        <p>
          {site.name} builds proprietary products, beginning with {site.productName}, and develops software solutions
          for clients.
        </p>
      }
    >
      <Button href="/products/focustag">Explore {site.productName}</Button>
      <Button href="/services" variant="secondary">
        Software services
      </Button>
    </PageHeader>
  );
}
