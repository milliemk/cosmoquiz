"use client";
import styles from "@/styles/navigation.module.css";
import { signOut, useSession } from "next-auth/react";
import { Quicksand, Righteous } from "next/font/google";
import Link from "next/link";
import { useEffect, useState } from "react";

const quicksand = Quicksand({
  weight: ["400"],
  subsets: ["latin"],
});

const righteous = Righteous({
  weight: ["400"],
  subsets: ["latin"],
});

function NavigationBar() {
  const session = useSession();
  console.log("session :>> ", session);

  return (
    <>
      {session.status === "loading" ? (
        <div
          style={{ color: "white", padding: 15 }}
          className={`${styles.container} ${quicksand.className}`}
        >
          Loading ...
        </div>
      ) : session.status === "authenticated" ? (
        <div className={styles.container}>
          <div className={styles.userBox}>
            <p className={righteous.className}>{session.data.user?.name}</p>
            <p className={quicksand.className}>238p</p>
          </div>
          <button onClick={() => signOut()} className={styles.button}>
            Sign Out
          </button>
        </div>
      ) : (
        <div className={styles.containerLogin}>
          <Link href="/signin">
            <button className={styles.buttonLogin}>Log in</button>
          </Link>
        </div>
      )}
    </>
  );
}

export default NavigationBar;
