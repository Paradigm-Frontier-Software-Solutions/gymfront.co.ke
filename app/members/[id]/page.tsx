import { AppShell, PageHeader } from "@/components/dashboard/app-shell";
import { MemberForm } from "@/components/forms/member-form";
import { members } from "@/lib/erp-data";

export default async function MemberDetailPage({ params }: { params: Promise<{ id: string }> }) {
  const { id } = await params;
  const member = members.find((item) => item.id === id) || members[0];

  return (
    <AppShell>
      <PageHeader title={member.name} description={`Edit profile, membership, notes, and trainer assignment for ${member.member_code}.`} />
      <MemberForm member={member} />
    </AppShell>
  );
}
