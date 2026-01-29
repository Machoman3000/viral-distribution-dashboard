"use client";

import { useState } from "react";

interface CodeBlockProps {
  code: string;
  language?: string;
  title?: string;
}

export default function CodeBlock({ code, language = "typescript", title }: CodeBlockProps) {
  const [copied, setCopied] = useState(false);

  const handleCopy = async () => {
    await navigator.clipboard.writeText(code);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  return (
    <div className="relative bg-monad-black border border-white/10">
      {/* Header */}
      <div className="flex items-center justify-between px-4 py-2 border-b border-white/10">
        <div className="flex items-center gap-3">
          {title && (
            <span className="font-[family-name:var(--font-mono)] text-xs text-white/60 uppercase tracking-wider">
              {title}
            </span>
          )}
          <span className="px-2 py-0.5 bg-monad-gray text-xs font-[family-name:var(--font-mono)] text-monad-purple">
            {language}
          </span>
        </div>
        <button
          onClick={handleCopy}
          className="px-3 py-1 text-xs font-[family-name:var(--font-mono)] uppercase tracking-wider text-white/40 hover:text-white transition-colors"
        >
          {copied ? "COPIED!" : "COPY"}
        </button>
      </div>

      {/* Code */}
      <pre className="p-4 overflow-x-auto">
        <code className="font-[family-name:var(--font-mono)] text-sm text-white/90 whitespace-pre">
          {code}
        </code>
      </pre>
    </div>
  );
}
