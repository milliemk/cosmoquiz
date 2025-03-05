"use client";
import { signIn, signOut, useSession } from "next-auth/react";
import { FormEvent, useState } from "react";
import { object, string, ZodError } from "zod";
import styles from "@/styles/loginAndRegister.module.css";
import { Quicksand, Righteous } from "next/font/google";
import RegisterGoogle from "@/components/RegisterGoogle";
import { useRouter } from "next/navigation";
import Link from "next/link";

const quicksand = Quicksand({
  weight: ["400"],
  subsets: ["latin"],
});

const righteous = Righteous({
  weight: ["400"],
  subsets: ["latin"],
});

export const signUpSchema = object({
  name: string({ required_error: "Name is required" })
    .min(1, "Name is required")
    .min(3, "Name must be more than 3 characters")
    .max(15, "Name must be less than 15 characters"),
  email: string({ required_error: "Email is required" })
    .min(1, "Email is required")
    .email("Invalid email"),
  password: string({ required_error: "Password is required" })
    .min(1, "Password is required")
    .min(6, "Password must be more than 6 characters")
    .max(10, "Password must be less than 10 characters"),
});

export default function RegisterForm() {
  const [messageFromServer, setMessageFromServer] = useState<string | null>(
    null
  );
  const session = useSession();
  const router = useRouter();

  const hundleSubmit = async (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setMessageFromServer(null);
    const formData = new FormData(e.currentTarget);
    const userData = {
      name: formData.get("name") as string,
      email: formData.get("email") as string,
      password: formData.get("password") as string,
    };
    try {
      const validatedData = signUpSchema.parse(userData);
      const response = await fetch("/api/auth/register", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(validatedData),
      });
      const result = await response.json();
      if (!response.ok) {
        setMessageFromServer(result.message);
      }
      if (response.ok) {
        setMessageFromServer(result.message);
        // Automatic user login after registration
        const signInResponse = await signIn("credentials", {
          redirect: false,
          email: userData.email,
          password: userData.password,
        });
        if (!signInResponse?.error) {
          router.push("/");
          router.refresh();
        }
      }
      console.log("result :>> ", result);
    } catch (error) {
      if (error instanceof ZodError) {
        // Validation error, which was thrown by ZOB
        setMessageFromServer(error.errors[0].message);
      } else {
        setMessageFromServer("An error occurred. Please try again.");
      }
    }
  };
  return (
    <div>
      {session.status === "loading" ? (
        <div style={{ color: "white" }}>Loading ...</div>
      ) : session.status === "authenticated" ? (
        <>
          <div style={{ color: "white" }} className={righteous.className}>
            Welcome, {session.data.user?.name}!
          </div>
          <button
            onClick={() => signOut()}
            style={{ padding: "10px 20px", background: "red", color: "white" }}
          >
            Sign Out
          </button>
        </>
      ) : (
        <div className={styles.container}>
          <div className={styles.header}>
            <h2>Registration</h2>
          </div>
          {messageFromServer && <h4>{messageFromServer}</h4>}
          <form onSubmit={hundleSubmit} className={styles.form}>
            <p className={quicksand.className}>
              Ready to start your journey? Set up your Space Credentials and
              join the Crew today.
            </p>
            <label className={styles.spacedLabel}>
              Name
              <input name="name" type="text" />
            </label>
            <label className={styles.spacedLabel}>
              Email
              <input name="email" type="email" />
            </label>
            <label className={styles.spacedLabel}>
              Password
              <input name="password" type="password" />
            </label>
            <div className={styles.footer}></div>
            <button className={styles.button}>Confirm</button>
          </form>
          <RegisterGoogle />
          <Link href="/signin">
            <p className={quicksand.className} style={{ color: "white" }}>
              Already have an account? Sign in!
            </p>
          </Link>
        </div>
      )}
    </div>
  );
}
