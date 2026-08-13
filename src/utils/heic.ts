/**
 * Utility to process user uploaded files, automatically converting HEIC/HEIF files to standard PNG/Blob.
 */
export async function convertIfHeic(file: File): Promise<File | Blob> {
  const fileName = file.name.toLowerCase();
  const fileType = file.type.toLowerCase();

  const isHeic =
    fileName.endsWith('.heic') ||
    fileName.endsWith('.heif') ||
    fileType === 'image/heic' ||
    fileType === 'image/heif';

  if (!isHeic) {
    return file;
  }

  try {
    const heic2anyModule = await import('heic2any');
    const heic2any = heic2anyModule.default || heic2anyModule;

    const convertedBlob = await heic2any({
      blob: file,
      toType: 'image/jpeg',
      quality: 0.92,
    });

    if (Array.isArray(convertedBlob)) {
      return convertedBlob[0];
    }
    return convertedBlob;
  } catch (error) {
    console.warn('heic2any conversion failed, returning original file for fallback canvas handling', error);
    return file;
  }
}
