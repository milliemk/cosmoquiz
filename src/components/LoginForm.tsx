"use client";
import { FormEvent, useState } from "react";
import { signIn, useSession } from "next-auth/react";
import { object, string, ZodError } from "zod";
import SignInGoogle from "@/components/SignInGoogle";
import styles from "@/styles/loginAndRegister.module.css";
import { Quicksand, Righteous } from "next/font/google";
import Link from "next/link";
import { useRouter } from "next/navigation";

const quicksand = Quicksand({
  weight: ["400"],
  subsets: ["latin"],
});

const righteous = Righteous({
  weight: ["400"],
  subsets: ["latin"],
});

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
  const router = useRouter();
  const [error, setError] = useState<string | null>(null);
  const session = useSession();

  const hundleSubmit = async (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const formData = new FormData(e.currentTarget);
    const userData = {
      email: formData.get("email") as string,
      password: formData.get("password") as string,
    };
    try {
      signInSchema.parse(userData);

      const response = await signIn("credentials", {
        // to avoid page reload
        redirect: false,
        email: formData.get("email"),
        password: formData.get("password"),
        callbackUrl: "/quiz",
      });
      console.log("response response :>> ", response);
      if (!response?.error) {
        router.push("/");
        router.refresh();
      }
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
        <div style={{ color: "white" }} className={quicksand.className}>
          Loading ...
        </div>
      ) : session.status === "authenticated" ? (
        <>
          <div style={{ color: "white" }} className={righteous.className}>
            Welcome, {session.data.user?.name}!
          </div>
        </>
      ) : (
        <div className={styles.container}>
          <div className={styles.header}>
            {" "}
            <h2>Log in</h2>
          </div>

          {error && <h4>{error}</h4>}
          <form onSubmit={hundleSubmit} className={styles.form}>
            <p className={quicksand.className}>
              Nice to see you again! Please verify your Space Credentials to
              continue your Galactic Journey.
            </p>
            <label className={styles.spacedLabel}>
              Email
              <input name="email" type="email" />
            </label>
            <label className={styles.spacedLabel}>
              Password
              <input name="password" type="password" />
            </label>
            <button className={styles.button}>Confirm!</button>
          </form>
          <SignInGoogle />
          <Link href="/register">
            <p className={quicksand.className} style={{ color: "white" }}>
              Do not have an account yet? Register!
            </p>
          </Link>
        </div>
      )}
    </div>
  );
}
