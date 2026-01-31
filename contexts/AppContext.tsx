"use client";

import React, { createContext, useContext, useState, ReactNode } from "react";

interface PayoutConfig {
  totalMargin: number;
  tier0Rebate: number;
  tier1Hunter: number;
  tier2Manager: number;
  // Revenue share limits
  limitType: 'time' | 'volume' | 'transactions';
  limitValue: number;
  afterLimitBehavior: 'stop' | 'reduceRebate' | 'reduce50';
}

interface AppRegistration {
  name: string;
  description: string;
  feeAddress: string;
  appId: string;
}

interface AppContextType {
  // Wallet state
  walletAddress: string | null;
  isConnected: boolean;
  connectWallet: () => void;
  disconnectWallet: () => void;

  // App registration
  appRegistration: AppRegistration | null;
  registerApp: (data: Omit<AppRegistration, "appId">) => void;

  // Payout configuration
  payoutConfig: PayoutConfig;
  setPayoutConfig: (config: PayoutConfig) => void;
}

const defaultPayoutConfig: PayoutConfig = {
  totalMargin: 25,
  tier0Rebate: 10,
  tier1Hunter: 10,
  tier2Manager: 5,
  limitType: 'time',
  limitValue: 90,
  afterLimitBehavior: 'stop',
};

const AppContext = createContext<AppContextType | undefined>(undefined);

export function AppProvider({ children }: { children: ReactNode }) {
  const [walletAddress, setWalletAddress] = useState<string | null>(null);
  const [appRegistration, setAppRegistration] = useState<AppRegistration | null>(null);
  const [payoutConfig, setPayoutConfig] = useState<PayoutConfig>(defaultPayoutConfig);

  const connectWallet = () => {
    // Mock wallet connection - generates a random-ish address
    const mockAddress = `0x${Array.from({ length: 40 }, () =>
      Math.floor(Math.random() * 16).toString(16)
    ).join("")}`;
    setWalletAddress(mockAddress);
  };

  const disconnectWallet = () => {
    setWalletAddress(null);
    setAppRegistration(null);
  };

  const registerApp = (data: Omit<AppRegistration, "appId">) => {
    const appId = `app_${Date.now().toString(36)}`;
    setAppRegistration({ ...data, appId });
  };

  const value: AppContextType = {
    walletAddress,
    isConnected: walletAddress !== null,
    connectWallet,
    disconnectWallet,
    appRegistration,
    registerApp,
    payoutConfig,
    setPayoutConfig,
  };

  return <AppContext.Provider value={value}>{children}</AppContext.Provider>;
}

export function useApp() {
  const context = useContext(AppContext);
  if (context === undefined) {
    throw new Error("useApp must be used within an AppProvider");
  }
  return context;
}
