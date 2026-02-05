"use client";

import { useState } from "react";
import { useDashboard } from "@/contexts/DashboardContext";
import { formatMON } from "@/lib/mockData";
import EarningsCard from "@/components/EarningsCard";
import WithdrawModal from "@/components/WithdrawModal";

function getTierLabel(tier: 0 | 1 | 2): string {
  switch (tier) {
    case 0:
      return "Rebate";
    case 1:
      return "Tier 1";
    case 2:
      return "Tier 2";
  }
}

function getTierColor(tier: 0 | 1 | 2): string {
  switch (tier) {
    case 0:
      return "text-terminal-green";
    case 1:
      return "text-monad-purple";
    case 2:
      return "text-terminal-yellow";
  }
}

function formatDate(date: Date): string {
  return date.toLocaleDateString("en-US", {
    year: "numeric",
    month: "short",
    day: "numeric",
  });
}

export default function EarningsPage() {
  const { vault, earnings } = useDashboard();
  const [isWithdrawModalOpen, setIsWithdrawModalOpen] = useState(false);

  return (
    <div className="max-w-4xl">
      {/* Page Header */}
      <div className="mb-8">
        <div className="flex items-center gap-2 mb-2">
          <div className="w-2 h-2 bg-monad-purple" />
          <span className="font-[family-name:var(--font-mono)] text-xs uppercase tracking-wider text-white/40">
            Dashboard
          </span>
        </div>
        <h1 className="font-[family-name:var(--font-display)] text-3xl font-bold uppercase tracking-tight">
          My Earnings
        </h1>
        <p className="font-[family-name:var(--font-body)] text-white/60 mt-2">
          Track your referral earnings and manage your staked MON balance.
        </p>
      </div>

      {/* Earnings Card with Vault Balance */}
      <section className="mb-8">
        <EarningsCard
          vault={vault}
          onWithdraw={() => setIsWithdrawModalOpen(true)}
        />
      </section>

      {/* Earnings History */}
      <section>
        <div className="flex items-center gap-2 mb-4">
          <span className="font-[family-name:var(--font-mono)] text-xs uppercase tracking-wider text-white/40">
            Earnings History
          </span>
          <div className="flex-1 h-px bg-white/10" />
        </div>

        <div className="bg-monad-dark border border-white/10 overflow-hidden">
          {/* Table Header */}
          <div className="grid grid-cols-5 gap-4 p-4 border-b border-white/10 bg-monad-black/50">
            <div className="font-[family-name:var(--font-mono)] text-xs uppercase tracking-wider text-white/40">
              Date
            </div>
            <div className="font-[family-name:var(--font-mono)] text-xs uppercase tracking-wider text-white/40">
              App
            </div>
            <div className="font-[family-name:var(--font-mono)] text-xs uppercase tracking-wider text-white/40 text-right">
              Amount
            </div>
            <div className="font-[family-name:var(--font-mono)] text-xs uppercase tracking-wider text-white/40">
              Source
            </div>
            <div className="font-[family-name:var(--font-mono)] text-xs uppercase tracking-wider text-white/40">
              From
            </div>
          </div>

          {/* Table Body */}
          {earnings.map((entry) => (
            <div
              key={entry.id}
              className="grid grid-cols-5 gap-4 p-4 border-b border-white/5 hover:bg-white/2 transition-colors"
            >
              <div className="font-[family-name:var(--font-mono)] text-sm text-white/60">
                {formatDate(entry.timestamp)}
              </div>
              <div className="font-[family-name:var(--font-mono)] text-sm text-white">
                {entry.appName}
              </div>
              <div className="font-[family-name:var(--font-mono)] text-sm text-terminal-green text-right">
                +{formatMON(entry.amount)} MON
              </div>
              <div
                className={`font-[family-name:var(--font-mono)] text-sm ${getTierColor(
                  entry.tier
                )}`}
              >
                {getTierLabel(entry.tier)}
              </div>
              <div className="font-[family-name:var(--font-mono)] text-sm text-white/40">
                {entry.fromAddress}
              </div>
            </div>
          ))}

          {earnings.length === 0 && (
            <div className="p-8 text-center text-white/40 font-[family-name:var(--font-mono)] text-sm">
              No earnings yet. Start sharing your referral links!
            </div>
          )}
        </div>
      </section>

      {/* Earnings Breakdown */}
      <section className="mt-8 p-6 bg-monad-dark/50 border border-white/10">
        <h3 className="font-[family-name:var(--font-display)] text-sm font-bold uppercase tracking-wider text-white/60 mb-4">
          How Earnings Work
        </h3>
        <div className="space-y-3 font-[family-name:var(--font-body)] text-sm text-white/60">
          <div className="flex items-start gap-3">
            <span className="text-terminal-green">●</span>
            <span>
              <span className="text-terminal-green font-semibold">Tier 0 (Rebate):</span>{" "}
              Users get a rebate on their own fees
            </span>
          </div>
          <div className="flex items-start gap-3">
            <span className="text-monad-purple">●</span>
            <span>
              <span className="text-monad-purple font-semibold">Tier 1 (Hunter):</span>{" "}
              You earn from users you directly refer
            </span>
          </div>
          <div className="flex items-start gap-3">
            <span className="text-terminal-yellow">●</span>
            <span>
              <span className="text-terminal-yellow font-semibold">Tier 2 (Manager):</span>{" "}
              You earn from your hunters&apos; referrals
            </span>
          </div>
        </div>
        <div className="mt-4 pt-4 border-t border-white/10 text-xs text-white/40 font-[family-name:var(--font-mono)]">
          All earnings are automatically staked as liquid MON, earning additional APY
        </div>
      </section>

      {/* Withdraw Modal */}
      <WithdrawModal
        isOpen={isWithdrawModalOpen}
        onClose={() => setIsWithdrawModalOpen(false)}
      />
    </div>
  );
}
