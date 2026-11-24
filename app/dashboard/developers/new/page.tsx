import Link from "next/link";
import DeveloperForm from "@/components/DeveloperForm";
import { PageHeader } from "@/components/ui";
import { saveDeveloper } from "../../actions";

export const dynamic = "force-dynamic";

export default function NewDeveloperPage() {
  return (
    <div className="mx-auto max-w-3xl space-y-6">
      <Link href="/dashboard/developers" className="text-[11px] uppercase tracking-[0.16em] text-gold">
        ← Back to developers
      </Link>
      <PageHeader
        eyebrow="Partners"
        title="New developer"
        description="Appears in the directory and in the project form immediately."
      />
      <DeveloperForm action={saveDeveloper} />
    </div>
  );
}
