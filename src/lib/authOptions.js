import { connectToDB } from "@/utils/db";
import User from "@/models/User";
import bcrypt from "bcryptjs";

export async function getAuthOptions() {
  try {
    const { default: CredentialsProvider } = await import("next-auth/providers/credentials");

    return {
      secret: process.env.NEXTAUTH_SECRET,
      debug: process.env.NODE_ENV === "development",
      providers: [
        CredentialsProvider({
          name: "Credentials",
          credentials: {
            email: { label: "Email", type: "text" },
            password: { label: "Password", type: "password" },
          },
          async authorize(credentials) {
            try {
              await connectToDB();
              const user = await User.findOne({ email: credentials.email });
              if (!user) return null;

              const isValid = await bcrypt.compare(credentials.password, user.password);
              if (!isValid) return null;

              return {
                id: user._id.toString(),
                email: user.email,
                firstName: user.firstName || "",
                lastName: user.lastName || "",
                isAdmin: Boolean(user.isAdmin),
                referralCode: user.referralCode || null,
                usedReferralCode: user.usedReferralCode || null,
              };
            } catch (err) {
              console.error("❌ Error in authorize():", err);
              return null;
            }
          },
        }),
      ],
      session: { strategy: "jwt" },
      pages: {
        signIn: "/login",
        error: "/login", // fallback to login on error
      },
      callbacks: {
        async jwt({ token, user }) {
          if (user) {
            token.id = user.id;
            token.email = user.email;
            token.firstName = user.firstName;
            token.lastName = user.lastName;
            token.isAdmin = Boolean(user.isAdmin);
            token.referralCode = user.referralCode || null;
            token.usedReferralCode = user.usedReferralCode || null;
          }
          return token;
        },
        async session({ session, token }) {
          session.user = {
            id: token.id,
            email: token.email,
            firstName: token.firstName,
            lastName: token.lastName,
            isAdmin: Boolean(token.isAdmin),
            referralCode: token.referralCode || null,
            usedReferralCode: token.usedReferralCode || null,
          };
          return session;
        },
      },
    };
  } catch (error) {
    console.error("❌ getAuthOptions failed:", error);
    throw error;
  }
}
