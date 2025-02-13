"use client";
import { Content } from "@/models/customTypes";
import { useState } from "react";

export default function Quiz() {
  const [questions, setQuestions] = useState<Content[]>([]);
  const [loading, setLoading] = useState(false);
  //const [error, setError] = useState(null);
  const [currentQuestion, setCurrentQuestion] = useState(0);
  const [selectedAnswer, setSelectedAnswer] = useState<number | null>(null);
  const [isCorrect, setIsCorrect] = useState<boolean | null>(null);
  const [quizStarted, setQuizStarted] = useState(false);
  const [numQuestions, setNumQuestions] = useState(3);
  const [topic, setTopic] = useState("space");

  const fetchQuestions = async () => {
    setLoading(true);
    //setError(null);
    setQuizStarted(true);

    try {
      const response = await fetch("/api/questions", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ numQuestions, topic }),
      });

      const data = await response.json();
      if (response.ok) {
        setQuestions(data);
        setCurrentQuestion(0);
        setSelectedAnswer(null);
        setIsCorrect(null);
      } else {
        //setError(data.error || "Failed to load questions");
      }
    } catch (err) {
      //setError("An error occurred");
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

  // This function show next question when user press the button next question
  const handleNextQuestion = () => {
    // In block IF we check, that we can't go farther then length array of the questions
    // If variable currentQuestion contains value bigger than array of questions.length, we go to the else,
    // and show allert Quiz Completed! and close block of the questions setQuizStarted(false)
    // IF the length of questionsarray bigger then currentQuestion, we increment this variable and set to null isCoorect and selectedAnswer variables
    if (currentQuestion < questions.length - 1) {
      setCurrentQuestion(currentQuestion + 1);
      setSelectedAnswer(null);
      setIsCorrect(null);
    } else {
      alert("Quiz Completed!");
      setQuizStarted(false);
    }
  };

  return (
    // This Block shows to the user parameter area
    <div>
      <h2>Quiz Generator</h2>

      {!quizStarted ? (
        <div>
          <label>
            Number of Questions:
            <input
              type="number"
              value={numQuestions}
              onChange={(e) => setNumQuestions(parseInt(e.target.value))}
              min="1"
              max="10"
            />
          </label>

          <label id="selectTopic">
            Topic:
            {/* <input
              type="text"
              value={topic}
              onChange={(e) => setTopic(e.target.value)}
            /> */}
            <select
              id="selectTopic"
              onChange={(e) => setTopic(e.target.value)}
              required
            >
              <option value="spase">Spase</option>
              <option value="exoplanet">Exoplanet</option>
              <option value="stars">Stars</option>
              <option value="planets">Planets</option>
            </select>
          </label>
          {/* This button will trigger function which fetch data from server component*/}
          <button onClick={fetchQuestions} disabled={loading}>
            {loading ? "Loading..." : "Start Quiz"}
          </button>

          {/* {error && <p style={{ color: "red" }}>{error}</p>} */}
        </div>
      ) : (
        // This block shows user cards with questions
        <div>
          {loading ? (
            <p>Loading questions...</p>
          ) : questions.length > 0 ? (
            <div>
              <h3>{questions[currentQuestion].question}</h3>
              {questions[currentQuestion].answers.map((answer, index) => (
                <label key={index} style={{ display: "block" }}>
                  <input
                    type="radio"
                    // name="answer"
                    name={`quiz-${currentQuestion}`}
                    //This prevent default checked from previous question, because the radio button is checked only if selectedAnswer matches index.
                    checked={selectedAnswer === index}
                    value={index}
                    onChange={() => handleAnswerSelect(index)}
                    disabled={selectedAnswer !== null}
                  />
                  {answer}
                </label>
              ))}
              {/* This area is appeared when user chooses an answer, here will be shown the answer correct or not */}
              {selectedAnswer !== null && (
                <p>
                  {isCorrect ? "✅ Correct!" : "❌ Wrong!"} The correct answer
                  is:{" "}
                  {
                    questions[currentQuestion].answers[
                      questions[currentQuestion].correctIndex
                    ]
                  }
                </p>
              )}

              <button
                onClick={handleNextQuestion}
                disabled={selectedAnswer === null}
              >
                {currentQuestion < questions.length - 1
                  ? "Next Question"
                  : "Finish Quiz"}
              </button>
            </div>
          ) : (
            <p>No questions available.</p>
          )}
        </div>
      )}
    </div>
  );
}
