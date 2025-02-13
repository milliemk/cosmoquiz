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
  const [numQuestions, setNumQuestions] = useState(5);
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
      setLoading(false);
    }
  };

  const handleAnswerSelect = (index: number) => {
    setSelectedAnswer(index);
    setIsCorrect(index === questions[currentQuestion].correctIndex);
  };

  const handleNextQuestion = () => {
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

          <label>
            Topic:
            <input
              type="text"
              value={topic}
              onChange={(e) => setTopic(e.target.value)}
            />
          </label>

          <button onClick={fetchQuestions} disabled={loading}>
            {loading ? "Loading..." : "Start Quiz"}
          </button>

          {/* {error && <p style={{ color: "red" }}>{error}</p>} */}
        </div>
      ) : (
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
                    checked={selectedAnswer === index}
                    value={index}
                    onChange={() => handleAnswerSelect(index)}
                    disabled={selectedAnswer !== null}
                  />
                  {answer}
                </label>
              ))}

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
