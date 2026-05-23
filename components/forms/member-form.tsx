import { members, plans, trainers } from "@/lib/erp-data";
import { saveMember } from "@/app/erp-actions";

export function MemberForm({ member = members[0] }: { member?: typeof members[number] }) {
  return (
    <form action={saveMember} className="card grid gap-4 p-5 md:grid-cols-2">
      <input type="hidden" name="id" defaultValue={member.id} />
      <input type="hidden" name="member_code" defaultValue={member.member_code} />
      <label className="space-y-2">
        <span className="label">Member name</span>
        <input className="field" name="name" defaultValue={member.name} />
      </label>
      <label className="space-y-2">
        <span className="label">Phone</span>
        <input className="field" name="phone" defaultValue={member.phone} />
      </label>
      <label className="space-y-2">
        <span className="label">Email</span>
        <input className="field" name="email" type="email" defaultValue={member.email} />
      </label>
      <label className="space-y-2">
        <span className="label">ID/passport number</span>
        <input className="field" name="id_passport_number" defaultValue={member.id_passport_number} />
      </label>
      <label className="space-y-2">
        <span className="label">Emergency contact</span>
        <input className="field" name="emergency_contact" defaultValue={member.emergency_contact} />
      </label>
      <label className="space-y-2">
        <span className="label">Membership plan</span>
        <select className="field" name="membership_plan_id" defaultValue={plans.find((plan) => plan.name === member.membership_plan)?.id}>
          {plans.map((plan) => <option key={plan.id} value={plan.id}>{plan.name}</option>)}
        </select>
      </label>
      <label className="space-y-2">
        <span className="label">Start date</span>
        <input className="field" name="start_date" type="date" defaultValue={member.start_date} />
      </label>
      <label className="space-y-2">
        <span className="label">Expiry date</span>
        <input className="field" name="expiry_date" type="date" defaultValue={member.expiry_date} />
      </label>
      <label className="space-y-2">
        <span className="label">Status</span>
        <select className="field" name="status" defaultValue={member.status}>
          <option value="active">Active</option>
          <option value="expired">Expired</option>
          <option value="suspended">Suspended</option>
        </select>
      </label>
      <label className="space-y-2">
        <span className="label">Acquisition source</span>
        <select className="field" name="acquisition_source" defaultValue={member.acquisition_source}>
          <option value="customer pool">Customer pool</option>
          <option value="referral">Referral</option>
          <option value="walk-in">Walk-in</option>
        </select>
      </label>
      <label className="space-y-2">
        <span className="label">Assigned trainer</span>
        <select className="field" name="trainer_id" defaultValue={member.trainer_id}>
          {trainers.map((trainer) => <option key={trainer.id} value={trainer.id}>{trainer.name}</option>)}
        </select>
      </label>
      <label className="space-y-2">
        <span className="label">Photo URL</span>
        <input className="field" name="photo_url" defaultValue={member.photo_url} />
      </label>
      <label className="space-y-2 md:col-span-2">
        <span className="label">Notes</span>
        <textarea className="field min-h-28" name="notes" defaultValue={member.notes} />
      </label>
      <div className="md:col-span-2">
        <button className="rounded-lg bg-teal-500 px-5 py-2.5 text-sm font-bold text-white hover:bg-teal-600" type="submit">
          Save member
        </button>
      </div>
    </form>
  );
}
