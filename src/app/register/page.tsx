import { SessionProvider } from "next-auth/react";
import RegisterForm from "../../components/RegisterForm";

export default async function RegisterComponent() {
  return (
    <SessionProvider>
      <RegisterForm />
    </SessionProvider>
  );
}
