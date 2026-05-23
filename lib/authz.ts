import { redirect } from "next/navigation";
import { createClient } from "@/lib/supabase/server";

export type Role = "owner" | "management" | "front_desk" | "trainer" | "admin" | "staff" | "client";

export const roleLabels: Record<Role, string> = {
  owner: "Owner",
  management: "Management",
  front_desk: "Front Desk",
  trainer: "Trainer",
  admin: "Owner",
  staff: "Management",
  client: "Front Desk"
};

export const permissions: Record<Role, string[]> = {
  owner: ["*"],
  management: ["members", "payments", "reports", "inventory", "trainers", "expenses", "plans", "attendance"],
  front_desk: ["members:create", "attendance", "payments:create", "receipts", "dashboard"],
  trainer: ["clients:assigned", "attendance:view", "routines", "commissions:view", "dashboard"],
  admin: ["*"],
  staff: ["members", "payments", "reports", "inventory", "trainers", "expenses", "plans", "attendance"],
  client: ["dashboard"]
};

export function canAccess(role: Role, permission: string) {
  const allowed = permissions[role] || [];
  return allowed.includes("*") || allowed.includes(permission) || allowed.includes(permission.split(":")[0]);
}

export async function getCurrentProfile() {
  const supabase = await createClient();
  const {
    data: { user }
  } = await supabase.auth.getUser();

  if (!user) {
    return {
      user: null,
      profile: {
        id: "demo-user",
        full_name: "Demo Owner",
        email: "owner@ignite.local",
        role: "owner" as Role
      }
    };
  }

  const { data: profile } = await supabase
    .from("users_profiles")
    .select("id, full_name, email, role")
    .eq("id", user.id)
    .single();

  return {
    user,
    profile: profile || {
      id: user.id,
      full_name: user.user_metadata.full_name || user.email || "Ignite User",
      email: user.email || "",
      role: (user.user_metadata.role as Role) || "front_desk"
    }
  };
}

export async function requireRole(roles: Role[]) {
  const current = await getCurrentProfile();
  if (!roles.includes(current.profile.role as Role)) {
    redirect("/");
  }
  return current;
}
