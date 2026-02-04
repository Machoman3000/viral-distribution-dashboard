"use client";

import { TopReferrer, formatAddress, formatUSD } from "@/lib/mockData";

interface TopReferrersTableProps {
  referrers: TopReferrer[];
}

function getRankDisplay(rank: number): string {
  switch (rank) {
    case 1:
      return "🥇";
    case 2:
      return "🥈";
    case 3:
      return "🥉";
    default:
      return `#${rank}`;
  }
}

function getRankColor(rank: number): string {
  switch (rank) {
    case 1:
      return "text-terminal-yellow";
    case 2:
      return "text-white/60";
    case 3:
      return "text-orange-400";
    default:
      return "text-white/40";
  }
}

export default function TopReferrersTable({
  referrers,
}: TopReferrersTableProps) {
  if (referrers.length === 0) {
    return (
      <div className="p-8 text-center text-white/40 font-[family-name:var(--font-mono)] text-sm bg-monad-dark border border-white/10">
        No referrers yet. Share your program to attract hunters!
      </div>
    );
  }

  return (
    <div className="bg-monad-dark border border-white/10 overflow-hidden">
      {/* Table Header */}
      <div className="grid grid-cols-4 gap-4 p-4 border-b border-white/10 bg-monad-black/50">
        <div className="font-[family-name:var(--font-mono)] text-xs uppercase tracking-wider text-white/40">
          Rank
        </div>
        <div className="font-[family-name:var(--font-mono)] text-xs uppercase tracking-wider text-white/40">
          Referrer
        </div>
        <div className="font-[family-name:var(--font-mono)] text-xs uppercase tracking-wider text-white/40 text-right">
          Users
        </div>
        <div className="font-[family-name:var(--font-mono)] text-xs uppercase tracking-wider text-white/40 text-right">
          Volume
        </div>
      </div>

      {/* Table Body */}
      {referrers.map((referrer) => (
        <div
          key={referrer.address}
          className="grid grid-cols-4 gap-4 p-4 border-b border-white/5 hover:bg-white/2 transition-colors"
        >
          <div
            className={`font-[family-name:var(--font-mono)] text-sm ${getRankColor(
              referrer.rank
            )}`}
          >
            {getRankDisplay(referrer.rank)}
          </div>
          <div className="flex items-center gap-2">
            <span className="font-[family-name:var(--font-mono)] text-sm text-white">
              {referrer.alias || formatAddress(referrer.address)}
            </span>
            {referrer.alias && (
              <span className="font-[family-name:var(--font-mono)] text-xs text-white/30">
                {formatAddress(referrer.address)}
              </span>
            )}
          </div>
          <div className="font-[family-name:var(--font-mono)] text-sm text-monad-purple text-right">
            {referrer.usersReferred}
          </div>
          <div className="font-[family-name:var(--font-mono)] text-sm text-terminal-green text-right">
            {formatUSD(referrer.volumeGenerated)}
          </div>
        </div>
      ))}
    </div>
  );
}
