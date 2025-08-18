import NextAuth from "next-auth";
import Google from "next-auth/providers/google";
import { SupabaseAdapter } from "@auth/supabase-adapter";
import jwt from "jsonwebtoken";
import { getUserByUserId } from "./lib/server-api/user.api";

export const { handlers, signIn, signOut, auth } = NextAuth({
  providers: [Google],
  adapter: SupabaseAdapter({
    url: process.env.SUPABASE_URL!,
    secret: process.env.SUPABASE_SERVICE_ROLE_KEY!,
  }),
  callbacks: {
    async session({ session, user }) {
      const dbUser = await getUserByUserId(user.id);

      const signingSecret = process.env.SUPABASE_JWT_SECRET;
      if (signingSecret) {
        const payload = {
          aud: "authenticated",
          exp: Math.floor(new Date(session.expires).getTime() / 1000),
          sub: user.id,
          email: user.email,
          db_role: dbUser.role,
        };
        session.supabaseAccessToken = jwt.sign(payload, signingSecret);
      }
      return session;
    },
    async signIn({ user }) {
      if (!user.is_admin) {
        return false;
      }

      return true;
    },
  },
  pages: {
    error: "/login",
  },
});
