"use client";

import { useRef, useState, type FormEvent } from "react";
import Modal from "@/components/ui/Modal";
import Button from "@/components/ui/Button";
import {
  validateLeadContact,
  type LeadFieldErrors,
} from "@/lib/leadFormValidation";
import {
  getEmailJsErrorMessage,
  isEmailJsConfigured,
  sendLeadEmail,
} from "@/lib/sendLeadEmail";
import type { LeadSourceId } from "@/lib/leadTracking";

type LeadCaptureModalProps = {
  open: boolean;
  onClose: () => void;
  title: string;
  subtitle?: string;
  submitLabel?: string;
  initialNote?: string;
  source: LeadSourceId | string;
  sourceLabel: string;
  extraPayload?: Record<string, unknown>;
};

export default function LeadCaptureModal({
  open,
  onClose,
  title,
  subtitle,
  submitLabel = "Submit",
  initialNote = "",
  source,
  sourceLabel,
  extraPayload,
}: LeadCaptureModalProps) {
  const [name, setName] = useState("");
  const [phone, setPhone] = useState("");
  const [email, setEmail] = useState("");
  const [note, setNote] = useState(initialNote);
  const [errors, setErrors] = useState<LeadFieldErrors>({});
  const [loading, setLoading] = useState(false);
  const [sent, setSent] = useState(false);
  const [submitError, setSubmitError] = useState<string | null>(null);
  const formRef = useRef<HTMLFormElement>(null);

  const reset = () => {
    setName("");
    setPhone("");
    setEmail("");
    setNote(initialNote);
    setErrors({});
    setSent(false);
    setSubmitError(null);
  };

  const handleClose = () => {
    reset();
    onClose();
  };

  const handleSubmit = async (e: FormEvent) => {
    e.preventDefault();
    const nextErrors = validateLeadContact(name, phone, email);
    setErrors(nextErrors);
    if (Object.keys(nextErrors).length > 0) return;

    if (!isEmailJsConfigured()) {
      setSubmitError(
        "EmailJS is not configured. Add NEXT_PUBLIC_EMAILJS_* to .env.local.",
      );
      return;
    }

    setLoading(true);
    setSubmitError(null);
    try {
      await sendLeadEmail({
        name,
        phone,
        email,
        note,
        source,
        sourceLabel,
        extraPayload,
      });
      setSent(true);
      setTimeout(handleClose, 2000);
    } catch (err) {
      setSubmitError(getEmailJsErrorMessage(err));
    } finally {
      setLoading(false);
    }
  };

  return (
    <Modal open={open} onClose={handleClose} title={title}>
      {subtitle ? <p className="text-cream text-sm mb-4">{subtitle}</p> : null}

      {sent ? (
        <p className="text-gold text-sm py-6 text-center">
          Thank you! We will contact you shortly.
        </p>
      ) : (
        <form ref={formRef} onSubmit={handleSubmit} className="space-y-4">
          <div>
            <label className="block text-xs uppercase tracking-widest text-cream mb-1">
              Name
            </label>
            <input
              value={name}
              onChange={(e) => setName(e.target.value)}
              className="w-full bg-navy border border-white/15 px-3 py-2.5 text-sm text-white focus:outline-none focus:border-gold"
            />
            {errors.name ? (
              <p className="text-red-400 text-xs mt-1">{errors.name}</p>
            ) : null}
          </div>
          <div>
            <label className="block text-xs uppercase tracking-widest text-cream mb-1">
              Phone
            </label>
            <input
              value={phone}
              onChange={(e) => setPhone(e.target.value)}
              className="w-full bg-navy border border-white/15 px-3 py-2.5 text-sm text-white focus:outline-none focus:border-gold"
            />
            {errors.phone ? (
              <p className="text-red-400 text-xs mt-1">{errors.phone}</p>
            ) : null}
          </div>
          <div>
            <label className="block text-xs uppercase tracking-widest text-cream mb-1">
              Email (optional)
            </label>
            <input
              type="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              className="w-full bg-navy border border-white/15 px-3 py-2.5 text-sm text-white focus:outline-none focus:border-gold"
            />
            {errors.email ? (
              <p className="text-red-400 text-xs mt-1">{errors.email}</p>
            ) : null}
          </div>
          <div>
            <label className="block text-xs uppercase tracking-widest text-cream mb-1">
              Note
            </label>
            <textarea
              value={note}
              onChange={(e) => setNote(e.target.value)}
              rows={3}
              className="w-full bg-navy border border-white/15 px-3 py-2.5 text-sm text-white focus:outline-none focus:border-gold resize-none"
            />
          </div>
          {submitError ? (
            <p className="text-red-400 text-xs">{submitError}</p>
          ) : null}
          <Button type="submit" disabled={loading} className="w-full">
            {loading ? "Sending…" : submitLabel}
          </Button>
        </form>
      )}
    </Modal>
  );
}
