import styles from "@/styles/rankings.module.css";
import { Righteous, Quicksand } from "next/font/google";
import Image from "next/image";

const righteous = Righteous({
  weight: ["400"],
  subsets: ["latin"],
});

const quicksand = Quicksand({
  weight: ["400", "600"],
  subsets: ["latin"],
});

interface Player {
  rank: number;
  name: string;
  score: number;
  time: string;
}

const leaderboardData: Player[] = [
  { rank: 1, name: "Astronaut A", score: 10, time: "2m 30s" },
  { rank: 2, name: "Astronaut B", score: 9, time: "2m 45s" },
  { rank: 3, name: "Astronaut C", score: 9, time: "3m 10s" },
  { rank: 4, name: "Astronaut D", score: 8, time: "3m 20s" },
  { rank: 5, name: "Astronaut E", score: 7, time: "3m 35s" },
];

function page() {
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
                <th>Time</th>
              </tr>
            </thead>
            <tbody>
              {leaderboardData.map((player, index) => (
                <tr key={index}>
                  <td>
                    {player.rank === 1 ? (
                      <Image
                        alt="trophy"
                        src="/first.png"
                        height={60}
                        width={60}
                      />
                    ) : player.rank === 2 ? (
                      <Image
                        alt="silver"
                        src="/second.png"
                        height={60}
                        width={60}
                      />
                    ) : player.rank === 3 ? (
                      <Image
                        alt="bronze"
                        src="/third.png"
                        height={60}
                        width={60}
                      />
                    ) : (
                      player.rank
                    )}
                  </td>
                  <td>{player.name}</td>
                  <td>{player.score}</td>
                  <td>{player.time}</td>
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
