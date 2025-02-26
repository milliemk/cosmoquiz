import Image from "next/image";
import styles from "./page.module.css";
import { Righteous, Quicksand } from "next/font/google";
import Link from "next/link";

const righteous = Righteous({
  weight: ["400"],
  subsets: ["latin"],
});

const quicksand = Quicksand({
  weight: ["400"],
  subsets: ["latin"],
});

export default async function Home() {
  return (
    <div className={styles.page}>
      <div className={styles.welcome}>
        <div
          style={{
            textAlign: "center",
            display: "flex",
            flexDirection: "column",
            justifyContent: "center",
            alignItems: "center",
          }}
        >
          <p className={quicksand.className}>
            What’s up, space cadet? Galaxy Gus here to guide you through a
            cosmic quiz. Let’s see if you’ve got what it takes to be a true
            space explorer. Ready for lift-off?
          </p>
          <Link href="/quiz">
            <button className={styles.button}>Launch!</button>
          </Link>
        </div>
        <Image
          src="/ai_crop.png"
          alt="astronaut"
          height={300}
          width={209}
          style={{ paddingRight: 40, paddingTop: 20, paddingBottom: 20 }}
        ></Image>
      </div>
    </div>
  );
}
