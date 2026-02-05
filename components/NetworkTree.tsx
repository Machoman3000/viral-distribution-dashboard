"use client";

import { NetworkNode, formatAddress, formatUSD } from "@/lib/mockData";

interface NetworkTreeProps {
  node: NetworkNode;
  depth?: number;
}

function getStatusColor(status: NetworkNode["status"]): string {
  switch (status) {
    case "active":
      return "bg-terminal-green";
    case "dormant":
      return "bg-terminal-yellow";
    case "new":
      return "bg-terminal-red";
  }
}

function getStatusBorderColor(status: NetworkNode["status"]): string {
  switch (status) {
    case "active":
      return "border-terminal-green/30";
    case "dormant":
      return "border-terminal-yellow/30";
    case "new":
      return "border-terminal-red/30";
  }
}

function getTierBadge(tier: NetworkNode["tier"]): string {
  switch (tier) {
    case "manager":
      return "MGR";
    case "hunter":
      return "HNT";
    case "user":
      return "USR";
  }
}

function getTierColor(tier: NetworkNode["tier"]): string {
  switch (tier) {
    case "manager":
      return "text-terminal-yellow bg-terminal-yellow/10";
    case "hunter":
      return "text-monad-purple bg-monad-purple/10";
    case "user":
      return "text-white/60 bg-white/5";
  }
}

function NetworkNodeCard({ node }: { node: NetworkNode }) {
  const isRoot = node.address === "YOU";

  return (
    <div
      className={`
        bg-monad-dark border p-3 min-w-[180px]
        ${isRoot ? "border-monad-purple" : getStatusBorderColor(node.status)}
      `}
    >
      <div className="flex items-center justify-between mb-2">
        <div className="flex items-center gap-2">
          <div className={`w-2 h-2 ${getStatusColor(node.status)} ${node.status === "active" ? "status-pulse" : ""}`} />
          <span className="font-[family-name:var(--font-mono)] text-sm">
            {isRoot ? (
              <span className="text-monad-purple font-bold">YOU</span>
            ) : node.alias ? (
              node.alias
            ) : (
              formatAddress(node.address)
            )}
          </span>
        </div>
        <span
          className={`font-[family-name:var(--font-mono)] text-[10px] uppercase px-1.5 py-0.5 ${getTierColor(
            node.tier
          )}`}
        >
          {getTierBadge(node.tier)}
        </span>
      </div>
      {!isRoot && (
        <div className="font-[family-name:var(--font-mono)] text-xs text-white/40">
          Vol: {formatUSD(node.totalVolume)}
        </div>
      )}
    </div>
  );
}

function TreeBranch({ children }: { children: React.ReactNode }) {
  return (
    <div className="relative pl-8 mt-2">
      {/* Vertical line */}
      <div className="absolute left-3 top-0 bottom-4 w-px bg-white/20" />
      {/* Horizontal connector will be added per child */}
      <div className="space-y-2">{children}</div>
    </div>
  );
}

function TreeNode({ node, isLast }: { node: NetworkNode; isLast: boolean }) {
  return (
    <div className="relative">
      {/* Horizontal connector line */}
      <div className="absolute -left-5 top-4 w-5 h-px bg-white/20" />
      {/* Corner piece */}
      {isLast && (
        <div className="absolute -left-5 top-0 h-4 w-px bg-monad-black" style={{ marginTop: '1px' }} />
      )}
      <NetworkNodeCard node={node} />
      {node.children.length > 0 && (
        <TreeBranch>
          {node.children.map((child, index) => (
            <TreeNode
              key={child.address}
              node={child}
              isLast={index === node.children.length - 1}
            />
          ))}
        </TreeBranch>
      )}
    </div>
  );
}

export default function NetworkTree({ node }: NetworkTreeProps) {
  return (
    <div className="p-4 overflow-x-auto">
      <NetworkNodeCard node={node} />
      {node.children.length > 0 && (
        <TreeBranch>
          {node.children.map((child, index) => (
            <TreeNode
              key={child.address}
              node={child}
              isLast={index === node.children.length - 1}
            />
          ))}
        </TreeBranch>
      )}
    </div>
  );
}

export function NetworkLegend() {
  return (
    <div className="flex flex-wrap gap-4 p-4 bg-monad-dark/50 border border-white/10">
      <div className="flex items-center gap-2">
        <div className="w-2 h-2 bg-terminal-green status-pulse" />
        <span className="font-[family-name:var(--font-mono)] text-xs text-white/60">
          Active (tx in 7d)
        </span>
      </div>
      <div className="flex items-center gap-2">
        <div className="w-2 h-2 bg-terminal-yellow" />
        <span className="font-[family-name:var(--font-mono)] text-xs text-white/60">
          Dormant (no tx in 7d)
        </span>
      </div>
      <div className="flex items-center gap-2">
        <div className="w-2 h-2 bg-terminal-red" />
        <span className="font-[family-name:var(--font-mono)] text-xs text-white/60">
          New (no tx yet)
        </span>
      </div>
      <div className="border-l border-white/20 pl-4 flex items-center gap-2">
        <span className="font-[family-name:var(--font-mono)] text-[10px] uppercase px-1.5 py-0.5 text-terminal-yellow bg-terminal-yellow/10">
          MGR
        </span>
        <span className="font-[family-name:var(--font-mono)] text-[10px] uppercase px-1.5 py-0.5 text-monad-purple bg-monad-purple/10">
          HNT
        </span>
        <span className="font-[family-name:var(--font-mono)] text-[10px] uppercase px-1.5 py-0.5 text-white/60 bg-white/5">
          USR
        </span>
      </div>
    </div>
  );
}
