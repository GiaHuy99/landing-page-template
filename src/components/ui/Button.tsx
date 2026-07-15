import type { ButtonHTMLAttributes, ReactNode } from "react";

type Variant = "primary" | "outline" | "ghost";

type ButtonProps = ButtonHTMLAttributes<HTMLButtonElement> & {
  variant?: Variant;
  children: ReactNode;
};

const variantClass: Record<Variant, string> = {
  primary:
    "bg-gold text-navy hover:bg-gold-light font-semibold tracking-widest uppercase",
  outline:
    "border border-gold/50 text-gold hover:bg-gold/10 tracking-widest uppercase",
  ghost: "text-cream hover:text-white tracking-wide",
};

export default function Button({
  variant = "primary",
  className = "",
  children,
  type = "button",
  ...props
}: ButtonProps) {
  return (
    <button
      type={type}
      className={`inline-flex items-center justify-center px-5 py-2.5 text-xs transition-colors duration-200 disabled:opacity-50 disabled:cursor-not-allowed ${variantClass[variant]} ${className}`}
      {...props}
    >
      {children}
    </button>
  );
}
