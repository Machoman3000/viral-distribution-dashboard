"use client";

import PixelCard from "@/components/PixelCard";

export default function AppHubOverview() {
  return (
    <div>
      {/* Header */}
      <div className="mb-8">
        <h1 className="font-[family-name:var(--font-display)] text-3xl md:text-4xl font-bold uppercase tracking-tight mb-2">
          <span className="text-white">Welcome to</span>{" "}
          <span className="text-monad-purple">App Hub</span>
        </h1>
        <p className="text-white/60 font-[family-name:var(--font-body)]">
          Track your referrals and earnings across the MonadRefGraph network.
        </p>
      </div>

      {/* Stat Cards */}
      <div className="grid md:grid-cols-3 gap-6">
        {/* Total Saved */}
        <PixelCard>
          <div className="flex items-start justify-between mb-4">
            <span className="font-[family-name:var(--font-mono)] text-xs uppercase tracking-wider text-white/40">
              Total Saved
            </span>
            <svg
              className="w-5 h-5 text-terminal-green"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M12 8c-1.657 0-3 .895-3 2s1.343 2 3 2 3 .895 3 2-1.343 2-3 2m0-8c1.11 0 2.08.402 2.599 1M12 8V7m0 1v8m0 0v1m0-1c-1.11 0-2.08-.402-2.599-1M21 12a9 9 0 11-18 0 9 9 0 0118 0z"
              />
            </svg>
          </div>
          <div className="font-[family-name:var(--font-display)] text-4xl font-bold text-terminal-green mb-2">
            $0.00
          </div>
          <div className="w-full h-0.5 bg-terminal-green/30 mb-2" />
          <div className="font-[family-name:var(--font-mono)] text-xs">
            <span className="text-white/40">DISCOUNT: </span>
            <span className="text-terminal-green">ACTIVE</span>
          </div>
        </PixelCard>

        {/* Total Earned */}
        <PixelCard>
          <div className="flex items-start justify-between mb-4">
            <span className="font-[family-name:var(--font-mono)] text-xs uppercase tracking-wider text-white/40">
              Total Earned
            </span>
            <svg
              className="w-5 h-5 text-monad-purple"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M13 7h8m0 0v8m0-8l-8 8-4-4-6 6"
              />
            </svg>
          </div>
          <div className="font-[family-name:var(--font-display)] text-4xl font-bold text-monad-purple mb-2">
            $0.00
          </div>
          <div className="w-full h-0.5 bg-monad-purple/30 mb-2" />
          <div className="font-[family-name:var(--font-mono)] text-xs">
            <span className="text-white/40">STATUS: </span>
            <span className="text-monad-purple">TRACKING</span>
          </div>
        </PixelCard>

        {/* Referrals */}
        <PixelCard>
          <div className="flex items-start justify-between mb-4">
            <span className="font-[family-name:var(--font-mono)] text-xs uppercase tracking-wider text-white/40">
              Referrals
            </span>
            <svg
              className="w-5 h-5 text-terminal-yellow"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M17 20h5v-2a3 3 0 00-5.356-1.857M17 20H7m10 0v-2c0-.656-.126-1.283-.356-1.857M7 20H2v-2a3 3 0 015.356-1.857M7 20v-2c0-.656.126-1.283.356-1.857m0 0a5.002 5.002 0 019.288 0M15 7a3 3 0 11-6 0 3 3 0 016 0zm6 3a2 2 0 11-4 0 2 2 0 014 0zM7 10a2 2 0 11-4 0 2 2 0 014 0z"
              />
            </svg>
          </div>
          <div className="font-[family-name:var(--font-display)] text-4xl font-bold text-terminal-yellow mb-2">
            0
          </div>
          <div className="w-full h-0.5 bg-terminal-yellow/30 mb-2" />
          <div className="font-[family-name:var(--font-mono)] text-xs">
            <span className="text-white/40">NETWORK: </span>
            <span className="text-terminal-yellow">BUILDING</span>
          </div>
        </PixelCard>
      </div>
    </div>
  );
}
