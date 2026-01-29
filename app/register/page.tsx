"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { useApp } from "@/contexts/AppContext";
import PixelCard from "@/components/PixelCard";
import GlitchButton from "@/components/GlitchButton";

// Validate Ethereum address format
const isValidAddress = (addr: string) => /^0x[a-fA-F0-9]{40}$/.test(addr);

export default function RegisterPage() {
  const router = useRouter();
  const { walletAddress, isConnected, connectWallet, registerApp } = useApp();

  const [formData, setFormData] = useState({
    name: "",
    description: "",
    feeAddress: "",
  });
  const [addressError, setAddressError] = useState<string | null>(null);

  // The input uses `formData.feeAddress || walletAddress` as value,
  // so wallet address is the default without needing an effect

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();

    // Validate address format
    const addressToValidate = formData.feeAddress || walletAddress || "";
    if (!isValidAddress(addressToValidate)) {
      setAddressError("Invalid Ethereum address format");
      return;
    }

    setAddressError(null);
    registerApp({ ...formData, feeAddress: addressToValidate });
    router.push("/configure");
  };

  if (!isConnected) {
    return (
      <div className="min-h-[calc(100vh-4rem)] flex items-center justify-center px-6">
        <PixelCard className="max-w-md w-full text-center">
          <div className="w-16 h-16 bg-monad-gray mx-auto mb-6 flex items-center justify-center">
            <svg className="w-8 h-8 text-monad-purple" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 15v2m-6 4h12a2 2 0 002-2v-6a2 2 0 00-2-2H6a2 2 0 00-2 2v6a2 2 0 002 2zm10-10V7a4 4 0 00-8 0v4h8z" />
            </svg>
          </div>
          <h2 className="font-[family-name:var(--font-display)] text-2xl font-bold uppercase tracking-tight mb-4">
            Connect Wallet
          </h2>
          <p className="text-white/60 mb-6 font-[family-name:var(--font-body)]">
            Connect your wallet to register your application and configure referral payouts.
          </p>
          <GlitchButton onClick={connectWallet}>
            Connect Wallet
          </GlitchButton>
        </PixelCard>
      </div>
    );
  }

  return (
    <div className="min-h-[calc(100vh-4rem)] py-16 px-6">
      <div className="max-w-2xl mx-auto">
        {/* Page header */}
        <div className="mb-12">
          <div className="flex items-center gap-2 mb-4">
            <div className="w-2 h-2 bg-monad-purple" />
            <span className="font-[family-name:var(--font-mono)] text-xs uppercase tracking-wider text-white/40">
              Step 1 of 3
            </span>
          </div>
          <h1 className="font-[family-name:var(--font-display)] text-4xl font-bold uppercase tracking-tight mb-4">
            <span className="text-white">Register</span>{" "}
            <span className="text-monad-purple">Application</span>
          </h1>
          <p className="text-white/60 font-[family-name:var(--font-body)]">
            Provide basic information about your app to get started with the referral system.
          </p>
        </div>

        {/* Registration form */}
        <PixelCard>
          <form onSubmit={handleSubmit} className="space-y-6">
            {/* App name */}
            <div>
              <label className="block font-[family-name:var(--font-mono)] text-xs uppercase tracking-wider text-white/60 mb-2">
                Application Name
              </label>
              <input
                type="text"
                value={formData.name}
                onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                placeholder="e.g., MonadSwap DEX"
                className="w-full px-4 py-3 text-base font-[family-name:var(--font-body)]"
                required
              />
            </div>

            {/* Description */}
            <div>
              <label className="block font-[family-name:var(--font-mono)] text-xs uppercase tracking-wider text-white/60 mb-2">
                Description
              </label>
              <textarea
                value={formData.description}
                onChange={(e) => setFormData({ ...formData, description: e.target.value })}
                placeholder="Briefly describe what your application does..."
                rows={4}
                className="w-full px-4 py-3 text-base font-[family-name:var(--font-body)] resize-none"
                required
              />
            </div>

            {/* Fee receiving address */}
            <div>
              <label className="block font-[family-name:var(--font-mono)] text-xs uppercase tracking-wider text-white/60 mb-2">
                Fee Receiving Address
              </label>
              <div className="relative">
                <input
                  type="text"
                  value={formData.feeAddress || walletAddress || ""}
                  onChange={(e) => {
                    setFormData({ ...formData, feeAddress: e.target.value });
                    setAddressError(null);
                  }}
                  placeholder="0x..."
                  className={`w-full px-4 py-3 text-base font-[family-name:var(--font-mono)] pr-24 ${
                    addressError ? "border-terminal-red" : ""
                  }`}
                  required
                />
                <button
                  type="button"
                  onClick={() => setFormData({ ...formData, feeAddress: walletAddress || "" })}
                  className="absolute right-2 top-1/2 -translate-y-1/2 px-3 py-1 text-xs font-[family-name:var(--font-mono)] uppercase tracking-wider text-monad-purple hover:text-white transition-colors"
                >
                  Use Wallet
                </button>
              </div>
              {addressError ? (
                <p className="mt-2 text-xs text-terminal-red font-[family-name:var(--font-mono)]">
                  {addressError}
                </p>
              ) : (
                <p className="mt-2 text-xs text-white/40 font-[family-name:var(--font-mono)]">
                  This address will receive the protocol&apos;s share of fees.
                </p>
              )}
            </div>

            {/* Submit */}
            <div className="pt-4 flex items-center justify-between border-t border-white/10">
              <span className="font-[family-name:var(--font-mono)] text-xs text-white/40">
                Next: Configure Payouts
              </span>
              <GlitchButton type="submit">
                Continue
              </GlitchButton>
            </div>
          </form>
        </PixelCard>

        {/* Terminal log preview */}
        <div className="mt-8 p-4 bg-monad-black border border-white/10">
          <div className="terminal-log">
            <div className="flex gap-2">
              <span className="timestamp">--:--:--</span>
              <span className="prefix">&gt;&gt;</span>
              <span className="event-system">REGISTRATION_PENDING</span>
            </div>
            <div className="text-white/40 pl-20">
              Fill in the form above to register your application.
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
