"use client";

import { useRef, useState, type ChangeEvent, type FormEvent, type ReactNode } from "react";
import { Button } from "@/components/ui/Button";
import { enquiryTypes, type EnquiryTypeId } from "@/content/contact";
import styles from "./ContactForm.module.css";

type FieldName = "name" | "email" | "organisation" | "phone" | "enquiryType" | "message";
type Values = Record<FieldName, string>;
type Errors = Partial<Record<FieldName, string>>;
type Status = "idle" | "submitting" | "success" | "error";

const FIELD_ORDER: FieldName[] = ["name", "email", "organisation", "phone", "enquiryType", "message"];
const MESSAGE_MIN_LENGTH = 20;
const REQUEST_TIMEOUT_MS = 15000;

export function validate(values: Values): Errors {
  const errors: Errors = {};
  if (!values.name.trim()) errors.name = "Enter your name.";
  if (!values.email.trim()) errors.email = "Enter your email address.";
  else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(values.email.trim())) errors.email = "Enter a valid email address, like name@example.com.";
  if (values.phone.trim() && !/^\+?[\d\s()-]{7,20}$/.test(values.phone.trim()))
    errors.phone = "Enter a valid phone number, or leave this field empty.";
  if (!values.enquiryType) errors.enquiryType = "Choose an enquiry type.";
  const messageLength = values.message.trim().length;
  if (!messageLength) errors.message = "Enter your message.";
  else if (messageLength < MESSAGE_MIN_LENGTH)
    errors.message = `Your message needs at least ${MESSAGE_MIN_LENGTH} characters (currently ${messageLength}).`;
  return errors;
}

type ContactFormProps = {
  /** Public URL that accepts the enquiry as a JSON POST. */
  endpoint: string;
  enquiryType: EnquiryTypeId | null;
  onEnquiryTypeChange: (id: EnquiryTypeId | null) => void;
};

/**
 * Enquiry form. It reports success only when the configured endpoint
 * responds with a 2xx status; any other outcome keeps the entered values and
 * shows an error.
 */
export function ContactForm({ endpoint, enquiryType, onEnquiryTypeChange }: ContactFormProps) {
  const [values, setValues] = useState<Omit<Values, "enquiryType">>({ name: "", email: "", organisation: "", phone: "", message: "" });
  const [errors, setErrors] = useState<Errors>({});
  const [attempted, setAttempted] = useState(false);
  const [status, setStatus] = useState<Status>("idle");
  const successRef = useRef<HTMLHeadingElement>(null);

  const allValues: Values = { ...values, enquiryType: enquiryType ?? "" };

  function update(event: ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) {
    const name = event.target.name as FieldName;
    const value = event.target.value;
    if (name === "enquiryType") onEnquiryTypeChange((value || null) as EnquiryTypeId | null);
    else setValues((current) => ({ ...current, [name]: value }));
    // Once the visitor has tried to submit, keep errors in step with their edits.
    if (attempted) setErrors(validate({ ...allValues, [name]: value }));
    if (status === "error") setStatus("idle");
  }

  async function handleSubmit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    if (status === "submitting") return;
    setAttempted(true);

    const found = validate(allValues);
    setErrors(found);
    const firstInvalid = FIELD_ORDER.find((field) => found[field]);
    if (firstInvalid) {
      document.getElementById(firstInvalid)?.focus();
      return;
    }

    setStatus("submitting");
    const controller = new AbortController();
    const timeout = window.setTimeout(() => controller.abort(), REQUEST_TIMEOUT_MS);
    try {
      const response = await fetch(endpoint, {
        method: "POST",
        headers: { "Content-Type": "application/json", Accept: "application/json" },
        body: JSON.stringify({
          name: allValues.name.trim(),
          email: allValues.email.trim(),
          organisation: allValues.organisation.trim(),
          phone: allValues.phone.trim(),
          enquiryType: allValues.enquiryType,
          message: allValues.message.trim(),
        }),
        signal: controller.signal,
      });
      if (!response.ok) throw new Error(`Unexpected response: ${response.status}`);
      setStatus("success");
      window.setTimeout(() => successRef.current?.focus(), 0);
    } catch {
      setStatus("error");
    } finally {
      window.clearTimeout(timeout);
    }
  }

  if (status === "success") {
    return (
      <div className={styles.result} role="status">
        <h3 ref={successRef} tabIndex={-1} className={styles.resultTitle}>
          Your enquiry has been sent
        </h3>
        <p>Thank you for contacting FocusTrigger.</p>
      </div>
    );
  }

  const errorCount = Object.keys(errors).length;
  const describedBy = (field: FieldName, hint?: string) =>
    [hint, errors[field] ? `${field}-error` : null].filter(Boolean).join(" ") || undefined;

  const fieldProps = (field: FieldName) => ({
    id: field,
    name: field,
    "aria-invalid": errors[field] ? true : undefined,
    "aria-describedby": describedBy(field),
  });

  return (
    <form className={styles.form} onSubmit={handleSubmit} noValidate aria-describedby="form-required-note">
      <p id="form-required-note" className={styles.requiredNote}>
        Fields marked <span aria-hidden="true">*</span>
        <span className="visually-hidden">with an asterisk</span> are required.
      </p>

      <div className={styles.liveRegion} role="alert">
        {attempted && errorCount > 0 && (
          <p className={styles.summary}>
            {errorCount === 1 ? "There is 1 problem with your enquiry." : `There are ${errorCount} problems with your enquiry.`} Please
            check the highlighted {errorCount === 1 ? "field" : "fields"}.
          </p>
        )}
        {status === "error" && (
          <p className={styles.summary}>
            Your enquiry could not be sent. Your details are still in the form — please try again.
          </p>
        )}
      </div>

      <div className={styles.grid}>
        <Field label="Name" field="name" required error={errors.name}>
          <input {...fieldProps("name")} type="text" autoComplete="name" required value={values.name} onChange={update} />
        </Field>

        <Field label="Email" field="email" required error={errors.email}>
          <input {...fieldProps("email")} type="email" autoComplete="email" required value={values.email} onChange={update} />
        </Field>

        <Field label="Organisation" field="organisation" error={errors.organisation}>
          <input {...fieldProps("organisation")} type="text" autoComplete="organization" value={values.organisation} onChange={update} />
        </Field>

        <Field label="Phone" field="phone" error={errors.phone}>
          <input {...fieldProps("phone")} type="tel" autoComplete="tel" value={values.phone} onChange={update} />
        </Field>
      </div>

      <Field label="Enquiry type" field="enquiryType" required error={errors.enquiryType}>
        <select {...fieldProps("enquiryType")} required value={enquiryType ?? ""} onChange={update}>
          <option value="">Choose an enquiry type</option>
          {enquiryTypes.map((type) => (
            <option key={type.id} value={type.id}>
              {type.label}
            </option>
          ))}
        </select>
      </Field>

      <Field
        label="Message"
        field="message"
        required
        error={errors.message}
        hint={`At least ${MESSAGE_MIN_LENGTH} characters.`}
      >
        <textarea
          {...fieldProps("message")}
          aria-describedby={describedBy("message", "message-hint")}
          required
          rows={6}
          value={values.message}
          onChange={update}
        />
      </Field>

      <div className={styles.actions}>
        <Button type="submit" size="lg" disabled={status === "submitting"}>
          {status === "submitting" ? "Sending…" : "Send enquiry"}
        </Button>
        <p className={styles.liveRegion} role="status" aria-live="polite">
          {status === "submitting" ? "Sending your enquiry…" : ""}
        </p>
      </div>
    </form>
  );
}

type FieldProps = {
  label: string;
  field: FieldName;
  required?: boolean;
  error?: string;
  hint?: string;
  children: ReactNode;
};

function Field({ label, field, required, error, hint, children }: FieldProps) {
  return (
    <div className={`${styles.field} ${error ? styles.invalid : ""}`}>
      <label htmlFor={field} className={styles.label}>
        {label}
        {required ? (
          <span className={styles.required} aria-hidden="true">
            {" "}
            *
          </span>
        ) : (
          <span className={styles.optional}> (optional)</span>
        )}
      </label>
      {hint && (
        <p id={`${field}-hint`} className={styles.hint}>
          {hint}
        </p>
      )}
      {children}
      {error && (
        <p id={`${field}-error`} className={styles.error}>
          <svg aria-hidden="true" focusable="false" width="16" height="16" viewBox="0 0 16 16" fill="none">
            <circle cx="8" cy="8" r="7" stroke="currentColor" strokeWidth="1.5" />
            <path d="M8 4.5v4M8 11v.5" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" />
          </svg>
          <span>
            <span className="visually-hidden">Error: </span>
            {error}
          </span>
        </p>
      )}
    </div>
  );
}
