"use client";

import { ButtonHTMLAttributes, ReactNode } from "react";

interface GlitchButtonProps extends ButtonHTMLAttributes<HTMLButtonElement> {
  children: ReactNode;
  variant?: "primary" | "secondary" | "ghost";
  size?: "sm" | "md" | "lg";
}

export default function GlitchButton({
  children,
  variant = "primary",
  size = "md",
  className = "",
  ...props
}: GlitchButtonProps) {
  const baseStyles =
    "glitch-button font-[family-name:var(--font-mono)] uppercase tracking-widest transition-all focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-monad-purple";

  const variants = {
    primary: "bg-monad-purple text-white hover:bg-monad-purple/90",
    secondary: "bg-transparent border border-white/20 text-white hover:border-white/40",
    ghost: "bg-transparent text-white/60 hover:text-white hover:bg-white/5",
  };

  const sizes = {
    sm: "px-3 py-1.5 text-xs",
    md: "px-5 py-2.5 text-sm",
    lg: "px-8 py-3 text-base",
  };

  return (
    <button
      className={`${baseStyles} ${variants[variant]} ${sizes[size]} ${className}`}
      {...props}
    >
      {children}
    </button>
  );
}
