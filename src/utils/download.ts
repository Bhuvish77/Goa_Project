export function downloadCanvasImage(dataUrl: string, fileName = 'HH_GOA_2026_BUILDER_ID.png') {
  const link = document.createElement('a');
  link.download = fileName;
  link.href = dataUrl;
  document.body.appendChild(link);
  link.click();
  document.body.removeChild(link);
}

export async function shareBuilderCard(
  dataUrl: string,
  name: string,
  builderTitle: string
): Promise<{ shared: boolean; method: 'web-share' | 'twitter-intent' }> {
  const shareCaption = `Building in Goa. 🌴⚡\n\n${name} — ${builderTitle}\n\n#FrameInGoa #HackerHouseGoa`;

  // Try Web Share API with File (Mobile Chrome/Safari)
  if (navigator.share) {
    try {
      const response = await fetch(dataUrl);
      const blob = await response.blob();
      const file = new File([blob], 'HH_GOA_2026_BUILDER_ID.png', { type: 'image/png' });

      if (navigator.canShare && navigator.canShare({ files: [file] })) {
        await navigator.share({
          title: 'HH Goa 2026 Builder ID',
          text: shareCaption,
          files: [file],
        });
        return { shared: true, method: 'web-share' };
      } else {
        await navigator.share({
          title: 'HH Goa 2026 Builder ID',
          text: shareCaption,
        });
        return { shared: true, method: 'web-share' };
      }
    } catch (err: any) {
      if (err.name === 'AbortError') {
        return { shared: false, method: 'web-share' };
      }
      console.warn('Web Share API failed, falling back to X intent composer', err);
    }
  }

  // Fallback: Open Twitter / X Intent composer
  const twitterIntentUrl = `https://twitter.com/intent/tweet?text=${encodeURIComponent(shareCaption)}`;
  window.open(twitterIntentUrl, '_blank', 'noopener,noreferrer');
  return { shared: true, method: 'twitter-intent' };
}
