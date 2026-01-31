import ReferralLinks from "@/components/app-hub/ReferralLinks";
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

      {/* Referral Links Component */}
      <div className="max-w-2xl">
        <ReferralLinks
          projects={mockProjects}
          walletAddress={mockUserData.walletAddress}
        />
      </div>
    </div>
  );
}
