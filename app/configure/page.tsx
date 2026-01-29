"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { useApp } from "@/contexts/AppContext";
import PixelCard from "@/components/PixelCard";
import GlitchButton from "@/components/GlitchButton";
import PayoutSlider from "@/components/PayoutSlider";
import PayoutPreview from "@/components/PayoutPreview";

export default function ConfigurePage() {
  const router = useRouter();
  const { payoutConfig, setPayoutConfig, appRegistration } = useApp();
  const [showPreview, setShowPreview] = useState(false);

  const { totalMargin, tier0Rebate, tier1Hunter, tier2Manager } = payoutConfig;

  // Calculate remaining margin for each tier
  const usedMargin = tier0Rebate + tier1Hunter + tier2Manager;
  const remainingMargin = totalMargin - usedMargin;
  const protocolShare = 100 - totalMargin;

  // Validation
  const isValid = usedMargin <= totalMargin;
  const isComplete = usedMargin > 0;

  const handleTotalMarginChange = (value: string) => {
    const newMargin = parseInt(value);
    setPayoutConfig({
      ...payoutConfig,
      totalMargin: newMargin,
      // Reset tiers if they exceed new margin
      tier0Rebate: Math.min(tier0Rebate, newMargin),
      tier1Hunter: Math.min(tier1Hunter, newMargin - Math.min(tier0Rebate, newMargin)),
      tier2Manager: Math.min(
        tier2Manager,
        newMargin - Math.min(tier0Rebate, newMargin) - Math.min(tier1Hunter, newMargin - Math.min(tier0Rebate, newMargin))
      ),
    });
  };

  const handleTier0Change = (value: number) => {
    setPayoutConfig({
      ...payoutConfig,
      tier0Rebate: value,
    });
  };

  const handleTier1Change = (value: number) => {
    setPayoutConfig({
      ...payoutConfig,
      tier1Hunter: value,
    });
  };

  const handleTier2Change = (value: number) => {
    setPayoutConfig({
      ...payoutConfig,
      tier2Manager: value,
    });
  };

  const handleSave = () => {
    router.push("/integrate");
  };

  return (
    <div className="min-h-[calc(100vh-4rem)] py-16 px-6">
      <div className="max-w-3xl mx-auto">
        {/* Page header */}
        <div className="mb-12">
          <div className="flex items-center gap-2 mb-4">
            <div className="w-2 h-2 bg-monad-purple" />
            <span className="font-[family-name:var(--font-mono)] text-xs uppercase tracking-wider text-white/40">
              Step 2 of 3
            </span>
          </div>
          <h1 className="font-[family-name:var(--font-display)] text-4xl font-bold uppercase tracking-tight mb-4">
            <span className="text-white">Configure</span>{" "}
            <span className="text-monad-purple">Payouts</span>
          </h1>
          <p className="text-white/60 font-[family-name:var(--font-body)]">
            Set how transaction fees are distributed across your referral network.
            Balance incentives between users, hunters, and managers.
          </p>
        </div>

        {/* App info (if registered) */}
        {appRegistration && (
          <div className="mb-8 p-4 bg-monad-black border border-white/10 flex items-center gap-4">
            <div className="w-10 h-10 bg-monad-gray flex items-center justify-center shrink-0">
              <span className="font-[family-name:var(--font-display)] font-bold text-monad-purple">
                {appRegistration.name.charAt(0).toUpperCase()}
              </span>
            </div>
            <div>
              <span className="font-[family-name:var(--font-display)] font-bold">
                {appRegistration.name}
              </span>
              <span className="font-[family-name:var(--font-mono)] text-xs text-white/40 ml-2">
                {appRegistration.appId}
              </span>
            </div>
          </div>
        )}

        {/* Total Margin Selector */}
        <PixelCard className="mb-8">
          <div className="flex items-center justify-between">
            <div>
              <h3 className="font-[family-name:var(--font-display)] text-lg font-bold uppercase tracking-tight mb-1">
                Total Fee Margin to Share
              </h3>
              <p className="text-white/40 text-sm font-[family-name:var(--font-body)]">
                Maximum percentage of fees distributed to referral network
              </p>
            </div>
            <select
              value={totalMargin}
              onChange={(e) => handleTotalMarginChange(e.target.value)}
              className="px-4 py-2 font-[family-name:var(--font-mono)] text-xl font-bold text-monad-purple cursor-pointer"
            >
              <option value="10">10%</option>
              <option value="15">15%</option>
              <option value="20">20%</option>
              <option value="25">25%</option>
              <option value="30">30%</option>
              <option value="40">40%</option>
              <option value="50">50%</option>
            </select>
          </div>
        </PixelCard>

        {/* Tier Sliders */}
        <div className="space-y-4 mb-8">
          <PayoutSlider
            tier="TIER_0"
            label="User Rebate"
            description="&quot;Use my link to save on fees&quot; — Incentive for end users to use referral links"
            value={tier0Rebate}
            onChange={handleTier0Change}
            max={totalMargin - tier1Hunter - tier2Manager}
            totalMargin={totalMargin}
            color="green"
          />

          <PayoutSlider
            tier="TIER_1"
            label="Hunter"
            description="&quot;The influencer driving volume&quot; — Reward for affiliates who bring users directly"
            value={tier1Hunter}
            onChange={handleTier1Change}
            max={totalMargin - tier0Rebate - tier2Manager}
            totalMargin={totalMargin}
            color="purple"
          />

          <PayoutSlider
            tier="TIER_2"
            label="Manager"
            description="&quot;The guild leader recruiting hunters&quot; — Reward for those who recruit affiliates"
            value={tier2Manager}
            onChange={handleTier2Change}
            max={totalMargin - tier0Rebate - tier1Hunter}
            totalMargin={totalMargin}
            color="yellow"
          />
        </div>

        {/* Summary Card */}
        <PixelCard className="mb-8">
          <div className="flex items-center justify-between mb-4">
            <h3 className="font-[family-name:var(--font-display)] text-lg font-bold uppercase tracking-tight">
              Distribution Summary
            </h3>
            {!isValid && (
              <span className="px-2 py-1 bg-terminal-red/20 text-terminal-red font-[family-name:var(--font-mono)] text-xs">
                EXCEEDS MARGIN
              </span>
            )}
          </div>

          {/* Visual distribution bar */}
          <div className="mb-4">
            <div className="flex items-center gap-px h-6">
              {tier0Rebate > 0 && (
                <div
                  className="h-full bg-terminal-green flex items-center justify-center"
                  style={{ width: `${tier0Rebate}%` }}
                >
                  {tier0Rebate >= 5 && (
                    <span className="font-[family-name:var(--font-mono)] text-xs text-black font-bold">
                      {tier0Rebate}%
                    </span>
                  )}
                </div>
              )}
              {tier1Hunter > 0 && (
                <div
                  className="h-full bg-monad-purple flex items-center justify-center"
                  style={{ width: `${tier1Hunter}%` }}
                >
                  {tier1Hunter >= 5 && (
                    <span className="font-[family-name:var(--font-mono)] text-xs text-white font-bold">
                      {tier1Hunter}%
                    </span>
                  )}
                </div>
              )}
              {tier2Manager > 0 && (
                <div
                  className="h-full bg-terminal-yellow flex items-center justify-center"
                  style={{ width: `${tier2Manager}%` }}
                >
                  {tier2Manager >= 5 && (
                    <span className="font-[family-name:var(--font-mono)] text-xs text-black font-bold">
                      {tier2Manager}%
                    </span>
                  )}
                </div>
              )}
              <div
                className="h-full bg-white/20 flex items-center justify-center"
                style={{ width: `${protocolShare}%` }}
              >
                {protocolShare >= 10 && (
                  <span className="font-[family-name:var(--font-mono)] text-xs text-white/60 font-bold">
                    {protocolShare}%
                  </span>
                )}
              </div>
            </div>
          </div>

          {/* Legend */}
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
            <div className="flex items-center gap-2">
              <div className="w-3 h-3 bg-terminal-green" />
              <span className="font-[family-name:var(--font-mono)] text-xs text-white/60">
                User: {tier0Rebate}%
              </span>
            </div>
            <div className="flex items-center gap-2">
              <div className="w-3 h-3 bg-monad-purple" />
              <span className="font-[family-name:var(--font-mono)] text-xs text-white/60">
                Hunter: {tier1Hunter}%
              </span>
            </div>
            <div className="flex items-center gap-2">
              <div className="w-3 h-3 bg-terminal-yellow" />
              <span className="font-[family-name:var(--font-mono)] text-xs text-white/60">
                Manager: {tier2Manager}%
              </span>
            </div>
            <div className="flex items-center gap-2">
              <div className="w-3 h-3 bg-white/20" />
              <span className="font-[family-name:var(--font-mono)] text-xs text-white/60">
                Protocol: {protocolShare}%
              </span>
            </div>
          </div>

          {/* Remaining margin indicator */}
          {remainingMargin > 0 && (
            <div className="mt-4 pt-4 border-t border-white/10">
              <span className="font-[family-name:var(--font-mono)] text-xs text-white/40">
                Unallocated margin: {remainingMargin}% (will go to protocol)
              </span>
            </div>
          )}
        </PixelCard>

        {/* Actions */}
        <div className="flex items-center justify-between">
          <GlitchButton variant="secondary" onClick={() => setShowPreview(true)}>
            Preview Example
          </GlitchButton>
          <GlitchButton
            onClick={handleSave}
            disabled={!isValid || !isComplete}
            className={!isValid || !isComplete ? "opacity-50 cursor-not-allowed" : ""}
          >
            Save Configuration
          </GlitchButton>
        </div>

        {/* Terminal log */}
        <div className="mt-8 p-4 bg-monad-black border border-white/10">
          <div className="terminal-log space-y-1">
            <div className="flex gap-2">
              <span className="timestamp">--:--:--</span>
              <span className="prefix">&gt;&gt;</span>
              <span className="event-system">CONFIG_STATUS</span>
            </div>
            <div className="text-white/60 pl-20">
              Total margin: {totalMargin}% | Allocated: {usedMargin}% | Remaining: {remainingMargin}%
            </div>
            {isValid ? (
              <div className="flex gap-2">
                <span className="timestamp">--:--:--</span>
                <span className="prefix">&gt;&gt;</span>
                <span className="event-revenue">VALID_CONFIG</span>
              </div>
            ) : (
              <div className="flex gap-2">
                <span className="timestamp">--:--:--</span>
                <span className="prefix">&gt;&gt;</span>
                <span className="event-error">ERROR: Tier allocations exceed total margin</span>
              </div>
            )}
          </div>
        </div>
      </div>

      {/* Preview Modal */}
      <PayoutPreview
        isOpen={showPreview}
        onClose={() => setShowPreview(false)}
        totalMargin={totalMargin}
        tier0={tier0Rebate}
        tier1={tier1Hunter}
        tier2={tier2Manager}
      />
    </div>
  );
}
