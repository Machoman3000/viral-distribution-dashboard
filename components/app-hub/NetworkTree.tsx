import PixelCard from "@/components/PixelCard";

interface NetworkTreeProps {
  directReferrals: string[];
  indirectReferrals: string[];
}

function truncateAddress(address: string): string {
  if (address.length <= 10) return address;
  return `${address.slice(0, 6)}...${address.slice(-4)}`;
}

export default function NetworkTree({
  directReferrals,
  indirectReferrals,
}: NetworkTreeProps) {
  const renderReferralList = (referrals: string[]) => {
    const displayedReferrals = referrals.slice(0, 5);
    const remainingCount = referrals.length - 5;

    return (
      <div className="space-y-2">
        {displayedReferrals.map((address, index) => (
          <div
            key={index}
            className="font-[family-name:var(--font-mono)] text-sm text-white/70"
          >
            {truncateAddress(address)}
          </div>
        ))}
        {remainingCount > 0 && (
          <div className="font-[family-name:var(--font-mono)] text-sm text-white/50">
            +{remainingCount} more
          </div>
        )}
        {referrals.length === 0 && (
          <div className="font-[family-name:var(--font-mono)] text-sm text-white/40">
            No referrals yet
          </div>
        )}
      </div>
    );
  };

  return (
    <PixelCard>
      <h3 className="font-[family-name:var(--font-display)] text-lg font-bold uppercase tracking-tight mb-6">
        <span className="text-white">Your</span>{" "}
        <span className="text-monad-purple">Network</span>
      </h3>

      <div className="grid grid-cols-2 gap-8">
        {/* Direct Referrals Column */}
        <div>
          <div className="flex items-center gap-2 mb-4">
            <div className="w-3 h-3 bg-monad-purple" />
            <span className="font-[family-name:var(--font-body)] text-sm text-white/80">
              Direct Referrals (You&apos;re Hunter)
            </span>
          </div>
          <div className="text-2xl font-bold text-white mb-3">
            {directReferrals.length}
          </div>
          {renderReferralList(directReferrals)}
        </div>

        {/* Indirect Referrals Column */}
        <div>
          <div className="flex items-center gap-2 mb-4">
            <div className="w-3 h-3 bg-terminal-yellow" />
            <span className="font-[family-name:var(--font-body)] text-sm text-white/80">
              Their Referrals (You&apos;re Manager)
            </span>
          </div>
          <div className="text-2xl font-bold text-white mb-3">
            {indirectReferrals.length}
          </div>
          {renderReferralList(indirectReferrals)}
        </div>
      </div>
    </PixelCard>
  );
}
