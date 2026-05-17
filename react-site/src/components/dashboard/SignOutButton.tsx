"use client";

import { LogOut } from "lucide-react";
import { signOut } from "next-auth/react";

export function SignOutButton() {
  return (
    <button className="dashboard-signout" type="button" onClick={() => signOut({ callbackUrl: "/login/" })}>
      <LogOut aria-hidden="true" size={16} />
      Sign out
    </button>
  );
}
