"use client";

import { ReactNode } from "react";

interface PixelCardProps {
  children: ReactNode;
  className?: string;
  hover?: boolean;
}

export default function PixelCard({
  children,
  className = "",
  hover = false,
}: PixelCardProps) {
  return (
    <div
      className={`
        relative bg-monad-dark border border-white/10 p-6
        pixel-corners
        ${hover ? "card-hover" : ""}
        ${className}
      `}
    >
      {/* Additional corner decorations */}
      <span className="pixel-corner-tr" />
      <span className="pixel-corner-bl" />
      {children}
    </div>
  );
}
