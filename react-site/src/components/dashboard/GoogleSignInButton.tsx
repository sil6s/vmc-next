"use client";

import Image from "next/image";
import { createClient } from "@/lib/supabase/client";

export function GoogleSignInButton({ callbackUrl }: { callbackUrl: string }) {
  const handleSignIn = async () => {
    const supabase = createClient();
    await supabase.auth.signInWithOAuth({
      provider: "google",
      options: {
        redirectTo: `${window.location.origin}/api/auth/callback?next=${encodeURIComponent(callbackUrl)}`
      }
    });
  };

  return (
    <button className="admin-google-button" type="button" onClick={handleSignIn}>
      <Image src="/images/google-logo.webp" alt="" width={22} height={22} />
      Continue with Google
    </button>
  );
}
