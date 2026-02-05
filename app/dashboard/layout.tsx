"use client";

import { useApp } from "@/contexts/AppContext";
import { DashboardProvider } from "@/contexts/DashboardContext";
import DashboardSidebar from "@/components/DashboardSidebar";
import { useRouter } from "next/navigation";
import { useEffect } from "react";
import GlitchButton from "@/components/GlitchButton";

export default function DashboardLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const { isConnected, connectWallet } = useApp();
  const router = useRouter();

  // Redirect to home if not connected (with a slight delay to prevent flash)
  useEffect(() => {
    if (!isConnected) {
      // Don't redirect immediately - show connect prompt instead
    }
  }, [isConnected, router]);

  // Show connect wallet prompt if not connected
  if (!isConnected) {
    return (
      <div className="min-h-[calc(100vh-4rem)] flex items-center justify-center px-6">
        <div className="text-center max-w-md">
          <div className="w-16 h-16 bg-monad-purple/20 border border-monad-purple/40 flex items-center justify-center mx-auto mb-6">
            <span className="text-3xl">⛓</span>
          </div>
          <h1 className="font-[family-name:var(--font-display)] text-3xl font-bold uppercase tracking-tight mb-4">
            Connect Wallet
          </h1>
          <p className="font-[family-name:var(--font-body)] text-white/60 mb-8">
            Connect your wallet to access your referral dashboard, track
            earnings, and manage your network.
          </p>
          <GlitchButton size="lg" onClick={connectWallet}>
            Connect Wallet
          </GlitchButton>
        </div>
      </div>
    );
  }

  return (
    <DashboardProvider>
      <div className="min-h-[calc(100vh-4rem)] flex">
        <DashboardSidebar />
        <div className="flex-1 overflow-auto">
          <div className="py-8 px-8">{children}</div>
        </div>
      </div>
    </DashboardProvider>
  );
}
