"use client";

import { useDashboard } from "@/contexts/DashboardContext";
import { formatUSD } from "@/lib/mockData";
import StatCard from "@/components/StatCard";
import NetworkTree, { NetworkLegend } from "@/components/NetworkTree";
import GlitchButton from "@/components/GlitchButton";

export default function NetworkPage() {
  const { network, stats, canGraduate } = useDashboard();

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
          My Network
        </h1>
        <p className="font-[family-name:var(--font-body)] text-white/60 mt-2">
          View your referral tree and track the activity of users you&apos;ve brought
          in.
        </p>
      </div>

      {/* Network Stats */}
      <section className="mb-8">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          <StatCard
            label="Total Users"
            value={`${stats.networkSize}`}
            icon="●"
            color="purple"
          />
          <StatCard
            label="Hunters"
            value={`${stats.hunterCount}`}
            subValue="Earning referrers"
            icon="◆"
            color="green"
          />
          <StatCard
            label="Network Volume"
            value={formatUSD(stats.networkVolume)}
            icon="$"
          />
        </div>
      </section>

      {/* Graduate to Manager CTA */}
      {canGraduate && (
        <section className="mb-8 p-6 bg-terminal-yellow/5 border border-terminal-yellow/30">
          <div className="flex items-center justify-between">
            <div>
              <h3 className="font-[family-name:var(--font-display)] text-lg font-bold text-terminal-yellow uppercase">
                Ready to Graduate
              </h3>
              <p className="font-[family-name:var(--font-body)] text-sm text-white/60 mt-1">
                You have {stats.hunterCount} hunters in your network. You can now
                fork into your own organization and earn Tier 2 rewards.
              </p>
            </div>
            <GlitchButton variant="primary" size="sm">
              Graduate to Manager
            </GlitchButton>
          </div>
        </section>
      )}

      {/* Network Legend */}
      <section className="mb-4">
        <NetworkLegend />
      </section>

      {/* Network Tree Visualization */}
      <section className="bg-monad-dark/30 border border-white/10 overflow-x-auto">
        <NetworkTree node={network} />
      </section>

      {/* Explanation */}
      <section className="mt-8 p-6 bg-monad-dark/50 border border-white/10">
        <h3 className="font-[family-name:var(--font-display)] text-sm font-bold uppercase tracking-wider text-white/60 mb-4">
          Understanding Your Network
        </h3>
        <div className="space-y-4 font-[family-name:var(--font-body)] text-sm text-white/60">
          <div>
            <span className="text-monad-purple font-semibold">Tier 1 (Hunter):</span>{" "}
            You earn from users you directly refer. Anyone who clicks your link
            and connects their wallet is bonded to you.
          </div>
          <div>
            <span className="text-terminal-yellow font-semibold">Tier 2 (Manager):</span>{" "}
            Once you have 3+ hunters, you can &quot;graduate&quot; to become a Manager.
            This lets you fork into your own organization and earn from your
            hunters&apos; referrals too.
          </div>
          <div>
            <span className="text-white/80 font-semibold">Bonding is permanent</span>{" "}
            — users stay in your tree forever, ensuring you continue earning from
            their activity.
          </div>
        </div>
      </section>
    </div>
  );
}
