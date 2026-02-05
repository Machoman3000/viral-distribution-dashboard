"use client";

import { useState } from "react";
import PixelCard from "@/components/PixelCard";
import GlitchButton from "@/components/GlitchButton";

interface EarningsCardProps {
  asHunter: number;
  asManager: number;
  claimable: number;
}

function formatUSD(amount: number): string {
  return `$${amount.toLocaleString("en-US", {
    minimumFractionDigits: 2,
    maximumFractionDigits: 2,
  })}`;
}

export default function EarningsCard({
  asHunter,
  asManager,
  claimable,
}: EarningsCardProps) {
  const [isClaiming, setIsClaiming] = useState(false);
  const [claimSuccess, setClaimSuccess] = useState(false);

  const handleClaim = async () => {
    setIsClaiming(true);
    await new Promise((resolve) => setTimeout(resolve, 2000));
    setIsClaiming(false);
    setClaimSuccess(true);
    setTimeout(() => setClaimSuccess(false), 3000);
  };

  return (
    <PixelCard>
      <h2 className="font-[family-name:var(--font-display)] text-xl font-bold uppercase tracking-tight mb-6">
        Earnings
      </h2>

      <div className="space-y-4">
        {/* As Hunter (Tier 1) */}
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-2">
            <span className="w-2 h-2 rounded-full bg-monad-purple" />
            <span className="text-white/60 font-[family-name:var(--font-body)] text-sm">
              As Hunter (Tier 1)
            </span>
          </div>
          <span className="font-[family-name:var(--font-mono)] text-white">
            {formatUSD(asHunter)}
          </span>
        </div>

        {/* As Manager (Tier 2) */}
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-2">
            <span className="w-2 h-2 rounded-full bg-yellow-400" />
            <span className="text-white/60 font-[family-name:var(--font-body)] text-sm">
              As Manager (Tier 2)
            </span>
          </div>
          <span className="font-[family-name:var(--font-mono)] text-white">
            {formatUSD(asManager)}
          </span>
        </div>

        {/* Divider */}
        <div className="border-t border-white/10 my-4" />

        {/* Claimable */}
        <div className="flex items-center justify-between">
          <span className="text-white font-[family-name:var(--font-body)] font-bold">
            Claimable
          </span>
          <span className="font-[family-name:var(--font-mono)] text-terminal-green text-2xl font-bold">
            {formatUSD(claimable)}
          </span>
        </div>

        {/* Claim Button */}
        <div className="mt-6">
          {claimSuccess ? (
            <p className="text-terminal-green font-[family-name:var(--font-mono)] text-sm text-center py-2">
              ✓ Claim submitted successfully!
            </p>
          ) : claimable === 0 ? (
            <p className="text-white/40 font-[family-name:var(--font-body)] text-sm text-center">
              No rewards to claim yet
            </p>
          ) : (
            <GlitchButton
              onClick={handleClaim}
              disabled={claimable === 0 || isClaiming}
              className="w-full disabled:opacity-50 disabled:cursor-not-allowed"
            >
              {isClaiming ? "Claiming..." : "Claim Rewards"}
            </GlitchButton>
          )}
        </div>
      </div>
    </PixelCard>
  );
}
