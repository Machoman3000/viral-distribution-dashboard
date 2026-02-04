// Mock data for the Referral Dashboard (Phase 1)
// This will be replaced with real contract data in Phase 2

export interface IntegratedApp {
  id: string;
  name: string;
  logo: string; // Emoji or URL for now
  url: string;
  totalVolume: number;
  userCount: number;
}

export interface NetworkNode {
  address: string;
  alias?: string;
  status: "active" | "dormant" | "new";
  joinedAt: Date;
  totalVolume: number;
  tier: "user" | "hunter" | "manager";
  children: NetworkNode[];
}

export interface EarningEntry {
  id: string;
  timestamp: Date;
  appId: string;
  appName: string;
  amount: number;
  tier: 0 | 1 | 2;
  fromAddress: string;
}

export interface VaultBalance {
  stakedMON: number;
  apy: number;
  rewardsAccrued: number;
}

export interface ReferralLinkStats {
  appId: string;
  clicks: number;
  conversions: number;
  revenue: number;
}

export interface TopReferrer {
  rank: number;
  address: string;
  alias?: string;
  usersReferred: number;
  volumeGenerated: number;
}

export interface HostProgramStats {
  usersAcquired: number;
  volumeGenerated: number;
  feesPaid: number;
}

// Integrated apps that can be referred
export const MOCK_APPS: IntegratedApp[] = [
  {
    id: "hyperliquid",
    name: "Hyperliquid",
    logo: "📊",
    url: "https://hyperliquid.xyz",
    totalVolume: 2500000,
    userCount: 1250,
  },
  {
    id: "ambient",
    name: "Ambient Finance",
    logo: "💧",
    url: "https://ambient.finance",
    totalVolume: 890000,
    userCount: 430,
  },
  {
    id: "kuru",
    name: "Kuru",
    logo: "🔄",
    url: "https://kuru.io",
    totalVolume: 456000,
    userCount: 320,
  },
  {
    id: "monadex",
    name: "MonadEx",
    logo: "⚡",
    url: "https://monadex.io",
    totalVolume: 1200000,
    userCount: 680,
  },
];

// Mock network tree for the current user
export const MOCK_NETWORK: NetworkNode = {
  address: "YOU",
  status: "active",
  joinedAt: new Date("2025-12-01"),
  totalVolume: 45000,
  tier: "manager",
  children: [
    {
      address: "0x1a2b3c4d5e6f7890abcd1234567890abcdef1234",
      alias: "Alice",
      status: "active",
      joinedAt: new Date("2026-01-05"),
      totalVolume: 12500,
      tier: "hunter",
      children: [
        {
          address: "0xaaaa1111222233334444555566667777aaaa1111",
          alias: "Dan",
          status: "active",
          joinedAt: new Date("2026-01-20"),
          totalVolume: 3200,
          tier: "user",
          children: [],
        },
        {
          address: "0xbbbb2222333344445555666677778888bbbb2222",
          alias: "Eve",
          status: "active",
          joinedAt: new Date("2026-01-22"),
          totalVolume: 2800,
          tier: "user",
          children: [],
        },
      ],
    },
    {
      address: "0x2b3c4d5e6f7890abcd1234567890abcdef123456",
      alias: "Bob",
      status: "dormant",
      joinedAt: new Date("2026-01-08"),
      totalVolume: 8200,
      tier: "hunter",
      children: [
        {
          address: "0xcccc3333444455556666777788889999cccc3333",
          alias: "Frank",
          status: "new",
          joinedAt: new Date("2026-02-01"),
          totalVolume: 0,
          tier: "user",
          children: [],
        },
      ],
    },
    {
      address: "0x3c4d5e6f7890abcd1234567890abcdef12345678",
      alias: "Carol",
      status: "new",
      joinedAt: new Date("2026-02-02"),
      totalVolume: 0,
      tier: "user",
      children: [],
    },
    {
      address: "0x4d5e6f7890abcd1234567890abcdef1234567890",
      status: "active",
      joinedAt: new Date("2026-01-15"),
      totalVolume: 5600,
      tier: "user",
      children: [],
    },
    {
      address: "0x5e6f7890abcd1234567890abcdef12345678901a",
      alias: "Grace",
      status: "active",
      joinedAt: new Date("2026-01-18"),
      totalVolume: 4100,
      tier: "user",
      children: [],
    },
  ],
};

// Mock earnings history
export const MOCK_EARNINGS: EarningEntry[] = [
  {
    id: "e1",
    timestamp: new Date("2026-02-04T10:30:00"),
    appId: "hyperliquid",
    appName: "Hyperliquid",
    amount: 2.5,
    tier: 1,
    fromAddress: "0x1a2b3c...1234",
  },
  {
    id: "e2",
    timestamp: new Date("2026-02-04T09:15:00"),
    appId: "ambient",
    appName: "Ambient",
    amount: 1.2,
    tier: 1,
    fromAddress: "0x2b3c4d...5678",
  },
  {
    id: "e3",
    timestamp: new Date("2026-02-03T22:45:00"),
    appId: "kuru",
    appName: "Kuru",
    amount: 0.8,
    tier: 2,
    fromAddress: "0xaaaa11...1111",
  },
  {
    id: "e4",
    timestamp: new Date("2026-02-03T18:20:00"),
    appId: "hyperliquid",
    appName: "Hyperliquid",
    amount: 3.1,
    tier: 1,
    fromAddress: "0x5e6f78...901a",
  },
  {
    id: "e5",
    timestamp: new Date("2026-02-03T14:00:00"),
    appId: "monadex",
    appName: "MonadEx",
    amount: 1.85,
    tier: 1,
    fromAddress: "0x4d5e6f...7890",
  },
  {
    id: "e6",
    timestamp: new Date("2026-02-02T20:30:00"),
    appId: "ambient",
    appName: "Ambient",
    amount: 0.95,
    tier: 2,
    fromAddress: "0xbbbb22...2222",
  },
  {
    id: "e7",
    timestamp: new Date("2026-02-02T11:15:00"),
    appId: "hyperliquid",
    appName: "Hyperliquid",
    amount: 4.2,
    tier: 1,
    fromAddress: "0x1a2b3c...1234",
  },
  {
    id: "e8",
    timestamp: new Date("2026-02-01T16:45:00"),
    appId: "kuru",
    appName: "Kuru",
    amount: 2.15,
    tier: 1,
    fromAddress: "0x2b3c4d...5678",
  },
];

// Mock vault balance
export const MOCK_VAULT: VaultBalance = {
  stakedMON: 1234.56,
  apy: 12.5,
  rewardsAccrued: 45.0,
};

// Mock referral link stats per app
export const MOCK_LINK_STATS: Record<string, ReferralLinkStats> = {
  hyperliquid: {
    appId: "hyperliquid",
    clicks: 234,
    conversions: 12,
    revenue: 45.8,
  },
  ambient: {
    appId: "ambient",
    clicks: 156,
    conversions: 8,
    revenue: 22.4,
  },
  kuru: {
    appId: "kuru",
    clicks: 89,
    conversions: 5,
    revenue: 12.1,
  },
  monadex: {
    appId: "monadex",
    clicks: 178,
    conversions: 9,
    revenue: 31.2,
  },
};

// Mock top referrers for host program view
export const MOCK_TOP_REFERRERS: TopReferrer[] = [
  {
    rank: 1,
    address: "0xabc123def456789012345678901234567890abcd",
    alias: "CryptoKing",
    usersReferred: 45,
    volumeGenerated: 125000,
  },
  {
    rank: 2,
    address: "0xdef456789012345678901234567890abcdef1234",
    alias: "DeFiDegen",
    usersReferred: 32,
    volumeGenerated: 82000,
  },
  {
    rank: 3,
    address: "0x123456789012345678901234567890abcdef5678",
    usersReferred: 28,
    volumeGenerated: 61000,
  },
  {
    rank: 4,
    address: "0x456789012345678901234567890abcdef123456ab",
    alias: "MonadMaxi",
    usersReferred: 24,
    volumeGenerated: 54000,
  },
  {
    rank: 5,
    address: "0x789012345678901234567890abcdef123456abcd",
    usersReferred: 19,
    volumeGenerated: 42000,
  },
];

// Mock host program stats (for projects that have registered)
export const MOCK_HOST_STATS: HostProgramStats = {
  usersAcquired: 450,
  volumeGenerated: 125000,
  feesPaid: 3125,
};

// Helper functions

export function countNetworkNodes(node: NetworkNode): number {
  let count = node.address === "YOU" ? 0 : 1; // Don't count the root (YOU)
  for (const child of node.children) {
    count += countNetworkNodes(child);
  }
  return count;
}

export function countHunters(node: NetworkNode): number {
  let count = node.tier === "hunter" ? 1 : 0;
  for (const child of node.children) {
    count += countHunters(child);
  }
  return count;
}

export function getTotalNetworkVolume(node: NetworkNode): number {
  let volume = node.address === "YOU" ? 0 : node.totalVolume;
  for (const child of node.children) {
    volume += getTotalNetworkVolume(child);
  }
  return volume;
}

export function getTotalEarnings(): number {
  return MOCK_EARNINGS.reduce((sum, entry) => sum + entry.amount, 0);
}

export function formatAddress(address: string): string {
  if (address === "YOU") return "YOU";
  if (address.length <= 10) return address;
  return `${address.slice(0, 6)}...${address.slice(-4)}`;
}

export function formatMON(amount: number): string {
  return amount.toLocaleString("en-US", {
    minimumFractionDigits: 2,
    maximumFractionDigits: 2,
  });
}

export function formatUSD(amount: number): string {
  return amount.toLocaleString("en-US", {
    style: "currency",
    currency: "USD",
    minimumFractionDigits: 0,
    maximumFractionDigits: 0,
  });
}

export function generateReferralLink(
  appUrl: string,
  walletAddress: string
): string {
  // In Phase 2, this would use a proper short URL or on-chain registry
  const shortAddress = walletAddress.slice(0, 10);
  return `${appUrl}/?ref=${shortAddress}`;
}
