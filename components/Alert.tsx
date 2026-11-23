export default function Alert({ kind, children }: { kind: "success" | "error"; children: React.ReactNode }) {
  const tone =
    kind === "success"
      ? "border-emerald-300/40 bg-emerald-50 text-emerald-800"
      : "border-rose-300/40 bg-rose-50 text-rose-800";
  return (
    <div className={`rounded-sm border px-4 py-3 text-sm ${tone}`} role="status">
      {children}
    </div>
  );
}
