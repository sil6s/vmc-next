"use client";

import Image from "next/image";
import { signIn } from "next-auth/react";

export function GoogleSignInButton({ callbackUrl }: { callbackUrl: string }) {
  return (
    <button className="admin-google-button" type="button" onClick={() => signIn("google", { callbackUrl })}>
      <Image src="/images/google-logo.webp" alt="" width={22} height={22} />
      Continue with Google
    </button>
  );
}
