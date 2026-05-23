import { AppShell, PageHeader } from "@/components/dashboard/app-shell";
import { DataTable } from "@/components/dashboard/data-table";
import { members, money, trainers } from "@/lib/erp-data";

export default function TrainersPage() {
  return (
    <AppShell>
      <PageHeader title="Trainer Commissions" description="Trainer client view, assigned members, attendance access, and earnings by plan commission rule." />
      <section className="mb-6 grid gap-4 md:grid-cols-4">
        <input className="field md:col-span-2" type="date" defaultValue="2026-05-01" />
        <input className="field md:col-span-2" type="date" defaultValue="2026-05-23" />
      </section>
      <DataTable
        columns={["Trainer", "Specialty", "Assigned clients", "Revenue", "Commission earned"]}
        rows={trainers.map((trainer) => [
          <div key="trainer"><p className="font-bold text-navy-950">{trainer.name}</p><p className="text-xs text-slate-500">{trainer.email}</p></div>,
          trainer.specialty,
          members.filter((member) => member.trainer_id === trainer.id).length,
          money(trainer.revenue),
          <span key="commission" className="font-black text-teal-700">{money(trainer.commission)}</span>
        ])}
      />
      <div className="mt-6 card p-5">
        <h3 className="text-lg font-black text-navy-950">Commission rules</h3>
        <div className="mt-4 grid gap-3 sm:grid-cols-4">
          {["Daily 50%", "Monthly 40%", "Quarterly 30%", "Annual 20%"].map((rule) => (
            <div key={rule} className="rounded-lg bg-slate-50 p-4 text-sm font-bold text-navy-900">{rule}</div>
          ))}
        </div>
      </div>
    </AppShell>
  );
}
