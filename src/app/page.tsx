import Image from "next/image";
import styles from "./page.module.css";
import { Righteous, Quicksand } from "next/font/google";
import Link from "next/link";
import * as motion from "motion/react-client";

const righteous = Righteous({
  weight: ["400"],
  subsets: ["latin"],
});

const quicksand = Quicksand({
  weight: ["400", "300"],
  subsets: ["latin"],
});

// Text variables
const text =
  "What’s up, space cadet? Galaxy Gus here to guide you through a cosmic quiz. Let’s see if you’ve got what it takes to be a true space explorer.";

const lastSentence = "Ready for lift-off?";
const mainText = text.replace(lastSentence, "").trim(); // Remove the last sentence from the main text

export default async function Home() {
  return (
    <div className={styles.page}>
      <div className={styles.welcome}>
        <div className={styles.animationParent}>
          <div style={{ whiteSpace: "pre-wrap" }} className={styles.animation}>
            {/* Animate the main text */}
            {mainText.split("").map((letter, index) => (
              <motion.span
                key={index}
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{
                  duration: 0.02, // Speed of typing
                  delay: index * 0.02, // Delay between letters
                }}
              >
                {letter}
              </motion.span>
            ))}

            {"\n\n\n"}
            {lastSentence.split("").map((letter, index) => (
              <motion.span
                key={index + mainText.length} // Ensure unique keys
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{
                  duration: 0.02, // Speed of typing
                  delay: (mainText.length + index) * 0.02, // Delay after the main text
                }}
              >
                {letter}
              </motion.span>
            ))}
          </div>

          <div
            style={{
              display: "flex",
              flexDirection: "row",
              justifyContent: "space-evenly",
              width: "100%",
            }}
          >
            <Link href="/quiz">
              <motion.button
                whileHover={{
                  scale: 1.2,
                  rotate: 3,
                  boxShadow: "0px 0px 12px rgba(255, 255, 255, 0.6)",
                }}
                className={styles.button}
              >
                Launch!
              </motion.button>
            </Link>
            <Link href="/howtoplay">
              {" "}
              <motion.button
                whileHover={{
                  scale: 1.2,
                  rotate: 3,
                  boxShadow: "0px 0px 12px rgba(255, 255, 255, 0.6)",
                }}
                className={styles.buttonHowto}
              >
                How to play?
              </motion.button>
            </Link>
          </div>
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
