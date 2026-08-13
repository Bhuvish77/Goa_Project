import React from 'react';
import { Sun, Palmtree } from 'lucide-react';

interface HeaderProps {
  onReset: () => void;
}

export const Header: React.FC<HeaderProps> = ({ onReset }) => {
  return (
    <header className="sticky top-0 z-50 backdrop-blur-xl bg-[#041f16]/80 border-b border-emerald-500/20 px-4 py-3 sm:px-6">
      <div className="max-w-5xl mx-auto flex items-center justify-between">
        <button
          onClick={onReset}
          className="flex items-center gap-3 text-left focus:outline-none focus:ring-2 focus:ring-amber-400/50 rounded-lg p-1 group"
        >
          <div className="w-9 h-9 rounded-xl bg-gradient-to-br from-amber-400 via-amber-500 to-emerald-600 flex items-center justify-center text-slate-950 shadow-lg shadow-amber-500/20 group-hover:scale-105 transition-transform">
            <Sun className="w-5 h-5 font-bold fill-slate-950" />
          </div>
          <div>
            <div className="flex items-center gap-2">
              <span className="font-mono font-bold tracking-wider text-sm sm:text-base text-white">
                HH GOA <span className="text-amber-400">//</span> BEACH SHACK
              </span>
              <span className="inline-flex items-center px-2 py-0.5 rounded text-[10px] font-mono font-bold bg-amber-400/20 text-amber-300 border border-amber-400/30">
                BUILDER ID
              </span>
            </div>
            <span className="text-[11px] text-emerald-300/80 block font-mono">
              Hacker House Goa 2026 • Sun, Surf & Syntax
            </span>
          </div>
        </button>

        <div className="flex items-center gap-3">
          <div className="hidden sm:flex items-center gap-1.5 px-3 py-1 rounded-full bg-[#073022]/90 border border-emerald-500/30 text-xs font-mono text-amber-300">
            <Palmtree className="w-3.5 h-3.5 text-emerald-400" />
            <span>#FrameInGoa</span>
          </div>
        </div>
      </div>
    </header>
  );
};
