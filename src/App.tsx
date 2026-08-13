import { useState } from 'react';
import type { AppStep, GenerationProgress } from './types';
import { generateIdNumber } from './utils/titles';
import { loadImageFromFile } from './utils/image';
import { renderBuilderCard } from './canvas/renderer';

import { Header } from './components/Header';
import { Landing } from './components/Landing';
import { Upload } from './components/Upload';
import { BuilderForm } from './components/BuilderForm';
import { Generating } from './components/Generating';
import { Result } from './components/Result';

export function App() {
  const [step, setStep] = useState<AppStep>('landing');

  // Form & Image State
  const [photoBlob, setPhotoBlob] = useState<File | Blob | null>(null);
  const [photoPreviewUrl, setPhotoPreviewUrl] = useState<string | null>(null);
  const [name, setName] = useState<string>('');
  const [stack, setStack] = useState<string>('');
  const [builderTitle, setBuilderTitle] = useState<string>('');
  const [idNumber, setIdNumber] = useState<string>(generateIdNumber());

  // Generation state
  const [generationProgress, setGenerationProgress] = useState<GenerationProgress>({
    photo: false,
    identity: false,
    builderTitle: false,
    hhGoaFrame: false,
    finalGraphic: false,
  });
  const [generatedDataUrl, setGeneratedDataUrl] = useState<string | null>(null);

  // Handlers
  const handlePhotoSelect = (blob: File | Blob, previewUrl: string) => {
    setPhotoBlob(blob);
    setPhotoPreviewUrl(previewUrl);
    setStep('details');
  };

  const handleGenerate = async (
    inputName: string,
    inputStack: string,
    computedTitle: string
  ) => {
    setName(inputName);
    setStack(inputStack);
    setBuilderTitle(computedTitle);
    setStep('generating');

    // Reset progress checklist
    setGenerationProgress({
      photo: false,
      identity: false,
      builderTitle: false,
      hhGoaFrame: false,
      finalGraphic: false,
    });

    try {
      // Step 1: Photo
      await new Promise((r) => setTimeout(r, 120));
      setGenerationProgress((p) => ({ ...p, photo: true }));

      // Step 2: Identity
      await new Promise((r) => setTimeout(r, 100));
      setGenerationProgress((p) => ({ ...p, identity: true }));

      // Step 3: Builder Title
      await new Promise((r) => setTimeout(r, 100));
      setGenerationProgress((p) => ({ ...p, builderTitle: true }));

      // Step 4: Frame & Render
      await new Promise((r) => setTimeout(r, 100));
      setGenerationProgress((p) => ({ ...p, hhGoaFrame: true }));

      if (!photoBlob) {
        throw new Error('No photo selected');
      }

      // Load Image object for Canvas
      const { image } = await loadImageFromFile(photoBlob);

      // Render 1080x1350 Canvas Card
      const canvasBlob = await renderBuilderCard({
        name: inputName,
        builderTitle: computedTitle,
        stack: inputStack,
        photoImage: image,
        idNumber: idNumber,
      });

      // Step 5: Final Graphic
      setGenerationProgress((p) => ({ ...p, finalGraphic: true }));

      const resultUrl = URL.createObjectURL(canvasBlob);
      setGeneratedDataUrl(resultUrl);

      await new Promise((r) => setTimeout(r, 200));
      setStep('result');
    } catch (err) {
      console.error('Canvas generation error:', err);
      alert('Failed to generate Builder ID card. Please try uploading your photo again.');
      setStep('details');
    }
  };

  const handleReset = () => {
    setStep('landing');
    setPhotoBlob(null);
    if (photoPreviewUrl) URL.revokeObjectURL(photoPreviewUrl);
    setPhotoPreviewUrl(null);
    setName('');
    setStack('');
    setBuilderTitle('');
    setIdNumber(generateIdNumber());
    if (generatedDataUrl) URL.revokeObjectURL(generatedDataUrl);
    setGeneratedDataUrl(null);
  };

  return (
    <div className="min-h-screen bg-transparent text-slate-100 flex flex-col font-sans selection:bg-amber-400 selection:text-slate-950">
      <Header onReset={handleReset} />

      <main className="flex-1">
        {step === 'landing' && <Landing onStart={() => setStep('upload')} />}

        {step === 'upload' && (
          <Upload
            onPhotoSelect={handlePhotoSelect}
            onBack={() => setStep('landing')}
          />
        )}

        {step === 'details' && (
          <BuilderForm
            photoUrl={photoPreviewUrl}
            idNumber={idNumber}
            initialName={name}
            initialStack={stack}
            onGenerate={handleGenerate}
            onBack={() => setStep('upload')}
          />
        )}

        {step === 'generating' && (
          <Generating progress={generationProgress} />
        )}

        {step === 'result' && generatedDataUrl && (
          <Result
            generatedDataUrl={generatedDataUrl}
            name={name}
            builderTitle={builderTitle}
            onReset={handleReset}
          />
        )}
      </main>

      <footer className="border-t border-emerald-500/20 bg-[#041f16]/70 backdrop-blur-md py-6 px-4 text-center font-mono text-xs text-emerald-200/80">
        <div className="max-w-5xl mx-auto flex flex-col sm:flex-row items-center justify-between gap-2">
          <span>HH GOA 2026 // BUILD CHALLENGE SUBMISSION</span>
          <span>#FrameInGoa · 100% Client-Side Engine</span>
        </div>
      </footer>
    </div>
  );
}

export default App;
