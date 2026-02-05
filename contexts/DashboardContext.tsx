"use client";

import React, { createContext, useContext, useState, ReactNode } from "react";
import {
  MOCK_APPS,
  MOCK_NETWORK,
  MOCK_EARNINGS,
  MOCK_VAULT,
  MOCK_LINK_STATS,
  MOCK_TOP_REFERRERS,
  MOCK_HOST_STATS,
  IntegratedApp,
  NetworkNode,
  EarningEntry,
  VaultBalance,
  ReferralLinkStats,
  TopReferrer,
  HostProgramStats,
  countNetworkNodes,
  countHunters,
  getTotalNetworkVolume,
  getTotalEarnings,
} from "@/lib/mockData";
import { useApp } from "./AppContext";

interface DashboardStats {
  totalEarned: number;
  networkSize: number;
  hunterCount: number;
  networkVolume: number;
  apy: number;
}

interface DashboardContextType {
  // Integrated apps
  apps: IntegratedApp[];
  selectedAppId: string;
  setSelectedAppId: (id: string) => void;
  selectedApp: IntegratedApp | undefined;

  // Network
  network: NetworkNode;

  // Earnings
  earnings: EarningEntry[];
  vault: VaultBalance;

  // Link stats
  linkStats: Record<string, ReferralLinkStats>;

  // Host program (only available if user has registered a project)
  isHost: boolean;
  hostStats: HostProgramStats | null;
  topReferrers: TopReferrer[];

  // Computed stats
  stats: DashboardStats;

  // Can graduate to manager (has 3+ hunters)
  canGraduate: boolean;
}

const DashboardContext = createContext<DashboardContextType | undefined>(undefined);

export function DashboardProvider({ children }: { children: ReactNode }) {
  const { appRegistration } = useApp();
  const [selectedAppId, setSelectedAppId] = useState<string>(MOCK_APPS[0].id);

  // Check if user is a host (has registered a project)
  const isHost = appRegistration !== null;

  // Find selected app
  const selectedApp = MOCK_APPS.find((app) => app.id === selectedAppId);

  // Calculate stats
  const networkSize = countNetworkNodes(MOCK_NETWORK);
  const hunterCount = countHunters(MOCK_NETWORK);
  const networkVolume = getTotalNetworkVolume(MOCK_NETWORK);
  const totalEarned = getTotalEarnings();

  const stats: DashboardStats = {
    totalEarned,
    networkSize,
    hunterCount,
    networkVolume,
    apy: MOCK_VAULT.apy,
  };

  // Can graduate if user has 3+ hunters in their network
  const canGraduate = hunterCount >= 3;

  const value: DashboardContextType = {
    apps: MOCK_APPS,
    selectedAppId,
    setSelectedAppId,
    selectedApp,
    network: MOCK_NETWORK,
    earnings: MOCK_EARNINGS,
    vault: MOCK_VAULT,
    linkStats: MOCK_LINK_STATS,
    isHost,
    hostStats: isHost ? MOCK_HOST_STATS : null,
    topReferrers: isHost ? MOCK_TOP_REFERRERS : [],
    stats,
    canGraduate,
  };

  return (
    <DashboardContext.Provider value={value}>
      {children}
    </DashboardContext.Provider>
  );
}

export function useDashboard() {
  const context = useContext(DashboardContext);
  if (context === undefined) {
    throw new Error("useDashboard must be used within a DashboardProvider");
  }
  return context;
}
