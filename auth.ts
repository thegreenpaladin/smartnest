import NextAuth from "next-auth";
import Credentials from "next-auth/providers/credentials";

const adminEmail = process.env.ADMIN_EMAIL;
const adminPassword = process.env.ADMIN_PASSWORD;
const userPassword = process.env.USER_PASSWORD;
const allowedUserEmails = (process.env.USER_EMAILS ?? "")
  .split(",")
  .map((email) => email.trim().toLowerCase())
  .filter(Boolean);

export const { handlers, auth, signIn, signOut } = NextAuth({
  trustHost: true,
  providers: [
    Credentials({
      name: "Email & Password",
      credentials: {
        email: { label: "Email", type: "email" },
        password: { label: "Password", type: "password" },
      },
      async authorize(credentials) {
        const email = credentials?.email?.toString().toLowerCase().trim();
        const password = credentials?.password?.toString();

        if (!email || !password) return null;

        if (adminEmail && adminPassword && email === adminEmail.toLowerCase() && password === adminPassword) {
          return { id: "admin-1", name: "Store Admin", email, role: "ADMIN" };
        }

        if (userPassword && allowedUserEmails.includes(email) && password === userPassword) {
          return { id: `user-${email}`, name: "SmartNest Customer", email, role: "USER" };
        }

        return null;
      },
    }),
  ],
  session: {
    strategy: "jwt",
  },
  pages: {
    signIn: "/account/sign-in",
  },
  callbacks: {
    async jwt({ token, user }) {
      if (user) {
        token.role = user.role;
      }
      return token;
    },
    async session({ session, token }) {
      if (session.user) {
        session.user.role = (token.role as "ADMIN" | "USER" | undefined) ?? "USER";
      }
      return session;
    },
  },
});
