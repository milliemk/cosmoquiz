import styles from "@/styles/howtoplay.module.css";
import Link from "next/link";
import * as motion from "motion/react-client";

function page() {
  return (
    <div className={styles.page}>
      <Link href="/">
        <motion.svg
          whileHover={{ rotateY: 180 }}
          xmlns="http://www.w3.org/2000/svg"
          width="30"
          height="30"
          fill="currentColor"
          className="bi bi-x-square"
          viewBox="0 0 16 16"
          style={{ marginBottom: 20 }}
        >
          <path d="M14 1a1 1 0 0 1 1 1v12a1 1 0 0 1-1 1H2a1 1 0 0 1-1-1V2a1 1 0 0 1 1-1zM2 0a2 2 0 0 0-2 2v12a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V2a2 2 0 0 0-2-2z" />
          <path d="M4.646 4.646a.5.5 0 0 1 .708 0L8 7.293l2.646-2.647a.5.5 0 0 1 .708.708L8.707 8l2.647 2.646a.5.5 0 0 1-.708.708L8 8.707l-2.646 2.647a.5.5 0 0 1-.708-.708L7.293 8 4.646 5.354a.5.5 0 0 1 0-.708" />
        </motion.svg>
      </Link>
      <div className={styles.howtopage}>
        <div className={styles.container}>
          <h2>How to Play?</h2>
          <p>
            Ready to test your knowledge of the universe? Here's how to get
            started:
          </p>
          <h4>Choose Your Settings:</h4>
          <ul>
            <li>
              Difficulty Level:
              <ul>
                <li>
                  Easy: Perfect for beginners. A great way to get started!
                </li>
                <li>Medium: A bit tougher, but the rewards are greater!</li>
                <li>
                  Hard: Only for the most seasoned space cadets. Get ready for a
                  challenge!
                </li>
              </ul>
            </li>
            <li>
              Category::
              <ul>
                <li>Space: Everything about the vast cosmos.</li>
                <li>
                  Exoplanets: Test your knowledge about planets outside our
                  solar system.
                </li>
                <li>
                  Stars: Dive deep into the lives of the stars in the sky.
                </li>
                <li>Planets: Focus on the planets in our solar system.</li>
              </ul>
            </li>
            <li>
              Number of Questions: Choose how many questions you want to answer
              (1–10).
            </li>
          </ul>

          <h4>Answer the Questions:</h4>
          <p>
            Once your settings are selected, the quiz begins! You'll face a
            series of multiple-choice questions based on the category and
            difficulty level you chose.
          </p>
          <h4>Hint System:</h4>
          <p>
            Stuck on a question? No worries! If a question feels too tricky, you
            can use a <strong>hint</strong> to help you out. This will give you
            an extra push to get the answer right!
          </p>
        </div>
        <div className={styles.containerLoggedIn}>
          <h2>Bonus for Logged-in Users</h2>

          <h4>Earn Points:</h4>
          <p>
            For logged-in users, you’ll earn points based on the difficulty
            level you choose. The more correct anwers you give, the more points
            you’ll earn. Here’s how the points break down:
          </p>
          <ul>
            <li>Easy: 1 point</li>
            <li>Medium: 3 points</li>
            <li>Hard: 5 points</li>
          </ul>

          <h4>Compete in the Galaxy Rankings:</h4>
          <p>
            Logged-in users can also compete against other players to see who
            knows the most about the universe! After each quiz, your points are
            added to the galaxy rankings The more points you earn, the higher
            you’ll rank. Can you reach the top of the leaderboard?
          </p>
        </div>
      </div>
    </div>
  );
}

export default page;
