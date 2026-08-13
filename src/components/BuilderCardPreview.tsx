import React from 'react';
import { generateBuilderTitle } from '../utils/titles';

interface BuilderCardPreviewProps {
  name: string;
  stack: string;
  photoUrl: string | null;
  idNumber: string;
}

export const BuilderCardPreview: React.FC<BuilderCardPreviewProps> = ({
  name,
  stack,
  photoUrl,
  idNumber,
}) => {
  const autoTitle = generateBuilderTitle(stack);

  return (
    <div className="w-full max-w-sm mx-auto rounded-2xl bg-[#041f16] border border-emerald-500/30 p-4 shadow-2xl relative overflow-hidden font-sans">
      {/* Top Header */}
      <div className="flex items-center justify-between text-xs font-mono text-amber-400 mb-3 pb-2 border-b border-emerald-500/20">
        <span>● HH GOA // BEACH SHACK</span>
        <span className="text-emerald-300 font-bold">HH/026</span>
      </div>

      {/* Photo Frame */}
      <div className="relative aspect-[4/3] rounded-xl overflow-hidden bg-[#062c1e] border border-emerald-500/30 mb-4">
        {photoUrl ? (
          <img
            src={photoUrl}
            alt="Builder Preview"
            className="w-full h-full object-cover"
          />
        ) : (
          <div className="w-full h-full flex items-center justify-center text-emerald-400/60 font-mono text-xs">
            NO PHOTO
          </div>
        )}
        <div className="absolute top-2 right-2 px-2 py-0.5 rounded-full bg-[#041f16]/90 border border-amber-400/60 text-[10px] font-mono text-amber-300 font-bold">
          VERIFIED BUILDER
        </div>
      </div>

      {/* Name */}
      <h3 className="text-xl font-black text-white uppercase tracking-tight truncate mb-1">
        {name.trim() || 'YOUR NAME'}
      </h3>

      {/* Auto Title Badge */}
      <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-md bg-gradient-to-r from-amber-400 via-yellow-400 to-emerald-400 text-slate-950 font-black text-xs uppercase mb-3 shadow-md shadow-amber-400/20">
        <span>⚡</span>
        <span className="truncate">{autoTitle}</span>
      </div>

      {/* Stack */}
      <div className="mb-4">
        <span className="text-[10px] font-mono text-emerald-300/80 block mb-0.5">STACK / ROLE</span>
        <span className="text-xs font-mono text-emerald-100 font-semibold truncate block">
          {stack.trim() || 'AI + Full Stack + Beach Hacks'}
        </span>
      </div>

      {/* Footer Metadata */}
      <div className="grid grid-cols-4 gap-1 p-2 rounded-lg bg-[#062c1e]/90 border border-emerald-500/20 text-[9px] font-mono text-emerald-300/80">
        <div>
          <span className="block text-emerald-400/70">STATUS</span>
          <span className="text-emerald-400 font-bold">SHIPPING</span>
        </div>
        <div>
          <span className="block text-emerald-400/70">LOCATION</span>
          <span className="text-amber-300 font-bold">GOA 🌴</span>
        </div>
        <div>
          <span className="block text-emerald-400/70">HOUSE</span>
          <span className="text-emerald-300 font-bold">HH26</span>
        </div>
        <div>
          <span className="block text-emerald-400/70">ID NO</span>
          <span className="text-white font-bold truncate">{idNumber}</span>
        </div>
      </div>
    </div>
  );
};
