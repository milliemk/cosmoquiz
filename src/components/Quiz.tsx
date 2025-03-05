"use client";
import styles from "@/styles/QuizCard.module.css";
import { Content } from "@/models/customTypes";
import { useState } from "react";
import { Quicksand, Righteous } from "next/font/google";
import Link from "next/link";
import { useSession } from "next-auth/react";
import { useScore } from "@/context/context";
import * as motion from "motion/react-client";
import Modal from "./Modal";

const quicksand = Quicksand({
  weight: ["400"],
  subsets: ["latin"],
});

const righteous = Righteous({
  weight: ["400"],
  subsets: ["latin"],
});

export default function Quiz() {
  const [questions, setQuestions] = useState<Content[]>([]);
  const [loading, setLoading] = useState(false);
  const [currentQuestion, setCurrentQuestion] = useState(0);
  const [selectedAnswer, setSelectedAnswer] = useState<number | null>(null);
  const [isCorrect, setIsCorrect] = useState<boolean | null>(null);
  const [quizStarted, setQuizStarted] = useState(false);
  const [numQuestions, setNumQuestions] = useState(3);
  const [topic, setTopic] = useState("space");
  const [difficulty, setDifficulty] = useState("easy");
  const [hint, setHint] = useState(false);
  const [quizResult, setQuizResult] = useState(0);
  const { fetchScores } = useScore();
  const [isFlipped, setIsFlipped] = useState(false);
  const [isOpen, setIsOpen] = useState(false);
  const [maxScorePerQuiz, setMaxScorePerQuiz] = useState(0);

  const session = useSession();

  const fetchQuestions = async () => {
    setLoading(true);
    setQuizStarted(true);
    setQuizResult(0);
    try {
      const response = await fetch("/api/questions", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ numQuestions, topic, difficulty }),
      });

      const data = await response.json();
      if (response.ok) {
        setQuestions(data);
        setCurrentQuestion(0);
        setSelectedAnswer(null);
        setIsCorrect(null);
      }
    } catch (err) {
      console.log("error :>> ", err);
    } finally {
      // block finaly performs always, here we hide loader regardless of whether the response is successful or not
      setLoading(false);
    }
  };
  // when radio button is selected this function will be triggered
  const handleAnswerSelect = (index: number) => {
    // To the selectedAnswer will be assigned a number of the user choosen answer,
    // in our case it is an index of answersarray
    setSelectedAnswer(index);
    //in this variable we assign boolean value to the isCorrect varriable depending on user answer
    setIsCorrect(index === questions[currentQuestion].correctIndex);
  };

  async function submitQuizResult(
    userId: string | undefined,
    score: number,
    totalQuestions: number,
    maxScorePerQuiz: number
  ) {
    try {
      const response = await fetch("/api/quiz-result", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          userId,
          score,
          totalQuestions,
          maxScorePerQuiz,
        }),
      });

      if (!response.ok) throw new Error("Failed to submit quiz result");
      if (userId) {
        fetchScores(userId);
      }
      console.log("Quiz result saved successfully!");
    } catch (error) {
      console.error("Error submitting quiz result:", error);
    }
  }

  const getQuizResult = () => {
    const percentage = quizResult / maxScorePerQuiz;
    if (percentage < 0.3) {
      return {
        rank: "Starship Rookie",
        message:
          "Every great explorer has to start somewhere! Better luck next time!",
      };
    } else if (percentage > 0.3 && percentage < 0.6) {
      return {
        rank: "Astral Navigator",
        message: "You're on your way! Keep reaching for the stars!",
      };
    } else {
      return {
        rank: "Galactic Commander",
        message: "Incredible! The universe bows to your knowledge!",
      };
    }
  };

  // This function show next question when user press the button next question
  const handleNextQuestion = () => {
    // In block IF we check, that we can't go farther then length array of the questions
    // If variable currentQuestion contains value bigger than array of questions.length, we go to the else,
    // and show allert Quiz Completed! and close block of the questions setQuizStarted(false)
    // IF the length of questionsarray bigger then currentQuestion, we increment this variable and set to null isCoorect and selectedAnswer variables
    if (currentQuestion < questions.length - 1) {
      // Flip animation trigger
      setIsFlipped(true);

      // Delay changing question until animation completes (e.g., 500ms)
      setTimeout(() => {
        setCurrentQuestion((prev) => prev + 1);
        setSelectedAnswer(null);
        setIsCorrect(null);
        setIsFlipped(false); // Reset flip animation
      }, 1000);
    } else {
      // to get maxScorePerQuiz
      let maxScorePerQuiz = 0;
      switch (difficulty) {
        case "easy":
          maxScorePerQuiz = questions.length;
          break;
        case "medium":
          maxScorePerQuiz = 2 * questions.length;
          break;
        case "hard":
          maxScorePerQuiz = 3 * questions.length;
          break;
      }
      setMaxScorePerQuiz(maxScorePerQuiz);
      setIsOpen((prev) => !prev);
      setQuizStarted(false);

      // At this point we send score to the server, if user is logedIn
      if (session.status === "authenticated") {
        console.log("User is authorised to store quiz result");
        submitQuizResult(
          session.data.user?.id,
          quizResult,
          questions.length,
          maxScorePerQuiz!
        );
      }
    }
  };
  const { rank, message } = getQuizResult();

  return (
    // This Block shows to the user parameter area
    <>
      <div>
        <Modal
          isOpen={isOpen}
          onClose={() => setIsOpen(false)}
          rank={rank}
          score={quizResult}
          message={message}
        />
        <div className={styles.abort}>
          <Link href="/" className={righteous.className}>
            Cancel
          </Link>
        </div>
        {!quizStarted ? (
          <div className={styles.quizContainer}>
            <div className={`${styles.quizHeader} ${righteous.className}`}>
              <h2>Customize Your Mission</h2>
            </div>
            <div className={styles.quizBody}>
              <p className={quicksand.className}>
                {" "}
                Adjust your quiz length, choose your category, and get set for
                launch!
              </p>
              <div className={`${styles.quizOptions} ${righteous.className}`}>
                <label className={styles.spacedLabel}>
                  Quiz Length:
                  <input
                    type="number"
                    value={numQuestions}
                    onChange={(e) => {
                      const value = Number(e.target.value);
                      if (!value || isNaN(value)) {
                        setNumQuestions(1); // You could also default to a specific number if you prefer
                      } else {
                        setNumQuestions(value);
                      }
                    }}
                    min="1"
                    max="10"
                    onKeyDown={(e) => e.preventDefault()}
                  />
                </label>
                <label id="selectDifficulty" className={styles.spacedLabel}>
                  Difficulty:
                  <select
                    id="selectDifficulty"
                    className={quicksand.className}
                    onChange={(e) => setDifficulty(e.target.value)}
                  >
                    <option value="easy">Easy</option>
                    <option value="medium">Medium</option>
                    <option value="hard">Hard</option>
                  </select>
                </label>
                <label id="selectTopic" className={styles.spacedLabel}>
                  Topic:
                  <select
                    id="selectTopic"
                    onChange={(e) => setTopic(e.target.value)}
                    required
                  >
                    <option value="solarsystem">Solar System</option>
                    <option value="exoplanets">Exoplanets</option>
                    <option value="Astronauts">Astronauts</option>
                    <option value="spaceInPopCulture">
                      Space in Pop Culture
                    </option>
                    <option value="aliensAndUFOs">Aliens & UFOs</option>
                  </select>
                </label>
              </div>
              <div
                className={styles.quizFooter}
                style={{
                  alignItems: "center",
                  justifyContent: "center",
                }}
              >
                {/* This button will trigger function which fetch data from server component*/}
                <motion.button
                  onClick={fetchQuestions}
                  disabled={loading}
                  style={{
                    width: 100,
                    padding: 10,
                    borderRadius: 10,
                    border: "transparent",
                    backgroundColor: "black",
                    fontSize: 17,
                    cursor: "pointer",
                  }}
                  whileHover={{
                    scale: 1.2,

                    boxShadow: "0px 0px 12px rgba(255, 255, 255, 0.6)",
                  }}
                  className={righteous.className}
                >
                  {loading ? "Loading..." : "Start"}
                </motion.button>
              </div>
            </div>{" "}
          </div>
        ) : (
          // This block shows user cards with questions
          <div>
            {loading ? (
              <h3 className={quicksand.className}> 🪐 Loading questions...</h3>
            ) : questions.length > 0 ? (
              <motion.div
                className={styles.quizContainer}
                animate={{ rotateY: isFlipped ? 180 : 0 }}
                transition={{ duration: 1, ease: "easeInOut" }}
                style={{
                  transformStyle: "preserve-3d",
                  backfaceVisibility: "hidden",
                }}
              >
                <div className={`${styles.quizHeader} ${righteous.className}`}>
                  <h2>{questions[currentQuestion].question}</h2>
                </div>
                <div className={styles.quizBody}>
                  <div
                    className={`${styles.quizOptions} ${quicksand.className}`}
                  >
                    {questions[currentQuestion].answers.map((answer, index) => (
                      <label key={index} className={styles.quizAnswers}>
                        <input
                          type="radio"
                          name={`quiz-${currentQuestion}`}
                          //This prevent default checked from previous question, because the radio button is checked only if selectedAnswer matches index.
                          checked={selectedAnswer === index}
                          value={index}
                          onChange={() => {
                            handleAnswerSelect(index);
                            setQuizResult((prevResult) => {
                              // we can not use here state variable IsCorrect, because of asynchronous behavior
                              if (
                                index ===
                                questions[currentQuestion].correctIndex
                              ) {
                                switch (difficulty) {
                                  case "easy":
                                    return prevResult + 1;
                                  case "medium":
                                    return prevResult + 2;
                                  case "easy":
                                    return prevResult + 3;
                                  default:
                                    return prevResult;
                                }
                              } else {
                                return prevResult;
                              }
                            });
                          }}
                          disabled={selectedAnswer !== null}
                        />
                        {answer}
                      </label>
                    ))}
                    {/* This area is appeared when user press button hint */}
                    <p className={styles.hint}>
                      {hint && questions[currentQuestion].hint}
                    </p>

                    {/* This area is appeared when user chooses an answer, here will be shown the answer correct or not */}
                    {selectedAnswer !== null && (
                      <p>
                        {isCorrect ? "✅ Correct!" : "❌ Wrong!"} The correct
                        answer is:{" "}
                        {
                          questions[currentQuestion].answers[
                            questions[currentQuestion].correctIndex
                          ]
                        }
                      </p>
                    )}
                  </div>
                </div>
                <div className={styles.quizFooter}>
                  <motion.button
                    className={quicksand.className}
                    onClick={() => {
                      setHint(true);
                    }}
                    style={{
                      width: 80,
                      padding: 8,
                      borderRadius: 10,
                      backgroundColor: "transparent",
                      fontSize: 17,
                    }}
                    whileHover={{
                      scale: 1.2,
                      rotate: 3,
                      boxShadow: "0px 0px 12px rgba(255, 255, 255, 0.6)",
                    }}
                  >
                    Hint
                  </motion.button>
                  <motion.button
                    className={quicksand.className}
                    onClick={() => {
                      handleNextQuestion();
                      setHint(false);
                    }}
                    whileHover={{
                      scale: 1.2,
                      rotate: 3,
                      boxShadow: "0px 0px 12px rgba(255, 255, 255, 0.6)",
                    }}
                    disabled={selectedAnswer === null}
                    style={{
                      width: 120,
                      padding: 8,
                      borderRadius: 10,
                      border: "transparent",
                      backgroundColor: "black",
                      fontSize: 17,
                    }}
                  >
                    {currentQuestion < questions.length - 1
                      ? "Next"
                      : "Finish Quiz"}
                  </motion.button>
                </div>
              </motion.div>
            ) : (
              <h2 className={quicksand.className}>No questions available.</h2>
            )}
          </div>
        )}
      </div>
    </>
  );
}
