"use client";

import { useState, type FormEvent } from "react";
import Image from "next/image";
import SectionShell from "@/components/ui/SectionShell";
import Button from "@/components/ui/Button";
import { PLACEHOLDER_IMAGE } from "@/config/assets";
import {
  validateLeadContact,
  type LeadFieldErrors,
} from "@/lib/leadFormValidation";
import { LEAD_SOURCE, LEAD_SOURCE_LABEL } from "@/lib/leadTracking";
import {
  getEmailJsErrorMessage,
  isEmailJsConfigured,
  sendLeadEmail,
} from "@/lib/sendLeadEmail";

export default function LeadForm() {
  const [name, setName] = useState("");
  const [phone, setPhone] = useState("");
  const [email, setEmail] = useState("");
  const [note, setNote] = useState("");
  const [errors, setErrors] = useState<LeadFieldErrors>({});
  const [loading, setLoading] = useState(false);
  const [sent, setSent] = useState(false);
  const [submitError, setSubmitError] = useState<string | null>(null);

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
        source: LEAD_SOURCE.contactForm,
        sourceLabel: LEAD_SOURCE_LABEL[LEAD_SOURCE.contactForm],
        pageSection: "contact",
      });
      setSent(true);
      setName("");
      setPhone("");
      setEmail("");
      setNote("");
      setTimeout(() => setSent(false), 3000);
    } catch (err) {
      setSubmitError(getEmailJsErrorMessage(err));
    } finally {
      setLoading(false);
    }
  };

  return (
    <SectionShell id="contact" variant="default" className="bg-navy">
      <div className="max-w-6xl mx-auto grid md:grid-cols-2 gap-8 md:gap-12 items-stretch">
        <div className="relative min-h-[280px] md:min-h-[420px] overflow-hidden">
          <Image
            src={PLACEHOLDER_IMAGE}
            alt="Contact placeholder"
            fill
            className="object-cover"
            sizes="(max-width: 768px) 100vw, 50vw"
          />
          <div className="absolute inset-0 bg-black/30" />
        </div>

        <div className="flex flex-col justify-center">
          <h2 className="text-2xl md:text-3xl font-semibold text-white mb-2">
            Get in Touch
          </h2>
          <p className="text-cream text-sm mb-6">
            Leave your information and we will contact you shortly.
          </p>

          {sent ? (
            <p className="text-gold text-sm py-8">
              Thank you! Your message has been sent.
            </p>
          ) : (
            <form onSubmit={handleSubmit} className="space-y-4">
              <div>
                <label className="block text-xs uppercase tracking-widest text-cream mb-1">
                  Full name
                </label>
                <input
                  value={name}
                  onChange={(e) => setName(e.target.value)}
                  className="w-full bg-navy-light border border-white/15 px-3 py-2.5 text-sm text-white focus:outline-none focus:border-gold"
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
                  className="w-full bg-navy-light border border-white/15 px-3 py-2.5 text-sm text-white focus:outline-none focus:border-gold"
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
                  className="w-full bg-navy-light border border-white/15 px-3 py-2.5 text-sm text-white focus:outline-none focus:border-gold"
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
                  className="w-full bg-navy-light border border-white/15 px-3 py-2.5 text-sm text-white focus:outline-none focus:border-gold resize-none"
                />
              </div>
              {submitError ? (
                <p className="text-red-400 text-xs">{submitError}</p>
              ) : null}
              <Button type="submit" disabled={loading}>
                {loading ? "Sending…" : "Send Message"}
              </Button>
            </form>
          )}
        </div>
      </div>
    </SectionShell>
  );
}
