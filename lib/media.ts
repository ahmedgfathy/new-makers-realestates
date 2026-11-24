export const IMAGE_PRESETS = [
  { value: "/images/capital.jpg", label: "Capital compound" },
  { value: "/images/coast.jpg", label: "Coastal resort" },
  { value: "/images/villa.jpg", label: "Villa" },
  { value: "/images/hero.jpg", label: "Aerial compound" },
];

/** Turns a YouTube/Vimeo watch link into an embeddable player URL. */
export function videoEmbedUrl(url: string): string | null {
  const youtube = url.match(
    /(?:youtube\.com\/(?:watch\?v=|embed\/|shorts\/|live\/)|youtu\.be\/)([A-Za-z0-9_-]{11})/
  );
  if (youtube) return `https://www.youtube.com/embed/${youtube[1]}`;

  const vimeo = url.match(/vimeo\.com\/(?:video\/)?(\d+)/);
  if (vimeo) return `https://player.vimeo.com/video/${vimeo[1]}`;

  return null;
}

/** True when the URL points at a video file that a <video> tag can play. */
export function isVideoFile(url: string): boolean {
  if (/\.(mp4|webm|ogv|ogg|mov|m4v)(\?.*)?$/i.test(url)) return true;
  return /blob\.vercel-storage\.com/i.test(url);
}
