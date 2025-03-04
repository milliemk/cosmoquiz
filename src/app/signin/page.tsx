import LoginForm from "@/components/LoginForm";
import { SessionProvider } from "next-auth/react";

export default async function login() {
  return (
    <SessionProvider>
      <LoginForm />
    </SessionProvider>
  );
}
