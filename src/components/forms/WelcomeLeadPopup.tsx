"use client";

import { useEffect, useState } from "react";
import LeadCaptureModal from "@/components/forms/LeadCaptureModal";
import { LEAD_SOURCE, LEAD_SOURCE_LABEL } from "@/lib/leadTracking";

const DELAY_MS = 15000;

export default function WelcomeLeadPopup() {
  const [open, setOpen] = useState(false);

  useEffect(() => {
    let timer = window.setTimeout(() => setOpen(true), DELAY_MS);

    return () => window.clearTimeout(timer);
  }, []);

  const handleClose = () => {
    setOpen(false);
    window.setTimeout(() => setOpen(true), DELAY_MS);
  };

  return (
    <LeadCaptureModal
      open={open}
      onClose={handleClose}
      title="Welcome"
      subtitle="Leave your details and our team will reach out."
      source={LEAD_SOURCE.welcomePopup}
      sourceLabel={LEAD_SOURCE_LABEL[LEAD_SOURCE.welcomePopup]}
    />
  );
}
