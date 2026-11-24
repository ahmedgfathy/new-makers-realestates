import { IMAGE_PRESETS } from "@/lib/media";
import { Field, inputClass } from "@/components/ui";
import ImageInput from "@/components/ImageInput";

type AreaFormProps = {
  action: (formData: FormData) => Promise<void>;
  area?: {
    id: string;
    name: string;
    nameAr: string | null;
    description: string | null;
    image: string | null;
  };
};

export default function AreaForm({ action, area }: AreaFormProps) {
  return (
    <form action={action} className="space-y-6 rounded-sm border border-ink/10 bg-white p-5 sm:p-6">
      {area && <input type="hidden" name="id" value={area.id} />}

      <div className="grid gap-4 md:grid-cols-2">
        <Field label="Area name (English)">
          <input name="name" required defaultValue={area?.name} placeholder="New Zayed" className={inputClass} />
        </Field>
        <Field label="Area name (Arabic)">
          <input name="nameAr" dir="rtl" defaultValue={area?.nameAr ?? ""} placeholder="الشيخ زايد" className={inputClass} />
        </Field>
        <ImageInput
          label="Area cover image"
          defaultValue={area?.image ?? IMAGE_PRESETS[0].value}
          presets={IMAGE_PRESETS}
        />
      </div>

      <Field label="Description">
        <textarea
          name="description"
          rows={5}
          defaultValue={area?.description ?? ""}
          placeholder="What buyers should know about this district…"
          className={inputClass}
        />
      </Field>

      <p className="text-xs text-slate-ink">
        The area appears on the homepage, in the project filters and in the consultation form as soon as
        you save. The project count is calculated automatically.
      </p>

      <button
        type="submit"
        className="rounded-sm bg-gold px-6 py-3 text-[11px] font-semibold uppercase tracking-[0.16em] text-ink"
      >
        {area ? "Save changes" : "Create area"}
      </button>
    </form>
  );
}
