"use client";

import { useDashboard } from "@/contexts/DashboardContext";
import { useApp } from "@/contexts/AppContext";
import { useRouter } from "next/navigation";
import { useEffect } from "react";
import Link from "next/link";
import HostStatsCard from "@/components/HostStatsCard";
import TopReferrersTable from "@/components/TopReferrersTable";
import GlitchButton from "@/components/GlitchButton";

export default function ProgramPage() {
  const { isHost, hostStats, topReferrers } = useDashboard();
  const { payoutConfig } = useApp();
  const router = useRouter();

  // Redirect if not a host
  useEffect(() => {
    if (!isHost) {
      router.push("/dashboard");
    }
  }, [isHost, router]);

  // Show loading or redirect state if not host
  if (!isHost || !hostStats) {
    return (
      <div className="max-w-4xl">
        <div className="text-center py-16">
          <div className="w-16 h-16 bg-monad-purple/20 border border-monad-purple/40 flex items-center justify-center mx-auto mb-6">
            <span className="text-3xl">▣</span>
          </div>
          <h1 className="font-[family-name:var(--font-display)] text-2xl font-bold uppercase tracking-tight mb-4">
            Register a Project
          </h1>
          <p className="font-[family-name:var(--font-body)] text-white/60 mb-8 max-w-md mx-auto">
            You need to register a project to access the host program dashboard.
            Set up your referral program to start acquiring users.
          </p>
          <Link href="/register">
            <GlitchButton size="lg">Register Project</GlitchButton>
          </Link>
        </div>
      </div>
    );
  }

  return (
    <div className="max-w-4xl">
      {/* Page Header */}
      <div className="mb-8">
        <div className="flex items-center gap-2 mb-2">
          <div className="w-2 h-2 bg-terminal-yellow" />
          <span className="font-[family-name:var(--font-mono)] text-xs uppercase tracking-wider text-terminal-yellow">
            Host Dashboard
          </span>
        </div>
        <h1 className="font-[family-name:var(--font-display)] text-3xl font-bold uppercase tracking-tight">
          My Program
        </h1>
        <p className="font-[family-name:var(--font-body)] text-white/60 mt-2">
          Monitor your referral program performance and see your top referrers.
        </p>
      </div>

      {/* Host Stats Card */}
      <section className="mb-8">
        <HostStatsCard stats={hostStats} />
      </section>

      {/* Payout Configuration */}
      <section className="mb-8">
        <div className="flex items-center justify-between mb-4">
          <div className="flex items-center gap-2">
            <span className="font-[family-name:var(--font-mono)] text-xs uppercase tracking-wider text-white/40">
              Payout Configuration
            </span>
            <div className="flex-1 h-px bg-white/10" />
          </div>
          <Link href="/configure">
            <GlitchButton variant="ghost" size="sm">
              Edit Configuration
            </GlitchButton>
          </Link>
        </div>

        <div className="bg-monad-dark border border-white/10 p-6">
          <div className="font-[family-name:var(--font-mono)] text-sm text-white/60 mb-4">
            Total Margin: <span className="text-white">{payoutConfig.totalMargin}%</span>
          </div>

          {/* Visual breakdown bar */}
          <div className="h-8 flex overflow-hidden border border-white/10 mb-4">
            <div
              className="bg-terminal-green flex items-center justify-center"
              style={{ width: `${(payoutConfig.tier0Rebate / payoutConfig.totalMargin) * 100}%` }}
            >
              <span className="font-[family-name:var(--font-mono)] text-xs text-monad-black font-bold">
                {payoutConfig.tier0Rebate}%
              </span>
            </div>
            <div
              className="bg-monad-purple flex items-center justify-center"
              style={{ width: `${(payoutConfig.tier1Hunter / payoutConfig.totalMargin) * 100}%` }}
            >
              <span className="font-[family-name:var(--font-mono)] text-xs text-white font-bold">
                {payoutConfig.tier1Hunter}%
              </span>
            </div>
            <div
              className="bg-terminal-yellow flex items-center justify-center"
              style={{ width: `${(payoutConfig.tier2Manager / payoutConfig.totalMargin) * 100}%` }}
            >
              <span className="font-[family-name:var(--font-mono)] text-xs text-monad-black font-bold">
                {payoutConfig.tier2Manager}%
              </span>
            </div>
          </div>

          {/* Legend */}
          <div className="flex gap-6">
            <div className="flex items-center gap-2">
              <div className="w-3 h-3 bg-terminal-green" />
              <span className="font-[family-name:var(--font-mono)] text-xs text-white/60">
                Tier 0 (User Rebate)
              </span>
            </div>
            <div className="flex items-center gap-2">
              <div className="w-3 h-3 bg-monad-purple" />
              <span className="font-[family-name:var(--font-mono)] text-xs text-white/60">
                Tier 1 (Hunter)
              </span>
            </div>
            <div className="flex items-center gap-2">
              <div className="w-3 h-3 bg-terminal-yellow" />
              <span className="font-[family-name:var(--font-mono)] text-xs text-white/60">
                Tier 2 (Manager)
              </span>
            </div>
          </div>
        </div>
      </section>

      {/* Top Referrers */}
      <section>
        <div className="flex items-center gap-2 mb-4">
          <span className="font-[family-name:var(--font-mono)] text-xs uppercase tracking-wider text-white/40">
            Top Referrers
          </span>
          <div className="flex-1 h-px bg-white/10" />
        </div>

        <TopReferrersTable referrers={topReferrers} />
      </section>

      {/* Growth Tips */}
      <section className="mt-8 p-6 bg-monad-dark/50 border border-white/10">
        <h3 className="font-[family-name:var(--font-display)] text-sm font-bold uppercase tracking-wider text-white/60 mb-4">
          Growing Your Program
        </h3>
        <div className="space-y-3 font-[family-name:var(--font-body)] text-sm text-white/60">
          <div className="flex items-start gap-3">
            <span className="text-monad-purple">●</span>
            <span>
              <span className="text-white font-semibold">Attract top hunters:</span>{" "}
              Higher payouts attract more aggressive referrers
            </span>
          </div>
          <div className="flex items-start gap-3">
            <span className="text-monad-purple">●</span>
            <span>
              <span className="text-white font-semibold">User rebates matter:</span>{" "}
              Tier 0 rebates give users a reason to prefer your app
            </span>
          </div>
          <div className="flex items-start gap-3">
            <span className="text-monad-purple">●</span>
            <span>
              <span className="text-white font-semibold">Monitor volume:</span>{" "}
              Track which referrers bring high-value users
            </span>
          </div>
        </div>
      </section>
    </div>
  );
}
