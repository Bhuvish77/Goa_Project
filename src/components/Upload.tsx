import React, { useState, useRef } from 'react';
import { Upload as UploadIcon, Camera, AlertCircle, Loader2, ArrowLeft } from 'lucide-react';
import { convertIfHeic } from '../utils/heic';
import { loadImageFromFile } from '../utils/image';
import { CameraModal } from './CameraModal';

interface UploadProps {
  onPhotoSelect: (file: File | Blob, previewUrl: string) => void;
  onBack: () => void;
}

// Feature detect: mediaDevices.getUserMedia needs HTTPS or localhost
function isWebRTCAvailable(): boolean {
  try {
    return !!(
      typeof navigator !== 'undefined' &&
      navigator.mediaDevices &&
      typeof navigator.mediaDevices.getUserMedia === 'function'
    );
  } catch {
    return false;
  }
}


export const Upload: React.FC<UploadProps> = ({ onPhotoSelect, onBack }) => {
  const [isDragging, setIsDragging] = useState(false);
  const [loading, setLoading] = useState(false);
  const [loadingText, setLoadingText] = useState('');
  const [error, setError] = useState<string | null>(null);
  const [isCameraOpen, setIsCameraOpen] = useState(false);

  const fileInputRef = useRef<HTMLInputElement>(null);
  // Native camera capture input – used as fallback when WebRTC is unavailable
  const nativeCameraRef = useRef<HTMLInputElement>(null);

  const processFile = async (file: File | Blob) => {
    setError(null);
    setLoading(true);

    try {
      const fileName = 'name' in file ? (file as File).name.toLowerCase() : '';
      setLoadingText(
        fileName.endsWith('.heic') || fileName.endsWith('.heif')
          ? 'Converting HEIC photo at the shack...'
          : 'Processing image...'
      );

      const convertedBlob = await convertIfHeic(file as File);
      await loadImageFromFile(convertedBlob);
      const previewUrl = URL.createObjectURL(convertedBlob);
      onPhotoSelect(convertedBlob, previewUrl);
    } catch (err: any) {
      console.error(err);
      setError(err.message || 'Failed to process image. Please try another JPG, PNG, or HEIC photo.');
    } finally {
      setLoading(false);
    }
  };

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files[0]) {
      processFile(e.target.files[0]);
      // Reset so the same file can be re-selected
      e.target.value = '';
    }
  };

  const handleDragOver = (e: React.DragEvent) => { e.preventDefault(); setIsDragging(true); };
  const handleDragLeave = (e: React.DragEvent) => { e.preventDefault(); setIsDragging(false); };
  const handleDrop = (e: React.DragEvent) => {
    e.preventDefault();
    setIsDragging(false);
    if (e.dataTransfer.files && e.dataTransfer.files[0]) {
      processFile(e.dataTransfer.files[0]);
    }
  };

  const handleCameraClick = () => {
    if (isWebRTCAvailable()) {
      // WebRTC modal: works on localhost (desktop) and HTTPS (mobile)
      setIsCameraOpen(true);
    } else {
      // Fallback: trigger native OS camera picker
      // On mobile HTTP this opens the camera app; on desktop it opens the webcam via OS
      nativeCameraRef.current?.click();
    }
  };

  const handleCameraCapture = (blob: Blob) => {
    setIsCameraOpen(false);
    processFile(blob);
  };

  return (
    <div className="flex flex-col items-center justify-center min-h-[calc(100vh-80px)] px-4 py-8 max-w-2xl mx-auto">
      {/* Back Button */}
      <button
        onClick={onBack}
        className="self-start flex items-center gap-2 text-emerald-300/80 hover:text-white font-mono text-sm mb-6 transition-colors"
      >
        <ArrowLeft className="w-4 h-4" />
        <span>BACK TO LANDING</span>
      </button>

      {/* Page Title */}
      <div className="text-center mb-8">
        <h2 className="text-3xl sm:text-5xl font-black text-white tracking-tight mb-2">
          SHOW YOURSELF AT THE SHACK.
        </h2>
        <p className="text-sm sm:text-base text-emerald-200/80">
          Your photo becomes the center of your Goa Beach Builder ID.
        </p>
      </div>

      {/* Hidden file picker (gallery / filesystem) */}
      <input
        type="file"
        ref={fileInputRef}
        onChange={handleFileChange}
        accept="image/jpeg,image/png,image/heic,image/heif"
        className="hidden"
      />

      {/* Hidden native camera capture input (fallback for HTTP / older devices) */}
      <input
        type="file"
        ref={nativeCameraRef}
        onChange={handleFileChange}
        accept="image/*"
        capture="user"
        className="hidden"
      />

      {/* Large Drag & Drop / Click Target */}
      <div
        onDragOver={handleDragOver}
        onDragLeave={handleDragLeave}
        onDrop={handleDrop}
        onClick={() => !loading && fileInputRef.current?.click()}
        className={`w-full min-h-[280px] sm:min-h-[360px] rounded-3xl border-2 border-dashed transition-all flex flex-col items-center justify-center p-6 text-center cursor-pointer relative overflow-hidden backdrop-blur-xl ${
          isDragging
            ? 'border-amber-400 bg-amber-500/10 scale-[1.01]'
            : 'border-emerald-500/30 bg-[#05261b]/85 hover:border-emerald-400 hover:bg-[#062c1e]'
        }`}
      >
        {loading ? (
          <div className="flex flex-col items-center gap-4 text-amber-300">
            <Loader2 className="w-12 h-12 animate-spin" />
            <p className="font-mono text-sm font-semibold">{loadingText}</p>
          </div>
        ) : (
          <div className="flex flex-col items-center gap-4 max-w-sm">
            <div className="w-16 h-16 rounded-2xl bg-amber-400/10 border border-amber-400/30 flex items-center justify-center text-amber-300 shadow-xl shadow-amber-500/10">
              <UploadIcon className="w-8 h-8" />
            </div>
            <div>
              <p className="text-lg font-bold text-white mb-1">Drop your photo here</p>
              <p className="text-xs text-emerald-200/70 font-mono">or click to browse from gallery / files</p>
            </div>
            <div className="flex items-center justify-center gap-2 mt-2">
              {['JPG', 'PNG', 'HEIC'].map((fmt) => (
                <span key={fmt} className="px-2.5 py-1 rounded-md bg-[#073022] text-[11px] font-mono text-emerald-200 border border-emerald-500/30">
                  {fmt}
                </span>
              ))}
            </div>
          </div>
        )}
      </div>

      {/* Camera CTA */}
      <div className="w-full mt-6">
        <button
          onClick={handleCameraClick}
          disabled={loading}
          className="w-full py-4 px-6 rounded-2xl bg-gradient-to-r from-amber-400 via-yellow-400 to-emerald-500 font-bold text-slate-950 shadow-xl shadow-amber-500/20 hover:shadow-amber-400/40 hover:scale-[1.01] active:scale-[0.99] transition-all flex items-center justify-center gap-3 text-sm font-mono disabled:opacity-50"
        >
          <Camera className="w-5 h-5 stroke-[2.5]" />
          <span>TAKE PHOTO WITH CAMERA</span>
        </button>

        {/* Hint text */}
        <p className="text-center text-[11px] font-mono text-emerald-300/50 mt-2">
          {isWebRTCAvailable()
            ? 'Live camera viewfinder — browser will ask for permission'
            : 'Opens your device camera app'}
        </p>
      </div>

      {/* WebRTC Camera Modal */}
      <CameraModal
        isOpen={isCameraOpen}
        onClose={() => setIsCameraOpen(false)}
        onCapture={handleCameraCapture}
      />

      {/* Error Banner */}
      {error && (
        <div className="w-full mt-6 p-4 rounded-xl bg-rose-500/10 border border-rose-500/30 text-rose-300 flex items-start gap-3 text-xs font-mono">
          <AlertCircle className="w-5 h-5 shrink-0 mt-0.5" />
          <span>{error}</span>
        </div>
      )}
    </div>
  );
};
