"use client";

import Link from "next/link";
import { useApp } from "@/contexts/AppContext";
import GlitchButton from "./GlitchButton";

const navLinkClassName = "text-sm font-[family-name:var(--font-mono)] uppercase tracking-wider text-white/60 hover:text-white focus-visible:text-white focus-visible:outline focus-visible:outline-2 focus-visible:outline-monad-purple focus-visible:outline-offset-2 transition-colors";

export default function Header() {
  const { walletAddress, isConnected, connectWallet, disconnectWallet } = useApp();

  const formatAddress = (address: string) => {
    return `${address.slice(0, 6)}...${address.slice(-4)}`;
  };

  return (
    <header className="border-b border-white/10 bg-monad-black/80 backdrop-blur-sm sticky top-0 z-50">
      <div className="max-w-7xl mx-auto px-6 h-16 flex items-center justify-between">
        {/* Logo */}
        <Link href="/" className="flex items-center gap-3">
          <div className="w-8 h-8 bg-monad-purple flex items-center justify-center">
            <span className="text-white font-bold text-sm">M</span>
          </div>
          <span className="font-[family-name:var(--font-display)] font-bold text-lg tracking-tight">
            <span className="text-white">MONAD</span>
            <span className="text-monad-purple">REF</span>
            <span className="text-white">GRAPH</span>
          </span>
        </Link>

        {/* Navigation */}
        <nav className="hidden md:flex items-center gap-8">
          {isConnected && (
            <Link
              href="/dashboard"
              className="text-sm font-[family-name:var(--font-mono)] uppercase tracking-wider text-monad-purple hover:text-white focus-visible:text-white focus-visible:outline focus-visible:outline-2 focus-visible:outline-monad-purple focus-visible:outline-offset-2 transition-colors"
            >
              My Dashboard
            </Link>
          )}
          <Link href="/register" className={navLinkClassName}>
            For Projects
          </Link>
          <Link href="/configure" className={navLinkClassName}>
            Configure
          </Link>
          <Link href="/integrate" className={navLinkClassName}>
            Integrate
          </Link>
          <Link href="/app-hub" className={navLinkClassName}>
            App Hub
          </Link>
          <Link
            href="https://docs.monadrefgraph.xyz"
            className={navLinkClassName}
            target="_blank"
            rel="noopener noreferrer"
          >
            Docs
          </Link>
        </nav>

        {/* Wallet */}
        <div className="flex items-center gap-4">
          {isConnected ? (
            <div className="flex items-center gap-3">
              <div className="flex items-center gap-2 px-3 py-1.5 border border-white/20 bg-monad-dark">
                <div className="w-2 h-2 bg-terminal-green status-pulse" />
                <span className="font-[family-name:var(--font-mono)] text-sm">
                  {formatAddress(walletAddress!)}
                </span>
              </div>
              <button
                onClick={disconnectWallet}
                className="text-sm font-[family-name:var(--font-mono)] text-white/40 hover:text-white/60 focus-visible:text-white focus-visible:outline focus-visible:outline-2 focus-visible:outline-monad-purple focus-visible:outline-offset-2 transition-colors"
              >
                DISCONNECT
              </button>
            </div>
          ) : (
            <GlitchButton onClick={connectWallet}>
              CONNECT WALLET
            </GlitchButton>
          )}
        </div>
      </div>
    </header>
  );
}
