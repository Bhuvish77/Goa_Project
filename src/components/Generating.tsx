import React from 'react';
import { Check, Sun } from 'lucide-react';
import type { GenerationProgress } from '../types';

interface GeneratingProps {
  progress: GenerationProgress;
}

export const Generating: React.FC<GeneratingProps> = ({ progress }) => {
  const steps = [
    { key: 'photo', label: 'PHOTO' },
    { key: 'identity', label: 'IDENTITY' },
    { key: 'builderTitle', label: 'BUILDER TITLE' },
    { key: 'hhGoaFrame', label: 'BEACH SHACK FRAME' },
    { key: 'finalGraphic', label: 'FINAL GRAPHIC' },
  ] as const;

  return (
    <div className="flex flex-col items-center justify-center min-h-[calc(100vh-80px)] px-4 py-12 text-center max-w-md mx-auto">
      {/* Central Spinner */}
      <div className="w-16 h-16 rounded-2xl bg-amber-400/10 border border-amber-400/30 flex items-center justify-center text-amber-300 mb-8 shadow-2xl shadow-amber-500/20">
        <Sun className="w-8 h-8 animate-spin" />
      </div>

      <h2 className="text-2xl font-black text-white font-mono tracking-wider mb-2">
        GENERATING BEACH ID...
      </h2>
      <p className="text-xs font-mono text-emerald-200/70 mb-8">
        Compiling client-side HTML5 canvas graphics at the shack
      </p>

      {/* Step Checklist */}
      <div className="w-full bg-[#05261b]/90 border border-emerald-500/30 rounded-2xl p-6 flex flex-col gap-4 text-left font-mono text-xs shadow-xl">
        {steps.map((step) => {
          const isDone = progress[step.key];
          return (
            <div
              key={step.key}
              className={`flex items-center justify-between transition-colors duration-200 ${
                isDone ? 'text-amber-300 font-bold' : 'text-emerald-400/40'
              }`}
            >
              <span className="flex items-center gap-3">
                <span className={`w-2 h-2 rounded-full ${isDone ? 'bg-amber-400 animate-pulse' : 'bg-emerald-800'}`} />
                <span>{step.label}</span>
              </span>

              {isDone ? (
                <div className="w-5 h-5 rounded-full bg-amber-400/20 text-amber-300 flex items-center justify-center border border-amber-400/40">
                  <Check className="w-3 h-3 stroke-[3]" />
                </div>
              ) : (
                <span className="text-emerald-400/40 font-mono text-[10px]">PROCESSING...</span>
              )}
            </div>
          );
        })}
      </div>
    </div>
  );
};
