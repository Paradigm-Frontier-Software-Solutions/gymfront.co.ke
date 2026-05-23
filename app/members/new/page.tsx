import { AppShell, PageHeader } from "@/components/dashboard/app-shell";
import { MemberForm } from "@/components/forms/member-form";
import { members } from "@/lib/erp-data";

export default function NewMemberPage() {
  const blank = { ...members[0], id: "", member_code: "", name: "", phone: "", email: "", id_passport_number: "", emergency_contact: "", notes: "", photo_url: "" };

  return (
    <AppShell>
      <PageHeader title="Register Member" description="Create a member profile, assign a plan, capture emergency details, and prepare a QR/member code." />
      <MemberForm member={blank} />
    </AppShell>
  );
}
