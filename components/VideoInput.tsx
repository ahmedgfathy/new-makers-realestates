"use client";

import { useState } from "react";
import { Field, inputClass } from "@/components/ui";
import { isVideoFile, videoEmbedUrl } from "@/lib/media";

type VideoInputProps = {
  name?: string;
  label?: string;
  defaultValue?: string;
};

export default function VideoInput({
  name = "videoUrl",
  label = "Video",
  defaultValue = "",
}: VideoInputProps) {
  const [url, setUrl] = useState(defaultValue);
  const [link, setLink] = useState("");
  const [error, setError] = useState("");

  function applyLink() {
    const value = link.trim();
    if (!value) return;
    if (!isVideoFile(value) && !videoEmbedUrl(value)) {
      setError("Use a YouTube, Vimeo or direct .mp4/.webm link.");
      return;
    }
    setUrl(value);
    setLink("");
    setError("");
  }

  const embed = url ? videoEmbedUrl(url) : null;
  const direct = url ? isVideoFile(url) : false;

  return (
    <div className="space-y-3 md:col-span-2">
      <Field label={label}>
        <div className="space-y-3">
          {url ? (
            <div className="overflow-hidden rounded-sm border border-ink/10 bg-ink">
              {embed ? (
                <iframe
                  src={embed}
                  title="Video preview"
                  className="aspect-video w-full"
                  allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                  allowFullScreen
                />
              ) : direct ? (
                <video src={url} controls playsInline className="aspect-video w-full" />
              ) : (
                <p className="px-4 py-6 text-center text-xs text-white/70">{url}</p>
              )}
            </div>
          ) : (
            <p className="rounded-sm border border-dashed border-ink/15 px-4 py-6 text-center text-[10px] uppercase tracking-[0.14em] text-slate-ink/60">
              No video attached
            </p>
          )}

          <div className="flex flex-col gap-2 sm:flex-row">
            <input
              value={link}
              onChange={(event) => setLink(event.target.value)}
              onKeyDown={(event) => {
                if (event.key === "Enter") {
                  event.preventDefault();
                  applyLink();
                }
              }}
              placeholder="Paste a YouTube / Vimeo / .mp4 link"
              className={inputClass}
            />
            <button
              type="button"
              onClick={applyLink}
              className="shrink-0 rounded-sm border border-ink/20 px-4 py-2 text-[10px] font-semibold uppercase tracking-[0.14em] text-ink transition hover:border-gold hover:text-gold"
            >
              Use link
            </button>
          </div>
          <p className="text-xs text-slate-ink/70">
            Videos are linked, not uploaded. Paste a YouTube or Vimeo page link, or a direct{" "}
            .mp4 / .webm URL.
          </p>

          {url && (
            <button
              type="button"
              onClick={() => {
                setUrl("");
                setError("");
              }}
              className="text-[10px] uppercase tracking-[0.14em] text-rose-600 hover:text-rose-800"
            >
              Remove video
            </button>
          )}
        </div>
      </Field>

      {error && <p className="text-xs font-medium text-red-600">{error}</p>}

      <input type="hidden" name={name} value={url} />
    </div>
  );
}
