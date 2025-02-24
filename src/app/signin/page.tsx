import { SessionProvider } from "next-auth/react";
import LoginForm from "./loginform";

export default async function login() {
  return (
    <SessionProvider>
      <LoginForm />
    </SessionProvider>
  );
}
/* import { signIn } from "../../../auth";

function login() {
  return (
    <form
      action={async (formData) => {
        "use server";
        const result = await signIn("credentials", {
          email: formData.get("email"),
          password: formData.get("password"),
        });

        console.log("result from login:>> ", result);
      }}
    >
      <label>
        Email
        <input name="email" type="email" />
      </label>
      <label>
        Password
        <input name="password" type="password" />
      </label>
      <button>Sign In</button>
    </form>
  );
}
export default login;
 */
