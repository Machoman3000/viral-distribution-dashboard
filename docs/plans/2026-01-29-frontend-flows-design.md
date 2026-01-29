# Frontend Flows Design — MonadRefGraph

**Date:** 2026-01-29
**Status:** Validated
**Scope:** Frontend user journeys and page architecture

---

## Overview

MonadRefGraph is a revenue share infrastructure for Monad blockchain. Projects integrate it to distribute fees through referral networks. This document defines the three user journeys and frontend architecture.

---

## User Journeys

### 1. Project Onboarding

**Persona:** Project team setting up a referral program for their dApp

```
LANDING PAGE
  → Connect Wallet (authenticates project owner)
      ↓
STEP 1: REGISTER
  • App name
  • Description
  • Fee receiving address (protocol share destination)
  [Continue]
      ↓
STEP 2: CONFIGURE
  Distribution:
  • Total margin (10-50%)
  • Tier 0: User rebate
  • Tier 1: Hunter reward
  • Tier 2: Manager reward

  Revenue Share Limits:
  • Limit type: Time | Volume | Transactions
  • Limit value (e.g., 90 days, $100 fees, 50 txns)
  • After limit: Stop all | Stop rebate only | Reduce 50%

  [Save Configuration]
      ↓
STEP 3: INTEGRATE
  • Contract address to call
  • Code snippets for integration
  • "Your referral program is live"
```

**Current state:** Pages exist with mock data. Needs real wallet connection, on-chain registration, revenue share limits UI.

---

### 2. End User Experience

**Persona:** Someone using a dApp via referral link, getting fee discounts

```
ENTRY: Referral Link
  https://projectdapp.xyz/?ref=hunter123
  → Stores referrer in cookie/localStorage
  → User lands on project's normal dApp
      ↓
PROJECT'S dAPP (project's responsibility)
  • Shows "You're saving X% on fees" badge (optional)
  • Calls RevenueShare.distribute() on fee events
  • User may not even know referral system exists
      ↓
MONAD APP HUB (app.monad.xyz/app-hub) — Optional
  User connects wallet and sees:

  ┌─────────────────────────────────────────────┐
  │ Your Referral Status                        │
  │                                             │
  │ Apps you're using:                          │
  │ • MonadSwap — Saving 10% on fees (62d left) │
  │ • NFTMint — Saving 5% (limit reached)       │
  │                                             │
  │ Total saved: $42.50                         │
  │                                             │
  │ [Become a Hunter →] Get your own links      │
  └─────────────────────────────────────────────┘
```

**Key insight:** User experience is mostly invisible — they just get cheaper fees. App Hub is optional for power users.

---

### 3. Hunter/Affiliate Dashboard

**Persona:** Anyone earning by referring others

**Role emergence:** One link type. Manager status appears automatically when your referrals start referring others.

```
Alice shares link → Bob joins → Bob shares link → Carol joins

Result:
• Carol's Hunter = Bob (earns Tier 1)
• Carol's Manager = Alice (earns Tier 2)
```

**Hunter Dashboard (app.monad.xyz/app-hub/referrals):**

```
┌─────────────────────────────────────────────────┐
│ Your Referral Links (auto-generated per project)│
│                                                 │
│ MonadSwap                                       │
│ https://monadswap.xyz/?ref=0xABC...123  [Copy]  │
│                                                 │
│ NFTMint                                         │
│ https://nftmint.xyz/?ref=0xABC...123    [Copy]  │
└─────────────────────────────────────────────────┘

┌─────────────────────────────────────────────────┐
│ Your Network                                    │
│                                                 │
│ Direct referrals (you're Hunter): 12 users      │
│ Their referrals (you're Manager): 47 users      │
│                                                 │
│ ├─ @bob_trader (8 referrals)                    │
│ ├─ @alice_degen (23 referrals)                  │
│ └─ @chad_whale (16 referrals)                   │
└─────────────────────────────────────────────────┘

┌─────────────────────────────────────────────────┐
│ Earnings                                        │
│                                                 │
│ As Hunter (Tier 1):  $234.50                    │
│ As Manager (Tier 2): $89.20                     │
│ ─────────────────────                           │
│ Claimable:           $323.70   [Claim]          │
└─────────────────────────────────────────────────┘
```

---

## Page Architecture

```
app/
├── (existing — needs updates)
│   ├── register/page.tsx      Add real wallet connection
│   ├── configure/page.tsx     Add revenue share limits UI
│   └── integrate/page.tsx     Add real contract addresses
│
└── app-hub/                   ← NEW SECTION
    ├── page.tsx               Dashboard overview
    ├── referrals/
    │   └── page.tsx           Hunter dashboard
    └── components/
        ├── ReferralLinks.tsx  Auto-generated links per project
        ├── NetworkTree.tsx    Visual referral hierarchy
        ├── EarningsCard.tsx   Claimable balance + claim button
        └── UserStatus.tsx     Rebates widget for end users
```

---

## Data Requirements

```typescript
// Project configuration (from ProjectRegistry contract)
interface Project {
  id: string;
  name: string;
  owner: address;
  feeAddress: address;
  config: {
    totalMargin: number;
    tier0Rebate: number;
    tier1Hunter: number;
    tier2Manager: number;
    limitType: 'time' | 'volume' | 'transactions';
    limitValue: number;
    afterLimitBehavior: 'stop' | 'reduceRebate' | 'reduce50';
  };
}

// User referral data (from ReferralNetwork + RevenueShare contracts)
interface UserReferralData {
  referrer: address | null;
  directReferrals: address[];
  indirectReferrals: address[];
  earnings: {
    asHunter: bigint;
    asManager: bigint;
    claimable: bigint;
  };
  rebatesSaved: bigint;
}
```

---

## Smart Contracts (High-Level)

| Contract | Purpose |
|----------|---------|
| `ProjectRegistry.sol` | Project registration and payout configuration |
| `ReferralNetwork.sol` | User relationships (who referred whom) |
| `RevenueShare.sol` | Fee distribution and claimable balances |

Detailed contract design to follow in separate document.

---

## Open Questions

1. **Telegram integration:** Currently just stored as contact info. Future: notifications?
2. **App Hub hosting:** Is this part of app.monad.xyz or separate deployment?
3. **Multi-chain:** Monad only for now, but architecture should allow expansion?

---

## Next Steps

1. Update existing pages with real wallet connection (wagmi/viem)
2. Add revenue share limits UI to Configure page
3. Build App Hub section (new pages)
4. Design and deploy smart contracts
5. Connect frontend to contracts
