interface StatCardProps {
  label: string;
  value: string;
  subValue?: string;
  icon?: string;
  color?: "purple" | "green" | "yellow" | "white";
}

const colorClasses = {
  purple: "text-monad-purple",
  green: "text-terminal-green",
  yellow: "text-terminal-yellow",
  white: "text-white",
};

export default function StatCard({
  label,
  value,
  subValue,
  icon,
  color = "white",
}: StatCardProps) {
  return (
    <div className="bg-monad-dark border border-white/10 p-4">
      <div className="flex items-start justify-between mb-2">
        <span className="font-[family-name:var(--font-mono)] text-xs uppercase tracking-wider text-white/40">
          {label}
        </span>
        {icon && <span className="text-lg opacity-40">{icon}</span>}
      </div>
      <div className={`font-[family-name:var(--font-display)] text-2xl font-bold ${colorClasses[color]}`}>
        {value}
      </div>
      {subValue && (
        <div className="font-[family-name:var(--font-mono)] text-xs text-white/40 mt-1">
          {subValue}
        </div>
      )}
    </div>
  );
}
