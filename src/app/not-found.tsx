import type { Metadata } from "next";
import { PageHeader } from "@/components/layout/PageHeader";
import { Button } from "@/components/ui/Button";

export const metadata: Metadata = {
  title: "Page not found",
  robots: { index: false },
};

export default function NotFound() {
  return (
    <PageHeader
      eyebrow="404"
      title="Page not found"
      lead={<p>The page you are looking for does not exist or may have moved.</p>}
    >
      <Button href="/">Go to the homepage</Button>
      <Button href="/contact" variant="secondary">
        Contact FocusTrigger
      </Button>
    </PageHeader>
  );
}
