"use client";
import { FormEvent, useState } from "react";
import { signIn, signOut, useSession } from "next-auth/react";
import { object, string, ZodError } from "zod";
import SignInGoogle from "@/components/SignInGoogle";

export const signInSchema = object({
  email: string({ required_error: "Email is required" })
    .min(1, "Email is required")
    .email("Invalid email"),
  password: string({ required_error: "Password is required" })
    .min(1, "Password is required")
    .min(6, "Password must be more than 6 characters")
    .max(10, "Password must be less than 10 characters"),
});

export default function LoginForm() {
  const [error, setError] = useState<string | null>(null);
  const session = useSession();
  console.log("session :>> ", session);

  const hundleSubmit = async (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const formData = new FormData(e.currentTarget);
    const userData = {
      email: formData.get("email") as string,
      password: formData.get("password") as string,
    };
    try {
      const validatedData = signInSchema.parse(userData);
      console.log("validatedData :>> ", validatedData);

      const response = await signIn("credentials", {
        // to avoid page reload
        redirect: false,
        email: formData.get("email"),
        password: formData.get("password"),
      });

      if (response?.error) {
        // Mapping the error to a user-friendly message using switch / case
        switch (response.error) {
          case "AccountNotLinked":
            setError("User not found. Please check your email.");
            break;
          case "AccessDenied":
            setError("Incorrect password. Please try again.");
            break;
          default:
            setError("An error occurred. Please try again.");
        }
      }
    } catch (error) {
      if (error instanceof ZodError) {
        // Validation error, which was thrown by ZOB
        setError(error.errors[0].message);
      } else {
        setError("An error occurred. Please try again.");
      }
    }
  };
  return (
    <div>
      {session.status === "loading" ? (
        <div style={{ color: "white" }}>Loading ...</div>
      ) : session.status === "authenticated" ? (
        <>
          <div style={{ color: "white" }}>
            Welcome {session.data.user?.name}
          </div>
          <button
            onClick={() => signOut()}
            style={{ padding: "10px 20px", background: "red", color: "white" }}
          >
            Sign Out
          </button>
        </>
      ) : (
        <>
          <h2>Login</h2>
          {error && <h4>{error}</h4>}
          <form onSubmit={hundleSubmit}>
            <label>
              Email
              <input name="email" type="email" />
            </label>
            <label>
              Password
              <input name="password" type="password" />
            </label>
            <button>Sign Up</button>
          </form>
          <SignInGoogle />
        </>
      )}
    </div>
  );
}
