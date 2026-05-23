import { Dumbbell } from "lucide-react";
import { signIn } from "@/app/auth-actions";

export default async function LoginPage({
  searchParams
}: {
  searchParams: Promise<{ error?: string; next?: string }>;
}) {
  const params = await searchParams;

  return (
    <main className="flex min-h-screen items-center justify-center bg-navy-950 px-4 py-10">
      <section className="w-full max-w-md rounded-lg border border-white/10 bg-white p-6 shadow-premium">
        <div className="mb-6 flex items-center gap-3">
          <span className="flex h-11 w-11 items-center justify-center rounded-lg bg-teal-500 text-white">
            <Dumbbell className="h-5 w-5" />
          </span>
          <div>
            <h1 className="text-2xl font-black text-navy-950">Ignite Gym ERP</h1>
            <p className="text-sm text-slate-500">Sign in with Supabase Auth</p>
          </div>
        </div>
        {params.error ? <p className="mb-4 rounded-lg bg-rose-50 p-3 text-sm font-semibold text-rose-700">{params.error}</p> : null}
        <form action={signIn} className="grid gap-4">
          <input type="hidden" name="next" value={params.next || "/"} />
          <label className="space-y-2">
            <span className="label">Email</span>
            <input name="email" type="email" required placeholder="owner@ignite.local" className="field" />
          </label>
          <label className="space-y-2">
            <span className="label">Password</span>
            <input name="password" type="password" required placeholder="Password" className="field" />
          </label>
          <button type="submit" className="rounded-lg bg-teal-500 px-5 py-3 text-sm font-bold text-white hover:bg-teal-600">
            Sign in
          </button>
        </form>
        <p className="mt-5 text-xs text-slate-500">Demo mode renders without Supabase credentials. Add real keys to enable authenticated sessions and RLS-backed data.</p>
      </section>
    </main>
  );
}
