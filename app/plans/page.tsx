import { AppShell, PageHeader } from "@/components/dashboard/app-shell";
import { DataTable, StatusPill } from "@/components/dashboard/data-table";
import { money, plans } from "@/lib/erp-data";

export default function PlansPage() {
  return (
    <AppShell>
      <PageHeader title="Membership Plans" description="Admin-defined pricing, duration, and commission rates for Daily, Monthly, Quarterly, and Annual memberships." />
      <section className="grid gap-4 lg:grid-cols-3">
        <form className="card grid gap-4 p-5">
          <h3 className="text-lg font-black text-navy-950">Plan editor</h3>
          <label className="space-y-2"><span className="label">Plan name</span><input className="field" placeholder="Monthly" /></label>
          <label className="space-y-2"><span className="label">Price</span><input className="field" type="number" placeholder="4500" /></label>
          <label className="space-y-2"><span className="label">Duration days</span><input className="field" type="number" placeholder="30" /></label>
          <label className="space-y-2"><span className="label">Commission rate</span><input className="field" placeholder="40%" /></label>
          <button type="button" className="rounded-lg bg-teal-500 px-4 py-2.5 text-sm font-bold text-white">Save plan</button>
        </form>
        <div className="lg:col-span-2">
          <DataTable
            columns={["Plan", "Price", "Duration", "Trainer commission", "Status"]}
            rows={plans.map((plan) => [
              <span key="plan" className="font-bold text-navy-950">{plan.name}</span>,
              money(plan.price),
              `${plan.duration_days} days`,
              `${Math.round(plan.commission_rate * 100)}%`,
              <StatusPill key="status" status={plan.is_active ? "active" : "suspended"} />
            ])}
          />
        </div>
      </section>
    </AppShell>
  );
}
