"use client";

import { useRef, useState } from "react";
import { Field, inputClass } from "@/components/ui";

type ProjectImageFieldProps = {
  defaultValue: string;
  presets: { value: string; label: string }[];
};

export default function ProjectImageField({ defaultValue, presets }: ProjectImageFieldProps) {
  const [url, setUrl] = useState(defaultValue);
  const [uploading, setUploading] = useState(false);
  const [error, setError] = useState("");
  const fileInput = useRef<HTMLInputElement>(null);

  async function upload(file: File) {
    setUploading(true);
    setError("");
    const body = new FormData();
    body.append("file", file);

    try {
      const response = await fetch("/api/project-image", { method: "POST", body });
      const data = (await response.json().catch(() => ({}))) as { url?: string; error?: string };
      if (!response.ok || !data.url) {
        throw new Error(data.error ?? "Upload failed.");
      }
      setUrl(data.url);
    } catch (cause) {
      setError(cause instanceof Error ? cause.message : "Upload failed.");
    } finally {
      setUploading(false);
      if (fileInput.current) fileInput.current.value = "";
    }
  }

  const matchesPreset = presets.some((preset) => preset.value === url);

  return (
    <div className="space-y-3 md:col-span-2">
      <Field label="Cover image">
        <div className="flex flex-col gap-3 sm:flex-row">
          <div className="h-28 w-full shrink-0 overflow-hidden rounded-sm border border-ink/10 bg-paper sm:w-44">
            {/* eslint-disable-next-line @next/next/no-img-element */}
            <img src={url} alt="Project cover preview" className="h-full w-full object-cover" />
          </div>
          <div className="flex-1 space-y-2">
            <input
              ref={fileInput}
              type="file"
              accept="image/jpeg,image/png,image/webp,image/avif"
              disabled={uploading}
              onChange={(event) => {
                const file = event.target.files?.[0];
                if (file) void upload(file);
              }}
              className="block w-full text-sm text-slate-ink file:mr-3 file:rounded-sm file:border-0 file:bg-ink file:px-4 file:py-2 file:text-[11px] file:font-semibold file:uppercase file:tracking-[0.16em] file:text-paper disabled:opacity-60"
            />
            <p className="text-xs text-slate-ink/70">
              {uploading
                ? "Uploading to Vercel Blob…"
                : "JPG, PNG, WebP or AVIF up to 4 MB. Uploading replaces the image below."}
            </p>
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
          </div>
        </div>
      </Field>

      {error && <p className="text-xs font-medium text-red-600">{error}</p>}

      <input type="hidden" name="image" value={url} />
    </div>
  );
}
