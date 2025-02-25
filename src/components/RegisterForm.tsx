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

function RegisterForm() {
  return (
    <>
      <div className={styles.container}>
        <div className={styles.header}>
          <h2>Register</h2>
        </div>

        <form className={styles.form}>
          <p className={quicksand.className}>
            Ready to start your journey? Set up your Space Credentials and join
            the Crew today.
          </p>
          <div className={styles.inputs}>
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
          </div>
          <div className={styles.footer}>
            <button className={styles.button}>Register!</button>
            <button className={styles.buttonGoogle}>
              <img src="/web_neutral_rd_SU.svg" alt="Login with Google" />
            </button>
          </div>
        </form>
      </div>
    </>
  );
}

export default RegisterForm;
