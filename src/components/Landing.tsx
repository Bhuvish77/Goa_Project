import React from 'react';
import { ArrowRight, Palmtree, Sun, Waves } from 'lucide-react';

interface LandingProps {
  onStart: () => void;
}

export const Landing: React.FC<LandingProps> = ({ onStart }) => {
  return (
    <div className="flex flex-col items-center justify-center min-h-[calc(100vh-80px)] px-4 py-12 text-center max-w-4xl mx-auto relative overflow-hidden">
      {/* Background tropical ambient glows */}
      <div className="absolute top-1/4 -left-20 w-80 h-80 bg-amber-500/15 rounded-full blur-3xl pointer-events-none" />
      <div className="absolute bottom-1/4 -right-20 w-96 h-96 bg-emerald-500/20 rounded-full blur-3xl pointer-events-none" />

      {/* Top Tagline */}
      <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-[#073022]/90 border border-emerald-400/40 text-amber-300 text-xs font-mono mb-8 tracking-widest uppercase shadow-xl shadow-emerald-950/40 backdrop-blur-md">
        <Sun className="w-3.5 h-3.5 text-amber-400 animate-spin-slow" />
        <span>SUN, SURF & SYNTAX // HACKER HOUSE GOA 2026</span>
      </div>

      {/* Main Headline */}
      <h1 className="text-4xl sm:text-6xl md:text-7xl font-extrabold text-white tracking-tight leading-[1.08] mb-6 max-w-3xl">
        BUILD ON THE BEACH. <br />
        <span className="bg-clip-text text-transparent bg-gradient-to-r from-amber-300 via-amber-400 to-emerald-400">
          MAKE IT YOURS.
        </span>
      </h1>

      {/* Supporting Text */}
      <p className="text-base sm:text-xl text-emerald-100/90 max-w-2xl font-normal leading-relaxed mb-10">
        Create your official HH Goa 2026 Builder ID under the palm trees and share what you're shipping from the coastal beach shack.
      </p>

      {/* Primary Action CTA */}
      <div className="flex flex-col items-center gap-4 w-full max-w-xs sm:max-w-md">
        <button
          onClick={onStart}
          className="w-full relative group overflow-hidden rounded-2xl bg-gradient-to-r from-amber-400 via-yellow-400 to-emerald-500 p-[2px] font-bold text-slate-950 shadow-2xl shadow-amber-500/30 hover:shadow-amber-400/50 hover:scale-[1.02] active:scale-[0.98] transition-all duration-300"
        >
          <div className="w-full h-full bg-[#041f16] group-hover:bg-transparent transition-colors rounded-[14px] px-8 py-4 flex items-center justify-center gap-3">
            <span className="text-white group-hover:text-slate-950 font-mono font-bold tracking-wider text-base sm:text-lg transition-colors">
              CREATE MY BUILDER ID
            </span>
            <ArrowRight className="w-5 h-5 text-amber-400 group-hover:text-slate-950 group-hover:translate-x-1 transition-all" />
          </div>
        </button>

        {/* Small footer text */}
        <p className="text-xs font-mono text-emerald-300/70 tracking-wider flex items-center gap-2 mt-2">
          <span>NO SIGNUP</span>
          <span className="text-emerald-600">•</span>
          <span>FREE</span>
          <span className="text-emerald-600">•</span>
          <span>READY IN SECONDS</span>
        </p>
      </div>

      {/* Highlights Grid */}
      <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 mt-16 w-full max-w-3xl text-left">
        <div className="p-5 rounded-2xl bg-[#062c1e]/80 border border-emerald-500/30 backdrop-blur-md shadow-lg">
          <div className="w-10 h-10 rounded-xl bg-amber-400/10 flex items-center justify-center text-amber-400 mb-3 border border-amber-400/20">
            <Sun className="w-5 h-5" />
          </div>
          <h3 className="text-sm font-mono font-bold text-white mb-1">Coastal Beach Theme</h3>
          <p className="text-xs text-emerald-200/70 leading-relaxed">
            Custom illustrated Goa beach backdrop & tropical sunset card aesthetics.
          </p>
        </div>

        <div className="p-5 rounded-2xl bg-[#062c1e]/80 border border-emerald-500/30 backdrop-blur-md shadow-lg">
          <div className="w-10 h-10 rounded-xl bg-emerald-400/10 flex items-center justify-center text-emerald-400 mb-3 border border-emerald-400/20">
            <Palmtree className="w-5 h-5" />
          </div>
          <h3 className="text-sm font-mono font-bold text-white mb-1">Instant PNG Graphic</h3>
          <p className="text-xs text-emerald-200/70 leading-relaxed">
            Full high-res 1080×1350 canvas card generated client-side in seconds.
          </p>
        </div>

        <div className="p-5 rounded-2xl bg-[#062c1e]/80 border border-emerald-500/30 backdrop-blur-md shadow-lg">
          <div className="w-10 h-10 rounded-xl bg-cyan-400/10 flex items-center justify-center text-cyan-400 mb-3 border border-cyan-400/20">
            <Waves className="w-5 h-5" />
          </div>
          <h3 className="text-sm font-mono font-bold text-white mb-1">100% Private Engine</h3>
          <p className="text-xs text-emerald-200/70 leading-relaxed">
            Zero server uploads. Your photo is rendered purely in your local browser.
          </p>
        </div>
      </div>
    </div>
  );
};
