import React, { useEffect, useRef, useState } from 'react';
import { Camera, X, RefreshCw, AlertCircle } from 'lucide-react';

interface CameraModalProps {
  isOpen: boolean;
  onClose: () => void;
  onCapture: (blob: Blob) => void;
}

export const CameraModal: React.FC<CameraModalProps> = ({
  isOpen,
  onClose,
  onCapture,
}) => {
  const videoRef = useRef<HTMLVideoElement>(null);
  const [stream, setStream] = useState<MediaStream | null>(null);
  const [cameraError, setCameraError] = useState<string | null>(null);
  const [facingMode, setFacingMode] = useState<'user' | 'environment'>('user');
  const [capturing, setCapturing] = useState(false);

  const startCamera = async (mode: 'user' | 'environment') => {
    setCameraError(null);

    // Feature detection check
    if (!navigator.mediaDevices || typeof navigator.mediaDevices.getUserMedia !== 'function') {
      setCameraError(
        'Direct live camera streaming requires HTTPS or localhost. Please open site via HTTPS or use file upload.'
      );
      return;
    }

    try {
      // Stop existing stream if any
      if (stream) {
        stream.getTracks().forEach((track) => track.stop());
      }

      const newStream = await navigator.mediaDevices.getUserMedia({
        video: {
          facingMode: mode,
          width: { ideal: 1280 },
          height: { ideal: 960 },
        },
        audio: false,
      });

      setStream(newStream);
      if (videoRef.current) {
        videoRef.current.srcObject = newStream;
      }
    } catch (err: any) {
      console.error('Camera access error:', err);
      if (err.name === 'NotAllowedError' || err.name === 'PermissionDeniedError') {
        setCameraError('Camera permission was denied. Please allow camera access in your browser settings.');
      } else if (err.name === 'NotFoundError' || err.name === 'DevicesNotFoundError') {
        setCameraError('No camera device found on your system.');
      } else {
        setCameraError(err.message || 'Unable to access device camera.');
      }
    }
  };

  useEffect(() => {
    if (isOpen) {
      startCamera(facingMode);
    } else {
      if (stream) {
        stream.getTracks().forEach((track) => track.stop());
        setStream(null);
      }
    }

    return () => {
      if (stream) {
        stream.getTracks().forEach((track) => track.stop());
      }
    };
  }, [isOpen, facingMode]);

  const handleSnap = () => {
    if (!videoRef.current) return;
    setCapturing(true);

    const video = videoRef.current;
    const canvas = document.createElement('canvas');
    canvas.width = video.videoWidth || 1280;
    canvas.height = video.videoHeight || 960;

    const ctx = canvas.getContext('2d');
    if (ctx) {
      // If front camera, mirror image horizontally for natural selfie feel
      if (facingMode === 'user') {
        ctx.translate(canvas.width, 0);
        ctx.scale(-1, 1);
      }
      ctx.drawImage(video, 0, 0, canvas.width, canvas.height);

      canvas.toBlob(
        (blob) => {
          setCapturing(false);
          if (blob) {
            if (stream) {
              stream.getTracks().forEach((track) => track.stop());
            }
            onCapture(blob);
          }
        },
        'image/jpeg',
        0.95
      );
    } else {
      setCapturing(false);
    }
  };

  const toggleFacingMode = () => {
    setFacingMode((prev) => (prev === 'user' ? 'environment' : 'user'));
  };

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-950/90 backdrop-blur-xl animate-fade-in font-sans">
      <div className="relative w-full max-w-xl bg-[#041f16] border border-emerald-500/40 rounded-3xl overflow-hidden shadow-2xl flex flex-col">
        {/* Header */}
        <div className="flex items-center justify-between p-4 border-b border-emerald-500/20 bg-[#05261b]/80 font-mono text-xs text-amber-300">
          <div className="flex items-center gap-2">
            <span className="w-2.5 h-2.5 rounded-full bg-rose-500 animate-pulse" />
            <span className="font-bold">LIVE CAMERA VIEWFINDER</span>
          </div>
          <button
            onClick={onClose}
            className="p-1.5 rounded-xl text-emerald-300/70 hover:text-white hover:bg-emerald-500/20 transition-colors"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Viewfinder Video Area */}
        <div className="relative aspect-[4/3] bg-black flex items-center justify-center overflow-hidden">
          {cameraError ? (
            <div className="p-6 text-center text-rose-300 flex flex-col items-center gap-3 font-mono text-xs">
              <AlertCircle className="w-10 h-10 text-rose-400" />
              <span>{cameraError}</span>
            </div>
          ) : (
            <>
              <video
                ref={videoRef}
                autoPlay
                playsInline
                muted
                className={`w-full h-full object-cover ${facingMode === 'user' ? 'scale-x-[-1]' : ''}`}
              />

              {/* Viewfinder Framing Overlay */}
              <div className="absolute inset-4 border border-amber-400/40 rounded-2xl pointer-events-none flex flex-col justify-between p-3">
                <div className="flex justify-between font-mono text-[10px] text-amber-400/80">
                  <span>+ CAM // 01</span>
                  <span>1080p</span>
                </div>
                <div className="flex justify-between font-mono text-[10px] text-amber-400/80">
                  <span>GOA BEACH SHACK</span>
                  <span>CENTER SUBJECT</span>
                </div>
              </div>
            </>
          )}
        </div>

        {/* Action Controls */}
        <div className="p-6 bg-[#05261b] flex items-center justify-around gap-4 border-t border-emerald-500/20">
          {/* Switch Camera Button */}
          <button
            type="button"
            onClick={toggleFacingMode}
            disabled={!!cameraError || capturing}
            className="p-3.5 rounded-2xl bg-[#073022] border border-emerald-500/30 text-emerald-200 hover:text-amber-300 hover:border-amber-400/50 transition-all disabled:opacity-50"
            title="Switch Front/Back Camera"
          >
            <RefreshCw className="w-5 h-5" />
          </button>

          {/* Shutter Button */}
          <button
            type="button"
            onClick={handleSnap}
            disabled={!!cameraError || capturing}
            className="w-16 h-16 rounded-full bg-gradient-to-tr from-amber-400 via-yellow-400 to-emerald-400 p-[3px] shadow-xl shadow-amber-500/30 hover:scale-105 active:scale-95 transition-transform disabled:opacity-50"
          >
            <div className="w-full h-full rounded-full bg-slate-950 flex items-center justify-center text-amber-400 hover:bg-amber-400 hover:text-slate-950 transition-colors">
              <Camera className="w-6 h-6 stroke-[2.5]" />
            </div>
          </button>

          {/* Close / Cancel */}
          <button
            type="button"
            onClick={onClose}
            className="px-4 py-3 rounded-2xl bg-[#073022] border border-emerald-500/30 font-mono text-xs text-emerald-300 hover:text-white transition-colors"
          >
            CANCEL
          </button>
        </div>
      </div>
    </div>
  );
};
