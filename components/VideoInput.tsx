"use client";

import { useRef, useState } from "react";
import { upload } from "@vercel/blob/client";
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
  const [uploading, setUploading] = useState(false);
  const [progress, setProgress] = useState(0);
  const [error, setError] = useState("");
  const fileInput = useRef<HTMLInputElement>(null);

  async function uploadVideo(file: File) {
    setUploading(true);
    setError("");
    setProgress(0);
    try {
      const blob = await upload(`media/${file.name}`, file, {
        access: "public",
        handleUploadUrl: "/api/media/upload",
        onUploadProgress: ({ percentage }) => setProgress(Math.round(percentage)),
      });
      setUrl(blob.url);
    } catch (cause) {
      setError(cause instanceof Error ? cause.message : "Upload failed.");
    } finally {
      setUploading(false);
      setProgress(0);
      if (fileInput.current) fileInput.current.value = "";
    }
  }

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

          <input
            ref={fileInput}
            type="file"
            accept="video/mp4,video/webm,video/quicktime"
            disabled={uploading}
            onChange={(event) => {
              const file = event.target.files?.[0];
              if (file) void uploadVideo(file);
            }}
            className="block w-full text-sm text-slate-ink file:mr-3 file:rounded-sm file:border-0 file:bg-ink file:px-4 file:py-2 file:text-[11px] file:font-semibold file:uppercase file:tracking-[0.16em] file:text-paper disabled:opacity-60"
          />
          <p className="text-xs text-slate-ink/70">
            {uploading
              ? `Uploading… ${progress}%`
              : "MP4, WebM or MOV up to 100 MB — uploaded straight to Vercel Blob."}
          </p>

          <div className="flex flex-col gap-2 sm:flex-row">
            <input
              value={link}
              onChange={(event) => setLink(event.target.value)}
              placeholder="…or paste a YouTube / Vimeo / .mp4 link"
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
