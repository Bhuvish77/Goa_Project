import React, { useEffect } from 'react';
import confetti from 'canvas-confetti';
import { Download, Share2, RefreshCw, CheckCircle2 } from 'lucide-react';
import { downloadCanvasImage, shareBuilderCard } from '../utils/download';

interface ResultProps {
  generatedDataUrl: string;
  name: string;
  builderTitle: string;
  onReset: () => void;
}

export const Result: React.FC<ResultProps> = ({
  generatedDataUrl,
  name,
  builderTitle,
  onReset,
}) => {

  // Trigger confetti burst on launch
  useEffect(() => {
    try {
      confetti({
        particleCount: 70,
        spread: 80,
        origin: { y: 0.6 },
        colors: ['#FFD000', '#10B981', '#053A26', '#FFFFFF', '#E91E63'],
      });
    } catch (e) {
      console.warn('Confetti trigger failed', e);
    }
  }, []);

  const handleDownload = () => {
    downloadCanvasImage(generatedDataUrl, `HH_GOA_2026_BEACH_BUILDER_ID_${name.replace(/\s+/g, '_')}.png`);
  };

  const handleShare = async () => {
    await shareBuilderCard(generatedDataUrl, name, builderTitle);
  };

  return (
    <div className="flex flex-col items-center justify-center min-h-[calc(100vh-80px)] px-4 py-8 max-w-xl mx-auto">
      {/* Header Status */}
      <div className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full bg-emerald-400/10 border border-emerald-400/30 text-amber-300 text-xs font-mono font-bold mb-6">
        <CheckCircle2 className="w-4 h-4 text-amber-400" />
        <span>BEACH BUILDER ID GENERATED SUCCESSFULLY 🌴</span>
      </div>

      {/* Actual Generated PNG Display */}
      <div className="w-full max-w-md rounded-2xl overflow-hidden shadow-2xl border border-emerald-500/30 bg-[#041f16] mb-8 transform hover:scale-[1.01] transition-transform">
        <img
          src={generatedDataUrl}
          alt={`HH Goa 2026 Beach Builder ID for ${name}`}
          className="w-full h-auto object-contain block"
        />
      </div>

      {/* Action Buttons */}
      <div className="w-full max-w-md flex flex-col gap-3 font-mono">
        {/* DOWNLOAD BUTTON */}
        <button
          onClick={handleDownload}
          className="w-full py-4 px-6 rounded-xl bg-gradient-to-r from-amber-400 via-yellow-400 to-emerald-500 font-extrabold text-slate-950 shadow-xl shadow-amber-500/20 hover:shadow-amber-400/40 hover:scale-[1.01] active:scale-[0.99] transition-all flex items-center justify-center gap-3 text-base"
        >
          <Download className="w-5 h-5 stroke-[2.5]" />
          <span>DOWNLOAD IMAGE (PNG)</span>
        </button>

        {/* SHARE TO X BUTTON */}
        <button
          onClick={handleShare}
          className="w-full py-3.5 px-6 rounded-xl bg-[#05261b] border border-emerald-500/40 text-white font-bold hover:bg-[#062c1e] hover:border-amber-400 hover:scale-[1.01] active:scale-[0.99] transition-all flex items-center justify-center gap-3 text-sm"
        >
          <svg className="w-4 h-4 fill-amber-400" viewBox="0 0 24 24" aria-hidden="true">
            <path d="M18.244 2.25h3.308l-7.227 8.26 8.502 11.24H16.17l-5.214-6.817L4.99 21.75H1.68l7.73-8.835L1.254 2.25H8.08l4.713 6.231zm-1.161 17.52h1.833L7.084 4.126H5.117z"></path>
          </svg>
          <span>SHARE TO X (#FrameInGoa)</span>
          <Share2 className="w-4 h-4 text-emerald-300" />
        </button>

        {/* CREATE ANOTHER BUTTON */}
        <button
          onClick={onReset}
          className="w-full py-3 px-6 rounded-xl bg-[#041f16] border border-emerald-500/20 text-emerald-300/80 font-semibold hover:text-white hover:border-emerald-400 transition-colors flex items-center justify-center gap-2 text-xs mt-2"
        >
          <RefreshCw className="w-4 h-4" />
          <span>CREATE ANOTHER BUILDER ID</span>
        </button>
      </div>
    </div>
  );
};
