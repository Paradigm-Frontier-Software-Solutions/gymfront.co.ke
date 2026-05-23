import { AppShell, PageHeader } from "@/components/dashboard/app-shell";
import { DataTable } from "@/components/dashboard/data-table";
import { saveExpense } from "@/app/erp-actions";
import { expenses, money, shortDate } from "@/lib/erp-data";

export default function ExpensesPage() {
  return (
    <AppShell>
      <PageHeader title="Expenses" description="Track operating expenses by category, method, date, and recording staff member." />
      <section className="grid gap-4 lg:grid-cols-3">
        <form action={saveExpense} className="card grid gap-4 p-5">
          <h3 className="text-lg font-black text-navy-950">Record expense</h3>
          <label className="space-y-2"><span className="label">Category</span><input name="category" className="field" placeholder="Utilities" /></label>
          <label className="space-y-2"><span className="label">Description</span><textarea name="description" className="field min-h-24" /></label>
          <label className="space-y-2"><span className="label">Amount</span><input name="amount" className="field" type="number" /></label>
          <label className="space-y-2"><span className="label">Date</span><input name="date" className="field" type="date" defaultValue="2026-05-23" /></label>
          <label className="space-y-2"><span className="label">Payment method</span><select name="payment_method" className="field"><option>MPESA</option><option>cash</option><option>bank</option></select></label>
          <button type="submit" className="rounded-lg bg-teal-500 px-4 py-2.5 text-sm font-bold text-white">Save expense</button>
        </form>
        <div className="lg:col-span-2">
          <DataTable
            columns={["Date", "Category", "Description", "Method", "Amount", "Recorded by"]}
            rows={expenses.map((expense) => [shortDate(expense.date), expense.category, expense.description, expense.payment_method, money(expense.amount), expense.recorded_by])}
          />
        </div>
      </section>
    </AppShell>
  );
}
