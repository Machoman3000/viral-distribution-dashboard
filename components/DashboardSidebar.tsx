"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { useDashboard } from "@/contexts/DashboardContext";

interface NavItem {
  href: string;
  label: string;
  icon: string;
  hostOnly?: boolean;
}

const navItems: NavItem[] = [
  { href: "/dashboard", label: "Overview", icon: "◈" },
  { href: "/dashboard/links", label: "Links", icon: "⛓" },
  { href: "/dashboard/network", label: "Network", icon: "◎" },
  { href: "/dashboard/earnings", label: "Earnings", icon: "◆" },
  { href: "/dashboard/program", label: "Program", icon: "▣", hostOnly: true },
];

export default function DashboardSidebar() {
  const pathname = usePathname();
  const { isHost } = useDashboard();

  const filteredNavItems = navItems.filter(
    (item) => !item.hostOnly || (item.hostOnly && isHost)
  );

  return (
    <aside className="w-48 flex-shrink-0 border-r border-white/10 bg-monad-dark/50">
      <nav className="py-6 px-4">
        <div className="mb-6">
          <span className="font-[family-name:var(--font-mono)] text-xs uppercase tracking-wider text-white/40">
            Dashboard
          </span>
        </div>
        <ul className="space-y-1">
          {filteredNavItems.map((item) => {
            const isActive =
              item.href === "/dashboard"
                ? pathname === "/dashboard"
                : pathname.startsWith(item.href);

            return (
              <li key={item.href}>
                <Link
                  href={item.href}
                  className={`
                    flex items-center gap-3 px-3 py-2 text-sm font-[family-name:var(--font-mono)] uppercase tracking-wider transition-colors
                    ${
                      isActive
                        ? "text-monad-purple bg-monad-purple/10 border-l-2 border-monad-purple -ml-px"
                        : "text-white/60 hover:text-white hover:bg-white/5"
                    }
                  `}
                >
                  <span className="text-base">{item.icon}</span>
                  <span>{item.label}</span>
                  {isActive && (
                    <span className="ml-auto w-1.5 h-1.5 bg-monad-purple status-pulse" />
                  )}
                </Link>
              </li>
            );
          })}
        </ul>
      </nav>
    </aside>
  );
}
