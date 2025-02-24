import styles from "@/styles/QuizCard.module.css";
import { Quicksand, Righteous } from "next/font/google";
import Image from "next/image";

const quicksand = Quicksand({
  weight: ["400"],
  subsets: ["latin"],
});

const righteous = Righteous({
  weight: ["400"],
  subsets: ["latin"],
});

function QuizCard() {
  return (
    <>
      <div className={styles.quizContainer}>
        <div className={`${styles.quizHeader} ${righteous.className}`}>
          <h2>Customize Your Mission</h2>
          {/* <Image src="/blue.png" alt="circle" height={30} width={30} /> */}
        </div>
        <div className={styles.quizBody}>
          <p className={quicksand.className}>
            {" "}
            Adjust your quiz length, choose your category, and get set for
            launch!
          </p>
          <div className={`${styles.quizOptions} ${righteous.className}`}>
            <label className={styles.spacedLabel}>
              Difficulty:
              <select className={quicksand.className}>
                <option value="easy">Easy</option>
                <option value="mediun">Medium</option>
                <option value="hard">Hard</option>
              </select>
            </label>
            <label className={styles.spacedLabel}>
              Category:
              <select className={quicksand.className}>
                <option value="planets">Planets</option>
                <option value="stars">Stars</option>
                <option value="galaxies">Galaxies</option>
                <option value="blackholes">Black Holes</option>
              </select>
            </label>
            <label className={styles.spacedLabel}>
              Quiz length:
              <input type="number"></input>
            </label>
          </div>
        </div>
        <div className={styles.quizFooter}>
          <button
            style={{
              width: 100,
              padding: 10,
              borderRadius: 10,
              border: "transparent",
              backgroundColor: "black",
              fontSize: 17,
            }}
            className={righteous.className}
          >
            Start!
          </button>
        </div>
      </div>
      <div className={styles.quizContainer}>
        <div className={`${styles.quizHeader} ${righteous.className}`}>
          <h2>Which planet has the most moons?</h2>
        </div>
        <div className={`${styles.quizBody} ${quicksand.className}`}>
          <label>
            <input type="radio"></input>
            Earth
          </label>
          <label>
            <input type="radio"></input>
            Saturn
          </label>
          <label>
            <input type="radio"></input>
            Mars
          </label>
          <label>
            <input type="radio"></input>
            Venus
          </label>
        </div>
        <div className={styles.cardFooter}>
          <button
            style={{
              width: 80,
              padding: 8,
              borderRadius: 10,
              border: "transparent",
              backgroundColor: "black",
              fontSize: 17,
            }}
            className={righteous.className}
          >
            Next
          </button>
        </div>
      </div>
    </>
  );
}

export default QuizCard;
