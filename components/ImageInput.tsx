"use client";

import { useRef, useState } from "react";
import { upload } from "@vercel/blob/client";
import { Field, inputClass } from "@/components/ui";

type ImageInputProps = {
  name?: string;
  label?: string;
  defaultValue?: string;
  presets?: { value: string; label: string }[];
  allowEmpty?: boolean;
  hint?: string;
};

const MAX_IMAGE_MB = 25;

export default function ImageInput({
  name = "image",
  label = "Cover image",
  defaultValue = "",
  presets = [],
  allowEmpty = false,
  hint = "JPG, PNG, WebP or AVIF.",
}: ImageInputProps) {
  const [url, setUrl] = useState(defaultValue);
  const [uploading, setUploading] = useState(false);
  const [progress, setProgress] = useState(0);
  const [error, setError] = useState("");
  const fileInput = useRef<HTMLInputElement>(null);

  async function uploadImage(file: File) {
    if (file.size > MAX_IMAGE_MB * 1024 * 1024) {
      setError(`Images must be ${MAX_IMAGE_MB} MB or smaller.`);
      if (fileInput.current) fileInput.current.value = "";
      return;
    }

    setUploading(true);
    setError("");
    setProgress(0);

    try {
      const blob = await upload(`images/${file.name}`, file, {
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

  const matchesPreset = presets.some((preset) => preset.value === url);

  return (
    <div className="space-y-3 md:col-span-2">
      <Field label={label}>
        <div className="flex flex-col gap-3 sm:flex-row">
          <div className="flex h-28 w-full shrink-0 items-center justify-center overflow-hidden rounded-sm border border-ink/10 bg-paper sm:w-44">
            {url ? (
              /* eslint-disable-next-line @next/next/no-img-element */
              <img src={url} alt="Image preview" className="h-full w-full object-cover" />
            ) : (
              <span className="px-3 text-center text-[10px] uppercase tracking-[0.14em] text-slate-ink/60">
                No image
              </span>
            )}
          </div>
          <div className="flex-1 space-y-2">
            <input
              ref={fileInput}
              type="file"
              accept="image/jpeg,image/png,image/webp,image/avif"
              disabled={uploading}
              onChange={(event) => {
                const file = event.target.files?.[0];
                if (file) void uploadImage(file);
              }}
              className="block w-full text-sm text-slate-ink file:mr-3 file:rounded-sm file:border-0 file:bg-ink file:px-4 file:py-2 file:text-[11px] file:font-semibold file:uppercase file:tracking-[0.16em] file:text-paper disabled:opacity-60"
            />
            <p className="text-xs text-slate-ink/70">
              {uploading
                ? `Uploading… ${progress}%`
                : `${hint} Up to ${MAX_IMAGE_MB} MB — uploaded straight to Vercel Blob.`}
            </p>
            {presets.length > 0 && (
              <select
                value={matchesPreset ? url : ""}
                disabled={uploading}
                onChange={(event) => {
                  if (event.target.value) {
                    setUrl(event.target.value);
                    setError("");
                  }
                }}
                className={inputClass}
              >
                <option value="">Or pick a stock image…</option>
                {presets.map((preset) => (
                  <option key={preset.value} value={preset.value}>
                    {preset.label}
                  </option>
                ))}
              </select>
            )}
            {allowEmpty && url && (
              <button
                type="button"
                onClick={() => setUrl("")}
                className="text-[10px] uppercase tracking-[0.14em] text-rose-600 hover:text-rose-800"
              >
                Remove image
              </button>
            )}
          </div>
        </div>
      </Field>

      {error && <p className="text-xs font-medium text-red-600">{error}</p>}

      <input type="hidden" name={name} value={url} />
    </div>
  );
}
