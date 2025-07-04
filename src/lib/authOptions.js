import { connectToDB } from "@/utils/db";
import User from "@/models/User";
import bcrypt from "bcryptjs";

export async function getAuthOptions() {
  const { default: CredentialsProvider } = await import("next-auth/providers/credentials");

  return {
    secret: process.env.NEXTAUTH_SECRET,
    providers: [
      CredentialsProvider({
        name: "Credentials",
        credentials: {
          email: { label: "Email", type: "text" },
          password: { label: "Password", type: "password" },
        },
        async authorize(credentials) {
          await connectToDB();
          const user = await User.findOne({ email: credentials.email });
          if (!user) throw new Error("No user found with that email");
          const isValid = await bcrypt.compare(credentials.password, user.password);
          if (!isValid) throw new Error("Incorrect password");

          return {
            id: user._id.toString(),
            email: user.email,
            firstName: user.firstName || "",
            lastName: user.lastName || "",
            isAdmin: user.isAdmin || false,
            referralCode: user.referralCode || null,
            usedReferralCode: user.usedReferralCode || null,
          };
        },
      }),
    ],
    session: { strategy: "jwt" },
    pages: { signIn: "/login" },
    callbacks: {
      async jwt({ token, user }) {
        if (user) {
          token.id = user.id;
          token.email = user.email;
          token.firstName = user.firstName;
          token.lastName = user.lastName;
          token.isAdmin = user.isAdmin || false;
          token.referralCode = user.referralCode || null;
          token.usedReferralCode = user.usedReferralCode || null;
        }
        return token;
      },
      async session({ session, token }) {
        session.user.id = token.id;
        session.user.email = token.email;
        session.user.firstName = token.firstName;
        session.user.lastName = token.lastName;
        session.user.isAdmin = token.isAdmin || false;
        session.user.referralCode = token.referralCode || null;
        session.user.usedReferralCode = token.usedReferralCode || null;
        return session;
      },
    },
  };
}
