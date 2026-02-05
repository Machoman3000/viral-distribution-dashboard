"use client";

import { IntegratedApp } from "@/lib/mockData";

interface AppSelectorProps {
  apps: IntegratedApp[];
  selectedAppId: string;
  onSelect: (appId: string) => void;
}

export default function AppSelector({
  apps,
  selectedAppId,
  onSelect,
}: AppSelectorProps) {
  return (
    <div className="relative">
      <label className="block font-[family-name:var(--font-mono)] text-xs uppercase tracking-wider text-white/40 mb-2">
        Select App
      </label>
      <select
        value={selectedAppId}
        onChange={(e) => onSelect(e.target.value)}
        className="w-full bg-monad-dark border border-white/20 px-4 py-3 font-[family-name:var(--font-mono)] text-sm text-white appearance-none cursor-pointer focus:outline-none focus:border-monad-purple focus:ring-1 focus:ring-monad-purple transition-colors"
        style={{
          backgroundImage: `url("data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' fill='none' viewBox='0 0 24 24' stroke='%23836EFB'%3E%3Cpath stroke-linecap='round' stroke-linejoin='round' stroke-width='2' d='M19 9l-7 7-7-7'%3E%3C/path%3E%3C/svg%3E")`,
          backgroundRepeat: "no-repeat",
          backgroundPosition: "right 12px center",
          backgroundSize: "16px",
        }}
      >
        {apps.map((app) => (
          <option key={app.id} value={app.id} className="bg-monad-dark">
            {app.logo} {app.name}
          </option>
        ))}
      </select>
    </div>
  );
}
