import styles from "@/styles/howtoplay.module.css";

function page() {
  return (
    <div className={styles.howtopage}>
      <div className={styles.container}>
        <h2>How to Play?</h2>
        <p>
          Ready to test your knowledge of the universe? Here's how to get
          started:
        </p>
        <h4>Choose Your Settings:</h4>
        <p>Before you start, you'll need to make a few choices:</p>
        <ul>
          <li>
            Difficulty Level: Choose how challenging you want the quiz to be:
            <ul>
              <li>Easy: Perfect for beginners. A great way to get started!</li>
              <li>Medium: A bit tougher, but the rewards are greater!</li>
              <li>
                Hard: Only for the most seasoned space cadets. Get ready for a
                challenge!
              </li>
            </ul>
          </li>
          <li>
            Category: Pick your area of expertise (or explore a new one!):
            <ul>
              <li>Space: Everything about the vast cosmos.</li>
              <li>
                Exoplanets: Test your knowledge about planets outside our solar
                system.
              </li>
              <li>Stars: Dive deep into the lives of the stars in the sky.</li>
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
          Once your settings are selected, the quiz begins! You'll face a series
          of multiple-choice questions based on the category and difficulty
          level you chose.
        </p>
        <h4>Hint System:</h4>
        <p>
          Stuck on a question? No worries! If a question feels too tricky, you
          can use a <strong>hint</strong> to help you out. This will give you an
          extra push to get the answer right!
        </p>
      </div>
      <div className={styles.containerLoggedIn}>
        <h2>Bonus for Logged-in Users</h2>

        <h4>Earn Points:</h4>
        <p>
          For logged-in users, you’ll earn points based on the difficulty level
          you choose. The more correct anwers you give, the more points you’ll
          earn. Here’s how the points break down:
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
  );
}

export default page;
