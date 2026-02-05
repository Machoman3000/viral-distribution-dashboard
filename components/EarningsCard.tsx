"use client";

import { VaultBalance, formatMON } from "@/lib/mockData";
import GlitchButton from "./GlitchButton";

interface EarningsCardProps {
  vault: VaultBalance;
  onWithdraw: () => void;
}

export default function EarningsCard({ vault, onWithdraw }: EarningsCardProps) {
  // Calculate percentage for visual bar (capped at 100%)
  const maxDisplay = 2000; // Cap display at 2000 MON for visual purposes
  const percentage = Math.min((vault.stakedMON / maxDisplay) * 100, 100);

  return (
    <div className="bg-monad-dark border border-white/10 p-6">
      <div className="flex items-center gap-2 mb-4">
        <span className="font-[family-name:var(--font-mono)] text-xs uppercase tracking-wider text-white/40">
          Staked Balance
        </span>
        <div className="flex-1 h-px bg-white/10" />
      </div>

      {/* Visual bar */}
      <div className="mb-6">
        <div className="h-8 bg-monad-black border border-white/10 overflow-hidden">
          <div
            className="h-full bg-gradient-to-r from-monad-purple to-terminal-green transition-all duration-500"
            style={{ width: `${percentage}%` }}
          />
        </div>
      </div>

      {/* Stats row */}
      <div className="grid grid-cols-3 gap-4 mb-6">
        <div>
          <div className="font-[family-name:var(--font-mono)] text-xs text-white/40 uppercase mb-1">
            Staked MON
          </div>
          <div className="font-[family-name:var(--font-display)] text-2xl font-bold text-terminal-green">
            {formatMON(vault.stakedMON)}
          </div>
        </div>
        <div>
          <div className="font-[family-name:var(--font-mono)] text-xs text-white/40 uppercase mb-1">
            APY
          </div>
          <div className="font-[family-name:var(--font-display)] text-2xl font-bold text-terminal-yellow">
            {vault.apy}%
          </div>
        </div>
        <div>
          <div className="font-[family-name:var(--font-mono)] text-xs text-white/40 uppercase mb-1">
            Rewards
          </div>
          <div className="font-[family-name:var(--font-display)] text-2xl font-bold text-monad-purple">
            +{formatMON(vault.rewardsAccrued)}
          </div>
        </div>
      </div>

      {/* Actions */}
      <div className="flex gap-3">
        <div className="flex-1 p-3 bg-terminal-green/5 border border-terminal-green/20 text-center">
          <span className="font-[family-name:var(--font-mono)] text-xs text-terminal-green uppercase">
            Keep Staked (Recommended)
          </span>
        </div>
        <GlitchButton variant="ghost" size="sm" onClick={onWithdraw}>
          Withdraw
        </GlitchButton>
      </div>
    </div>
  );
}
