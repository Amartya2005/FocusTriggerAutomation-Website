/**
 * FocusTag facts shared by every page that describes the product.
 *
 * Confirmed by the company:
 *   - FocusTag supports direct phone-to-phone NFC interaction.
 *   - A QR code is available as a fallback.
 * Product vision (direction only — never present as current functionality):
 *   - smart-campus productivity
 *   - spatial compliance
 *
 * Do not add workflows, outcomes, integrations, device compatibility,
 * deployments, customers or results here until they are confirmed.
 * See IMPLEMENTATION_NOTES.md → Missing information register.
 */

import type { InteractionMethod } from "@/components/visuals/InteractionConcept";

export const focustagContactHref = "/contact?enquiry=focustag";

const interactionMethods: readonly InteractionMethod[] = [
  {
    kind: "primary",
    icon: "phones",
    title: "Phone-to-phone NFC",
    text: "Two phones interact directly through an NFC tap.",
  },
  {
    kind: "fallback",
    icon: "qr",
    title: "QR code",
    text: "A QR code provides a fallback to the NFC tap.",
  },
];

export const focustag = {
  name: "FocusTag",
  href: "/products/focustag",
  /** One-sentence description used in cards, metadata and introductions. */
  summary: "FocusTag supports direct phone-to-phone NFC interaction, with a QR code as a fallback.",
  interactionModelLabel: "FocusTag interaction model — illustrative",
  interactionMethods,
  /** Current, confirmed functionality only. */
  confirmed: [
    {
      title: "Direct phone-to-phone NFC interaction",
      text: "Two phones interact directly with each other through an NFC tap.",
    },
    {
      title: "QR code fallback",
      text: "A QR code is available as a fallback to the NFC interaction.",
    },
  ],
  /** Product direction — not current functionality. */
  vision: ["Smart-campus productivity", "Spatial compliance"],
} as const;
