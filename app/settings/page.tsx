import { AppShell, PageHeader } from "@/components/dashboard/app-shell";
import { DataTable } from "@/components/dashboard/data-table";
import { roleLabels, permissions, type Role } from "@/lib/authz";

const roles: Role[] = ["owner", "management", "front_desk", "trainer"];

export default function SettingsPage() {
  return (
    <AppShell>
      <PageHeader title="Authentication & Roles" description="Supabase Auth profiles with role-based access control for Owner, Management, Front Desk, and Trainer." />
      <DataTable
        columns={["Role", "Access scope"]}
        rows={roles.map((role) => [
          <span key="role" className="font-bold text-navy-950">{roleLabels[role]}</span>,
          permissions[role].includes("*") ? "Everything" : permissions[role].join(", ")
        ])}
      />
      <div className="mt-6 card p-5">
        <h3 className="text-lg font-black text-navy-950">Invite user</h3>
        <div className="mt-4 grid gap-3 md:grid-cols-3">
          <input className="field" placeholder="Full name" />
          <input className="field" placeholder="Email" />
          <select className="field">{roles.map((role) => <option key={role} value={role}>{roleLabels[role]}</option>)}</select>
        </div>
      </div>
    </AppShell>
  );
}
