import { Copy } from "lucide-react";
import { AppShell, PageHeader } from "@/components/dashboard/app-shell";
import { members, shortDate } from "@/lib/erp-data";

function message(kind: string, name: string, expiry: string) {
  if (kind === "Expiring") return `Hi ${name}, your Ignite Gym membership expires on ${shortDate(expiry)}. Renew today to keep your training momentum going.`;
  if (kind === "Expired") return `Hi ${name}, your Ignite Gym membership has expired. Please renew at the front desk or reply for assistance.`;
  if (kind === "Payment") return `Hi ${name}, this is a friendly Ignite Gym payment reminder. Kindly settle your membership balance to continue access.`;
  return `Hi ${name}, Ignite Gym has a limited promotion this week. Reply or visit the front desk to learn more.`;
}

export default function MessagesPage() {
  const templates = ["Expiring", "Expired", "Payment", "Promotion"];

  return (
    <AppShell>
      <PageHeader title="WhatsApp/SMS Export" description="Generate copyable reminder text for expiring memberships, expired members, payments, and promotions without API integration." />
      <section className="grid gap-4 lg:grid-cols-2">
        {templates.map((template) => (
          <div key={template} className="card p-5">
            <h3 className="text-lg font-black text-navy-950">{template} memberships</h3>
            <div className="mt-4 space-y-3">
              {members.slice(0, 3).map((member) => (
                <div key={`${template}-${member.id}`} className="rounded-lg border border-slate-200 bg-slate-50 p-4">
                  <p className="text-sm text-slate-700">{message(template, member.name, member.expiry_date)}</p>
                  <button className="mt-3 inline-flex items-center gap-2 text-sm font-bold text-teal-700" type="button">
                    <Copy className="h-4 w-4" />
                    Copy text
                  </button>
                </div>
              ))}
            </div>
          </div>
        ))}
      </section>
    </AppShell>
  );
}
