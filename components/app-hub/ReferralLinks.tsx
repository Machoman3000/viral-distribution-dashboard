"use client";

import { useState } from "react";
import PixelCard from "@/components/PixelCard";
import { Project } from "@/lib/mock-data";

interface ReferralLinksProps {
  projects: Project[];
  walletAddress: string;
}

export default function ReferralLinks({
  projects,
  walletAddress,
}: ReferralLinksProps) {
  const [copiedId, setCopiedId] = useState<string | null>(null);

  const generateRefLink = (project: Project): string => {
    return `${project.baseUrl}/?ref=${walletAddress.slice(0, 10)}`;
  };

  const truncateLink = (link: string): string => {
    if (link.length <= 40) return link;
    return `${link.slice(0, 35)}...`;
  };

  const copyToClipboard = async (projectId: string, link: string) => {
    try {
      await navigator.clipboard.writeText(link);
      setCopiedId(projectId);
      setTimeout(() => {
        setCopiedId(null);
      }, 2000);
    } catch (err) {
      console.error("Failed to copy:", err);
    }
  };

  return (
    <PixelCard>
      <h3 className="font-[family-name:var(--font-display)] text-lg font-bold uppercase tracking-tight mb-4">
        <span className="text-white">Referral</span>{" "}
        <span className="text-monad-purple">Links</span>
      </h3>

      <div className="space-y-3">
        {projects.map((project) => {
          const refLink = generateRefLink(project);
          const isCopied = copiedId === project.id;

          return (
            <div
              key={project.id}
              className="flex items-center justify-between gap-4 p-3 bg-monad-dark border border-white/10 rounded"
            >
              <div className="flex-1 min-w-0">
                <div className="font-[family-name:var(--font-body)] text-sm font-medium text-white mb-1">
                  {project.name}
                </div>
                <div className="font-[family-name:var(--font-mono)] text-xs text-white/50 truncate">
                  {truncateLink(refLink)}
                </div>
              </div>

              <button
                onClick={() => copyToClipboard(project.id, refLink)}
                aria-label={`Copy referral link for ${project.name}`}
                className={`
                  px-4 py-2 font-[family-name:var(--font-mono)] text-xs uppercase tracking-wider
                  transition-colors duration-150 focus-visible:outline focus-visible:outline-2 focus-visible:outline-monad-purple focus-visible:outline-offset-2
                  ${
                    isCopied
                      ? "bg-terminal-green text-monad-black"
                      : "bg-monad-gray text-white hover:bg-monad-purple"
                  }
                `}
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
