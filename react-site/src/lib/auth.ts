import type { NextAuthOptions } from "next-auth";
import GoogleProvider from "next-auth/providers/google";
import { authSecret } from "@/lib/auth-secret";
import { upsertUser } from "@/lib/settings/settings";

export const authOptions: NextAuthOptions = {
  session: {
    strategy: "jwt"
  },
  pages: {
    signIn: "/login"
  },
  providers: [
    GoogleProvider({
      clientId: process.env.GOOGLE_CLIENT_ID || "",
      clientSecret: process.env.GOOGLE_CLIENT_SECRET || ""
    })
  ],
  callbacks: {
    async signIn({ user }) {
      if (user.email) {
        await upsertUser(user.email, user.name, user.image);
      }
      return true;
    },
    async session({ session, token }) {
      if (session.user && token.email) {
        session.user.email = token.email;
      }
      return session;
    }
  },
  secret: authSecret()
};
