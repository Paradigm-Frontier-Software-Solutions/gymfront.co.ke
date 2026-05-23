import Link from "next/link";
import { ReactNode } from "react";
import {
  Boxes,
  CalendarCheck,
  ClipboardCheck,
  CreditCard,
  Dumbbell,
  FileSpreadsheet,
  LayoutDashboard,
  MessageSquareText,
  ReceiptText,
  Settings,
  UserRoundPlus,
  UsersRound,
  WalletCards
} from "lucide-react";
import type { LucideIcon } from "lucide-react";
import { getCurrentProfile, roleLabels, type Role } from "@/lib/authz";
import { cn } from "@/lib/utils";

const navigation = [
  { href: "/", label: "Dashboard", icon: LayoutDashboard },
  { href: "/members", label: "Members", icon: UsersRound },
  { href: "/attendance", label: "Attendance", icon: CalendarCheck },
  { href: "/payments", label: "Payments", icon: CreditCard },
  { href: "/plans", label: "Plans", icon: ClipboardCheck },
  { href: "/trainers", label: "Trainers", icon: Dumbbell },
  { href: "/expenses", label: "Expenses", icon: WalletCards },
  { href: "/inventory", label: "Inventory", icon: Boxes },
  { href: "/daily-close", label: "Daily Close", icon: ReceiptText },
  { href: "/reports", label: "Reports", icon: FileSpreadsheet },
  { href: "/messages", label: "SMS Export", icon: MessageSquareText },
  { href: "/settings", label: "Settings", icon: Settings }
];

export async function AppShell({ children }: { children: ReactNode }) {
  const { profile } = await getCurrentProfile();
  const profileRole = profile.role as Role;

  return (
    <div className="min-h-screen bg-slate-100 lg:flex">
      <aside className="sticky top-0 z-30 border-b border-white/10 bg-navy-950 text-white lg:h-screen lg:w-72 lg:border-b-0">
        <div className="flex items-center justify-between px-5 py-4 lg:block">
          <Link href="/" className="flex items-center gap-3">
            <span className="flex h-10 w-10 items-center justify-center rounded-lg bg-teal-400 text-navy-950">
              <Dumbbell className="h-5 w-5" />
            </span>
            <span>
              <span className="block text-lg font-black tracking-tight">Ignite Gym</span>
              <span className="block text-xs font-medium text-teal-100">ERP Command Center</span>
            </span>
          </Link>
          <Link href="/members/new" className="rounded-lg bg-teal-400 p-2 text-navy-950 lg:hidden" aria-label="Register member">
            <UserRoundPlus className="h-5 w-5" />
          </Link>
        </div>

        <nav className="flex gap-2 overflow-x-auto px-4 pb-4 lg:block lg:space-y-1 lg:overflow-visible">
          {navigation.map((item) => (
            <Link
              key={item.href}
              href={item.href}
              className={cn(
                "flex min-w-max items-center gap-3 rounded-lg px-3 py-2.5 text-sm font-semibold text-slate-300 transition hover:bg-white/10 hover:text-white",
                item.href === "/" && "bg-white/10 text-white"
              )}
            >
              <item.icon className="h-4 w-4 text-teal-300" />
              {item.label}
            </Link>
          ))}
        </nav>

        <div className="hidden border-t border-white/10 p-5 lg:absolute lg:bottom-0 lg:block lg:w-full">
          <div className="rounded-lg bg-white/10 p-4">
            <p className="text-sm font-bold">{profile.full_name}</p>
            <p className="mt-1 text-xs text-slate-300">{roleLabels[profileRole] || "Owner"} access</p>
          </div>
        </div>
      </aside>

      <main className="min-w-0 flex-1">
        <header className="flex flex-col gap-3 border-b border-slate-200 bg-white px-5 py-4 sm:flex-row sm:items-center sm:justify-between lg:px-8">
          <div>
            <p className="text-xs font-bold uppercase tracking-wide text-teal-700">Operations</p>
            <h1 className="text-2xl font-black tracking-tight text-navy-950">Ignite Gym ERP</h1>
          </div>
          <div className="flex items-center gap-2">
            <Link href="/members/new" className="inline-flex items-center gap-2 rounded-lg bg-teal-500 px-4 py-2 text-sm font-bold text-white hover:bg-teal-600">
              <UserRoundPlus className="h-4 w-4" />
              Register
            </Link>
            <Link href="/payments" className="inline-flex items-center gap-2 rounded-lg border border-slate-200 bg-white px-4 py-2 text-sm font-bold text-navy-900 hover:border-teal-400">
              <ReceiptText className="h-4 w-4" />
              Receipt
            </Link>
          </div>
        </header>
        <div className="px-5 py-6 lg:px-8">{children}</div>
      </main>
    </div>
  );
}

export function PageHeader({ title, description, action }: { title: string; description: string; action?: ReactNode }) {
  return (
    <div className="mb-6 flex flex-col gap-4 sm:flex-row sm:items-end sm:justify-between">
      <div>
        <h2 className="text-2xl font-black tracking-tight text-navy-950">{title}</h2>
        <p className="mt-1 max-w-3xl text-sm text-slate-600">{description}</p>
      </div>
      {action}
    </div>
  );
}

export function MetricCard({ label, value, detail, icon: Icon }: { label: string; value: string; detail: string; icon: LucideIcon }) {
  return (
    <div className="card p-5">
      <div className="flex items-start justify-between gap-3">
        <div>
          <p className="text-sm font-semibold text-slate-500">{label}</p>
          <p className="mt-2 text-2xl font-black tracking-tight text-navy-950">{value}</p>
        </div>
        <span className="rounded-lg bg-teal-50 p-2 text-teal-700">
          <Icon className="h-5 w-5" />
        </span>
      </div>
      <p className="mt-3 text-xs font-medium text-slate-500">{detail}</p>
    </div>
  );
}
