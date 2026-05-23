import Link from "next/link";
import type { ButtonHTMLAttributes, ReactNode } from "react";
import { cn } from "@/lib/utils";

type ButtonProps = ButtonHTMLAttributes<HTMLButtonElement> & {
  href?: string;
  variant?: "primary" | "secondary" | "ghost" | "dark";
  children: ReactNode;
};

const variants = {
  primary: "bg-teal-500 text-white hover:bg-teal-600",
  secondary: "border border-navy-800/15 bg-white text-navy-900 hover:border-teal-500 hover:text-teal-700",
  ghost: "text-navy-900 hover:bg-navy-50",
  dark: "bg-navy-900 text-white hover:bg-navy-800"
};

export function Button({ href, variant = "primary", className, children, ...props }: ButtonProps) {
  const styles = cn(
    "inline-flex min-h-11 items-center justify-center gap-2 rounded-md px-5 py-2.5 text-sm font-semibold transition",
    variants[variant],
    className
  );

  if (href) {
    return (
      <Link href={href} className={styles}>
        {children}
      </Link>
    );
  }

  return (
    <button className={styles} {...props}>
      {children}
    </button>
  );
}
