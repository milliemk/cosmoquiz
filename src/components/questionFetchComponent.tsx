"use client";
import { GoogleGenerativeAI } from "@google/generative-ai";
import React, { useEffect, useState } from "react";
import { Content } from "@/models/customTypes";

export default function QuestionFatching() {
  const [questions, setQuestions] = useState<Content[]>([]);
  const [selectedAnswers, setSelectedAnswers] = useState({});
  const [submitted, setSubmitted] = useState(false);
  const apiKEy = process.env.NEXT_PUBLIC_GEMINI_API_KEY;
  console.log("apiKEy", apiKEy);
  const prompt = `
  Generate ${"3"} ${"multiple-choice"} questions about ${"planet"}.
  Each question should have:
  - A "question" field (string)
  - An "answers" field (array of 4 options)
  - A "correctIndex" field (integer, indicating the index of the correct answer)

  Provide the response in a valid JSON format.
  `;

  useEffect(() => {
    const fetchData = async () => {
      const genAI = new GoogleGenerativeAI(`${apiKEy}`);
      const model = genAI.getGenerativeModel({ model: "gemini-1.5-flash" });
      const result = await model.generateContent(prompt);
      console.log(result.response.text());
      const textResponse = result.response.text();

      try {
        console.log("textResponse", textResponse);
        const jsonMatch = textResponse.match(/```json\n([\s\S]+)\n```/);
        const jsonString = jsonMatch ? jsonMatch[1] : textResponse;
        const questionsResponse = JSON.parse(jsonString);
        //console.log("questionsResponse :>> ", questionsResponse);
        setQuestions(questionsResponse);
      } catch (error) {
        console.error("Error parsing JSON response:", error);
      }
    };
    console.log("I am here");
    fetchData();
  }, []);

  return (
    <div>
      {questions &&
        questions.map((q, qIndex) => (
          <div key={qIndex}>
            <h3>{q.question}</h3>
            {q.answers.map((answer, aIndex) => (
              <label key={aIndex}>
                <input
                  type="radio"
                  name={`question-${qIndex}`}
                  value={aIndex}
                  onChange={() =>
                    setSelectedAnswers((prev) => ({
                      ...prev,
                      [qIndex]: aIndex,
                    }))
                  }
                  disabled={submitted}
                />
                {answer}
              </label>
            ))}
          </div>
        ))}
      <button onClick={() => setSubmitted(true)}>Submit</button>

      {submitted && (
        <div>
          {questions.map((q, qIndex) => (
            <p key={qIndex}>
              {q.question} -{" "}
              {selectedAnswers[qIndex] === q.correctIndex
                ? "Correct ✅"
                : "Wrong ❌"}
            </p>
          ))}
        </div>
      )}
    </div>
  );
}
