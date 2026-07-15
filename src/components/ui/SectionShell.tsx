import type { ReactNode } from "react";

type Variant = "default" | "fullBleed" | "splitImage" | "glassPanel" | "statsOverlay";

type SectionShellProps = {
  id?: string;
  variant?: Variant;
  className?: string;
  children: ReactNode;
};

const variantClass: Record<Variant, string> = {
  default: "relative py-16 md:py-24 px-4 sm:px-6",
  fullBleed: "relative min-h-[70vh] md:min-h-screen w-full overflow-hidden",
  splitImage: "relative py-16 md:py-24 px-4 sm:px-6",
  glassPanel: "relative min-h-[60vh] md:min-h-[80vh] w-full overflow-hidden",
  statsOverlay: "relative min-h-[50vh] md:min-h-[70vh] w-full overflow-hidden",
};

export default function SectionShell({
  id,
  variant = "default",
  className = "",
  children,
}: SectionShellProps) {
  return (
    <section id={id} className={`${variantClass[variant]} ${className}`.trim()}>
      {children}
    </section>
  );
}
