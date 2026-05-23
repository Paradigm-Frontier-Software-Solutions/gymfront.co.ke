import { AppShell, PageHeader } from "@/components/dashboard/app-shell";
import { DataTable, StatusPill } from "@/components/dashboard/data-table";
import { inventory, money, shortDate } from "@/lib/erp-data";

export default function InventoryPage() {
  return (
    <AppShell>
      <PageHeader title="Inventory" description="Manage gym assets, condition, depreciation method, quantity, purchase dates, and current value." />
      <section className="grid gap-4 lg:grid-cols-3">
        <form className="card grid gap-4 p-5">
          <h3 className="text-lg font-black text-navy-950">Add item</h3>
          <label className="space-y-2"><span className="label">Item name</span><input className="field" /></label>
          <label className="space-y-2"><span className="label">Category</span><input className="field" /></label>
          <label className="space-y-2"><span className="label">Quantity</span><input className="field" type="number" /></label>
          <label className="space-y-2"><span className="label">Purchase date</span><input className="field" type="date" /></label>
          <label className="space-y-2"><span className="label">Condition</span><select className="field"><option>excellent</option><option>good</option><option>fair</option><option>needs repair</option></select></label>
          <label className="space-y-2"><span className="label">Current value</span><input className="field" type="number" /></label>
          <button type="button" className="rounded-lg bg-teal-500 px-4 py-2.5 text-sm font-bold text-white">Save item</button>
        </form>
        <div className="lg:col-span-2">
          <DataTable
            columns={["Item", "Category", "Qty", "Purchase date", "Condition", "Current value", "Depreciation"]}
            rows={inventory.map((item) => [
              <span key="item" className="font-bold text-navy-950">{item.item_name}</span>,
              item.category,
              item.quantity,
              shortDate(item.purchase_date),
              <StatusPill key="condition" status={item.condition} />,
              money(item.current_value),
              item.depreciation_method
            ])}
          />
        </div>
      </section>
    </AppShell>
  );
}
