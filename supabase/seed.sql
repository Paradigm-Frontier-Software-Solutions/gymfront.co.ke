insert into membership_plans (id, name, price, duration_days, commission_rate) values
  ('11111111-1111-1111-1111-111111111111', 'Daily', 500, 1, 0.50),
  ('22222222-2222-2222-2222-222222222222', 'Monthly', 4500, 30, 0.40),
  ('33333333-3333-3333-3333-333333333333', 'Quarterly', 12000, 90, 0.30),
  ('44444444-4444-4444-4444-444444444444', 'Annual', 42000, 365, 0.20)
on conflict (name) do update set price = excluded.price, duration_days = excluded.duration_days, commission_rate = excluded.commission_rate;

insert into trainers (id, name, phone, email, specialty) values
  ('aaaaaaaa-aaaa-aaaa-aaaa-aaaaaaaaaaa1', 'Amina Yusuf', '+254700100001', 'amina@ignite.local', 'Strength'),
  ('aaaaaaaa-aaaa-aaaa-aaaa-aaaaaaaaaaa2', 'Brian Otieno', '+254700100002', 'brian@ignite.local', 'Functional fitness'),
  ('aaaaaaaa-aaaa-aaaa-aaaa-aaaaaaaaaaa3', 'Nadia Hassan', '+254700100003', 'nadia@ignite.local', 'Mobility')
on conflict (id) do update set name = excluded.name, phone = excluded.phone, email = excluded.email, specialty = excluded.specialty;

insert into members (id, member_code, name, phone, email, id_passport_number, emergency_contact, membership_plan_id, trainer_id, start_date, expiry_date, status, acquisition_source, photo_url, notes) values
  ('bbbbbbbb-bbbb-bbbb-bbbb-bbbbbbbbbb01', 'IGN-1001', 'Elijah Mwangi', '+254711000001', 'elijah@example.com', 'ID101001', '+254722100001', '22222222-2222-2222-2222-222222222222', 'aaaaaaaa-aaaa-aaaa-aaaa-aaaaaaaaaaa1', '2026-05-01', '2026-05-31', 'active', 'walk-in', '/member-placeholder.svg', 'Prefers evening workouts.'),
  ('bbbbbbbb-bbbb-bbbb-bbbb-bbbbbbbbbb02', 'IGN-1002', 'Sarah Achieng', '+254711000002', 'sarah@example.com', 'ID101002', '+254722100002', '33333333-3333-3333-3333-333333333333', 'aaaaaaaa-aaaa-aaaa-aaaa-aaaaaaaaaaa2', '2026-04-15', '2026-07-14', 'active', 'referral', '/member-placeholder.svg', 'Training for marathon.'),
  ('bbbbbbbb-bbbb-bbbb-bbbb-bbbbbbbbbb03', 'IGN-1003', 'Mohamed Ali', '+254711000003', 'mohamed@example.com', 'P101003', '+254722100003', '11111111-1111-1111-1111-111111111111', 'aaaaaaaa-aaaa-aaaa-aaaa-aaaaaaaaaaa3', '2026-05-23', '2026-05-23', 'active', 'customer pool', '/member-placeholder.svg', 'Day pass.'),
  ('bbbbbbbb-bbbb-bbbb-bbbb-bbbbbbbbbb04', 'IGN-1004', 'Grace Wanjiku', '+254711000004', 'grace@example.com', 'ID101004', '+254722100004', '44444444-4444-4444-4444-444444444444', 'aaaaaaaa-aaaa-aaaa-aaaa-aaaaaaaaaaa1', '2026-01-10', '2027-01-09', 'active', 'referral', '/member-placeholder.svg', 'VIP locker.'),
  ('bbbbbbbb-bbbb-bbbb-bbbb-bbbbbbbbbb05', 'IGN-1005', 'Kevin Njoroge', '+254711000005', 'kevin@example.com', 'ID101005', '+254722100005', '22222222-2222-2222-2222-222222222222', 'aaaaaaaa-aaaa-aaaa-aaaa-aaaaaaaaaaa2', '2026-04-01', '2026-04-30', 'expired', 'walk-in', '/member-placeholder.svg', 'Send renewal reminder.'),
  ('bbbbbbbb-bbbb-bbbb-bbbb-bbbbbbbbbb06', 'IGN-1006', 'Fatima Noor', '+254711000006', 'fatima@example.com', 'P101006', '+254722100006', '22222222-2222-2222-2222-222222222222', 'aaaaaaaa-aaaa-aaaa-aaaa-aaaaaaaaaaa3', '2026-05-12', '2026-06-11', 'active', 'customer pool', '/member-placeholder.svg', 'New member orientation done.'),
  ('bbbbbbbb-bbbb-bbbb-bbbb-bbbbbbbbbb07', 'IGN-1007', 'Daniel Kimani', '+254711000007', 'daniel@example.com', 'ID101007', '+254722100007', '33333333-3333-3333-3333-333333333333', 'aaaaaaaa-aaaa-aaaa-aaaa-aaaaaaaaaaa1', '2026-03-02', '2026-05-31', 'active', 'referral', '/member-placeholder.svg', 'Expiry this month.'),
  ('bbbbbbbb-bbbb-bbbb-bbbb-bbbbbbbbbb08', 'IGN-1008', 'Lina Omar', '+254711000008', 'lina@example.com', 'P101008', '+254722100008', '22222222-2222-2222-2222-222222222222', 'aaaaaaaa-aaaa-aaaa-aaaa-aaaaaaaaaaa2', '2026-02-10', '2026-03-11', 'suspended', 'walk-in', '/member-placeholder.svg', 'Suspended pending payment.'),
  ('bbbbbbbb-bbbb-bbbb-bbbb-bbbbbbbbbb09', 'IGN-1009', 'Victor Ouma', '+254711000009', 'victor@example.com', 'ID101009', '+254722100009', '11111111-1111-1111-1111-111111111111', 'aaaaaaaa-aaaa-aaaa-aaaa-aaaaaaaaaaa2', '2026-05-23', '2026-05-23', 'active', 'walk-in', '/member-placeholder.svg', 'Walk-in boxing class.'),
  ('bbbbbbbb-bbbb-bbbb-bbbb-bbbbbbbbbb10', 'IGN-1010', 'Rebecca Muthoni', '+254711000010', 'rebecca@example.com', 'ID101010', '+254722100010', '44444444-4444-4444-4444-444444444444', 'aaaaaaaa-aaaa-aaaa-aaaa-aaaaaaaaaaa3', '2025-08-01', '2026-07-31', 'active', 'referral', '/member-placeholder.svg', 'Corporate plan.')
on conflict (member_code) do update set name = excluded.name, status = excluded.status, expiry_date = excluded.expiry_date;

insert into payments (id, member_id, amount, method, reference_number, payment_date, membership_plan_id, receipt_number) values
  ('cccccccc-cccc-cccc-cccc-cccccccccc01', 'bbbbbbbb-bbbb-bbbb-bbbb-bbbbbbbbbb01', 4500, 'MPESA', 'QK51A001', '2026-05-23', '22222222-2222-2222-2222-222222222222', 'RCPT-20260523-001'),
  ('cccccccc-cccc-cccc-cccc-cccccccccc02', 'bbbbbbbb-bbbb-bbbb-bbbb-bbbbbbbbbb03', 500, 'cash', 'CASH-119', '2026-05-23', '11111111-1111-1111-1111-111111111111', 'RCPT-20260523-002'),
  ('cccccccc-cccc-cccc-cccc-cccccccccc03', 'bbbbbbbb-bbbb-bbbb-bbbb-bbbbbbbbbb04', 42000, 'bank', 'BNK-88219', '2026-05-20', '44444444-4444-4444-4444-444444444444', 'RCPT-20260520-004'),
  ('cccccccc-cccc-cccc-cccc-cccccccccc04', 'bbbbbbbb-bbbb-bbbb-bbbb-bbbbbbbbbb07', 12000, 'MPESA', 'QK50Z991', '2026-05-18', '33333333-3333-3333-3333-333333333333', 'RCPT-20260518-003')
on conflict (receipt_number) do update set amount = excluded.amount, method = excluded.method;

insert into receipts (payment_id, receipt_number, issued_to, subtotal, total)
select p.id, p.receipt_number, m.name, p.amount, p.amount
from payments p join members m on m.id = p.member_id
on conflict (receipt_number) do nothing;

insert into attendance (member_id, check_in_at, check_out_at, membership_valid, warning) values
  ('bbbbbbbb-bbbb-bbbb-bbbb-bbbbbbbbbb01', '2026-05-23 06:22:00+03', '2026-05-23 07:31:00+03', true, null),
  ('bbbbbbbb-bbbb-bbbb-bbbb-bbbbbbbbbb02', '2026-05-23 07:05:00+03', null, true, null),
  ('bbbbbbbb-bbbb-bbbb-bbbb-bbbbbbbbbb05', '2026-05-23 08:15:00+03', null, false, 'Membership expired'),
  ('bbbbbbbb-bbbb-bbbb-bbbb-bbbbbbbbbb09', '2026-05-23 09:30:00+03', null, true, null);

insert into expenses (category, description, amount, date, payment_method) values
  ('Utilities', 'Electricity token', 3200, '2026-05-23', 'MPESA'),
  ('Cleaning', 'Sanitizer and towels', 1800, '2026-05-22', 'cash'),
  ('Maintenance', 'Treadmill belt service', 6500, '2026-05-18', 'bank');

insert into inventory (item_name, category, quantity, purchase_date, condition, depreciation_method, current_value, notes) values
  ('Treadmill Pro X', 'Cardio', 4, '2025-11-02', 'good', 'Straight line', 540000, 'One unit due for service.'),
  ('Olympic Barbell', 'Strength', 8, '2025-06-12', 'excellent', 'Straight line', 144000, 'Stored in rack A.'),
  ('Spin Bike', 'Cardio', 10, '2024-09-19', 'fair', 'Reducing balance', 390000, 'Replace two pedals.'),
  ('Kettlebell Set', 'Functional', 2, '2026-02-03', 'excellent', 'Straight line', 82000, 'Pairs from 8kg to 32kg.');

insert into trainer_commissions (trainer_id, member_id, payment_id, membership_plan_id, commission_rate, gross_amount, commission_amount, earned_date)
select m.trainer_id, p.member_id, p.id, p.membership_plan_id, mp.commission_rate, p.amount, round(p.amount * mp.commission_rate, 2), p.payment_date
from payments p
join members m on m.id = p.member_id
join membership_plans mp on mp.id = p.membership_plan_id
where m.trainer_id is not null;
