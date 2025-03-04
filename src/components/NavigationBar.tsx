"use client";
import { useScore } from "@/context/context";
import { AuthSession } from "@/models/customTypes";
import styles from "@/styles/navigation.module.css";
import { signOut, useSession } from "next-auth/react";
import { Quicksand, Righteous } from "next/font/google";
import Link from "next/link";

const quicksand = Quicksand({
  weight: ["400"],
  subsets: ["latin"],
});

const righteous = Righteous({
  weight: ["400"],
  subsets: ["latin"],
});

function NavigationBar({ sessionProp }: { sessionProp: AuthSession }) {
  const { status } = useSession();
  const { score, scorePercentage } = useScore();

  return (
    <>
      {status === "loading" ? (
        <div
          style={{ color: "white", padding: 15 }}
          className={`${styles.container} ${quicksand.className}`}
        >
          Loading ...
        </div>
      ) : sessionProp !== null ? (
        <div className={styles.container}>
          <div className={styles.userBox}>
            <p className={righteous.className}>{sessionProp.user?.name}</p>
            <p className={quicksand.className}>{scorePercentage}%</p>
            <p className={quicksand.className}>{score}p</p>
            <Link href="/rankings">
              {" "}
              <svg
                xmlns="http://www.w3.org/2000/svg"
                width="16"
                height="16"
                fill="currentColor"
                className="bi bi-bar-chart-fill"
                viewBox="0 0 16 16"
              >
                <path d="M1 11a1 1 0 0 1 1-1h2a1 1 0 0 1 1 1v3a1 1 0 0 1-1 1H2a1 1 0 0 1-1-1zm5-4a1 1 0 0 1 1-1h2a1 1 0 0 1 1 1v7a1 1 0 0 1-1 1H7a1 1 0 0 1-1-1zm5-5a1 1 0 0 1 1-1h2a1 1 0 0 1 1 1v12a1 1 0 0 1-1 1h-2a1 1 0 0 1-1-1z" />
              </svg>
            </Link>
          </div>
          <button
            onClick={() =>
              signOut({
                redirect: true,
                callbackUrl: "/",
              })
            }
            className={styles.button}
          >
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
