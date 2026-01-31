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
    asHunter: 234.5,
    asManager: 89.2,
    claimable: 323.7,
  },
  rebatesSaved: 42.5,
};
