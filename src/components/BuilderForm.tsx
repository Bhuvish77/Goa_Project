import React, { useState } from 'react';
import { ArrowLeft, Sparkles, ArrowRight, User, Code } from 'lucide-react';
import { generateBuilderTitle } from '../utils/titles';
import { BuilderCardPreview } from './BuilderCardPreview';

interface BuilderFormProps {
  photoUrl: string | null;
  idNumber: string;
  initialName: string;
  initialStack: string;
  onGenerate: (name: string, stack: string, builderTitle: string) => void;
  onBack: () => void;
}

const STACK_PRESETS = [
  'AI + Python + Beach Hacks',
  'Backend + Rust + Go',
  'Frontend + React + Tailwind',
  'Full Stack + Next.js',
  'Web3 + Solidity + EVM',
  'Mobile + Flutter + iOS',
  'DevOps + Docker + Cloud',
  'Cybersecurity + Pentest',
];

export const BuilderForm: React.FC<BuilderFormProps> = ({
  photoUrl,
  idNumber,
  initialName,
  initialStack,
  onGenerate,
  onBack,
}) => {
  const [name, setName] = useState(initialName);
  const [stack, setStack] = useState(initialStack);
  const [errors, setErrors] = useState<{ name?: string; stack?: string }>({});

  const generatedTitle = generateBuilderTitle(stack);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();

    const newErrors: { name?: string; stack?: string } = {};
    if (!name.trim()) {
      newErrors.name = 'Please enter your name';
    }
    if (!stack.trim()) {
      newErrors.stack = 'Please enter your tech stack or role';
    }

    if (Object.keys(newErrors).length > 0) {
      setErrors(newErrors);
      return;
    }

    onGenerate(name.trim(), stack.trim(), generatedTitle);
  };

  return (
    <div className="min-h-[calc(100vh-80px)] px-4 py-8 max-w-4xl mx-auto">
      {/* Back Button */}
      <button
        onClick={onBack}
        className="flex items-center gap-2 text-emerald-300/80 hover:text-white font-mono text-sm mb-6 transition-colors"
      >
        <ArrowLeft className="w-4 h-4" />
        <span>CHANGE PHOTO</span>
      </button>

      {/* Title */}
      <div className="text-center mb-8">
        <h2 className="text-3xl sm:text-5xl font-black text-white tracking-tight mb-2">
          WHO IS BUILDING IN PARADISE?
        </h2>
        <p className="text-sm sm:text-base text-emerald-200/80">
          Enter your builder profile details to generate your Goa Beach ID.
        </p>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
        {/* Input Form Column */}
        <form onSubmit={handleSubmit} className="lg:col-span-7 flex flex-col gap-6">
          {/* NAME FIELD */}
          <div>
            <label htmlFor="name-input" className="flex items-center gap-2 text-xs font-mono font-bold text-amber-300 uppercase mb-2">
              <User className="w-4 h-4 text-amber-400" />
              <span>NAME</span>
            </label>
            <input
              id="name-input"
              type="text"
              value={name}
              onChange={(e) => {
                setName(e.target.value);
                if (errors.name) setErrors((prev) => ({ ...prev, name: undefined }));
              }}
              placeholder="e.g. Bhuvanesh P"
              maxLength={40}
              className={`w-full px-4 py-3.5 rounded-xl bg-[#05261b] border text-white placeholder-emerald-400/40 font-sans text-base focus:outline-none focus:ring-2 focus:ring-amber-400 transition-all ${
                errors.name ? 'border-rose-500' : 'border-emerald-500/30 focus:border-amber-400'
              }`}
            />
            {errors.name && (
              <span className="text-xs font-mono text-rose-400 mt-1 block">{errors.name}</span>
            )}
          </div>

          {/* STACK / ROLE FIELD */}
          <div>
            <label htmlFor="stack-input" className="flex items-center justify-between text-xs font-mono font-bold text-amber-300 uppercase mb-2">
              <span className="flex items-center gap-2">
                <Code className="w-4 h-4 text-amber-400" />
                <span>STACK / ROLE</span>
              </span>
              <span className="text-emerald-300/60 text-[11px] normal-case">e.g. AI + Java + Beach Coding</span>
            </label>
            <input
              id="stack-input"
              type="text"
              value={stack}
              onChange={(e) => {
                setStack(e.target.value);
                if (errors.stack) setErrors((prev) => ({ ...prev, stack: undefined }));
              }}
              placeholder="e.g. AI + Python + React"
              maxLength={60}
              className={`w-full px-4 py-3.5 rounded-xl bg-[#05261b] border text-white placeholder-emerald-400/40 font-sans text-base focus:outline-none focus:ring-2 focus:ring-amber-400 transition-all ${
                errors.stack ? 'border-rose-500' : 'border-emerald-500/30 focus:border-amber-400'
              }`}
            />
            {errors.stack && (
              <span className="text-xs font-mono text-rose-400 mt-1 block">{errors.stack}</span>
            )}

            {/* Presets / Suggestions */}
            <div className="mt-3">
              <span className="text-[11px] font-mono text-emerald-300/70 block mb-2">Quick Stack Presets:</span>
              <div className="flex flex-wrap gap-1.5">
                {STACK_PRESETS.map((preset) => (
                  <button
                    key={preset}
                    type="button"
                    onClick={() => {
                      setStack(preset);
                      if (errors.stack) setErrors((prev) => ({ ...prev, stack: undefined }));
                    }}
                    className="px-2.5 py-1 rounded-lg bg-[#073022] border border-emerald-500/30 text-[11px] font-mono text-emerald-200/90 hover:text-amber-300 hover:border-amber-400/50 transition-colors"
                  >
                    + {preset}
                  </button>
                ))}
              </div>
            </div>
          </div>

          {/* Generated Title Preview Card */}
          <div className="p-4 rounded-xl bg-[#073022]/90 border border-amber-400/30 flex items-center justify-between">
            <div>
              <span className="text-[10px] font-mono text-amber-300 block uppercase font-bold tracking-wider mb-0.5">
                AUTOMATIC BUILDER TITLE
              </span>
              <span className="text-base font-black text-white font-mono flex items-center gap-1.5">
                <Sparkles className="w-4 h-4 text-amber-400 animate-pulse" />
                {generatedTitle}
              </span>
            </div>
          </div>

          {/* Submit CTA */}
          <button
            type="submit"
            className="mt-2 w-full py-4 px-6 rounded-2xl bg-gradient-to-r from-amber-400 via-yellow-400 to-emerald-500 font-bold text-slate-950 shadow-xl shadow-amber-500/20 hover:shadow-amber-400/40 hover:scale-[1.01] active:scale-[0.99] transition-all flex items-center justify-center gap-3"
          >
            <span className="font-mono font-extrabold text-base sm:text-lg tracking-wider">
              GENERATE MY ID
            </span>
            <ArrowRight className="w-5 h-5" />
          </button>
        </form>

        {/* Live Card Preview Column */}
        <div className="lg:col-span-5 flex flex-col items-center">
          <span className="text-xs font-mono text-emerald-300/80 mb-3 uppercase tracking-wider font-semibold">
            LIVE CARD PREVIEW
          </span>
          <BuilderCardPreview
            name={name}
            stack={stack}
            photoUrl={photoUrl}
            idNumber={idNumber}
          />
        </div>
      </div>
    </div>
  );
};
