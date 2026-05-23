import { Printer, ReceiptText } from "lucide-react";
import { AppShell, PageHeader } from "@/components/dashboard/app-shell";
import { DataTable } from "@/components/dashboard/data-table";
import { recordPayment } from "@/app/erp-actions";
import { members, money, payments, plans, shortDate } from "@/lib/erp-data";

export default function PaymentsPage() {
  return (
    <AppShell>
      <PageHeader title="Payments & Receipts" description="Record MPESA, cash, or bank payments and auto-generate receipt numbers linked to membership plans." />
      <section className="grid gap-4 lg:grid-cols-3">
        <form action={recordPayment} className="card grid gap-4 p-5 lg:col-span-1">
          <h3 className="flex items-center gap-2 text-lg font-black text-navy-950"><ReceiptText className="h-5 w-5 text-teal-600" /> Record payment</h3>
          <label className="space-y-2"><span className="label">Member</span><select name="member_id" className="field">{members.map((member) => <option key={member.id} value={member.id}>{member.name}</option>)}</select></label>
          <label className="space-y-2"><span className="label">Amount</span><input name="amount" className="field" type="number" placeholder="0" /></label>
          <label className="space-y-2"><span className="label">Method</span><select name="method" className="field"><option>MPESA</option><option>cash</option><option>bank</option></select></label>
          <label className="space-y-2"><span className="label">Reference number</span><input name="reference_number" className="field" placeholder="MPESA/bank/cash reference" /></label>
          <label className="space-y-2"><span className="label">Payment date</span><input name="payment_date" className="field" type="date" defaultValue="2026-05-23" /></label>
          <label className="space-y-2"><span className="label">Plan</span><select name="membership_plan_id" className="field">{plans.map((plan) => <option key={plan.id} value={plan.id}>{plan.name}</option>)}</select></label>
          <button type="submit" className="rounded-lg bg-teal-500 px-4 py-2.5 text-sm font-bold text-white">Generate receipt</button>
        </form>
        <div className="lg:col-span-2">
          <DataTable
            columns={["Receipt", "Member", "Date", "Plan", "Method", "Amount", "Print"]}
            rows={payments.map((payment) => [
              <span key="receipt" className="font-bold text-navy-950">{payment.receipt_number}</span>,
              payment.member_name,
              shortDate(payment.payment_date),
              payment.membership_plan,
              payment.method,
              money(payment.amount),
              <button key="print" className="inline-flex items-center gap-1 font-bold text-teal-700"><Printer className="h-4 w-4" /> Print</button>
            ])}
          />
        </div>
      </section>
    </AppShell>
  );
}
