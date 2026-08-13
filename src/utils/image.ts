export function loadImageFromFile(file: File | Blob): Promise<{ image: HTMLImageElement; aspect: number }> {
  return new Promise((resolve, reject) => {
    const url = URL.createObjectURL(file);
    const img = new Image();

    img.onload = () => {
      const aspect = img.width / img.height;
      resolve({ image: img, aspect });
    };

    img.onerror = () => {
      URL.revokeObjectURL(url);
      reject(new Error('Failed to load image file. File may be corrupted or unsupported.'));
    };

    img.src = url;
  });
}

export interface CropRect {
  sx: number;
  sy: number;
  sWidth: number;
  sHeight: number;
}

/**
 * Calculates cover crop coordinates from source image to fill target aspect ratio.
 * Ensures off-center or portrait/landscape photos fill the target frame without stretching.
 */
export function getSmartCoverCrop(
  srcWidth: number,
  srcHeight: number,
  targetWidth: number,
  targetHeight: number
): CropRect {
  const srcAspect = srcWidth / srcHeight;
  const targetAspect = targetWidth / targetHeight;

  let sWidth = srcWidth;
  let sHeight = srcHeight;
  let sx = 0;
  let sy = 0;

  if (srcAspect > targetAspect) {
    // Source is wider than target frame: crop sides
    sWidth = srcHeight * targetAspect;
    sx = (srcWidth - sWidth) / 2;
  } else {
    // Source is taller than target frame: crop top/bottom
    // For portraits, offset crop slightly upwards (35% from top instead of 50%) to prioritize faces
    sHeight = srcWidth / targetAspect;
    sy = (srcHeight - sHeight) * 0.35;
    // Keep bounds in range
    sy = Math.max(0, Math.min(sy, srcHeight - sHeight));
  }

  return { sx, sy, sWidth, sHeight };
}
