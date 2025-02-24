import { SessionProvider } from "next-auth/react";
import Form from "./form";

export default async function RegisterComponent() {
  return (
    <SessionProvider>
      <Form />
    </SessionProvider>
  );
}
