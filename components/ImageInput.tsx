"use client";

import { useRef, useState } from "react";
import { Field, inputClass } from "@/components/ui";

type ImageInputProps = {
  name?: string;
  label?: string;
  defaultValue?: string;
  presets?: { value: string; label: string }[];
  allowEmpty?: boolean;
  hint?: string;
};

/** Longest side kept after resizing; bigger photos are scaled down. */
const MAX_DIMENSION = 1400;
/** Stop shrinking quality once the stored data URL is below this. */
const MAX_DATA_URL_LENGTH = 900 * 1024;
const MAX_SOURCE_MB = 25;

function encodeImage(canvas: HTMLCanvasElement, quality: number): string {
  const webp = canvas.toDataURL("image/webp", quality);
  if (webp.startsWith("data:image/webp")) return webp;

  // Browser without WebP encoding: JPEG cannot keep transparency, so flatten to white.
  const flat = document.createElement("canvas");
  flat.width = canvas.width;
  flat.height = canvas.height;
  const context = flat.getContext("2d");
  if (!context) throw new Error("Your browser could not process this image.");
  context.fillStyle = "#ffffff";
  context.fillRect(0, 0, flat.width, flat.height);
  context.drawImage(canvas, 0, 0);
  return flat.toDataURL("image/jpeg", quality);
}

async function shrinkToDataUrl(file: File): Promise<string> {
  const bitmap = await createImageBitmap(file);
  const scale = Math.min(1, MAX_DIMENSION / Math.max(bitmap.width, bitmap.height));
  const width = Math.max(1, Math.round(bitmap.width * scale));
  const height = Math.max(1, Math.round(bitmap.height * scale));

  const canvas = document.createElement("canvas");
  canvas.width = width;
  canvas.height = height;
  const context = canvas.getContext("2d");
  if (!context) throw new Error("Your browser could not process this image.");
  context.imageSmoothingQuality = "high";
  context.drawImage(bitmap, 0, 0, width, height);
  bitmap.close?.();

  let dataUrl = encodeImage(canvas, 0.8);
  for (const quality of [0.65, 0.5, 0.4]) {
    if (dataUrl.length <= MAX_DATA_URL_LENGTH) break;
    dataUrl = encodeImage(canvas, quality);
  }
  return dataUrl;
}

function humanSize(bytes: number): string {
  if (bytes < 1024) return `${bytes} B`;
  if (bytes < 1024 * 1024) return `${Math.round(bytes / 1024)} KB`;
  return `${(bytes / (1024 * 1024)).toFixed(1)} MB`;
}

export default function ImageInput({
  name = "image",
  label = "Cover image",
  defaultValue = "",
  presets = [],
  allowEmpty = false,
  hint = "JPG, PNG, WebP or AVIF.",
}: ImageInputProps) {
  const [url, setUrl] = useState(defaultValue);
  const [busy, setBusy] = useState(false);
  const [error, setError] = useState("");
  const fileInput = useRef<HTMLInputElement>(null);

  async function handleFile(file: File) {
    if (file.size > MAX_SOURCE_MB * 1024 * 1024) {
      setError(`Pick an image smaller than ${MAX_SOURCE_MB} MB.`);
      if (fileInput.current) fileInput.current.value = "";
      return;
    }

    setBusy(true);
    setError("");
    try {
      setUrl(await shrinkToDataUrl(file));
    } catch (cause) {
      setError(cause instanceof Error ? cause.message : "Could not read that image.");
    } finally {
      setBusy(false);
      if (fileInput.current) fileInput.current.value = "";
    }
  }

  const matchesPreset = presets.some((preset) => preset.value === url);
  const storedBytes = url.startsWith("data:") ? Math.round((url.length * 3) / 4) : 0;

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
              disabled={busy}
              onChange={(event) => {
                const file = event.target.files?.[0];
                if (file) void handleFile(file);
              }}
              className="block w-full text-sm text-slate-ink file:mr-3 file:rounded-sm file:border-0 file:bg-ink file:px-4 file:py-2 file:text-[11px] file:font-semibold file:uppercase file:tracking-[0.16em] file:text-paper disabled:opacity-60"
            />
            <p className="text-xs text-slate-ink/70">
              {busy
                ? "Resizing and compressing…"
                : `${hint} Resized to ${MAX_DIMENSION}px and compressed in your browser.`}
            </p>
            {storedBytes > 0 && (
              <p className="text-[11px] uppercase tracking-[0.12em] text-slate-ink/50">
                Stored size: {humanSize(storedBytes)}
              </p>
            )}
            {presets.length > 0 && (
              <select
                value={matchesPreset ? url : ""}
                disabled={busy}
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
