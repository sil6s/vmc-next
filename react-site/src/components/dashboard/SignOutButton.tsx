"use client";

import { ChevronDown, LogOut } from "lucide-react";
import { signOut } from "next-auth/react";

export function SignOutButton() {
  return (
    <details className="dashboard-profile-menu">
      <summary aria-label="Open administrator menu">
        <ChevronDown aria-hidden="true" size={16} />
      </summary>
      <div>
        <button className="dashboard-signout" type="button" onClick={() => signOut({ callbackUrl: "/login/" })}>
          <LogOut aria-hidden="true" size={16} />
          Sign out
        </button>
      </div>
    </details>
  );
}
