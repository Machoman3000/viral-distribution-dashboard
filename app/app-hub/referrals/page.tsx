import ReferralLinks from "@/components/app-hub/ReferralLinks";
import NetworkTree from "@/components/app-hub/NetworkTree";
import EarningsCard from "@/components/app-hub/EarningsCard";
import { mockProjects, mockUserData } from "@/lib/mock-data";

export default function ReferralsPage() {
  return (
    <div>
      {/* Header */}
      <div className="mb-8">
        <h1 className="font-[family-name:var(--font-display)] text-3xl md:text-4xl font-bold uppercase tracking-tight mb-2">
          <span className="text-white">My</span>{" "}
          <span className="text-monad-purple">Referrals</span>
        </h1>
        <p className="text-white/60 font-[family-name:var(--font-body)]">
          Manage your referral links and share them with your network to earn
          rewards.
        </p>
      </div>

      {/* 3-column grid layout */}
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
