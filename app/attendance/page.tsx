import { LogIn, LogOut, QrCode } from "lucide-react";
import { AppShell, PageHeader } from "@/components/dashboard/app-shell";
import { DataTable, StatusPill } from "@/components/dashboard/data-table";
import { attendance } from "@/lib/erp-data";

export default function AttendancePage() {
  return (
    <AppShell>
      <PageHeader title="Attendance" description="Check members in and out using manual search or QR/member code input with membership validity warnings." />
      <section className="grid gap-4 lg:grid-cols-3">
        <div className="card p-5 lg:col-span-2">
          <h3 className="text-lg font-black text-navy-950">Check-in / Check-out</h3>
          <div className="mt-4 grid gap-3 md:grid-cols-[1fr_auto_auto]">
            <input className="field" placeholder="Search name, phone, or scan/member code IGN-1001" />
            <button className="inline-flex items-center justify-center gap-2 rounded-lg bg-teal-500 px-4 py-2 text-sm font-bold text-white"><LogIn className="h-4 w-4" /> Check in</button>
            <button className="inline-flex items-center justify-center gap-2 rounded-lg border border-slate-200 bg-white px-4 py-2 text-sm font-bold text-navy-900"><LogOut className="h-4 w-4" /> Check out</button>
          </div>
          <div className="mt-4 rounded-lg border border-amber-200 bg-amber-50 p-4 text-sm font-semibold text-amber-800">
            Expired memberships are flagged before entry. Front desk can still record a visit after manager approval.
          </div>
        </div>
        <div className="card p-5">
          <QrCode className="h-8 w-8 text-teal-600" />
          <h3 className="mt-3 text-lg font-black text-navy-950">QR / Code Input</h3>
          <p className="mt-2 text-sm text-slate-600">Use member codes today; QR scanner integration can be added later without changing attendance tables.</p>
        </div>
      </section>
      <section className="mt-6">
        <PageHeader title="Daily Attendance Dashboard" description="Timestamp logs for today with inside/out status." />
        <DataTable
          columns={["Member code", "Member", "Check in", "Check out", "Validity"]}
          rows={attendance.map((record) => [
            <span key="code" className="font-bold text-navy-950">{record.member_code}</span>,
            record.member_name,
            new Date(record.check_in_at).toLocaleString("en-GB"),
            record.check_out_at ? new Date(record.check_out_at).toLocaleString("en-GB") : "Currently inside",
            <StatusPill key="status" status={record.status} />
          ])}
        />
      </section>
    </AppShell>
  );
}
