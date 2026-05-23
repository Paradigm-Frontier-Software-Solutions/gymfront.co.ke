"use server";

import { redirect } from "next/navigation";
import { createClient } from "@/lib/supabase/server";

export async function signIn(formData: FormData) {
  const supabase = await createClient();
  const email = String(formData.get("email"));
  const password = String(formData.get("password"));
  const next = String(formData.get("next") || "/");

  const { error } = await supabase.auth.signInWithPassword({ email, password });

  if (error) {
    redirect(`/login?error=${encodeURIComponent(error.message)}`);
  }

  redirect(next);
}

export async function signUp(formData: FormData) {
  const supabase = await createClient();
  const email = String(formData.get("email"));
  const password = String(formData.get("password"));
  const fullName = String(formData.get("fullName"));
  const phone = String(formData.get("phone") || "");

  const { error } = await supabase.auth.signUp({
    email,
    password,
    options: {
      data: {
        full_name: fullName,
        phone,
        role: "front_desk"
      }
    }
  });

  if (error) {
    redirect(`/register?error=${encodeURIComponent(error.message)}`);
  }

  redirect("/login?registered=1");
}

export async function signOut() {
  const supabase = await createClient();
  await supabase.auth.signOut();
  redirect("/");
}
