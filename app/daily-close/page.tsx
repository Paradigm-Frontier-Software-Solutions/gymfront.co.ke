import { AlertTriangle, CheckCircle2 } from "lucide-react";
import { AppShell, PageHeader } from "@/components/dashboard/app-shell";
import { saveDailyClose } from "@/app/erp-actions";
import { dashboardStats, money } from "@/lib/erp-data";

export default function DailyClosePage() {
  const stats = dashboardStats();
  const expectedSweep = stats.cash + stats.mpesa + stats.bank - stats.expenses;
  const actualSweep = 1800;
  const variance = actualSweep - expectedSweep;

  return (
    <AppShell>
      <PageHeader title="Daily Close" description="Reconcile daily collections, expenses, expected sweep, actual sweep, variance, notes, and manager approval." />
      <section className="grid gap-4 lg:grid-cols-3">
        <form action={saveDailyClose} className="card grid gap-4 p-5 lg:col-span-2 md:grid-cols-2">
          <input type="hidden" name="close_date" value="2026-05-23" />
          <label className="space-y-2"><span className="label">Total cash</span><input name="total_cash" className="field" defaultValue={stats.cash} /></label>
          <label className="space-y-2"><span className="label">Total MPESA</span><input name="total_mpesa" className="field" defaultValue={stats.mpesa} /></label>
          <label className="space-y-2"><span className="label">Total bank</span><input name="total_bank" className="field" defaultValue={stats.bank} /></label>
          <label className="space-y-2"><span className="label">Expenses</span><input name="expenses" className="field" defaultValue={stats.expenses} /></label>
          <label className="space-y-2"><span className="label">Expected sweep</span><input className="field" value={expectedSweep} readOnly /></label>
          <label className="space-y-2"><span className="label">Actual sweep</span><input name="actual_sweep" className="field" defaultValue={actualSweep} /></label>
          <label className="space-y-2 md:col-span-2"><span className="label">Staff closing notes</span><textarea name="staff_closing_notes" className="field min-h-28" defaultValue="Cash drawer counted and MPESA statement checked." /></label>
          <label className="space-y-2 md:col-span-2"><span className="label">Manager approval</span><select className="field"><option>Pending approval</option><option>Approved</option><option>Rejected</option></select></label>
          <button type="submit" className="rounded-lg bg-teal-500 px-4 py-2.5 text-sm font-bold text-white md:col-span-2">Submit daily close</button>
        </form>
        <div className="card p-5">
          <div className={variance === 0 ? "text-emerald-700" : "text-rose-700"}>
            {variance === 0 ? <CheckCircle2 className="h-8 w-8" /> : <AlertTriangle className="h-8 w-8" />}
          </div>
          <h3 className="mt-3 text-lg font-black text-navy-950">Variance monitor</h3>
          <p className="mt-2 text-sm text-slate-600">Variance is automatically flagged when actual sweep differs from expected sweep.</p>
          <p className="mt-6 text-3xl font-black text-navy-950">{money(variance)}</p>
          <p className="mt-1 text-sm font-semibold text-slate-500">Expected sweep: {money(expectedSweep)}</p>
        </div>
      </section>
    </AppShell>
  );
}
