import { Field, inputClass } from "@/components/ui";
import ImageInput from "@/components/ImageInput";
import VideoInput from "@/components/VideoInput";

type DeveloperFormProps = {
  action: (formData: FormData) => Promise<void>;
  developer?: {
    id: string;
    name: string;
    description: string | null;
    website: string | null;
    image: string | null;
    videoUrl: string | null;
  };
};

export default function DeveloperForm({ action, developer }: DeveloperFormProps) {
  return (
    <form action={action} className="space-y-6 rounded-sm border border-ink/10 bg-white p-5 sm:p-6">
      {developer && <input type="hidden" name="id" value={developer.id} />}

      <div className="grid gap-4 md:grid-cols-2">
        <Field label="Developer name">
          <input name="name" required defaultValue={developer?.name} className={inputClass} />
        </Field>
        <Field label="Website">
          <input name="website" placeholder="https://" defaultValue={developer?.website ?? ""} className={inputClass} />
        </Field>
        <ImageInput
          label="Logo / image"
          defaultValue={developer?.image ?? ""}
          allowEmpty
          hint="PNG or SVG exported as PNG works best on a white card."
        />
      </div>

      <Field label="About the developer">
        <textarea name="description" rows={5} defaultValue={developer?.description ?? ""} className={inputClass} />
      </Field>

      <div className="grid gap-4">
        <VideoInput label="Developer video" defaultValue={developer?.videoUrl ?? ""} />
      </div>

      <button
        type="submit"
        className="rounded-sm bg-gold px-6 py-3 text-[11px] font-semibold uppercase tracking-[0.16em] text-ink"
      >
        {developer ? "Save changes" : "Create developer"}
      </button>
    </form>
  );
}
