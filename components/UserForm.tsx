import { Field, inputClass } from "@/components/ui";

type UserFormProps = {
  action: (formData: FormData) => Promise<void>;
  user?: {
    id: string;
    name: string;
    email: string;
    phone: string | null;
    role: string;
  };
  isSelf?: boolean;
};

export default function UserForm({ action, user, isSelf = false }: UserFormProps) {
  return (
    <form action={action} className="space-y-6 rounded-sm border border-ink/10 bg-white p-5 sm:p-6">
      {user && <input type="hidden" name="id" value={user.id} />}

      <div className="grid gap-4 md:grid-cols-2">
        <Field label="Full name">
          <input name="name" required defaultValue={user?.name} className={inputClass} />
        </Field>
        <Field label="Email (used to sign in)">
          <input
            name="email"
            type="email"
            required
            defaultValue={user?.email}
            className={inputClass}
          />
        </Field>
        <Field label="Phone">
          <input name="phone" defaultValue={user?.phone ?? ""} className={inputClass} />
        </Field>
        <Field label="Role">
          <select name="role" defaultValue={user?.role ?? "AGENT"} className={inputClass}>
            <option value="AGENT">Agent — leads, projects, developers, areas</option>
            <option value="ADMIN">Admin — everything, including users</option>
          </select>
        </Field>
        <Field label={user ? "New password (leave blank to keep current)" : "Initial password"}>
          <input
            name="password"
            type="password"
            minLength={user ? undefined : 8}
            required={!user}
            autoComplete="new-password"
            placeholder={user ? "Unchanged" : "At least 8 characters"}
            className={inputClass}
          />
        </Field>
      </div>

      {isSelf && (
        <p className="text-xs text-slate-ink">
          This is your own account — you cannot change your own role or delete it here.
        </p>
      )}

      <button
        type="submit"
        className="rounded-sm bg-gold px-6 py-3 text-[11px] font-semibold uppercase tracking-[0.16em] text-ink"
      >
        {user ? "Save user" : "Create user"}
      </button>
    </form>
  );
}
