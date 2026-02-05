"use client";

import { EarningEntry, formatMON, formatAddress } from "@/lib/mockData";

interface ActivityFeedProps {
  earnings: EarningEntry[];
  limit?: number;
}

function formatTimeAgo(date: Date): string {
  const now = new Date();
  const diffMs = now.getTime() - date.getTime();
  const diffMins = Math.floor(diffMs / 60000);
  const diffHours = Math.floor(diffMs / 3600000);
  const diffDays = Math.floor(diffMs / 86400000);

  if (diffMins < 1) return "just now";
  if (diffMins < 60) return `${diffMins}m ago`;
  if (diffHours < 24) return `${diffHours}h ago`;
  if (diffDays === 1) return "yesterday";
  return `${diffDays}d ago`;
}

function getTierLabel(tier: 0 | 1 | 2): string {
  switch (tier) {
    case 0:
      return "rebate";
    case 1:
      return "hunter";
    case 2:
      return "manager";
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

export default function ActivityFeed({
  earnings,
  limit = 5,
}: ActivityFeedProps) {
  const displayedEarnings = earnings.slice(0, limit);

  if (displayedEarnings.length === 0) {
    return (
      <div className="text-center py-8 text-white/40 font-[family-name:var(--font-mono)] text-sm">
        No earnings yet. Start sharing your referral links!
      </div>
    );
  }

  return (
    <div className="space-y-2">
      {displayedEarnings.map((entry) => (
        <div
          key={entry.id}
          className="flex items-center justify-between py-2 px-3 bg-monad-dark/50 border border-white/5 hover:border-white/10 transition-colors"
        >
          <div className="flex items-center gap-3">
            <span className="text-terminal-green font-[family-name:var(--font-mono)] text-sm">
              +{formatMON(entry.amount)}
            </span>
            <span className="text-white/40 font-[family-name:var(--font-mono)] text-xs">
              MON
            </span>
            <span className="text-white/20">│</span>
            <span className="text-white/60 font-[family-name:var(--font-mono)] text-xs">
              {formatAddress(entry.fromAddress)}
            </span>
            <span className="text-white/20">→</span>
            <span className="text-white font-[family-name:var(--font-mono)] text-xs">
              {entry.appName}
            </span>
          </div>
          <div className="flex items-center gap-3">
            <span
              className={`font-[family-name:var(--font-mono)] text-xs uppercase ${getTierColor(
                entry.tier
              )}`}
            >
              {getTierLabel(entry.tier)}
            </span>
            <span className="text-white/30 font-[family-name:var(--font-mono)] text-xs">
              {formatTimeAgo(entry.timestamp)}
            </span>
          </div>
        </div>
      ))}
    </div>
  );
}
