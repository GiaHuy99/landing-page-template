import emailjs from "@emailjs/browser";
import { buildLeadContext, formatExtraPayload } from "@/lib/leadTracking";

export type LeadEmailPayload = {
  name: string;
  email?: string;
  phone: string;
  note?: string;
  source: string;
  sourceLabel: string;
  pageSection?: string;
  pageDetail?: string;
  propertyName?: string;
  extraPayload?: Record<string, unknown>;
};

type EmailJsConfig = {
  serviceId: string;
  templateId: string;
  publicKey: string;
};

function getEmailJsConfig(): EmailJsConfig | null {
  const serviceId = process.env.NEXT_PUBLIC_EMAILJS_SERVICE_ID ?? "";
  const templateId = process.env.NEXT_PUBLIC_EMAILJS_TEMPLATE_ID ?? "";
  const publicKey = process.env.NEXT_PUBLIC_EMAILJS_PUBLIC_KEY ?? "";

  if (!serviceId || !templateId || !publicKey) return null;

  return { serviceId, templateId, publicKey };
}

export function isEmailJsConfigured(): boolean {
  return getEmailJsConfig() !== null;
}

export function getEmailJsErrorMessage(err: unknown): string {
  if (typeof err === "string") return err;
  if (err instanceof Error) return err.message;

  const e = err as { status?: number; text?: string };
  if (e.status === 403) {
    return "Domain not allowed. Add this origin in EmailJS → Allowed Origins.";
  }
  if (e.status === 412) {
    return "Email service not connected. Check Email Services on EmailJS.";
  }
  if (e.text) return e.text;

  return "Failed to send. Please try again or call us.";
}

export async function sendLeadEmail(payload: LeadEmailPayload) {
  const config = getEmailJsConfig();
  if (!config) {
    throw new Error(
      "EmailJS is not configured. Set NEXT_PUBLIC_EMAILJS_* in .env.local.",
    );
  }

  const propertyName = payload.propertyName?.trim() || "—";
  const pageSection = payload.pageSection?.trim() || "—";
  const pageDetail = payload.pageDetail?.trim() || "—";
  const extraInfo = formatExtraPayload(payload.extraPayload);

  const context = buildLeadContext([
    payload.sourceLabel,
    pageSection !== "—" ? pageSection : undefined,
    pageDetail !== "—" ? pageDetail : undefined,
    propertyName !== "—" ? propertyName : undefined,
  ]);

  const templateParams = {
    name: payload.name,
    email: payload.email?.trim() || "—",
    phone: payload.phone,
    note: payload.note?.trim() || "—",
    source: payload.source.trim(),
    source_label: payload.sourceLabel.trim(),
    page_section: pageSection,
    page_detail: pageDetail,
    propertyName,
    context,
    extra_info: extraInfo,
    time: new Date().toLocaleString("en-US"),
  };

  return emailjs.send(config.serviceId, config.templateId, templateParams, {
    publicKey: config.publicKey,
  });
}
