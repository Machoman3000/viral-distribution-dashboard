"use client";

import { useEffect } from "react";
import GlitchButton from "./GlitchButton";

interface WithdrawModalProps {
  isOpen: boolean;
  onClose: () => void;
}

export default function WithdrawModal({ isOpen, onClose }: WithdrawModalProps) {
  // Handle escape key
  useEffect(() => {
    const handleEscape = (e: KeyboardEvent) => {
      if (e.key === "Escape") onClose();
    };
    if (isOpen) {
      document.addEventListener("keydown", handleEscape);
      document.body.style.overflow = "hidden";
    }
    return () => {
      document.removeEventListener("keydown", handleEscape);
      document.body.style.overflow = "";
    };
  }, [isOpen, onClose]);

  if (!isOpen) return null;

  const handleWithdraw = () => {
    // In Phase 2, this would interact with the contract
    // For now, redirect to app.monad ecosystem hub
    window.open("https://app.monad.xyz/app-hub", "_blank", "noopener,noreferrer");
    onClose();
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center">
      {/* Backdrop */}
      <div
        className="absolute inset-0 bg-monad-black/80 backdrop-blur-sm"
        onClick={onClose}
      />

      {/* Modal */}
      <div className="relative bg-monad-dark border border-white/20 p-8 max-w-md w-full mx-4">
        {/* Corner decorations */}
        <div className="absolute top-0 left-0 w-3 h-3 border-t-2 border-l-2 border-monad-purple" />
        <div className="absolute top-0 right-0 w-3 h-3 border-t-2 border-r-2 border-monad-purple" />
        <div className="absolute bottom-0 left-0 w-3 h-3 border-b-2 border-l-2 border-monad-purple" />
        <div className="absolute bottom-0 right-0 w-3 h-3 border-b-2 border-r-2 border-monad-purple" />

        {/* Close button */}
        <button
          onClick={onClose}
          className="absolute top-4 right-4 text-white/40 hover:text-white transition-colors focus:outline-none focus:text-monad-purple"
          aria-label="Close modal"
        >
          <svg
            width="20"
            height="20"
            viewBox="0 0 24 24"
            fill="none"
            stroke="currentColor"
            strokeWidth="2"
          >
            <path d="M18 6L6 18M6 6l12 12" />
          </svg>
        </button>

        {/* Content */}
        <div className="text-center mb-6">
          <div className="w-16 h-16 bg-terminal-yellow/10 border border-terminal-yellow/30 flex items-center justify-center mx-auto mb-4">
            <span className="text-3xl">⚠</span>
          </div>
          <h2 className="font-[family-name:var(--font-display)] text-xl font-bold uppercase tracking-tight">
            Withdraw to Ecosystem Hub
          </h2>
        </div>

        <div className="space-y-4 mb-8">
          <p className="font-[family-name:var(--font-body)] text-white/60 text-sm">
            Your earnings are auto-staked as liquid MON, earning{" "}
            <span className="text-terminal-green font-semibold">12.5% APY</span>.
            Withdrawing will redirect you to the Monad Ecosystem Hub.
          </p>

          <div className="bg-monad-black/50 p-4 border border-white/10">
            <div className="font-[family-name:var(--font-mono)] text-xs uppercase tracking-wider text-white/40 mb-2">
              Recommendation
            </div>
            <p className="font-[family-name:var(--font-body)] text-sm text-white/80">
              Keep your MON staked to maximize earnings. You can still use staked
              MON as collateral in many Monad apps.
            </p>
          </div>

          <div className="flex items-start gap-2 text-terminal-yellow/80 text-xs font-[family-name:var(--font-mono)]">
            <span>⚡</span>
            <span>
              Unstaking may have a cooldown period. Check the Ecosystem Hub for
              current terms.
            </span>
          </div>
        </div>

        <div className="flex gap-3">
          <GlitchButton variant="secondary" onClick={onClose} className="flex-1">
            Keep Staked
          </GlitchButton>
          <GlitchButton variant="ghost" onClick={handleWithdraw} className="flex-1">
            Continue to Hub →
          </GlitchButton>
        </div>
      </div>
    </div>
  );
}
