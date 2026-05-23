"use server";

import { revalidatePath } from "next/cache";
import { redirect } from "next/navigation";
import { createClient } from "@/lib/supabase/server";
import { getCurrentProfile } from "@/lib/authz";

function text(formData: FormData, key: string) {
  return String(formData.get(key) || "").trim();
}

function numberValue(formData: FormData, key: string) {
  return Number(formData.get(key) || 0);
}

export async function saveMember(formData: FormData) {
  const supabase = await createClient();
  const { profile } = await getCurrentProfile();
  const memberId = text(formData, "id");
  const payload = {
    member_code: text(formData, "member_code") || `IGN-${Date.now().toString().slice(-6)}`,
    name: text(formData, "name"),
    phone: text(formData, "phone"),
    email: text(formData, "email"),
    id_passport_number: text(formData, "id_passport_number"),
    emergency_contact: text(formData, "emergency_contact"),
    membership_plan_id: text(formData, "membership_plan_id") || null,
    start_date: text(formData, "start_date"),
    expiry_date: text(formData, "expiry_date"),
    status: text(formData, "status"),
    acquisition_source: text(formData, "acquisition_source"),
    photo_url: text(formData, "photo_url"),
    notes: text(formData, "notes"),
    trainer_id: text(formData, "trainer_id") || null,
    created_by: profile.id === "demo-user" ? null : profile.id
  };

  if (memberId) {
    await supabase.from("members").update(payload).eq("id", memberId);
  } else {
    await supabase.from("members").insert(payload);
  }

  revalidatePath("/members");
  redirect("/members");
}

export async function recordPayment(formData: FormData) {
  const supabase = await createClient();
  const { profile } = await getCurrentProfile();
  const receiptNumber = `RCPT-${new Date().toISOString().slice(0, 10).replaceAll("-", "")}-${Date.now().toString().slice(-4)}`;
  const payload = {
    member_id: text(formData, "member_id"),
    amount: numberValue(formData, "amount"),
    method: text(formData, "method"),
    reference_number: text(formData, "reference_number"),
    payment_date: text(formData, "payment_date"),
    membership_plan_id: text(formData, "membership_plan_id") || null,
    receipt_number: receiptNumber,
    recorded_by: profile.id === "demo-user" ? null : profile.id
  };

  const { data } = await supabase.from("payments").insert(payload).select("id, amount, receipt_number, members(name)").single();
  if (data) {
    await supabase.from("receipts").insert({
      payment_id: data.id,
      receipt_number: data.receipt_number,
      issued_to: "Member",
      subtotal: data.amount,
      total: data.amount
    });
  }

  revalidatePath("/payments");
}

export async function recordAttendance(formData: FormData) {
  const supabase = await createClient();
  const { profile } = await getCurrentProfile();
  await supabase.from("attendance").insert({
    member_id: text(formData, "member_id"),
    checked_by: profile.id === "demo-user" ? null : profile.id,
    membership_valid: formData.get("membership_valid") !== "false",
    warning: text(formData, "warning") || null
  });
  revalidatePath("/attendance");
}

export async function saveExpense(formData: FormData) {
  const supabase = await createClient();
  const { profile } = await getCurrentProfile();
  await supabase.from("expenses").insert({
    category: text(formData, "category"),
    description: text(formData, "description"),
    amount: numberValue(formData, "amount"),
    date: text(formData, "date"),
    payment_method: text(formData, "payment_method"),
    recorded_by: profile.id === "demo-user" ? null : profile.id
  });
  revalidatePath("/expenses");
}

export async function saveDailyClose(formData: FormData) {
  const supabase = await createClient();
  const { profile } = await getCurrentProfile();
  await supabase.from("daily_close").insert({
    close_date: text(formData, "close_date") || new Date().toISOString().slice(0, 10),
    total_cash: numberValue(formData, "total_cash"),
    total_mpesa: numberValue(formData, "total_mpesa"),
    total_bank: numberValue(formData, "total_bank"),
    expenses: numberValue(formData, "expenses"),
    actual_sweep: numberValue(formData, "actual_sweep"),
    staff_closing_notes: text(formData, "staff_closing_notes"),
    recorded_by: profile.id === "demo-user" ? null : profile.id
  });
  revalidatePath("/daily-close");
}
