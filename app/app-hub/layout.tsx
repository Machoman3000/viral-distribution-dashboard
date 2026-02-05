"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { ReactNode } from "react";

interface NavLinkProps {
  href: string;
  exact?: boolean;
  children: ReactNode;
}

function NavLink({ href, exact = false, children }: NavLinkProps) {
  const pathname = usePathname();
  const isActive = exact ? pathname === href : pathname.startsWith(href);

  return (
    <Link
      href={href}
      className={`
        block px-4 py-2 font-[family-name:var(--font-mono)] text-sm uppercase tracking-wider transition-colors
        ${
          isActive
            ? "text-monad-purple bg-monad-purple/10 border-l-2 border-monad-purple"
            : "text-white/60 hover:text-white hover:bg-white/5 border-l-2 border-transparent"
        }
      `}
    >
      {children}
    </Link>
  );
}

export default function AppHubLayout({ children }: { children: ReactNode }) {
  return (
    <div className="flex min-h-[calc(100vh-4rem)]">
      {/* Sidebar */}
      <aside className="w-64 border-r border-white/10 bg-monad-dark/50" aria-label="App Hub sidebar">
        <div className="p-6">
          <h2 className="font-[family-name:var(--font-display)] text-xl font-bold uppercase tracking-tight mb-6">
            <span className="text-white">App</span>
            <span className="text-monad-purple">Hub</span>
          </h2>

          <nav className="space-y-1" aria-label="App Hub navigation">
            <NavLink href="/app-hub" exact>
              Overview
            </NavLink>
            <NavLink href="/app-hub/referrals">
              My Referrals
            </NavLink>
          </nav>
        </div>
      </aside>

      {/* Main content */}
      <div className="flex-1 p-8">{children}</div>
    </div>
  );
}
