import { PROJECT_CATEGORIES } from "@/lib/constants";
import { Field, inputClass } from "@/components/ui";

type ProjectFormProps = {
  action: (formData: FormData) => Promise<void>;
  cities: { id: string; name: string }[];
  developers: { id: string; name: string }[];
  project?: {
    id: string;
    name: string;
    cityId: string;
    developerId: string | null;
    category: string;
    unitTypes: string | null;
    unitArea: string | null;
    priceFrom: number | null;
    pricePerSqm: number | null;
    downPayment: number | null;
    installmentYears: number | null;
    deliveryDate: string | null;
    description: string | null;
    image: string | null;
    status: string;
    featured: boolean;
  };
};

const IMAGES = [
  { value: "/images/capital.jpg", label: "Capital compound" },
  { value: "/images/coast.jpg", label: "Coastal resort" },
  { value: "/images/villa.jpg", label: "Villa" },
  { value: "/images/hero.jpg", label: "Aerial compound" },
];

export default function ProjectForm({ action, cities, developers, project }: ProjectFormProps) {
  return (
    <form action={action} className="space-y-6 rounded-sm border border-ink/10 bg-white p-5 sm:p-6">
      {project && <input type="hidden" name="id" value={project.id} />}

      <div className="grid gap-4 md:grid-cols-2">
        <Field label="Project name">
          <input name="name" required defaultValue={project?.name} className={inputClass} />
        </Field>
        <Field label="City">
          <select name="cityId" required defaultValue={project?.cityId} className={inputClass}>
            <option value="">Select city</option>
            {cities.map((city) => (
              <option key={city.id} value={city.id}>{city.name}</option>
            ))}
          </select>
        </Field>
        <Field label="Developer">
          <select name="developerId" defaultValue={project?.developerId ?? ""} className={inputClass}>
            <option value="">Unassigned</option>
            {developers.map((developer) => (
              <option key={developer.id} value={developer.id}>{developer.name}</option>
            ))}
          </select>
        </Field>
        <Field label="Category">
          <select name="category" defaultValue={project?.category ?? "Residential"} className={inputClass}>
            {PROJECT_CATEGORIES.map((category) => (
              <option key={category} value={category}>{category}</option>
            ))}
          </select>
        </Field>
        <Field label="Starting price (EGP)">
          <input
            name="priceFrom"
            inputMode="numeric"
            defaultValue={project?.priceFrom ?? ""}
            className={inputClass}
          />
        </Field>
        <Field label="Price per m² (EGP)">
          <input
            name="pricePerSqm"
            inputMode="numeric"
            defaultValue={project?.pricePerSqm ?? ""}
            className={inputClass}
          />
        </Field>
        <Field label="Down payment (%)">
          <input
            name="downPayment"
            inputMode="numeric"
            defaultValue={project?.downPayment ?? ""}
            className={inputClass}
          />
        </Field>
        <Field label="Instalment years">
          <input
            name="installmentYears"
            inputMode="numeric"
            defaultValue={project?.installmentYears ?? ""}
            className={inputClass}
          />
        </Field>
        <Field label="Delivery">
          <input name="deliveryDate" defaultValue={project?.deliveryDate ?? ""} placeholder="2027" className={inputClass} />
        </Field>
        <Field label="Status">
          <select name="status" defaultValue={project?.status ?? "AVAILABLE"} className={inputClass}>
            <option value="AVAILABLE">Available</option>
            <option value="COMING_SOON">Coming soon</option>
            <option value="SOLD_OUT">Sold out</option>
          </select>
        </Field>
        <Field label="Cover image">
          <select name="image" defaultValue={project?.image ?? "/images/capital.jpg"} className={inputClass}>
            {IMAGES.map((image) => (
              <option key={image.value} value={image.value}>{image.label}</option>
            ))}
          </select>
        </Field>
      </div>

      <div className="grid gap-4 md:grid-cols-2">
        <Field label="Unit types">
          <input
            name="unitTypes"
            defaultValue={project?.unitTypes ?? ""}
            placeholder="Apartments, townhouses, villas"
            className={inputClass}
          />
        </Field>
        <Field label="Unit area">
          <input
            name="unitArea"
            defaultValue={project?.unitArea ?? ""}
            placeholder="From 140 sqm"
            className={inputClass}
          />
        </Field>
      </div>

      <Field label="Description">
        <textarea name="description" rows={6} defaultValue={project?.description ?? ""} className={inputClass} />
      </Field>

      <label className="flex items-center gap-2 text-sm text-slate-ink">
        <input type="checkbox" name="featured" defaultChecked={project?.featured} className="h-4 w-4 accent-[#c39a4a]" />
        Feature this project on the homepage
      </label>

      <div className="flex gap-3">
        <button
          type="submit"
          className="rounded-sm bg-gold px-6 py-3 text-[11px] font-semibold uppercase tracking-[0.16em] text-ink"
        >
          {project ? "Save changes" : "Create project"}
        </button>
      </div>
    </form>
  );
}
