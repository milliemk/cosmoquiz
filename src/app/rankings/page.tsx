"use client";
import { Player, Rankings } from "@/models/customTypes";
import styles from "@/styles/rankings.module.css";
import { Righteous, Quicksand } from "next/font/google";
import Image from "next/image";
import { useEffect, useState } from "react";

const righteous = Righteous({
  weight: ["400"],
  subsets: ["latin"],
});

const quicksand = Quicksand({
  weight: ["400", "600"],
  subsets: ["latin"],
});

function page() {
  const [rankings, setRankings] = useState<Player[]>([]);
  const fetchDataFromDB = async () => {
    try {
      const response = await fetch("/api/ranking-tracker", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({}),
      });
      if (response.ok) {
        const data = await response.json();
        console.log("result ranking:>> ", data.result);
        setRankings(data.result);
      }
    } catch (error) {}
  };
  useEffect(() => {
    fetchDataFromDB();
  }, []);
  return (
    <>
      <div className={styles.rankingsContainer}>
        <div className={styles.rankingsBody}>
          <table className={styles.table}>
            <thead>
              <tr>
                <th>Rank</th>
                <th>Name</th>
                <th>Score</th>
              </tr>
            </thead>
            <tbody>
              {rankings &&
                rankings.map((player, index) => (
                  <tr key={index}>
                    <td>
                      {index + 1 === 1 ? (
                        <Image
                          alt="trophy"
                          src="/first.png"
                          height={60}
                          width={60}
                        />
                      ) : index + 1 === 2 ? (
                        <Image
                          alt="silver"
                          src="/second.png"
                          height={60}
                          width={60}
                        />
                      ) : index + 1 === 3 ? (
                        <Image
                          alt="bronze"
                          src="/third.png"
                          height={60}
                          width={60}
                        />
                      ) : (
                        index + 1
                      )}
                    </td>
                    <td>{player.userName}</td>
                    <td>{player.totalScore}</td>
                  </tr>
                ))}
            </tbody>
          </table>
        </div>
      </div>
    </>
  );
}

export default page;
