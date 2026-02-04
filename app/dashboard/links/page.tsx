"use client";

import { useDashboard } from "@/contexts/DashboardContext";
import { useApp } from "@/contexts/AppContext";
import AppSelector from "@/components/AppSelector";
import ReferralLinkCard from "@/components/ReferralLinkCard";
import StatCard from "@/components/StatCard";

export default function LinksPage() {
  const { walletAddress } = useApp();
  const { apps, selectedAppId, setSelectedAppId, selectedApp, linkStats } =
    useDashboard();

  const currentStats = linkStats[selectedAppId] || {
    clicks: 0,
    conversions: 0,
    revenue: 0,
  };

  return (
    <div className="max-w-3xl">
      {/* Page Header */}
      <div className="mb-8">
        <div className="flex items-center gap-2 mb-2">
          <div className="w-2 h-2 bg-monad-purple" />
          <span className="font-[family-name:var(--font-mono)] text-xs uppercase tracking-wider text-white/40">
            Dashboard
          </span>
        </div>
        <h1 className="font-[family-name:var(--font-display)] text-3xl font-bold uppercase tracking-tight">
          My Referral Links
        </h1>
        <p className="font-[family-name:var(--font-body)] text-white/60 mt-2">
          Generate and share referral links for any integrated app. You earn
          when your referrals transact.
        </p>
      </div>

      {/* App Selector */}
      <div className="mb-6">
        <AppSelector
          apps={apps}
          selectedAppId={selectedAppId}
          onSelect={setSelectedAppId}
        />
      </div>

      {/* Referral Link Card */}
      {selectedApp && walletAddress && (
        <div className="mb-8">
          <ReferralLinkCard app={selectedApp} walletAddress={walletAddress} />
        </div>
      )}

      {/* Stats for this Link */}
      <section>
        <div className="flex items-center gap-2 mb-4">
          <span className="font-[family-name:var(--font-mono)] text-xs uppercase tracking-wider text-white/40">
            Stats for {selectedApp?.name || "this link"}
          </span>
          <div className="flex-1 h-px bg-white/10" />
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          <StatCard
            label="Clicks"
            value={currentStats.clicks.toString()}
            icon="◈"
          />
          <StatCard
            label="Conversions"
            value={currentStats.conversions.toString()}
            subValue={`${
              currentStats.clicks > 0
                ? ((currentStats.conversions / currentStats.clicks) * 100).toFixed(
                    1
                  )
                : 0
            }% rate`}
            icon="●"
            color="green"
          />
          <StatCard
            label="Revenue"
            value={`${currentStats.revenue.toFixed(2)} MON`}
            icon="◆"
            color="purple"
          />
        </div>
      </section>

      {/* How it Works */}
      <section className="mt-8 p-6 bg-monad-dark/50 border border-white/10">
        <h3 className="font-[family-name:var(--font-display)] text-sm font-bold uppercase tracking-wider text-white/60 mb-4">
          How It Works
        </h3>
        <ol className="space-y-3 font-[family-name:var(--font-body)] text-sm text-white/60">
          <li className="flex gap-3">
            <span className="text-monad-purple font-bold">1.</span>
            <span>Share your referral link with friends or on social media</span>
          </li>
          <li className="flex gap-3">
            <span className="text-monad-purple font-bold">2.</span>
            <span>
              When someone clicks and connects their wallet, they&apos;re bonded to
              you
            </span>
          </li>
          <li className="flex gap-3">
            <span className="text-monad-purple font-bold">3.</span>
            <span>
              You earn a percentage of fees from all their future transactions
            </span>
          </li>
          <li className="flex gap-3">
            <span className="text-monad-purple font-bold">4.</span>
            <span>
              Earnings are auto-staked as MON in your vault, earning additional APY
            </span>
          </li>
        </ol>
      </section>
    </div>
  );
}
