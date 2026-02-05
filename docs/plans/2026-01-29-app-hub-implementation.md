# App Hub Implementation Plan

> **For Claude:** REQUIRED SUB-SKILL: Use superpowers:executing-plans to implement this plan task-by-task.

**Goal:** Build the App Hub section with Hunter dashboard, referral links, network visualization, and earnings/claim functionality.

**Architecture:** New `/app-hub` route group with shared layout. Components read from mock data initially (same pattern as existing pages), ready to swap for contract reads later. Reuse existing design system (PixelCard, GlitchButton, terminal aesthetic).

**Tech Stack:** Next.js 16, React 19, Tailwind CSS 4, existing component library

---

## Task 1: App Hub Layout and Navigation

**Files:**
- Create: `app/app-hub/layout.tsx`
- Create: `app/app-hub/page.tsx`
- Modify: `components/Header.tsx` — add App Hub nav link

**Step 1: Create App Hub layout with sidebar navigation**

```tsx
// app/app-hub/layout.tsx
import Link from "next/link";
import { usePathname } from "next/navigation";

export default function AppHubLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <div className="min-h-[calc(100vh-4rem)] flex">
      {/* Sidebar */}
      <aside className="w-64 border-r border-white/10 p-6">
        <h2 className="font-[family-name:var(--font-display)] text-lg font-bold uppercase tracking-tight mb-6">
          App Hub
        </h2>
        <nav className="space-y-2">
          <NavLink href="/app-hub" exact>Overview</NavLink>
          <NavLink href="/app-hub/referrals">My Referrals</NavLink>
        </nav>
      </aside>

      {/* Main content */}
      <main className="flex-1 p-8">
        {children}
      </main>
    </div>
  );
}

function NavLink({
  href,
  children,
  exact = false
}: {
  href: string;
  children: React.ReactNode;
  exact?: boolean;
}) {
  // Note: usePathname requires "use client" - will add in step 3
  return (
    <Link
      href={href}
      className="block px-4 py-2 font-[family-name:var(--font-mono)] text-sm text-white/60 hover:text-white hover:bg-white/5 transition-colors"
    >
      {children}
    </Link>
  );
}
```

**Step 2: Create App Hub overview page**

```tsx
// app/app-hub/page.tsx
import PixelCard from "@/components/PixelCard";

export default function AppHubPage() {
  return (
    <div>
      <div className="mb-8">
        <h1 className="font-[family-name:var(--font-display)] text-3xl font-bold uppercase tracking-tight mb-2">
          Welcome to App Hub
        </h1>
        <p className="text-white/60 font-[family-name:var(--font-body)]">
          Track your referrals, earnings, and fee savings across all integrated projects.
        </p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        <PixelCard>
          <div className="text-center">
            <span className="font-[family-name:var(--font-mono)] text-3xl font-bold text-terminal-green">
              $0.00
            </span>
            <p className="text-white/40 text-sm mt-2">Total Saved</p>
          </div>
        </PixelCard>

        <PixelCard>
          <div className="text-center">
            <span className="font-[family-name:var(--font-mono)] text-3xl font-bold text-monad-purple">
              $0.00
            </span>
            <p className="text-white/40 text-sm mt-2">Total Earned</p>
          </div>
        </PixelCard>

        <PixelCard>
          <div className="text-center">
            <span className="font-[family-name:var(--font-mono)] text-3xl font-bold text-terminal-yellow">
              0
            </span>
            <p className="text-white/40 text-sm mt-2">Referrals</p>
          </div>
        </PixelCard>
      </div>
    </div>
  );
}
```

**Step 3: Make layout client component for usePathname**

Add `"use client";` to layout and implement active state:

```tsx
// app/app-hub/layout.tsx (updated)
"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";

// ... rest of component

function NavLink({
  href,
  children,
  exact = false
}: {
  href: string;
  children: React.ReactNode;
  exact?: boolean;
}) {
  const pathname = usePathname();
  const isActive = exact ? pathname === href : pathname.startsWith(href);

  return (
    <Link
      href={href}
      className={`block px-4 py-2 font-[family-name:var(--font-mono)] text-sm transition-colors ${
        isActive
          ? "text-monad-purple bg-monad-purple/10 border-l-2 border-monad-purple"
          : "text-white/60 hover:text-white hover:bg-white/5"
      }`}
    >
      {children}
    </Link>
  );
}
```

**Step 4: Add App Hub link to Header**

Modify `components/Header.tsx` to add navigation link.

**Step 5: Verify pages render**

Run: `npm run dev`
Visit: `http://localhost:3000/app-hub`
Expected: See overview page with sidebar navigation

**Step 6: Commit**

```bash
git add app/app-hub components/Header.tsx
git commit -m "feat: Add App Hub layout and overview page"
```

---

## Task 2: Referral Links Component

**Files:**
- Create: `app/app-hub/referrals/page.tsx`
- Create: `components/app-hub/ReferralLinks.tsx`
- Create: `lib/mock-data.ts` — mock data for development

**Step 1: Create mock data file**

```tsx
// lib/mock-data.ts
export interface Project {
  id: string;
  name: string;
  baseUrl: string;
}

export interface UserReferralData {
  walletAddress: string;
  directReferrals: string[];
  indirectReferrals: string[];
  earnings: {
    asHunter: number;
    asManager: number;
    claimable: number;
  };
  rebatesSaved: number;
}

export const mockProjects: Project[] = [
  { id: "monadswap", name: "MonadSwap", baseUrl: "https://monadswap.xyz" },
  { id: "nftmint", name: "NFTMint", baseUrl: "https://nftmint.xyz" },
  { id: "monadlend", name: "MonadLend", baseUrl: "https://monadlend.xyz" },
];

export const mockUserData: UserReferralData = {
  walletAddress: "0x1234...abcd",
  directReferrals: ["0xaaa...111", "0xbbb...222", "0xccc...333"],
  indirectReferrals: ["0xddd...444", "0xeee...555"],
  earnings: {
    asHunter: 234.50,
    asManager: 89.20,
    claimable: 323.70,
  },
  rebatesSaved: 42.50,
};
```

**Step 2: Create ReferralLinks component**

```tsx
// components/app-hub/ReferralLinks.tsx
"use client";

import { useState } from "react";
import PixelCard from "@/components/PixelCard";
import { Project } from "@/lib/mock-data";

interface ReferralLinksProps {
  projects: Project[];
  walletAddress: string;
}

export default function ReferralLinks({ projects, walletAddress }: ReferralLinksProps) {
  const [copiedId, setCopiedId] = useState<string | null>(null);

  const generateRefLink = (project: Project) => {
    const shortAddress = walletAddress.slice(0, 10);
    return `${project.baseUrl}/?ref=${shortAddress}`;
  };

  const copyToClipboard = async (projectId: string, link: string) => {
    await navigator.clipboard.writeText(link);
    setCopiedId(projectId);
    setTimeout(() => setCopiedId(null), 2000);
  };

  return (
    <PixelCard>
      <h3 className="font-[family-name:var(--font-display)] text-lg font-bold uppercase tracking-tight mb-4">
        Your Referral Links
      </h3>
      <p className="text-white/40 text-sm mb-6 font-[family-name:var(--font-body)]">
        Share these links to earn rewards when users trade on these platforms.
      </p>

      <div className="space-y-4">
        {projects.map((project) => {
          const link = generateRefLink(project);
          const isCopied = copiedId === project.id;

          return (
            <div
              key={project.id}
              className="flex items-center justify-between p-4 bg-monad-black border border-white/10"
            >
              <div>
                <span className="font-[family-name:var(--font-display)] font-bold">
                  {project.name}
                </span>
                <p className="font-[family-name:var(--font-mono)] text-xs text-white/40 mt-1 truncate max-w-[300px]">
                  {link}
                </p>
              </div>
              <button
                onClick={() => copyToClipboard(project.id, link)}
                className={`px-4 py-2 font-[family-name:var(--font-mono)] text-xs uppercase tracking-wider transition-colors ${
                  isCopied
                    ? "bg-terminal-green text-black"
                    : "bg-monad-gray text-white hover:bg-monad-purple"
                }`}
              >
                {isCopied ? "Copied!" : "Copy"}
              </button>
            </div>
          );
        })}
      </div>
    </PixelCard>
  );
}
```

**Step 3: Create referrals page**

```tsx
// app/app-hub/referrals/page.tsx
import ReferralLinks from "@/components/app-hub/ReferralLinks";
import { mockProjects, mockUserData } from "@/lib/mock-data";

export default function ReferralsPage() {
  return (
    <div>
      <div className="mb-8">
        <h1 className="font-[family-name:var(--font-display)] text-3xl font-bold uppercase tracking-tight mb-2">
          My Referrals
        </h1>
        <p className="text-white/60 font-[family-name:var(--font-body)]">
          Manage your referral links and track your network.
        </p>
      </div>

      <div className="space-y-8">
        <ReferralLinks
          projects={mockProjects}
          walletAddress={mockUserData.walletAddress}
        />
      </div>
    </div>
  );
}
```

**Step 4: Verify component renders**

Run: `npm run dev`
Visit: `http://localhost:3000/app-hub/referrals`
Expected: See referral links with copy buttons

**Step 5: Commit**

```bash
git add app/app-hub/referrals components/app-hub lib/mock-data.ts
git commit -m "feat: Add ReferralLinks component with copy functionality"
```

---

## Task 3: Network Tree Component

**Files:**
- Create: `components/app-hub/NetworkTree.tsx`
- Modify: `app/app-hub/referrals/page.tsx` — add NetworkTree

**Step 1: Create NetworkTree component**

```tsx
// components/app-hub/NetworkTree.tsx
import PixelCard from "@/components/PixelCard";

interface NetworkTreeProps {
  directReferrals: string[];
  indirectReferrals: string[];
}

export default function NetworkTree({ directReferrals, indirectReferrals }: NetworkTreeProps) {
  const truncateAddress = (addr: string) =>
    `${addr.slice(0, 6)}...${addr.slice(-4)}`;

  return (
    <PixelCard>
      <h3 className="font-[family-name:var(--font-display)] text-lg font-bold uppercase tracking-tight mb-4">
        Your Network
      </h3>

      <div className="grid grid-cols-2 gap-8">
        {/* Direct Referrals (Hunter) */}
        <div>
          <div className="flex items-center gap-2 mb-4">
            <div className="w-3 h-3 bg-monad-purple" />
            <span className="font-[family-name:var(--font-mono)] text-sm text-white/60">
              Direct Referrals (You&apos;re Hunter)
            </span>
          </div>
          <div className="font-[family-name:var(--font-mono)] text-2xl font-bold text-monad-purple mb-4">
            {directReferrals.length}
          </div>
          <div className="space-y-2">
            {directReferrals.slice(0, 5).map((addr) => (
              <div
                key={addr}
                className="px-3 py-2 bg-monad-black border border-white/10 text-xs text-white/60"
              >
                {truncateAddress(addr)}
              </div>
            ))}
            {directReferrals.length > 5 && (
              <div className="text-xs text-white/40">
                +{directReferrals.length - 5} more
              </div>
            )}
          </div>
        </div>

        {/* Indirect Referrals (Manager) */}
        <div>
          <div className="flex items-center gap-2 mb-4">
            <div className="w-3 h-3 bg-terminal-yellow" />
            <span className="font-[family-name:var(--font-mono)] text-sm text-white/60">
              Their Referrals (You&apos;re Manager)
            </span>
          </div>
          <div className="font-[family-name:var(--font-mono)] text-2xl font-bold text-terminal-yellow mb-4">
            {indirectReferrals.length}
          </div>
          <div className="space-y-2">
            {indirectReferrals.slice(0, 5).map((addr) => (
              <div
                key={addr}
                className="px-3 py-2 bg-monad-black border border-white/10 text-xs text-white/60"
              >
                {truncateAddress(addr)}
              </div>
            ))}
            {indirectReferrals.length > 5 && (
              <div className="text-xs text-white/40">
                +{indirectReferrals.length - 5} more
              </div>
            )}
          </div>
        </div>
      </div>
    </PixelCard>
  );
}
```

**Step 2: Add NetworkTree to referrals page**

```tsx
// app/app-hub/referrals/page.tsx (updated)
import ReferralLinks from "@/components/app-hub/ReferralLinks";
import NetworkTree from "@/components/app-hub/NetworkTree";
import { mockProjects, mockUserData } from "@/lib/mock-data";

export default function ReferralsPage() {
  return (
    <div>
      <div className="mb-8">
        <h1 className="font-[family-name:var(--font-display)] text-3xl font-bold uppercase tracking-tight mb-2">
          My Referrals
        </h1>
        <p className="text-white/60 font-[family-name:var(--font-body)]">
          Manage your referral links and track your network.
        </p>
      </div>

      <div className="space-y-8">
        <ReferralLinks
          projects={mockProjects}
          walletAddress={mockUserData.walletAddress}
        />

        <NetworkTree
          directReferrals={mockUserData.directReferrals}
          indirectReferrals={mockUserData.indirectReferrals}
        />
      </div>
    </div>
  );
}
```

**Step 3: Verify component renders**

Run: `npm run dev`
Visit: `http://localhost:3000/app-hub/referrals`
Expected: See network tree with direct and indirect referrals

**Step 4: Commit**

```bash
git add components/app-hub/NetworkTree.tsx app/app-hub/referrals/page.tsx
git commit -m "feat: Add NetworkTree component showing referral hierarchy"
```

---

## Task 4: Earnings Card with Claim Button

**Files:**
- Create: `components/app-hub/EarningsCard.tsx`
- Modify: `app/app-hub/referrals/page.tsx` — add EarningsCard

**Step 1: Create EarningsCard component**

```tsx
// components/app-hub/EarningsCard.tsx
"use client";

import { useState } from "react";
import PixelCard from "@/components/PixelCard";
import GlitchButton from "@/components/GlitchButton";

interface EarningsCardProps {
  asHunter: number;
  asManager: number;
  claimable: number;
}

export default function EarningsCard({ asHunter, asManager, claimable }: EarningsCardProps) {
  const [isClaiming, setIsClaiming] = useState(false);

  const handleClaim = async () => {
    setIsClaiming(true);
    // Mock claim - will be replaced with contract call
    await new Promise((resolve) => setTimeout(resolve, 2000));
    setIsClaiming(false);
    alert("Claim submitted! (Mock - will connect to contract)");
  };

  const formatUSD = (amount: number) =>
    `$${amount.toLocaleString("en-US", { minimumFractionDigits: 2, maximumFractionDigits: 2 })}`;

  return (
    <PixelCard>
      <h3 className="font-[family-name:var(--font-display)] text-lg font-bold uppercase tracking-tight mb-6">
        Earnings
      </h3>

      <div className="space-y-4 mb-6">
        <div className="flex items-center justify-between py-3 border-b border-white/10">
          <div className="flex items-center gap-3">
            <div className="w-3 h-3 bg-monad-purple" />
            <span className="font-[family-name:var(--font-body)] text-white/60">
              As Hunter (Tier 1)
            </span>
          </div>
          <span className="font-[family-name:var(--font-mono)] text-lg font-bold">
            {formatUSD(asHunter)}
          </span>
        </div>

        <div className="flex items-center justify-between py-3 border-b border-white/10">
          <div className="flex items-center gap-3">
            <div className="w-3 h-3 bg-terminal-yellow" />
            <span className="font-[family-name:var(--font-body)] text-white/60">
              As Manager (Tier 2)
            </span>
          </div>
          <span className="font-[family-name:var(--font-mono)] text-lg font-bold">
            {formatUSD(asManager)}
          </span>
        </div>

        <div className="flex items-center justify-between py-3">
          <span className="font-[family-name:var(--font-display)] font-bold uppercase">
            Claimable
          </span>
          <span className="font-[family-name:var(--font-mono)] text-2xl font-bold text-terminal-green">
            {formatUSD(claimable)}
          </span>
        </div>
      </div>

      <GlitchButton
        onClick={handleClaim}
        disabled={claimable === 0 || isClaiming}
        className={`w-full ${claimable === 0 ? "opacity-50 cursor-not-allowed" : ""}`}
      >
        {isClaiming ? "Claiming..." : "Claim Rewards"}
      </GlitchButton>

      {claimable === 0 && (
        <p className="text-center text-white/40 text-xs mt-4 font-[family-name:var(--font-mono)]">
          No rewards to claim yet
        </p>
      )}
    </PixelCard>
  );
}
```

**Step 2: Add EarningsCard to referrals page**

```tsx
// app/app-hub/referrals/page.tsx (final version)
import ReferralLinks from "@/components/app-hub/ReferralLinks";
import NetworkTree from "@/components/app-hub/NetworkTree";
import EarningsCard from "@/components/app-hub/EarningsCard";
import { mockProjects, mockUserData } from "@/lib/mock-data";

export default function ReferralsPage() {
  return (
    <div>
      <div className="mb-8">
        <h1 className="font-[family-name:var(--font-display)] text-3xl font-bold uppercase tracking-tight mb-2">
          My Referrals
        </h1>
        <p className="text-white/60 font-[family-name:var(--font-body)]">
          Manage your referral links and track your network.
        </p>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        {/* Left column - Links and Network */}
        <div className="lg:col-span-2 space-y-8">
          <ReferralLinks
            projects={mockProjects}
            walletAddress={mockUserData.walletAddress}
          />

          <NetworkTree
            directReferrals={mockUserData.directReferrals}
            indirectReferrals={mockUserData.indirectReferrals}
          />
        </div>

        {/* Right column - Earnings */}
        <div>
          <EarningsCard
            asHunter={mockUserData.earnings.asHunter}
            asManager={mockUserData.earnings.asManager}
            claimable={mockUserData.earnings.claimable}
          />
        </div>
      </div>
    </div>
  );
}
```

**Step 3: Verify component renders**

Run: `npm run dev`
Visit: `http://localhost:3000/app-hub/referrals`
Expected: See earnings card with claim button on right side

**Step 4: Commit**

```bash
git add components/app-hub/EarningsCard.tsx app/app-hub/referrals/page.tsx
git commit -m "feat: Add EarningsCard component with claim functionality"
```

---

## Task 5: Update Configure Page with Revenue Share Limits

**Files:**
- Modify: `app/configure/page.tsx` — add limits UI
- Modify: `contexts/AppContext.tsx` — add limit config to state

**Step 1: Update AppContext with limit types**

```tsx
// contexts/AppContext.tsx - add to PayoutConfig interface
interface PayoutConfig {
  totalMargin: number;
  tier0Rebate: number;
  tier1Hunter: number;
  tier2Manager: number;
  // NEW: Revenue share limits
  limitType: 'time' | 'volume' | 'transactions';
  limitValue: number;
  afterLimitBehavior: 'stop' | 'reduceRebate' | 'reduce50';
}

// Update defaultPayoutConfig
const defaultPayoutConfig: PayoutConfig = {
  totalMargin: 25,
  tier0Rebate: 10,
  tier1Hunter: 10,
  tier2Manager: 5,
  limitType: 'time',
  limitValue: 90,
  afterLimitBehavior: 'stop',
};
```

**Step 2: Add limits UI section to configure page**

Add after the tier sliders section in `app/configure/page.tsx`:

```tsx
{/* Revenue Share Limits - NEW SECTION */}
<PixelCard className="mb-8">
  <h3 className="font-[family-name:var(--font-display)] text-lg font-bold uppercase tracking-tight mb-4">
    Revenue Share Limits
  </h3>
  <p className="text-white/40 text-sm mb-6 font-[family-name:var(--font-body)]">
    Define when revenue sharing ends for each user.
  </p>

  <div className="space-y-6">
    {/* Limit Type */}
    <div>
      <label className="block font-[family-name:var(--font-mono)] text-xs uppercase tracking-wider text-white/60 mb-2">
        Limit Type
      </label>
      <div className="flex gap-2">
        {(['time', 'volume', 'transactions'] as const).map((type) => (
          <button
            key={type}
            onClick={() => setPayoutConfig({ ...payoutConfig, limitType: type })}
            className={`px-4 py-2 font-[family-name:var(--font-mono)] text-sm uppercase ${
              payoutConfig.limitType === type
                ? 'bg-monad-purple text-white'
                : 'bg-monad-gray text-white/60 hover:text-white'
            }`}
          >
            {type}
          </button>
        ))}
      </div>
    </div>

    {/* Limit Value */}
    <div>
      <label className="block font-[family-name:var(--font-mono)] text-xs uppercase tracking-wider text-white/60 mb-2">
        {payoutConfig.limitType === 'time' && 'Days after user joins'}
        {payoutConfig.limitType === 'volume' && 'Fee volume (USD)'}
        {payoutConfig.limitType === 'transactions' && 'Number of transactions'}
      </label>
      <input
        type="number"
        value={payoutConfig.limitValue}
        onChange={(e) => setPayoutConfig({ ...payoutConfig, limitValue: parseInt(e.target.value) || 0 })}
        className="w-full px-4 py-3 font-[family-name:var(--font-mono)] text-base"
        min={1}
      />
    </div>

    {/* After Limit Behavior */}
    <div>
      <label className="block font-[family-name:var(--font-mono)] text-xs uppercase tracking-wider text-white/60 mb-2">
        After Limit Reached
      </label>
      <select
        value={payoutConfig.afterLimitBehavior}
        onChange={(e) => setPayoutConfig({
          ...payoutConfig,
          afterLimitBehavior: e.target.value as 'stop' | 'reduceRebate' | 'reduce50'
        })}
        className="w-full px-4 py-3 font-[family-name:var(--font-mono)] text-base cursor-pointer"
      >
        <option value="stop">Stop all sharing</option>
        <option value="reduceRebate">Stop user rebate only</option>
        <option value="reduce50">Reduce all rates by 50%</option>
      </select>
    </div>
  </div>
</PixelCard>
```

**Step 3: Verify page renders with new section**

Run: `npm run dev`
Visit: `http://localhost:3000/configure`
Expected: See new "Revenue Share Limits" section

**Step 4: Commit**

```bash
git add contexts/AppContext.tsx app/configure/page.tsx
git commit -m "feat: Add revenue share limits configuration"
```

---

## Task 6: Final Build Verification and Cleanup

**Step 1: Run lint**

```bash
npm run lint
```

Fix any errors.

**Step 2: Run build**

```bash
npm run build
```

Expected: Build succeeds with new routes:
- `/app-hub`
- `/app-hub/referrals`

**Step 3: Manual testing checklist**

- [ ] Landing page links to App Hub
- [ ] App Hub overview shows stats cards
- [ ] Referrals page shows links, network, earnings
- [ ] Copy button works on referral links
- [ ] Claim button shows loading state
- [ ] Configure page has revenue share limits
- [ ] All pages maintain retro terminal aesthetic

**Step 4: Final commit**

```bash
git add .
git commit -m "chore: Final cleanup and build verification"
```

**Step 5: Push feature branch**

```bash
git push -u origin feature/app-hub
```

---

## Summary

| Task | Component | Estimated Steps |
|------|-----------|-----------------|
| 1 | App Hub Layout | 6 steps |
| 2 | ReferralLinks | 5 steps |
| 3 | NetworkTree | 4 steps |
| 4 | EarningsCard | 4 steps |
| 5 | Revenue Share Limits | 4 steps |
| 6 | Build Verification | 5 steps |

**Total:** ~28 bite-sized steps

---

## Execution

After saving this plan, choose execution approach:

1. **Subagent-Driven (this session)** — Fresh subagent per task, review between tasks
2. **Parallel Session** — Open new session in worktree with executing-plans skill
