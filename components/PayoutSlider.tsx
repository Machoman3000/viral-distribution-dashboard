"use client";

interface PayoutSliderProps {
  tier: string;
  label: string;
  description: string;
  value: number;
  onChange: (value: number) => void;
  max: number;
  totalMargin: number;
  color?: "purple" | "green" | "yellow";
}

export default function PayoutSlider({
  tier,
  label,
  description,
  value,
  onChange,
  max,
  totalMargin,
  color = "purple",
}: PayoutSliderProps) {
  const colorClasses = {
    purple: {
      bg: "bg-monad-purple",
      text: "text-monad-purple",
      track: "bg-monad-purple/30",
    },
    green: {
      bg: "bg-terminal-green",
      text: "text-terminal-green",
      track: "bg-terminal-green/30",
    },
    yellow: {
      bg: "bg-terminal-yellow",
      text: "text-terminal-yellow",
      track: "bg-terminal-yellow/30",
    },
  };

  const colors = colorClasses[color];

  return (
    <div className="bg-monad-black border border-white/10 p-4">
      {/* Header row */}
      <div className="flex items-center justify-between mb-3">
        <div className="flex items-center gap-3">
          <div className={`w-2 h-2 ${colors.bg}`} />
          <span className="font-[family-name:var(--font-mono)] text-xs uppercase tracking-wider text-white/60">
            {tier}
          </span>
          <span className="font-[family-name:var(--font-display)] font-bold uppercase tracking-tight">
            {label}
          </span>
        </div>
        <div className="flex items-center gap-2">
          <span className={`font-[family-name:var(--font-mono)] text-2xl font-bold ${colors.text}`}>
            {value}%
          </span>
        </div>
      </div>

      {/* Description */}
      <p className="text-white/40 text-sm font-[family-name:var(--font-body)] mb-4">
        {description}
      </p>

      {/* Slider */}
      <div className="relative">
        {/* Track background */}
        <div className="absolute inset-0 h-1 top-1/2 -translate-y-1/2 bg-monad-gray" />

        {/* Filled track */}
        <div
          className={`absolute h-1 top-1/2 -translate-y-1/2 ${colors.bg}`}
          style={{ width: `${(value / totalMargin) * 100}%` }}
        />

        {/* Range input */}
        <input
          type="range"
          min={0}
          max={max}
          value={value}
          onChange={(e) => onChange(parseInt(e.target.value))}
          className="relative w-full z-10"
          style={{
            // Custom thumb color based on tier
            accentColor: color === "purple" ? "#836EFB" : color === "green" ? "#4AF626" : "#FFD700",
          }}
        />
      </div>

      {/* Range labels */}
      <div className="flex justify-between mt-2">
        <span className="font-[family-name:var(--font-mono)] text-xs text-white/30">0%</span>
        <span className="font-[family-name:var(--font-mono)] text-xs text-white/30">
          MAX: {max}%
        </span>
      </div>
    </div>
  );
}
