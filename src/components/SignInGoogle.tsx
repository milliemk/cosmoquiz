"uce client";
import { signIn } from "next-auth/react";
import styles from "@/styles/loginAndRegister.module.css";
import Image from "next/image";

export default function SignIn() {
  return (
    <form
      onSubmit={async (e) => {
        e.preventDefault();
        await signIn("google");
      }}
    >
      <button className={styles.buttonGoogle} type="submit">
        <Image
          src="/web_neutral_rd_SI.svg"
          alt="Login with Google"
          width={200}
          height={50}
        />
      </button>
    </form>
  );
}
