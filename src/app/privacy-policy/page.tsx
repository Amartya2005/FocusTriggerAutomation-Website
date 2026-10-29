import { PageHeader } from "@/components/layout/PageHeader";
import { pageMetadata } from "@/lib/metadata";

// Phase 1 stub — a draft policy for legal review is added in Phase 5.

export const metadata = pageMetadata({
  title: "Privacy Policy",
  description: "Privacy Policy of FocusTrigger Automation Private Limited.",
  path: "/privacy-policy",
});

export default function PrivacyPolicyPage() {
  return (
    <PageHeader
      eyebrow="Legal"
      title="Privacy Policy"
      lead={<p>This policy is being prepared and will be published after review.</p>}
    />
  );
}
