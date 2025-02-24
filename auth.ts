import NextAuth from "next-auth";
import { DrizzleAdapter } from "@auth/drizzle-adapter";
import { db, users } from "./src/db/schema";
import { isPasswordCorrect } from "./utils/passwordServices.js";
import Credentials from "@auth/core/providers/credentials";
import { eq } from "drizzle-orm";
import { AccessDenied, AccountNotLinked } from "@auth/core/errors";
import Google from "next-auth/providers/google";

export const { handlers, auth, signIn, signOut } = NextAuth({
  adapter: DrizzleAdapter(db),
  secret: process.env.NEXTAUTH_SECRET,
  session: { strategy: "jwt" },
  providers: [
    Google,
    Credentials({
      // You can specify which fields should be submitted, by adding keys to the `credentials` object.
      // e.g. domain, username, password, 2FA token, etc.
      credentials: {
        email: {},
        password: {},
      },
      async authorize(credentials: any): Promise<any> {
        let user = null;

        const userPass = credentials.password;
        const userEmail = credentials.email;

        user = await db
          .select()
          .from(users)
          .where(eq(users.email, userEmail!))
          .limit(1)
          .execute();

        if (!user[0]) {
          // No user found, so this attempt to login wasn't successful
          // we cent to the client AccountNotLinked error
          throw new AccountNotLinked(
            "User not found. Please register.",
            new AccessDenied("User not found")
          );
        } else {
          // in this secttion we check user password
          const isPassCorrect = await isPasswordCorrect(
            userPass,
            user[0].password
          );
          //if password isCorrect we send user object to the provider
          if (isPassCorrect) {
            return user[0];
            // if the password which typed user was not correct, we send AccessDenied error
          } else {
            console.log("Password is incorrect");
            throw new AccessDenied(
              "Password is incorrect",
              new AccessDenied("Password is incorrect")
            );
          }
        }
      },
    }),
  ],
});
