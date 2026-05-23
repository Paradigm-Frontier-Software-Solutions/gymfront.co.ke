import Link from "next/link";
import { Plus } from "lucide-react";
import { AppShell, PageHeader } from "@/components/dashboard/app-shell";
import { DataTable, StatusPill } from "@/components/dashboard/data-table";
import { members, shortDate } from "@/lib/erp-data";

export default function MembersPage() {
  return (
    <AppShell>
      <PageHeader
        title="Member Management"
        description="CRUD workspace for member identity, contacts, membership validity, acquisition source, notes, and assigned trainers."
        action={<Link href="/members/new" className="inline-flex items-center gap-2 rounded-lg bg-teal-500 px-4 py-2 text-sm font-bold text-white"><Plus className="h-4 w-4" /> New member</Link>}
      />
      <div className="mb-4 grid gap-3 md:grid-cols-4">
        <input className="field md:col-span-2" placeholder="Search by name, phone, email, ID, or member code" />
        <select className="field"><option>All statuses</option><option>Active</option><option>Expired</option><option>Suspended</option></select>
        <select className="field"><option>All sources</option><option>Customer pool</option><option>Referral</option><option>Walk-in</option></select>
      </div>
      <DataTable
        columns={["Code", "Name", "Phone", "Plan", "Expiry", "Source", "Status", "Action"]}
        rows={members.map((member) => [
          <span key="code" className="font-bold text-navy-950">{member.member_code}</span>,
          <div key="name"><p className="font-bold text-navy-950">{member.name}</p><p className="text-xs text-slate-500">{member.email}</p></div>,
          member.phone,
          member.membership_plan,
          shortDate(member.expiry_date),
          member.acquisition_source,
          <StatusPill key="status" status={member.status} />,
          <Link key="action" href={`/members/${member.id}`} className="font-bold text-teal-700">Edit</Link>
        ])}
      />
    </AppShell>
  );
}
