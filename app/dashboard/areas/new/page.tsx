import Link from "next/link";
import AreaForm from "@/components/AreaForm";
import { PageHeader } from "@/components/ui";
import { saveCity } from "../../actions";

export const dynamic = "force-dynamic";

export default function NewAreaPage() {
  return (
    <div className="mx-auto max-w-3xl space-y-6">
      <Link href="/dashboard/areas" className="text-[11px] uppercase tracking-[0.16em] text-gold">
        ← Back to areas
      </Link>
      <PageHeader
        eyebrow="Coverage"
        title="New area"
        description="Shown on the homepage, the project filters and the consultation form."
      />
      <AreaForm action={saveCity} />
    </div>
  );
}
