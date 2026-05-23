import { createClient } from "@/lib/supabase/server";

export type MemberStatus = "active" | "expired" | "suspended";
export type PaymentMethod = "MPESA" | "cash" | "bank";
export type PlanName = "Daily" | "Monthly" | "Quarterly" | "Annual";

export type Member = {
  id: string;
  member_code: string;
  name: string;
  phone: string;
  email: string;
  id_passport_number: string;
  emergency_contact: string;
  membership_plan: PlanName;
  start_date: string;
  expiry_date: string;
  status: MemberStatus;
  acquisition_source: "customer pool" | "referral" | "walk-in";
  photo_url: string;
  notes: string;
  trainer_id?: string;
};

export type MembershipPlan = {
  id: string;
  name: PlanName;
  price: number;
  duration_days: number;
  commission_rate: number;
  is_active: boolean;
};

export type Payment = {
  id: string;
  member_id: string;
  member_name: string;
  amount: number;
  method: PaymentMethod;
  reference_number: string;
  payment_date: string;
  membership_plan: PlanName;
  receipt_number: string;
  recorded_by: string;
};

export type AttendanceRecord = {
  id: string;
  member_id: string;
  member_name: string;
  member_code: string;
  check_in_at: string;
  check_out_at: string | null;
  status: MemberStatus;
};

export type Trainer = {
  id: string;
  name: string;
  phone: string;
  email: string;
  specialty: string;
  active_clients: number;
  revenue: number;
  commission: number;
};

export type Expense = {
  id: string;
  category: string;
  description: string;
  amount: number;
  date: string;
  payment_method: PaymentMethod;
  recorded_by: string;
};

export type InventoryItem = {
  id: string;
  item_name: string;
  category: string;
  quantity: number;
  purchase_date: string;
  condition: "excellent" | "good" | "fair" | "needs repair";
  depreciation_method: string;
  current_value: number;
  notes: string;
};

export const plans: MembershipPlan[] = [
  { id: "11111111-1111-1111-1111-111111111111", name: "Daily", price: 500, duration_days: 1, commission_rate: 0.5, is_active: true },
  { id: "22222222-2222-2222-2222-222222222222", name: "Monthly", price: 4500, duration_days: 30, commission_rate: 0.4, is_active: true },
  { id: "33333333-3333-3333-3333-333333333333", name: "Quarterly", price: 12000, duration_days: 90, commission_rate: 0.3, is_active: true },
  { id: "44444444-4444-4444-4444-444444444444", name: "Annual", price: 42000, duration_days: 365, commission_rate: 0.2, is_active: true }
];

export const trainers: Trainer[] = [
  { id: "aaaaaaaa-aaaa-aaaa-aaaa-aaaaaaaaaaa1", name: "Amina Yusuf", phone: "+254700100001", email: "amina@ignite.local", specialty: "Strength", active_clients: 14, revenue: 94500, commission: 35800 },
  { id: "aaaaaaaa-aaaa-aaaa-aaaa-aaaaaaaaaaa2", name: "Brian Otieno", phone: "+254700100002", email: "brian@ignite.local", specialty: "Functional fitness", active_clients: 11, revenue: 70200, commission: 24880 },
  { id: "aaaaaaaa-aaaa-aaaa-aaaa-aaaaaaaaaaa3", name: "Nadia Hassan", phone: "+254700100003", email: "nadia@ignite.local", specialty: "Mobility", active_clients: 8, revenue: 48600, commission: 17640 }
];

export const members: Member[] = [
  { id: "bbbbbbbb-bbbb-bbbb-bbbb-bbbbbbbbbb01", member_code: "IGN-1001", name: "Elijah Mwangi", phone: "+254711000001", email: "elijah@example.com", id_passport_number: "ID101001", emergency_contact: "+254722100001", membership_plan: "Monthly", start_date: "2026-05-01", expiry_date: "2026-05-31", status: "active", acquisition_source: "walk-in", photo_url: "/member-placeholder.svg", notes: "Prefers evening workouts.", trainer_id: "aaaaaaaa-aaaa-aaaa-aaaa-aaaaaaaaaaa1" },
  { id: "bbbbbbbb-bbbb-bbbb-bbbb-bbbbbbbbbb02", member_code: "IGN-1002", name: "Sarah Achieng", phone: "+254711000002", email: "sarah@example.com", id_passport_number: "ID101002", emergency_contact: "+254722100002", membership_plan: "Quarterly", start_date: "2026-04-15", expiry_date: "2026-07-14", status: "active", acquisition_source: "referral", photo_url: "/member-placeholder.svg", notes: "Training for marathon.", trainer_id: "aaaaaaaa-aaaa-aaaa-aaaa-aaaaaaaaaaa2" },
  { id: "bbbbbbbb-bbbb-bbbb-bbbb-bbbbbbbbbb03", member_code: "IGN-1003", name: "Mohamed Ali", phone: "+254711000003", email: "mohamed@example.com", id_passport_number: "P101003", emergency_contact: "+254722100003", membership_plan: "Daily", start_date: "2026-05-23", expiry_date: "2026-05-23", status: "active", acquisition_source: "customer pool", photo_url: "/member-placeholder.svg", notes: "Day pass.", trainer_id: "aaaaaaaa-aaaa-aaaa-aaaa-aaaaaaaaaaa3" },
  { id: "bbbbbbbb-bbbb-bbbb-bbbb-bbbbbbbbbb04", member_code: "IGN-1004", name: "Grace Wanjiku", phone: "+254711000004", email: "grace@example.com", id_passport_number: "ID101004", emergency_contact: "+254722100004", membership_plan: "Annual", start_date: "2026-01-10", expiry_date: "2027-01-09", status: "active", acquisition_source: "referral", photo_url: "/member-placeholder.svg", notes: "VIP locker.", trainer_id: "aaaaaaaa-aaaa-aaaa-aaaa-aaaaaaaaaaa1" },
  { id: "bbbbbbbb-bbbb-bbbb-bbbb-bbbbbbbbbb05", member_code: "IGN-1005", name: "Kevin Njoroge", phone: "+254711000005", email: "kevin@example.com", id_passport_number: "ID101005", emergency_contact: "+254722100005", membership_plan: "Monthly", start_date: "2026-04-01", expiry_date: "2026-04-30", status: "expired", acquisition_source: "walk-in", photo_url: "/member-placeholder.svg", notes: "Send renewal reminder.", trainer_id: "aaaaaaaa-aaaa-aaaa-aaaa-aaaaaaaaaaa2" },
  { id: "bbbbbbbb-bbbb-bbbb-bbbb-bbbbbbbbbb06", member_code: "IGN-1006", name: "Fatima Noor", phone: "+254711000006", email: "fatima@example.com", id_passport_number: "P101006", emergency_contact: "+254722100006", membership_plan: "Monthly", start_date: "2026-05-12", expiry_date: "2026-06-11", status: "active", acquisition_source: "customer pool", photo_url: "/member-placeholder.svg", notes: "New member orientation done.", trainer_id: "aaaaaaaa-aaaa-aaaa-aaaa-aaaaaaaaaaa3" },
  { id: "bbbbbbbb-bbbb-bbbb-bbbb-bbbbbbbbbb07", member_code: "IGN-1007", name: "Daniel Kimani", phone: "+254711000007", email: "daniel@example.com", id_passport_number: "ID101007", emergency_contact: "+254722100007", membership_plan: "Quarterly", start_date: "2026-03-02", expiry_date: "2026-05-31", status: "active", acquisition_source: "referral", photo_url: "/member-placeholder.svg", notes: "Expiry this month.", trainer_id: "aaaaaaaa-aaaa-aaaa-aaaa-aaaaaaaaaaa1" },
  { id: "bbbbbbbb-bbbb-bbbb-bbbb-bbbbbbbbbb08", member_code: "IGN-1008", name: "Lina Omar", phone: "+254711000008", email: "lina@example.com", id_passport_number: "P101008", emergency_contact: "+254722100008", membership_plan: "Monthly", start_date: "2026-02-10", expiry_date: "2026-03-11", status: "suspended", acquisition_source: "walk-in", photo_url: "/member-placeholder.svg", notes: "Suspended pending payment.", trainer_id: "aaaaaaaa-aaaa-aaaa-aaaa-aaaaaaaaaaa2" },
  { id: "bbbbbbbb-bbbb-bbbb-bbbb-bbbbbbbbbb09", member_code: "IGN-1009", name: "Victor Ouma", phone: "+254711000009", email: "victor@example.com", id_passport_number: "ID101009", emergency_contact: "+254722100009", membership_plan: "Daily", start_date: "2026-05-23", expiry_date: "2026-05-23", status: "active", acquisition_source: "walk-in", photo_url: "/member-placeholder.svg", notes: "Walk-in boxing class.", trainer_id: "aaaaaaaa-aaaa-aaaa-aaaa-aaaaaaaaaaa2" },
  { id: "bbbbbbbb-bbbb-bbbb-bbbb-bbbbbbbbbb10", member_code: "IGN-1010", name: "Rebecca Muthoni", phone: "+254711000010", email: "rebecca@example.com", id_passport_number: "ID101010", emergency_contact: "+254722100010", membership_plan: "Annual", start_date: "2025-08-01", expiry_date: "2026-07-31", status: "active", acquisition_source: "referral", photo_url: "/member-placeholder.svg", notes: "Corporate plan.", trainer_id: "aaaaaaaa-aaaa-aaaa-aaaa-aaaaaaaaaaa3" }
];

export const payments: Payment[] = [
  { id: "pay-1", member_id: "bbbbbbbb-bbbb-bbbb-bbbb-bbbbbbbbbb01", member_name: "Elijah Mwangi", amount: 4500, method: "MPESA", reference_number: "QK51A001", payment_date: "2026-05-23", membership_plan: "Monthly", receipt_number: "RCPT-20260523-001", recorded_by: "Miriam Frontdesk" },
  { id: "pay-2", member_id: "bbbbbbbb-bbbb-bbbb-bbbb-bbbbbbbbbb03", member_name: "Mohamed Ali", amount: 500, method: "cash", reference_number: "CASH-119", payment_date: "2026-05-23", membership_plan: "Daily", receipt_number: "RCPT-20260523-002", recorded_by: "Miriam Frontdesk" },
  { id: "pay-3", member_id: "bbbbbbbb-bbbb-bbbb-bbbb-bbbbbbbbbb04", member_name: "Grace Wanjiku", amount: 42000, method: "bank", reference_number: "BNK-88219", payment_date: "2026-05-20", membership_plan: "Annual", receipt_number: "RCPT-20260520-004", recorded_by: "Owner" },
  { id: "pay-4", member_id: "bbbbbbbb-bbbb-bbbb-bbbb-bbbbbbbbbb07", member_name: "Daniel Kimani", amount: 12000, method: "MPESA", reference_number: "QK50Z991", payment_date: "2026-05-18", membership_plan: "Quarterly", receipt_number: "RCPT-20260518-003", recorded_by: "Miriam Frontdesk" },
  { id: "pay-5", member_id: "bbbbbbbb-bbbb-bbbb-bbbb-bbbbbbbbbb09", member_name: "Victor Ouma", amount: 500, method: "cash", reference_number: "CASH-120", payment_date: "2026-05-23", membership_plan: "Daily", receipt_number: "RCPT-20260523-003", recorded_by: "Miriam Frontdesk" }
];

export const attendance: AttendanceRecord[] = [
  { id: "att-1", member_id: "bbbbbbbb-bbbb-bbbb-bbbb-bbbbbbbbbb01", member_name: "Elijah Mwangi", member_code: "IGN-1001", check_in_at: "2026-05-23T06:22:00+03:00", check_out_at: "2026-05-23T07:31:00+03:00", status: "active" },
  { id: "att-2", member_id: "bbbbbbbb-bbbb-bbbb-bbbb-bbbbbbbbbb02", member_name: "Sarah Achieng", member_code: "IGN-1002", check_in_at: "2026-05-23T07:05:00+03:00", check_out_at: null, status: "active" },
  { id: "att-3", member_id: "bbbbbbbb-bbbb-bbbb-bbbb-bbbbbbbbbb05", member_name: "Kevin Njoroge", member_code: "IGN-1005", check_in_at: "2026-05-23T08:15:00+03:00", check_out_at: null, status: "expired" },
  { id: "att-4", member_id: "bbbbbbbb-bbbb-bbbb-bbbb-bbbbbbbbbb09", member_name: "Victor Ouma", member_code: "IGN-1009", check_in_at: "2026-05-23T09:30:00+03:00", check_out_at: null, status: "active" }
];

export const expenses: Expense[] = [
  { id: "exp-1", category: "Utilities", description: "Electricity token", amount: 3200, date: "2026-05-23", payment_method: "MPESA", recorded_by: "Management" },
  { id: "exp-2", category: "Cleaning", description: "Sanitizer and towels", amount: 1800, date: "2026-05-22", payment_method: "cash", recorded_by: "Front Desk" },
  { id: "exp-3", category: "Maintenance", description: "Treadmill belt service", amount: 6500, date: "2026-05-18", payment_method: "bank", recorded_by: "Management" }
];

export const inventory: InventoryItem[] = [
  { id: "inv-1", item_name: "Treadmill Pro X", category: "Cardio", quantity: 4, purchase_date: "2025-11-02", condition: "good", depreciation_method: "Straight line", current_value: 540000, notes: "One unit due for service." },
  { id: "inv-2", item_name: "Olympic Barbell", category: "Strength", quantity: 8, purchase_date: "2025-06-12", condition: "excellent", depreciation_method: "Straight line", current_value: 144000, notes: "Stored in rack A." },
  { id: "inv-3", item_name: "Spin Bike", category: "Cardio", quantity: 10, purchase_date: "2024-09-19", condition: "fair", depreciation_method: "Reducing balance", current_value: 390000, notes: "Replace two pedals." },
  { id: "inv-4", item_name: "Kettlebell Set", category: "Functional", quantity: 2, purchase_date: "2026-02-03", condition: "excellent", depreciation_method: "Straight line", current_value: 82000, notes: "Pairs from 8kg to 32kg." }
];

export function money(value: number) {
  return new Intl.NumberFormat("en-KE", { style: "currency", currency: "KES", maximumFractionDigits: 0 }).format(value);
}

export function shortDate(value: string) {
  return new Intl.DateTimeFormat("en-GB", { day: "2-digit", month: "short", year: "numeric" }).format(new Date(value));
}

export async function getTable<T>(table: string, fallback: T[], order = "created_at") {
  try {
    const supabase = await createClient();
    const { data, error } = await supabase.from(table).select("*").order(order, { ascending: false });
    if (error || !data?.length) return fallback;
    return data as T[];
  } catch {
    return fallback;
  }
}

export function dashboardStats() {
  const today = "2026-05-23";
  const todaysPayments = payments.filter((payment) => payment.payment_date === today);
  const todaysExpenses = expenses.filter((expense) => expense.date === today);
  const todayRevenue = todaysPayments.reduce((sum, payment) => sum + payment.amount, 0);
  const monthlyRevenue = payments.reduce((sum, payment) => sum + payment.amount, 0);
  const expenseTotal = expenses.reduce((sum, expense) => sum + expense.amount, 0);

  return {
    todayRevenue,
    monthlyRevenue,
    activeMembers: members.filter((member) => member.status === "active").length,
    expiredMembers: members.filter((member) => member.status === "expired").length,
    attendanceToday: attendance.length,
    cash: todaysPayments.filter((payment) => payment.method === "cash").reduce((sum, payment) => sum + payment.amount, 0),
    mpesa: todaysPayments.filter((payment) => payment.method === "MPESA").reduce((sum, payment) => sum + payment.amount, 0),
    bank: todaysPayments.filter((payment) => payment.method === "bank").reduce((sum, payment) => sum + payment.amount, 0),
    expenses: todaysExpenses.reduce((sum, expense) => sum + expense.amount, 0),
    netProfit: monthlyRevenue - expenseTotal,
    expiryAlerts: members.filter((member) => new Date(member.expiry_date).getTime() - new Date(today).getTime() <= 1000 * 60 * 60 * 24 * 10)
  };
}
