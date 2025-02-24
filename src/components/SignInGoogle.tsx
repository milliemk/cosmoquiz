"uce client";
import { signIn } from "next-auth/react";

export default function SignIn() {
  return (
    <form
      /* action={async () => {
        "use server";
        await signIn("google");
      }} */
      onSubmit={async (e) => {
        e.preventDefault();
        await signIn("google");
      }}
    >
      <button type="submit">Signin with Google</button>
    </form>
  );
}
