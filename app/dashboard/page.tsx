"use client";

import Link from "next/link";
import { useDashboard } from "@/contexts/DashboardContext";
import { formatMON, formatUSD } from "@/lib/mockData";
import StatCard from "@/components/StatCard";
import ActivityFeed from "@/components/ActivityFeed";
import GlitchButton from "@/components/GlitchButton";

export default function DashboardOverview() {
  const { stats, earnings, vault, isHost, hostStats } = useDashboard();

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
          Overview
        </h1>
      </div>

      {/* Referrer Stats Section - Everyone sees this */}
      <section className="mb-8">
        <div className="flex items-center gap-2 mb-4">
          <span className="font-[family-name:var(--font-mono)] text-xs uppercase tracking-wider text-white/40">
            As a Referrer
          </span>
          <div className="flex-1 h-px bg-white/10" />
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          <StatCard
            label="Total Earned"
            value={`${formatMON(stats.totalEarned)} MON`}
            subValue={`Staked @ ${stats.apy}% APY`}
            icon="◆"
            color="green"
          />
          <StatCard
            label="Network Size"
            value={`${stats.networkSize} users`}
            subValue={`${stats.hunterCount} hunters`}
            icon="◎"
            color="purple"
          />
          <StatCard
            label="APY"
            value={`${stats.apy}%`}
            subValue="Auto-compounding"
            icon="↗"
            color="yellow"
          />
        </div>
      </section>

      {/* Host Stats Section - Only if user has registered a Project */}
      {isHost && hostStats && (
        <section className="mb-8">
          <div className="flex items-center gap-2 mb-4">
            <span className="font-[family-name:var(--font-mono)] text-xs uppercase tracking-wider text-terminal-yellow">
              As a Host
            </span>
            <div className="flex-1 h-px bg-terminal-yellow/20" />
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            <StatCard
              label="Users Acquired"
              value={hostStats.usersAcquired.toLocaleString()}
              icon="●"
            />
            <StatCard
              label="Volume Generated"
              value={formatUSD(hostStats.volumeGenerated)}
              icon="$"
            />
            <StatCard
              label="Fees Paid"
              value={formatUSD(hostStats.feesPaid)}
              subValue="To referrers"
              icon="→"
            />
          </div>
        </section>
      )}

      {/* Quick Actions */}
      <section className="mb-8">
        <div className="flex items-center gap-2 mb-4">
          <span className="font-[family-name:var(--font-mono)] text-xs uppercase tracking-wider text-white/40">
            Quick Actions
          </span>
          <div className="flex-1 h-px bg-white/10" />
        </div>

        <div className="flex flex-wrap gap-3">
          <Link href="/dashboard/links">
            <GlitchButton variant="primary">Generate Link</GlitchButton>
          </Link>
          <Link href="/dashboard/network">
            <GlitchButton variant="secondary">View Network</GlitchButton>
          </Link>
          <Link href="/dashboard/earnings">
            <GlitchButton variant="secondary">Earnings</GlitchButton>
          </Link>
        </div>
      </section>

      {/* Recent Activity */}
      <section>
        <div className="flex items-center justify-between mb-4">
          <div className="flex items-center gap-2">
            <span className="font-[family-name:var(--font-mono)] text-xs uppercase tracking-wider text-white/40">
              Recent Activity
            </span>
            <div className="flex-1 h-px bg-white/10" />
          </div>
          <Link
            href="/dashboard/earnings"
            className="font-[family-name:var(--font-mono)] text-xs uppercase tracking-wider text-monad-purple hover:text-white transition-colors"
          >
            View All →
          </Link>
        </div>

        <ActivityFeed earnings={earnings} limit={5} />
      </section>

      {/* Vault Summary */}
      <section className="mt-8 p-6 bg-monad-dark border border-white/10">
        <div className="flex items-center justify-between">
          <div>
            <span className="font-[family-name:var(--font-mono)] text-xs uppercase tracking-wider text-white/40">
              Staked Balance
            </span>
            <div className="font-[family-name:var(--font-display)] text-2xl font-bold text-terminal-green mt-1">
              {formatMON(vault.stakedMON)} MON
            </div>
            <div className="font-[family-name:var(--font-mono)] text-xs text-white/40 mt-1">
              +{formatMON(vault.rewardsAccrued)} MON in rewards
            </div>
          </div>
          <Link href="/dashboard/earnings">
            <GlitchButton variant="secondary" size="sm">
              Manage
            </GlitchButton>
          </Link>
        </div>
      </section>
    </div>
  );
}
