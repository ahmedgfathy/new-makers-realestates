import { handleUpload, type HandleUploadBody } from "@vercel/blob/client";
import { NextResponse } from "next/server";
import { getCurrentUser } from "@/lib/auth";

export const runtime = "nodejs";
export const dynamic = "force-dynamic";

const IMAGE_TYPES = ["image/jpeg", "image/png", "image/webp", "image/avif"];
const VIDEO_TYPES = ["video/mp4", "video/webm", "video/quicktime"];
const IMAGE_MAX_BYTES = 25 * 1024 * 1024;
const VIDEO_MAX_BYTES = 100 * 1024 * 1024;

const MISSING_TOKEN =
  "Media storage is not configured on this deployment. Add BLOB_READ_WRITE_TOKEN in Vercel → Project → Settings → Environment Variables (Storage → Blob creates it), then redeploy.";

export async function POST(request: Request) {
  const body = (await request.json().catch(() => null)) as HandleUploadBody | null;
  if (!body) {
    return NextResponse.json({ error: "Invalid upload request." }, { status: 400 });
  }

  if (!process.env.BLOB_READ_WRITE_TOKEN) {
    return NextResponse.json({ error: MISSING_TOKEN }, { status: 503 });
  }

  try {
    const result = await handleUpload({
      body,
      request,
      onBeforeGenerateToken: async (pathname) => {
        const user = await getCurrentUser();
        if (!user) throw new Error("Sign in to upload media.");

        const isImage = /\.(jpe?g|png|webp|avif)$/i.test(pathname);
        return {
          allowedContentTypes: isImage ? IMAGE_TYPES : VIDEO_TYPES,
          maximumSizeInBytes: isImage ? IMAGE_MAX_BYTES : VIDEO_MAX_BYTES,
          addRandomSuffix: true,
        };
      },
      onUploadCompleted: async () => {},
    });
    return NextResponse.json(result);
  } catch (error) {
    const message = error instanceof Error ? error.message : "Upload failed.";
    if (/read-write token/i.test(message)) {
      return NextResponse.json({ error: MISSING_TOKEN }, { status: 503 });
    }
    return NextResponse.json({ error: message }, { status: 400 });
  }
}
