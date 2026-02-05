"use client";

import { HostProgramStats, formatUSD } from "@/lib/mockData";
import { useApp } from "@/contexts/AppContext";

interface HostStatsCardProps {
  stats: HostProgramStats;
}

export default function HostStatsCard({ stats }: HostStatsCardProps) {
  const { appRegistration, payoutConfig } = useApp();

  return (
    <div className="bg-monad-dark border border-white/10 p-6">
      <div className="flex items-center justify-between mb-6">
        <div>
          <span className="font-[family-name:var(--font-mono)] text-xs uppercase tracking-wider text-white/40">
            Program Stats
          </span>
          <h2 className="font-[family-name:var(--font-display)] text-xl font-bold mt-1">
            {appRegistration?.name || "Your Program"}
          </h2>
        </div>
        <div className="w-12 h-12 bg-monad-purple/20 border border-monad-purple/40 flex items-center justify-center">
          <span className="text-xl">▣</span>
        </div>
      </div>

      {/* Stats Grid */}
      <div className="grid grid-cols-3 gap-4 mb-6">
        <div className="p-4 bg-monad-black/50 border border-white/5">
          <div className="font-[family-name:var(--font-mono)] text-xs text-white/40 uppercase mb-1">
            Users Acquired
          </div>
          <div className="font-[family-name:var(--font-display)] text-2xl font-bold text-white">
            {stats.usersAcquired.toLocaleString()}
          </div>
        </div>
        <div className="p-4 bg-monad-black/50 border border-white/5">
          <div className="font-[family-name:var(--font-mono)] text-xs text-white/40 uppercase mb-1">
            Volume Generated
          </div>
          <div className="font-[family-name:var(--font-display)] text-2xl font-bold text-terminal-green">
            {formatUSD(stats.volumeGenerated)}
          </div>
        </div>
        <div className="p-4 bg-monad-black/50 border border-white/5">
          <div className="font-[family-name:var(--font-mono)] text-xs text-white/40 uppercase mb-1">
            Fees Paid
          </div>
          <div className="font-[family-name:var(--font-display)] text-2xl font-bold text-monad-purple">
            {formatUSD(stats.feesPaid)}
          </div>
        </div>
      </div>

      {/* Payout Configuration Summary */}
      <div className="border-t border-white/10 pt-4">
        <div className="font-[family-name:var(--font-mono)] text-xs uppercase tracking-wider text-white/40 mb-3">
          Payout Configuration
        </div>
        <div className="flex gap-4">
          <div className="flex items-center gap-2">
            <div className="w-2 h-2 bg-terminal-green" />
            <span className="font-[family-name:var(--font-mono)] text-xs text-white/60">
              Tier 0: {payoutConfig.tier0Rebate}%
            </span>
          </div>
          <div className="flex items-center gap-2">
            <div className="w-2 h-2 bg-monad-purple" />
            <span className="font-[family-name:var(--font-mono)] text-xs text-white/60">
              Tier 1: {payoutConfig.tier1Hunter}%
            </span>
          </div>
          <div className="flex items-center gap-2">
            <div className="w-2 h-2 bg-terminal-yellow" />
            <span className="font-[family-name:var(--font-mono)] text-xs text-white/60">
              Tier 2: {payoutConfig.tier2Manager}%
            </span>
          </div>
          <div className="ml-auto">
            <span className="font-[family-name:var(--font-mono)] text-xs text-white/40">
              Total: {payoutConfig.totalMargin}%
            </span>
          </div>
        </div>
      </div>
    </div>
  );
}
