"use client";

interface PayoutPreviewProps {
  isOpen: boolean;
  onClose: () => void;
  totalMargin: number;
  tier0: number;
  tier1: number;
  tier2: number;
}

export default function PayoutPreview({
  isOpen,
  onClose,
  totalMargin,
  tier0,
  tier1,
  tier2,
}: PayoutPreviewProps) {
  if (!isOpen) return null;

  const feeAmount = 10; // Example $10 fee
  const protocolShare = 100 - totalMargin;

  const calculations = {
    tier0Amount: (feeAmount * tier0) / 100,
    tier1Amount: (feeAmount * tier1) / 100,
    tier2Amount: (feeAmount * tier2) / 100,
    protocolAmount: (feeAmount * protocolShare) / 100,
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4">
      {/* Backdrop */}
      <div
        className="absolute inset-0 bg-black/80 backdrop-blur-sm"
        onClick={onClose}
      />

      {/* Modal */}
      <div className="relative bg-monad-dark border border-white/10 w-full max-w-lg pixel-corners">
        <span className="pixel-corner-tr" />
        <span className="pixel-corner-bl" />

        {/* Header */}
        <div className="flex items-center justify-between px-6 py-4 border-b border-white/10">
          <div className="flex items-center gap-3">
            <div className="w-2 h-2 bg-terminal-green status-pulse" />
            <span className="font-[family-name:var(--font-mono)] text-xs uppercase tracking-wider">
              Simulation Active
            </span>
          </div>
          <button
            onClick={onClose}
            className="text-white/40 hover:text-white transition-colors"
          >
            <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
            </svg>
          </button>
        </div>

        {/* Content */}
        <div className="p-6">
          <h3 className="font-[family-name:var(--font-display)] text-xl font-bold uppercase tracking-tight mb-6">
            Fee Distribution Preview
          </h3>

          {/* Terminal-style output */}
          <div className="bg-monad-black border border-white/10 p-4 terminal-log">
            <div className="space-y-1">
              <div className="text-monad-purple">&gt;&gt; FEE_SIMULATION</div>
              <div className="pl-4">
                <span className="text-white/60">Input:</span>
                <span className="text-white ml-2">{feeAmount.toFixed(2)} MON</span>
              </div>
              <div className="text-white/20 pl-4">─────────────────────</div>

              {/* Tier 0 */}
              <div className="pl-4 flex items-center justify-between">
                <div>
                  <span className="text-terminal-green">TIER_0:</span>
                  <span className="text-white ml-2">{calculations.tier0Amount.toFixed(2)} MON</span>
                </div>
                <span className="text-white/40">({tier0}%) → User</span>
              </div>

              {/* Tier 1 */}
              <div className="pl-4 flex items-center justify-between">
                <div>
                  <span className="text-monad-purple">TIER_1:</span>
                  <span className="text-white ml-2">{calculations.tier1Amount.toFixed(2)} MON</span>
                </div>
                <span className="text-white/40">({tier1}%) → Hunter</span>
              </div>

              {/* Tier 2 */}
              <div className="pl-4 flex items-center justify-between">
                <div>
                  <span className="text-terminal-yellow">TIER_2:</span>
                  <span className="text-white ml-2">{calculations.tier2Amount.toFixed(2)} MON</span>
                </div>
                <span className="text-white/40">({tier2}%) → Manager</span>
              </div>

              <div className="text-white/20 pl-4">─────────────────────</div>

              {/* Protocol */}
              <div className="pl-4 flex items-center justify-between">
                <div>
                  <span className="text-white">PROTOCOL:</span>
                  <span className="text-white ml-2">{calculations.protocolAmount.toFixed(2)} MON</span>
                </div>
                <span className="text-white/40">({protocolShare}%) → You</span>
              </div>
            </div>
          </div>

          {/* Visual bar representation */}
          <div className="mt-6">
            <div className="flex items-center gap-1 h-4">
              {tier0 > 0 && (
                <div
                  className="h-full bg-terminal-green"
                  style={{ width: `${tier0}%` }}
                  title={`User Rebate: ${tier0}%`}
                />
              )}
              {tier1 > 0 && (
                <div
                  className="h-full bg-monad-purple"
                  style={{ width: `${tier1}%` }}
                  title={`Hunter: ${tier1}%`}
                />
              )}
              {tier2 > 0 && (
                <div
                  className="h-full bg-terminal-yellow"
                  style={{ width: `${tier2}%` }}
                  title={`Manager: ${tier2}%`}
                />
              )}
              <div
                className="h-full bg-white/20"
                style={{ width: `${protocolShare}%` }}
                title={`Protocol: ${protocolShare}%`}
              />
            </div>
            <div className="flex justify-between mt-2">
              <span className="font-[family-name:var(--font-mono)] text-xs text-white/40">
                Referral Share: {totalMargin}%
              </span>
              <span className="font-[family-name:var(--font-mono)] text-xs text-white/40">
                Protocol: {protocolShare}%
              </span>
            </div>
          </div>

          {/* Info note */}
          <div className="mt-6 p-3 bg-monad-gray border border-white/10">
            <p className="text-xs text-white/60 font-[family-name:var(--font-body)]">
              <span className="text-monad-purple">Note:</span> This simulation shows how a $10 fee would be distributed.
              Actual distributions scale proportionally with transaction fees.
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}
