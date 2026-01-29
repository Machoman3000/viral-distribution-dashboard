"use client";

import { useState } from "react";
import { useApp } from "@/contexts/AppContext";
import PixelCard from "@/components/PixelCard";
import GlitchButton from "@/components/GlitchButton";
import CodeBlock from "@/components/CodeBlock";

type Tab = "link" | "sdk" | "contract";

export default function IntegratePage() {
  const { appRegistration, payoutConfig } = useApp();
  const [activeTab, setActiveTab] = useState<Tab>("link");
  const [copied, setCopied] = useState(false);

  const appId = appRegistration?.appId || "your-app-id";
  const appName = appRegistration?.name || "YourApp";

  const referralLink = `https://${appName.toLowerCase().replace(/\s+/g, "")}.xyz/ref/{AFFILIATE_ADDRESS}`;

  const sdkCode = `import { MonadReferral } from '@monad/referral-sdk'

// Initialize with your app credentials
const referral = new MonadReferral({
  appId: '${appId}',
  network: 'monad-mainnet'
})

// Wrap your transaction to include referral attribution
async function executeWithReferral(tx: Transaction) {
  // Get referrer from URL params or storage
  const referrer = referral.getReferrerFromUrl()

  // Wrap the transaction with referral data
  const wrappedTx = await referral.wrapTransaction(tx, {
    referrer,
    // Fee split is configured in your dashboard
    // T0: ${payoutConfig.tier0Rebate}% | T1: ${payoutConfig.tier1Hunter}% | T2: ${payoutConfig.tier2Manager}%
  })

  return wrappedTx
}

// Track a referral visit (optional, for analytics)
referral.trackVisit()`;

  const contractCode = `// SPDX-License-Identifier: MIT
pragma solidity ^0.8.19;

import "@monad/referral/AdEngine.sol";

contract YourProtocol {
    AdEngine public adEngine;

    constructor(address _adEngine) {
        adEngine = AdEngine(_adEngine);
    }

    function executeSwap(
        address tokenIn,
        address tokenOut,
        uint256 amount,
        address referrer
    ) external {
        // ... your swap logic ...

        // Calculate fee
        uint256 fee = calculateFee(amount);

        // Distribute fee through AdEngine
        // This handles T0/T1/T2 splits automatically
        adEngine.distribute{value: fee}(
            msg.sender,  // user (receives T0 rebate)
            referrer,    // hunter (receives T1)
            fee
        );
    }

    // App ID: ${appId}
    // Config: T0=${payoutConfig.tier0Rebate}% | T1=${payoutConfig.tier1Hunter}% | T2=${payoutConfig.tier2Manager}%
}`;

  const handleCopyLink = async () => {
    await navigator.clipboard.writeText(referralLink);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  const tabs: { id: Tab; label: string }[] = [
    { id: "link", label: "Referral Link" },
    { id: "sdk", label: "SDK Snippet" },
    { id: "contract", label: "Contract Hook" },
  ];

  return (
    <div className="min-h-[calc(100vh-4rem)] py-16 px-6">
      <div className="max-w-3xl mx-auto">
        {/* Page header */}
        <div className="mb-12">
          <div className="flex items-center gap-2 mb-4">
            <div className="w-2 h-2 bg-terminal-green" />
            <span className="font-[family-name:var(--font-mono)] text-xs uppercase tracking-wider text-white/40">
              Step 3 of 3 — Complete
            </span>
          </div>
          <h1 className="font-[family-name:var(--font-display)] text-4xl font-bold uppercase tracking-tight mb-4">
            <span className="text-white">Integration</span>{" "}
            <span className="text-monad-purple">Materials</span>
          </h1>
          <p className="text-white/60 font-[family-name:var(--font-body)]">
            Your referral system is configured. Choose an integration method below.
          </p>
        </div>

        {/* Configuration summary */}
        <div className="mb-8 p-4 bg-monad-black border border-white/10">
          <div className="flex items-center gap-4 mb-4">
            <div className="flex items-center gap-2">
              <div className="w-2 h-2 bg-terminal-green status-pulse" />
              <span className="font-[family-name:var(--font-mono)] text-xs uppercase tracking-wider">
                Config Active
              </span>
            </div>
            {appRegistration && (
              <span className="font-[family-name:var(--font-mono)] text-xs text-white/40">
                {appRegistration.name} ({appRegistration.appId})
              </span>
            )}
          </div>
          <div className="flex flex-wrap gap-4">
            <div className="flex items-center gap-2">
              <div className="w-3 h-3 bg-terminal-green" />
              <span className="font-[family-name:var(--font-mono)] text-sm text-white/60">
                T0: {payoutConfig.tier0Rebate}%
              </span>
            </div>
            <div className="flex items-center gap-2">
              <div className="w-3 h-3 bg-monad-purple" />
              <span className="font-[family-name:var(--font-mono)] text-sm text-white/60">
                T1: {payoutConfig.tier1Hunter}%
              </span>
            </div>
            <div className="flex items-center gap-2">
              <div className="w-3 h-3 bg-terminal-yellow" />
              <span className="font-[family-name:var(--font-mono)] text-sm text-white/60">
                T2: {payoutConfig.tier2Manager}%
              </span>
            </div>
            <div className="flex items-center gap-2">
              <div className="w-3 h-3 bg-white/20" />
              <span className="font-[family-name:var(--font-mono)] text-sm text-white/60">
                Protocol: {100 - payoutConfig.totalMargin}%
              </span>
            </div>
          </div>
        </div>

        {/* Tab navigation */}
        <div className="flex border-b border-white/10 mb-6">
          {tabs.map((tab) => (
            <button
              key={tab.id}
              onClick={() => setActiveTab(tab.id)}
              className={`
                px-6 py-3 font-[family-name:var(--font-mono)] text-sm uppercase tracking-wider
                transition-colors relative
                ${
                  activeTab === tab.id
                    ? "text-monad-purple"
                    : "text-white/40 hover:text-white/60"
                }
              `}
            >
              {tab.label}
              {activeTab === tab.id && (
                <div className="absolute bottom-0 left-0 right-0 h-0.5 bg-monad-purple" />
              )}
            </button>
          ))}
        </div>

        {/* Tab content */}
        <div className="space-y-6">
          {activeTab === "link" && (
            <PixelCard>
              <h3 className="font-[family-name:var(--font-display)] text-lg font-bold uppercase tracking-tight mb-4">
                Referral Link Structure
              </h3>
              <p className="text-white/60 text-sm font-[family-name:var(--font-body)] mb-6">
                Share this URL pattern with your affiliates. Replace{" "}
                <code className="px-1 py-0.5 bg-monad-gray text-monad-purple font-[family-name:var(--font-mono)] text-xs">
                  {"{AFFILIATE_ADDRESS}"}
                </code>{" "}
                with their wallet address.
              </p>

              <div className="flex items-center gap-3 p-4 bg-monad-black border border-white/10">
                <div className="flex-1 overflow-x-auto">
                  <code className="font-[family-name:var(--font-mono)] text-sm text-white whitespace-nowrap">
                    {referralLink}
                  </code>
                </div>
                <GlitchButton variant="secondary" size="sm" onClick={handleCopyLink}>
                  {copied ? "Copied!" : "Copy"}
                </GlitchButton>
              </div>

              <div className="mt-6 p-4 bg-monad-gray border border-white/10">
                <h4 className="font-[family-name:var(--font-mono)] text-xs uppercase tracking-wider text-white/60 mb-3">
                  Example Usage
                </h4>
                <div className="space-y-2 font-[family-name:var(--font-mono)] text-sm">
                  <div>
                    <span className="text-white/40">Hunter shares: </span>
                    <span className="text-monad-purple">
                      {referralLink.replace("{AFFILIATE_ADDRESS}", "0x1234...abcd")}
                    </span>
                  </div>
                  <div>
                    <span className="text-white/40">User clicks → </span>
                    <span className="text-terminal-green">Attribution recorded on-chain</span>
                  </div>
                </div>
              </div>
            </PixelCard>
          )}

          {activeTab === "sdk" && (
            <div>
              <PixelCard className="mb-6">
                <h3 className="font-[family-name:var(--font-display)] text-lg font-bold uppercase tracking-tight mb-2">
                  JavaScript/TypeScript SDK
                </h3>
                <p className="text-white/60 text-sm font-[family-name:var(--font-body)]">
                  Install the SDK and wrap your transactions to enable referral tracking.
                </p>
              </PixelCard>

              <div className="mb-4">
                <CodeBlock
                  code="npm install @monad/referral-sdk"
                  language="bash"
                  title="Installation"
                />
              </div>

              <CodeBlock code={sdkCode} language="typescript" title="Usage Example" />
            </div>
          )}

          {activeTab === "contract" && (
            <div>
              <PixelCard className="mb-6">
                <h3 className="font-[family-name:var(--font-display)] text-lg font-bold uppercase tracking-tight mb-2">
                  Smart Contract Integration
                </h3>
                <p className="text-white/60 text-sm font-[family-name:var(--font-body)]">
                  Integrate directly at the contract level for maximum on-chain attribution.
                </p>
              </PixelCard>

              <CodeBlock code={contractCode} language="solidity" title="AdEngine Integration" />

              <div className="mt-6 p-4 bg-monad-black border border-white/10">
                <div className="terminal-log space-y-1">
                  <div className="flex gap-2">
                    <span className="prefix">&gt;&gt;</span>
                    <span className="event-system">CONTRACT_INFO</span>
                  </div>
                  <div className="text-white/60 pl-6">
                    AdEngine: 0x...deployed_address
                  </div>
                  <div className="text-white/60 pl-6">
                    Network: monad-mainnet
                  </div>
                  <div className="flex gap-2">
                    <span className="prefix">&gt;&gt;</span>
                    <span className="event-revenue">READY_FOR_DEPLOYMENT</span>
                  </div>
                </div>
              </div>
            </div>
          )}
        </div>

        {/* Next steps */}
        <PixelCard className="mt-12">
          <h3 className="font-[family-name:var(--font-display)] text-lg font-bold uppercase tracking-tight mb-4">
            Next Steps
          </h3>
          <div className="space-y-4">
            <div className="flex items-start gap-3">
              <div className="w-6 h-6 bg-monad-gray flex items-center justify-center shrink-0 mt-0.5">
                <span className="font-[family-name:var(--font-mono)] text-xs text-monad-purple">1</span>
              </div>
              <div>
                <span className="font-[family-name:var(--font-body)] font-medium">Integrate</span>
                <p className="text-white/40 text-sm">Add the SDK or contract hook to your application</p>
              </div>
            </div>
            <div className="flex items-start gap-3">
              <div className="w-6 h-6 bg-monad-gray flex items-center justify-center shrink-0 mt-0.5">
                <span className="font-[family-name:var(--font-mono)] text-xs text-monad-purple">2</span>
              </div>
              <div>
                <span className="font-[family-name:var(--font-body)] font-medium">Recruit Hunters</span>
                <p className="text-white/40 text-sm">Share your referral link structure with affiliates</p>
              </div>
            </div>
            <div className="flex items-start gap-3">
              <div className="w-6 h-6 bg-monad-gray flex items-center justify-center shrink-0 mt-0.5">
                <span className="font-[family-name:var(--font-mono)] text-xs text-monad-purple">3</span>
              </div>
              <div>
                <span className="font-[family-name:var(--font-body)] font-medium">Monitor Growth</span>
                <p className="text-white/40 text-sm">Track volume and payouts in the Hunter Dashboard</p>
              </div>
            </div>
          </div>

          <div className="mt-6 pt-6 border-t border-white/10 flex items-center justify-between">
            <span className="font-[family-name:var(--font-mono)] text-xs text-white/40">
              Need help? Check the docs or join Discord
            </span>
            <GlitchButton variant="secondary" size="sm">
              View Docs
            </GlitchButton>
          </div>
        </PixelCard>
      </div>
    </div>
  );
}
