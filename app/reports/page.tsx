import { Download } from "lucide-react";
import { AppShell, PageHeader } from "@/components/dashboard/app-shell";
import { dashboardStats, money } from "@/lib/erp-data";

const reports = [
  "Daily close report",
  "Payment report",
  "Attendance report",
  "Member expiry report",
  "Trainer commission report",
  "Profit and loss summary"
];

export default function ReportsPage() {
  const stats = dashboardStats();

  return (
    <AppShell>
      <PageHeader title="Reports" description="Exportable operational reports for finance, attendance, member expiry, commissions, and profit/loss." />
      <section className="mb-6 grid gap-3 md:grid-cols-4">
        <input className="field" type="date" defaultValue="2026-05-01" />
        <input className="field" type="date" defaultValue="2026-05-23" />
        <select className="field md:col-span-2"><option>All branches</option><option>Main gym</option></select>
      </section>
      <section className="grid gap-4 md:grid-cols-2 xl:grid-cols-3">
        {reports.map((report) => (
          <div key={report} className="card p-5">
            <h3 className="text-lg font-black text-navy-950">{report}</h3>
            <p className="mt-2 text-sm text-slate-600">Prepared from Supabase views and downloadable as CSV from this workspace.</p>
            <button className="mt-5 inline-flex items-center gap-2 rounded-lg border border-slate-200 px-4 py-2 text-sm font-bold text-teal-700" type="button">
              <Download className="h-4 w-4" />
              Export CSV
            </button>
          </div>
        ))}
      </section>
      <div className="mt-6 card p-5">
        <h3 className="text-lg font-black text-navy-950">Profit and loss snapshot</h3>
        <div className="mt-4 grid gap-3 sm:grid-cols-3">
          <div className="rounded-lg bg-slate-50 p-4"><p className="label">Revenue</p><p className="mt-2 text-xl font-black">{money(stats.monthlyRevenue)}</p></div>
          <div className="rounded-lg bg-slate-50 p-4"><p className="label">Expenses</p><p className="mt-2 text-xl font-black">{money(stats.expenses)}</p></div>
          <div className="rounded-lg bg-teal-50 p-4"><p className="label text-teal-700">Net estimate</p><p className="mt-2 text-xl font-black">{money(stats.netProfit)}</p></div>
        </div>
      </div>
    </AppShell>
  );
}
