import type { RenderCardOptions } from '../types';
import { getSmartCoverCrop } from '../utils/image';

export async function renderBuilderCard(options: RenderCardOptions): Promise<Blob> {
  const { name, builderTitle, stack, photoImage, idNumber } = options;

  const canvas = document.createElement('canvas');
  canvas.width = 1080;
  canvas.height = 1350;
  const ctx = canvas.getContext('2d');

  if (!ctx) {
    throw new Error('Canvas 2D context not available');
  }

  // 1. LOAD AND DRAW GOA BEACH BACKGROUND ARTWORK
  let bgLoaded = false;
  try {
    const bgImg = new Image();
    bgImg.src = '/goa_beach_bg.jpg';
    await new Promise<void>((resolve, reject) => {
      bgImg.onload = () => resolve();
      bgImg.onerror = () => reject();
    });
    
    // Draw background artwork cover fit
    const bgCrop = getSmartCoverCrop(bgImg.width, bgImg.height, 1080, 1350);
    ctx.drawImage(
      bgImg,
      bgCrop.sx, bgCrop.sy, bgCrop.sWidth, bgCrop.sHeight,
      0, 0, 1080, 1350
    );
    bgLoaded = true;
  } catch (e) {
    console.warn('Could not load background artwork image on canvas, using emerald fallback', e);
  }

  if (!bgLoaded) {
    ctx.fillStyle = '#041f16';
    ctx.fillRect(0, 0, 1080, 1350);
  }

  // Emerald Dark Overlay for crystal clear typography legibility
  const darkOverlay = ctx.createLinearGradient(0, 0, 0, 1350);
  darkOverlay.addColorStop(0, 'rgba(4, 31, 22, 0.88)');
  darkOverlay.addColorStop(0.5, 'rgba(3, 20, 14, 0.75)');
  darkOverlay.addColorStop(1, 'rgba(4, 31, 22, 0.92)');
  ctx.fillStyle = darkOverlay;
  ctx.fillRect(0, 0, 1080, 1350);

  // Tropical Sun Glow Effect (Upper Center)
  const sunGlow = ctx.createRadialGradient(540, 200, 10, 540, 200, 500);
  sunGlow.addColorStop(0, 'rgba(255, 208, 0, 0.25)');
  sunGlow.addColorStop(0.5, 'rgba(16, 185, 129, 0.1)');
  sunGlow.addColorStop(1, 'rgba(0, 0, 0, 0)');
  ctx.fillStyle = sunGlow;
  ctx.fillRect(0, 0, 1080, 1350);

  // Cybernetic Mesh / Grid Overlay
  ctx.strokeStyle = 'rgba(255, 255, 255, 0.04)';
  ctx.lineWidth = 1;
  const gridSize = 40;
  for (let x = 0; x <= 1080; x += gridSize) {
    ctx.beginPath();
    ctx.moveTo(x, 0);
    ctx.lineTo(x, 1350);
    ctx.stroke();
  }
  for (let y = 0; y <= 1350; y += gridSize) {
    ctx.beginPath();
    ctx.moveTo(0, y);
    ctx.lineTo(1080, y);
    ctx.stroke();
  }

  // 2. HEADER AREA (HH GOA BEACH SHACK Branding)
  const marginX = 60;
  const headerY = 70;

  // Header Title Left
  ctx.fillStyle = '#FFD000';
  ctx.font = '800 22px "Courier New", Courier, monospace';
  ctx.fillText('☀ HH GOA // BEACH SHACK 2026', marginX, headerY);

  ctx.fillStyle = '#A7F3D0';
  ctx.font = '600 16px "Courier New", Courier, monospace';
  ctx.fillText('15.2993° N, 74.1240° E', marginX + 410, headerY);

  // Header Title Right
  ctx.fillStyle = '#FFFFFF';
  ctx.font = '800 24px "Courier New", Courier, monospace';
  ctx.textAlign = 'right';
  ctx.fillText('HH/026', 1080 - marginX, headerY);
  ctx.textAlign = 'left';

  // Divider Line
  ctx.strokeStyle = 'rgba(255, 208, 0, 0.4)';
  ctx.lineWidth = 2;
  ctx.beginPath();
  ctx.moveTo(marginX, headerY + 20);
  ctx.lineTo(1080 - marginX, headerY + 20);
  ctx.stroke();

  // 3. PHOTO HERO SECTION (Smart Crop)
  const photoX = marginX;
  const photoY = 120;
  const photoW = 960;
  const photoH = 640;

  // Crop calculation
  const crop = getSmartCoverCrop(photoImage.width, photoImage.height, photoW, photoH);

  ctx.save();
  // Rounded corner clip for hero photo
  const radius = 16;
  ctx.beginPath();
  ctx.moveTo(photoX + radius, photoY);
  ctx.lineTo(photoX + photoW - radius, photoY);
  ctx.quadraticCurveTo(photoX + photoW, photoY, photoX + photoW, photoY + radius);
  ctx.lineTo(photoX + photoW, photoY + photoH - radius);
  ctx.quadraticCurveTo(photoX + photoW, photoY + photoH, photoX + photoW - radius, photoY + photoH);
  ctx.lineTo(photoX + radius, photoY + photoH);
  ctx.quadraticCurveTo(photoX, photoY + photoH, photoX, photoY + photoH - radius);
  ctx.lineTo(photoX, photoY + radius);
  ctx.quadraticCurveTo(photoX, photoY, photoX + radius, photoY);
  ctx.closePath();
  ctx.clip();

  // Draw image high quality
  ctx.imageSmoothingEnabled = true;
  ctx.imageSmoothingQuality = 'high';
  ctx.drawImage(
    photoImage,
    crop.sx, crop.sy, crop.sWidth, crop.sHeight,
    photoX, photoY, photoW, photoH
  );

  // Bottom photo vignette fade to background
  const photoFade = ctx.createLinearGradient(photoX, photoY + photoH - 220, photoX, photoY + photoH);
  photoFade.addColorStop(0, 'rgba(4, 31, 22, 0)');
  photoFade.addColorStop(0.7, 'rgba(4, 31, 22, 0.7)');
  photoFade.addColorStop(1, 'rgba(4, 31, 22, 0.98)');
  ctx.fillStyle = photoFade;
  ctx.fillRect(photoX, photoY + photoH - 220, photoW, 220);

  ctx.restore();

  // Photo Frame Border & Tech Crosshairs
  ctx.strokeStyle = 'rgba(255, 208, 0, 0.6)';
  ctx.lineWidth = 2;
  ctx.strokeRect(photoX, photoY, photoW, photoH);

  // Corner tech ticks
  const tickLen = 20;
  ctx.strokeStyle = '#FFD000';
  ctx.lineWidth = 4;
  // Top-Left
  ctx.beginPath();
  ctx.moveTo(photoX - 4, photoY + tickLen);
  ctx.lineTo(photoX - 4, photoY - 4);
  ctx.lineTo(photoX + tickLen, photoY - 4);
  ctx.stroke();
  // Top-Right
  ctx.beginPath();
  ctx.moveTo(photoX + photoW + 4 - tickLen, photoY - 4);
  ctx.lineTo(photoX + photoW + 4, photoY - 4);
  ctx.lineTo(photoX + photoW + 4, photoY + tickLen);
  ctx.stroke();
  // Bottom-Left
  ctx.beginPath();
  ctx.moveTo(photoX - 4, photoY + photoH - tickLen);
  ctx.lineTo(photoX - 4, photoY + photoH + 4);
  ctx.lineTo(photoX + tickLen, photoY + photoH + 4);
  ctx.stroke();
  // Bottom-Right
  ctx.beginPath();
  ctx.moveTo(photoX + photoW + 4 - tickLen, photoY + photoH + 4);
  ctx.lineTo(photoX + photoW + 4, photoY + photoH + 4);
  ctx.lineTo(photoX + photoW + 4, photoY + photoH - tickLen);
  ctx.stroke();

  // Floating Photo Badge (Top Right of Photo)
  const badgeX = photoX + photoW - 240;
  const badgeY = photoY + 24;
  ctx.fillStyle = 'rgba(4, 31, 22, 0.9)';
  ctx.strokeStyle = '#FFD000';
  ctx.lineWidth = 1.5;
  ctx.beginPath();
  ctx.roundRect(badgeX, badgeY, 216, 38, 19);
  ctx.fill();
  ctx.stroke();

  ctx.fillStyle = '#FFD000';
  ctx.font = '800 13px "Courier New", Courier, monospace';
  ctx.fillText('VERIFIED BEACH BUILDER', badgeX + 18, badgeY + 24);

  // 4. USER DETAILS SECTION
  let contentY = photoY + photoH + 40;

  // BUILDER NAME
  const displayName = (name || 'GOA BUILDER').toUpperCase();
  ctx.fillStyle = '#FFFFFF';

  let nameFontSize = 52;
  if (displayName.length > 22) nameFontSize = 40;
  if (displayName.length > 30) nameFontSize = 32;

  ctx.font = `900 ${nameFontSize}px system-ui, -apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, sans-serif`;
  ctx.fillText(displayName, marginX, contentY);

  contentY += 50;

  // GENERATED BUILDER TITLE (Golden Sun Gradient Badge)
  const displayTitle = (builderTitle || 'THE PROTOCOL BUILDER').toUpperCase();
  ctx.font = '800 24px system-ui, -apple-system, BlinkMacSystemFont, sans-serif';
  const titleMetrics = ctx.measureText(displayTitle);
  const titlePillW = Math.max(360, titleMetrics.width + 48);
  const titlePillH = 48;

  // Pill background
  const pillGrad = ctx.createLinearGradient(marginX, contentY, marginX + titlePillW, contentY + titlePillH);
  pillGrad.addColorStop(0, '#FFD000');
  pillGrad.addColorStop(0.5, '#F59E0B');
  pillGrad.addColorStop(1, '#10B981');
  ctx.fillStyle = pillGrad;
  ctx.beginPath();
  ctx.roundRect(marginX, contentY, titlePillW, titlePillH, 8);
  ctx.fill();

  // Pill Text
  ctx.fillStyle = '#041f16';
  ctx.fillText(`⚡ ${displayTitle}`, marginX + 20, contentY + 33);

  contentY += 80;

  // STACK / ROLE SECTION
  ctx.fillStyle = '#A7F3D0';
  ctx.font = '700 15px "Courier New", Courier, monospace';
  ctx.fillText('STACK / ROLE', marginX, contentY);

  contentY += 28;

  const displayStack = stack || 'AI + Beach Hacks + Web3';
  ctx.fillStyle = '#FFFFFF';
  ctx.font = '600 24px "Courier New", Courier, monospace';

  const maxStackW = 960;
  if (ctx.measureText(displayStack).width > maxStackW) {
    const words = displayStack.split(' ');
    let line = '';
    for (let n = 0; n < words.length; n++) {
      const testLine = line + words[n] + ' ';
      if (ctx.measureText(testLine).width > maxStackW && n > 0) {
        ctx.fillText(line, marginX, contentY);
        line = words[n] + ' ';
        contentY += 30;
      } else {
        line = testLine;
      }
    }
    ctx.fillText(line, marginX, contentY);
  } else {
    ctx.fillText(displayStack, marginX, contentY);
  }

  // 5. TECHNICAL METADATA GRID (Bottom Box)
  const metaY = 1120;
  const metaW = 960;
  const metaH = 120;

  ctx.fillStyle = 'rgba(5, 38, 27, 0.85)';
  ctx.strokeStyle = 'rgba(16, 185, 129, 0.4)';
  ctx.lineWidth = 1;
  ctx.beginPath();
  ctx.roundRect(marginX, metaY, metaW, metaH, 12);
  ctx.fill();
  ctx.stroke();

  // Grid Divider lines
  const colW = metaW / 4;
  for (let i = 1; i < 4; i++) {
    ctx.strokeStyle = 'rgba(16, 185, 129, 0.2)';
    ctx.beginPath();
    ctx.moveTo(marginX + colW * i, metaY + 15);
    ctx.lineTo(marginX + colW * i, metaY + metaH - 15);
    ctx.stroke();
  }

  // Column 1: STATUS
  ctx.fillStyle = '#A7F3D0';
  ctx.font = '600 13px "Courier New", Courier, monospace';
  ctx.fillText('STATUS', marginX + 24, metaY + 40);
  ctx.fillStyle = '#34D399';
  ctx.font = '700 20px system-ui, sans-serif';
  ctx.fillText('SHIPPING ⚡', marginX + 24, metaY + 76);

  // Column 2: LOCATION
  ctx.fillStyle = '#A7F3D0';
  ctx.font = '600 13px "Courier New", Courier, monospace';
  ctx.fillText('LOCATION', marginX + colW + 24, metaY + 40);
  ctx.fillStyle = '#FFD000';
  ctx.font = '700 20px system-ui, sans-serif';
  ctx.fillText('GOA 🌴', marginX + colW + 24, metaY + 76);

  // Column 3: HOUSE
  ctx.fillStyle = '#A7F3D0';
  ctx.font = '600 13px "Courier New", Courier, monospace';
  ctx.fillText('HOUSE', marginX + colW * 2 + 24, metaY + 40);
  ctx.fillStyle = '#FFFFFF';
  ctx.font = '700 20px system-ui, sans-serif';
  ctx.fillText('HH26', marginX + colW * 2 + 24, metaY + 76);

  // Column 4: ID NO
  ctx.fillStyle = '#A7F3D0';
  ctx.font = '600 13px "Courier New", Courier, monospace';
  ctx.fillText('ID NUMBER', marginX + colW * 3 + 24, metaY + 40);
  ctx.fillStyle = '#F3F4F6';
  ctx.font = '700 18px "Courier New", Courier, monospace';
  ctx.fillText(idNumber, marginX + colW * 3 + 24, metaY + 76);

  // 6. FOOTER & HASHTAG
  const footerY = 1290;

  ctx.fillStyle = '#A7F3D0';
  ctx.font = '700 16px "Courier New", Courier, monospace';
  ctx.fillText('HACKER HOUSE GOA / 2026', marginX, footerY);

  // Simulated Barcode Graphic Left
  const barcodeX = marginX + 310;
  ctx.fillStyle = 'rgba(255, 208, 0, 0.7)';
  const barHeights = [18, 12, 22, 16, 24, 10, 18, 24, 14, 20, 12, 22, 16, 24];
  let curBarX = barcodeX;
  for (let b = 0; b < barHeights.length; b++) {
    const bw = (b % 2 === 0) ? 3 : 2;
    ctx.fillRect(curBarX, footerY - barHeights[b] + 4, bw, barHeights[b]);
    curBarX += bw + 3;
  }

  // Right Hashtag
  ctx.fillStyle = '#FFD000';
  ctx.font = '800 22px system-ui, sans-serif';
  ctx.textAlign = 'right';
  ctx.fillText('#FrameInGoa', 1080 - marginX, footerY);
  ctx.textAlign = 'left';

  // 7. SUBTLE NOISE/GRAIN TEXTURE OVERLAY
  const imgData = ctx.getImageData(0, 0, 1080, 1350);
  const data = imgData.data;
  for (let i = 0; i < data.length; i += 4) {
    const noise = (Math.random() - 0.5) * 10;
    data[i] = Math.min(255, Math.max(0, data[i] + noise));
    data[i + 1] = Math.min(255, Math.max(0, data[i + 1] + noise));
    data[i + 2] = Math.min(255, Math.max(0, data[i + 2] + noise));
  }
  ctx.putImageData(imgData, 0, 0);

  // Return PNG Blob
  return new Promise((resolve, reject) => {
    canvas.toBlob((blob) => {
      if (blob) {
        resolve(blob);
      } else {
        reject(new Error('Canvas blob generation failed'));
      }
    }, 'image/png');
  });
}
