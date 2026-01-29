"use client";

import Link from "next/link";
import { useApp } from "@/contexts/AppContext";
import GlitchButton from "@/components/GlitchButton";
import PixelCard from "@/components/PixelCard";

export default function Home() {
  const { isConnected, connectWallet } = useApp();

  return (
    <div className="min-h-[calc(100vh-4rem)]">
      {/* Hero Section */}
      <section className="relative py-24 px-6">
        <div className="max-w-5xl mx-auto text-center">
          {/* Status badge */}
          <div className="inline-flex items-center gap-2 px-4 py-2 border border-white/20 mb-8">
            <div className="w-2 h-2 bg-terminal-green status-pulse" />
            <span className="font-[family-name:var(--font-mono)] text-xs uppercase tracking-wider">
              System Active
            </span>
          </div>

          {/* Main headline */}
          <h1 className="font-[family-name:var(--font-display)] text-5xl md:text-7xl font-bold uppercase tracking-tight mb-6">
            <span className="text-white">Developer</span>
            <br />
            <span className="text-monad-purple">Dashboard</span>
          </h1>

          {/* Subtitle */}
          <p className="text-white/60 text-lg md:text-xl max-w-2xl mx-auto mb-12 font-[family-name:var(--font-body)]">
            Configure multi-level referral payouts for your app.
            <br />
            Generate integration materials in seconds.
          </p>

          {/* CTA buttons */}
          <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
            {isConnected ? (
              <Link href="/register">
                <GlitchButton size="lg">
                  Register Your App
                </GlitchButton>
              </Link>
            ) : (
              <GlitchButton size="lg" onClick={connectWallet}>
                Connect Wallet
              </GlitchButton>
            )}
            <Link href="/configure">
              <GlitchButton variant="secondary" size="lg">
                View Demo
              </GlitchButton>
            </Link>
          </div>
        </div>

        {/* System ready indicator */}
        <div className="absolute top-24 right-8 hidden lg:block">
          <span className="font-[family-name:var(--font-mono)] text-xs text-monad-purple/60">
            SYSTEM_READY ///
          </span>
        </div>
      </section>

      {/* Stats Section */}
      <section className="border-t border-white/10 py-16 px-6">
        <div className="max-w-5xl mx-auto">
          {/* Pixel decoration */}
          <div className="flex gap-1 mb-8">
            <div className="w-2 h-2 bg-monad-purple" />
            <div className="w-2 h-2 bg-monad-purple/60" />
            <div className="w-2 h-2 bg-monad-purple/30" />
          </div>

          <div className="grid md:grid-cols-3 gap-6">
            <PixelCard>
              <div className="flex items-start justify-between mb-4">
                <span className="font-[family-name:var(--font-mono)] text-xs uppercase tracking-wider text-white/40">
                  Total Volume
                </span>
                <svg className="w-5 h-5 text-monad-purple" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 7h8m0 0v8m0-8l-8 8-4-4-6 6" />
                </svg>
              </div>
              <div className="font-[family-name:var(--font-display)] text-4xl font-bold mb-2">
                $420M+
              </div>
              <div className="w-full h-0.5 bg-monad-purple mb-2" />
              <div className="font-[family-name:var(--font-mono)] text-xs">
                <span className="text-white/40">GROWTH: </span>
                <span className="text-terminal-green">+12.4%</span>
              </div>
            </PixelCard>

            <PixelCard>
              <div className="flex items-start justify-between mb-4">
                <span className="font-[family-name:var(--font-mono)] text-xs uppercase tracking-wider text-white/40">
                  Active Hunters
                </span>
                <svg className="w-5 h-5 text-monad-purple" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 20h5v-2a3 3 0 00-5.356-1.857M17 20H7m10 0v-2c0-.656-.126-1.283-.356-1.857M7 20H2v-2a3 3 0 015.356-1.857M7 20v-2c0-.656.126-1.283.356-1.857m0 0a5.002 5.002 0 019.288 0M15 7a3 3 0 11-6 0 3 3 0 016 0zm6 3a2 2 0 11-4 0 2 2 0 014 0zM7 10a2 2 0 11-4 0 2 2 0 014 0z" />
                </svg>
              </div>
              <div className="font-[family-name:var(--font-display)] text-4xl font-bold mb-2">
                12,405
              </div>
              <div className="w-full h-0.5 bg-monad-purple mb-2" />
              <div className="font-[family-name:var(--font-mono)] text-xs">
                <span className="text-white/40">STATUS: </span>
                <span className="text-terminal-green">ONLINE</span>
              </div>
            </PixelCard>

            <PixelCard>
              <div className="flex items-start justify-between mb-4">
                <span className="font-[family-name:var(--font-mono)] text-xs uppercase tracking-wider text-white/40">
                  Integrations
                </span>
                <svg className="w-5 h-5 text-monad-purple" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 5a1 1 0 011-1h14a1 1 0 011 1v2a1 1 0 01-1 1H5a1 1 0 01-1-1V5zM4 13a1 1 0 011-1h6a1 1 0 011 1v6a1 1 0 01-1 1H5a1 1 0 01-1-1v-6zM16 13a1 1 0 011-1h2a1 1 0 011 1v6a1 1 0 01-1 1h-2a1 1 0 01-1-1v-6z" />
                </svg>
              </div>
              <div className="font-[family-name:var(--font-display)] text-4xl font-bold mb-2">
                45+
              </div>
              <div className="w-full h-0.5 bg-monad-purple mb-2" />
              <div className="font-[family-name:var(--font-mono)] text-xs">
                <span className="text-white/40">DEPLOYMENT: </span>
                <span className="text-monad-purple">STABLE</span>
              </div>
            </PixelCard>
          </div>
        </div>
      </section>

      {/* Features Section */}
      <section className="border-t border-white/10 py-24 px-6">
        <div className="max-w-5xl mx-auto">
          <div className="grid lg:grid-cols-2 gap-16 items-start">
            {/* Left column - text */}
            <div>
              <h2 className="font-[family-name:var(--font-display)] text-3xl md:text-4xl font-bold uppercase tracking-tight mb-4">
                <span className="text-white">Protocol</span>
                <br />
                <span className="text-monad-purple">Capabilities</span>
              </h2>
              <p className="text-white/60 mb-8 font-[family-name:var(--font-body)]">
                MonadRefGraph provides infrastructure for high-velocity decentralized growth.
                Leverage trustless attribution and settlement at Monad speed.
              </p>
              <GlitchButton variant="secondary">
                Documentation
              </GlitchButton>
            </div>

            {/* Right column - feature cards */}
            <div className="space-y-4">
              <PixelCard hover>
                <div className="flex items-start gap-4">
                  <div className="w-10 h-10 bg-monad-gray flex items-center justify-center shrink-0">
                    <svg className="w-5 h-5 text-monad-purple" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13.828 10.172a4 4 0 00-5.656 0l-4 4a4 4 0 105.656 5.656l1.102-1.101m-.758-4.899a4 4 0 005.656 0l4-4a4 4 0 00-5.656-5.656l-1.1 1.1" />
                    </svg>
                  </div>
                  <div>
                    <h3 className="font-[family-name:var(--font-display)] text-lg font-bold uppercase tracking-tight mb-1">
                      On-Chain Attribution
                    </h3>
                    <p className="text-white/60 text-sm font-[family-name:var(--font-body)]">
                      Trustless affiliate tracking directly on the ledger. No off-chain black boxes, just pure verifiable data written to Monad state.
                    </p>
                  </div>
                </div>
              </PixelCard>

              <PixelCard hover>
                <div className="flex items-start gap-4">
                  <div className="w-10 h-10 bg-monad-gray flex items-center justify-center shrink-0">
                    <svg className="w-5 h-5 text-monad-purple" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8.684 13.342C8.886 12.938 9 12.482 9 12c0-.482-.114-.938-.316-1.342m0 2.684a3 3 0 110-2.684m0 2.684l6.632 3.316m-6.632-6l6.632-3.316m0 0a3 3 0 105.367-2.684 3 3 0 00-5.367 2.684zm0 9.316a3 3 0 105.368 2.684 3 3 0 00-5.368-2.684z" />
                    </svg>
                  </div>
                  <div>
                    <h3 className="font-[family-name:var(--font-display)] text-lg font-bold uppercase tracking-tight mb-1">
                      Social Graphing
                    </h3>
                    <p className="text-white/60 text-sm font-[family-name:var(--font-body)]">
                      Map relationships between wallets and influencers. Visualize the flow of value across the ecosystem with high-fidelity graph queries.
                    </p>
                  </div>
                </div>
              </PixelCard>

              <PixelCard hover>
                <div className="flex items-start gap-4">
                  <div className="w-10 h-10 bg-monad-gray flex items-center justify-center shrink-0">
                    <svg className="w-5 h-5 text-terminal-yellow" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 10V3L4 14h7v7l9-11h-7z" />
                    </svg>
                  </div>
                  <div>
                    <h3 className="font-[family-name:var(--font-display)] text-lg font-bold uppercase tracking-tight mb-1">
                      Real-Time Settlement
                    </h3>
                    <p className="text-white/60 text-sm font-[family-name:var(--font-body)]">
                      Instant payouts triggered by smart contracts. Sub-second finality ensures rewards land immediately in the hunter&apos;s wallet.
                    </p>
                  </div>
                </div>
              </PixelCard>
            </div>
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="border-t border-white/10 py-12 px-6">
        <div className="max-w-5xl mx-auto">
          <div className="flex flex-col md:flex-row items-start justify-between gap-8">
            <div>
              <div className="flex items-center gap-3 mb-4">
                <div className="w-6 h-6 bg-monad-purple flex items-center justify-center">
                  <span className="text-white font-bold text-xs">M</span>
                </div>
                <span className="font-[family-name:var(--font-display)] font-bold tracking-tight">
                  MONADREFGRAPH
                </span>
              </div>
              <p className="text-white/40 text-sm max-w-xs font-[family-name:var(--font-body)]">
                The hyper-performant layer for decentralized marketing and on-chain relationships.
              </p>
            </div>

            <div className="grid grid-cols-2 gap-12">
              <div>
                <h4 className="font-[family-name:var(--font-mono)] text-xs uppercase tracking-wider text-white/40 mb-4">
                  Platform
                </h4>
                <ul className="space-y-2">
                  <li><a href="#" className="text-white/60 hover:text-white text-sm transition-colors">Overview</a></li>
                  <li><a href="#" className="text-white/60 hover:text-white text-sm transition-colors">Technology</a></li>
                  <li><a href="#" className="text-white/60 hover:text-white text-sm transition-colors">Security</a></li>
                </ul>
              </div>
              <div>
                <h4 className="font-[family-name:var(--font-mono)] text-xs uppercase tracking-wider text-white/40 mb-4">
                  Connect
                </h4>
                <div className="flex gap-3">
                  <a href="#" className="w-8 h-8 border border-white/20 flex items-center justify-center hover:border-monad-purple transition-colors">
                    <svg className="w-4 h-4" fill="currentColor" viewBox="0 0 24 24">
                      <path d="M18.244 2.25h3.308l-7.227 8.26 8.502 11.24H16.17l-5.214-6.817L4.99 21.75H1.68l7.73-8.835L1.254 2.25H8.08l4.713 6.231zm-1.161 17.52h1.833L7.084 4.126H5.117z" />
                    </svg>
                  </a>
                  <a href="#" className="w-8 h-8 border border-white/20 flex items-center justify-center hover:border-monad-purple transition-colors">
                    <svg className="w-4 h-4" fill="currentColor" viewBox="0 0 24 24">
                      <path d="M20.317 4.3698a19.7913 19.7913 0 00-4.8851-1.5152.0741.0741 0 00-.0785.0371c-.211.3753-.4447.8648-.6083 1.2495-1.8447-.2762-3.68-.2762-5.4868 0-.1636-.3933-.4058-.8742-.6177-1.2495a.077.077 0 00-.0785-.037 19.7363 19.7363 0 00-4.8852 1.515.0699.0699 0 00-.0321.0277C.5334 9.0458-.319 13.5799.0992 18.0578a.0824.0824 0 00.0312.0561c2.0528 1.5076 4.0413 2.4228 5.9929 3.0294a.0777.0777 0 00.0842-.0276c.4616-.6304.8731-1.2952 1.226-1.9942a.076.076 0 00-.0416-.1057c-.6528-.2476-1.2743-.5495-1.8722-.8923a.077.077 0 01-.0076-.1277c.1258-.0943.2517-.1923.3718-.2914a.0743.0743 0 01.0776-.0105c3.9278 1.7933 8.18 1.7933 12.0614 0a.0739.0739 0 01.0785.0095c.1202.099.246.1981.3728.2924a.077.077 0 01-.0066.1276 12.2986 12.2986 0 01-1.873.8914.0766.0766 0 00-.0407.1067c.3604.698.7719 1.3628 1.225 1.9932a.076.076 0 00.0842.0286c1.961-.6067 3.9495-1.5219 6.0023-3.0294a.077.077 0 00.0313-.0552c.5004-5.177-.8382-9.6739-3.5485-13.6604a.061.061 0 00-.0312-.0286zM8.02 15.3312c-1.1825 0-2.1569-1.0857-2.1569-2.419 0-1.3332.9555-2.4189 2.157-2.4189 1.2108 0 2.1757 1.0952 2.1568 2.419 0 1.3332-.9555 2.4189-2.1569 2.4189zm7.9748 0c-1.1825 0-2.1569-1.0857-2.1569-2.419 0-1.3332.9554-2.4189 2.1569-2.4189 1.2108 0 2.1757 1.0952 2.1568 2.419 0 1.3332-.946 2.4189-2.1568 2.4189z" />
                    </svg>
                  </a>
                  <a href="#" className="w-8 h-8 border border-white/20 flex items-center justify-center hover:border-monad-purple transition-colors">
                    <svg className="w-4 h-4" fill="currentColor" viewBox="0 0 24 24">
                      <path fillRule="evenodd" d="M12 2C6.477 2 2 6.484 2 12.017c0 4.425 2.865 8.18 6.839 9.504.5.092.682-.217.682-.483 0-.237-.008-.868-.013-1.703-2.782.605-3.369-1.343-3.369-1.343-.454-1.158-1.11-1.466-1.11-1.466-.908-.62.069-.608.069-.608 1.003.07 1.531 1.032 1.531 1.032.892 1.53 2.341 1.088 2.91.832.092-.647.35-1.088.636-1.338-2.22-.253-4.555-1.113-4.555-4.951 0-1.093.39-1.988 1.029-2.688-.103-.253-.446-1.272.098-2.65 0 0 .84-.27 2.75 1.026A9.564 9.564 0 0112 6.844c.85.004 1.705.115 2.504.337 1.909-1.296 2.747-1.027 2.747-1.027.546 1.379.202 2.398.1 2.651.64.7 1.028 1.595 1.028 2.688 0 3.848-2.339 4.695-4.566 4.943.359.309.678.92.678 1.855 0 1.338-.012 2.419-.012 2.747 0 .268.18.58.688.482A10.019 10.019 0 0022 12.017C22 6.484 17.522 2 12 2z" clipRule="evenodd" />
                    </svg>
                  </a>
                </div>
              </div>
            </div>
          </div>

          <div className="mt-12 pt-8 border-t border-white/10 flex flex-col md:flex-row items-center justify-between gap-4">
            <span className="font-[family-name:var(--font-mono)] text-xs text-white/40">
              &copy; 2024 MONADREFGRAPH. // SYSTEM_ID: MRG-V2
            </span>
            <div className="flex gap-6">
              <a href="#" className="font-[family-name:var(--font-mono)] text-xs text-white/40 hover:text-white transition-colors">
                PRIVACY
              </a>
              <a href="#" className="font-[family-name:var(--font-mono)] text-xs text-white/40 hover:text-white transition-colors">
                TERMS
              </a>
            </div>
          </div>
        </div>
      </footer>
    </div>
  );
}
