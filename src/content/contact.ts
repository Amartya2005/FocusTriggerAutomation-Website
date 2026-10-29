/**
 * Contact page content and enquiry types.
 *
 * Enquiry links across the site use `/contact?enquiry=<id>`; the ids below
 * are the only accepted values. No contact details are published until the
 * company confirms them (see `site.contact`).
 */

export const enquiryTypes = [
  {
    id: "focustag",
    label: "FocusTag",
    description: "Interest in FocusTag, including a possible demonstration or pilot.",
    guidance: ["Your organisation and how you are considering FocusTag.", "Whether you would like to discuss a demonstration or pilot."],
  },
  {
    id: "software",
    label: "Software project",
    description: "Software you need designed and developed.",
    guidance: ["What you need built and who it is for.", "Any timeline or constraints you already know about."],
  },
  {
    id: "partnership",
    label: "Partnership",
    description: "An institutional or technology partnership.",
    guidance: ["Your organisation.", "The kind of partnership you have in mind."],
  },
  {
    id: "other",
    label: "Other",
    description: "Anything else you would like to ask.",
    guidance: ["A short description of your question."],
  },
] as const;

export type EnquiryTypeId = (typeof enquiryTypes)[number]["id"];

export function parseEnquiryType(value: string | null | undefined): EnquiryTypeId | null {
  return enquiryTypes.some((type) => type.id === value) ? (value as EnquiryTypeId) : null;
}

export function enquiryHref(id: EnquiryTypeId) {
  return `/contact?enquiry=${id}`;
}

export const contactPage = {
  hero: {
    eyebrow: "Contact",
    title: "Contact FocusTrigger",
    lead: "Tell us about your interest in FocusTag, a software project or a partnership.",
  },
  types: {
    title: "Choose an enquiry type",
    lead: "Choosing a type labels your enquiry, so it reaches the right part of the company, and shows what to include.",
  },
  form: {
    title: "Send an enquiry",
    emailAlternative: "Prefer email? Write to",
  },
  /** Fallback if neither a form endpoint nor an email address is configured. */
  unavailable: {
    title: "Online enquiries are not open yet",
    text: "The enquiry form will be available on this page soon. No information can be submitted here at the moment.",
  },
  /** Shown while no form endpoint is configured: email is the contact channel. */
  email: {
    title: "Email FocusTrigger",
    text: "Contact FocusTrigger by email. The online enquiry form is not available yet, so this page cannot send messages itself.",
    actionLabel: "Write an email",
    note: "“Write an email” opens your own email app. Your message is sent by your email provider, not through this website.",
  },
};

/** mailto: link with a subject line naming the selected enquiry type. */
export function enquiryMailto(email: string, typeLabel: string | null) {
  const subject = typeLabel ? `Enquiry: ${typeLabel}` : "Website enquiry";
  return `mailto:${email}?subject=${encodeURIComponent(subject)}`;
}
