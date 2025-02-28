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
  const { status, data: session } = useSession();
  console.log("session :>> ", session);
  const [scorePercentage, setScorePercentage] = useState(0);
  const [score, setscore] = useState(0);

  console.log("status:", status);
  console.log("session:", session);

  async function receiveScoresFromServer(userId: string) {
    try {
      const response = await fetch("/api/score-tracker", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ userId }),
      });

      if (!response.ok) throw new Error("Failed to receive scores");

      const result = await response.json();
      const score = result.score;
      setscore(score);
      const totalQuestions = result.totalQuestions;
      const maxScorePerQuiz = result.maxScorePerQuiz;
      console.log(score, totalQuestions, maxScorePerQuiz);
      const rating = Math.min(
        (score / totalQuestions) * (totalQuestions / maxScorePerQuiz) * 100,
        100
      );
      const roundedRating = Math.round(rating * 1000) / 1000;
      console.log("raiting RAITING:>> ", roundedRating);
      setScorePercentage(roundedRating);

      console.log("response from receiveScoresFromServer :>> ", result);

      console.log("Scores were received successfully!");
    } catch (error) {
      console.error("Error receiving scores :", error);
    }
  }

  useEffect(() => {
    console.log("useEffect from NavigationBar BEFORE");
    if (status === "authenticated") {
      console.log("useEffect from NavigationBar AFTER");
      receiveScoresFromServer(session.user?.id!);
    }
  }, [status, session]);

  return (
    <>
      {status === "loading" ? (
        <div
          style={{ color: "white", padding: 15 }}
          className={`${styles.container} ${quicksand.className}`}
        >
          Loading ...
        </div>
      ) : status === "authenticated" ? (
        <div className={styles.container}>
          <div className={styles.userBox}>
            <p className={righteous.className}>{session.user?.name}</p>
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
            onClick={() => signOut({ callbackUrl: "/" })}
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
