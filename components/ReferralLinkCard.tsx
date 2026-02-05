"use client";

import { useState } from "react";
import { generateReferralLink, IntegratedApp } from "@/lib/mockData";
import GlitchButton from "./GlitchButton";

interface ReferralLinkCardProps {
  app: IntegratedApp;
  walletAddress: string;
}

export default function ReferralLinkCard({
  app,
  walletAddress,
}: ReferralLinkCardProps) {
  const [copied, setCopied] = useState(false);
  const referralLink = generateReferralLink(app.url, walletAddress);

  const handleCopy = async () => {
    try {
      await navigator.clipboard.writeText(referralLink);
      setCopied(true);
      setTimeout(() => setCopied(false), 2000);
    } catch (err) {
      console.error("Failed to copy:", err);
    }
  };

  const handleShare = () => {
    const text = `Check out ${app.name} on Monad! Use my referral link to get started:`;
    const tweetUrl = `https://twitter.com/intent/tweet?text=${encodeURIComponent(
      text
    )}&url=${encodeURIComponent(referralLink)}`;
    window.open(tweetUrl, "_blank", "noopener,noreferrer");
  };

  return (
    <div className="bg-monad-dark border border-white/10 p-6">
      <div className="flex items-center gap-3 mb-4">
        <span className="text-2xl">{app.logo}</span>
        <h3 className="font-[family-name:var(--font-display)] text-lg font-bold uppercase">
          {app.name}
        </h3>
      </div>

      <label className="block font-[family-name:var(--font-mono)] text-xs uppercase tracking-wider text-white/40 mb-2">
        Your Referral Link
      </label>
      <div className="bg-monad-black border border-white/20 p-3 mb-4 overflow-x-auto">
        <code className="font-[family-name:var(--font-mono)] text-sm text-monad-purple break-all">
          {referralLink}
        </code>
      </div>

      <div className="flex gap-3">
        <GlitchButton
          variant={copied ? "ghost" : "primary"}
          size="sm"
          onClick={handleCopy}
          className="flex-1"
        >
          {copied ? "Copied!" : "Copy Link"}
        </GlitchButton>
        <GlitchButton variant="secondary" size="sm" onClick={handleShare}>
          Share on X
        </GlitchButton>
      </div>
    </div>
  );
}
