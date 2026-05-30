"use client";

import { ChevronDown, LogOut } from "lucide-react";
import { useRouter } from "next/navigation";
import { createClient } from "@/lib/supabase/client";

export function SignOutButton() {
  const router = useRouter();

  const handleSignOut = async () => {
    const supabase = createClient();
    await supabase.auth.signOut();
    router.push("/login/");
  };

  return (
    <details className="dashboard-profile-menu">
      <summary aria-label="Open administrator menu">
        <ChevronDown aria-hidden="true" size={16} />
      </summary>
      <div>
        <button className="dashboard-signout" type="button" onClick={handleSignOut}>
          <LogOut aria-hidden="true" size={16} />
          Sign out
        </button>
      </div>
    </details>
  );
}
