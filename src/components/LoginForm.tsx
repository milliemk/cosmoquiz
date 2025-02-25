import React from "react";
import styles from "@/styles/loginAndRegister.module.css";
import { Quicksand, Righteous } from "next/font/google";

const quicksand = Quicksand({
  weight: ["400"],
  subsets: ["latin"],
});

const righteous = Righteous({
  weight: ["400"],
  subsets: ["latin"],
});

function LoginForm() {
  return (
    <>
      <div className={styles.container}>
        <div className={styles.header}>
          <h2>Log In</h2>
        </div>

        <form className={styles.form}>
          <p className={quicksand.className}>
            Nice to see you again! Please verify your Space Credentials to
            continue your Galactic Journey.
          </p>
          <div className={styles.inputs}>
            <label className={styles.spacedLabel}>
              Email
              <input name="email" type="email" />
            </label>
            <label className={styles.spacedLabel}>
              Password
              <input name="password" type="password" />
            </label>
          </div>
          <div className={styles.footer}>
            <button className={styles.button}>Log in!</button>
            <button className={styles.buttonGoogle}>
              <img src="/web_neutral_rd_SI.svg" alt="Login with Google" />
            </button>
          </div>
        </form>
      </div>
    </>
  );
}

export default LoginForm;
