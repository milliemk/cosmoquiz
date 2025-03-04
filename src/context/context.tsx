"use client";
import { AuthSession } from "@/models/customTypes";
import { createContext, useContext, useState, useEffect } from "react";

type ScoreContextType = {
  score: number;
  scorePercentage: number;
  fetchScores: (userId: string) => Promise<void>;
};

const ScoreContext = createContext<ScoreContextType | undefined>(undefined);

export function ScoreProvider({
  children,
  session,
}: {
  children: React.ReactNode;
  session: AuthSession;
}) {
  const [score, setScore] = useState(0);
  const [scorePercentage, setScorePercentage] = useState(0);

  async function fetchScores(userId: string) {
    try {
      const response = await fetch("/api/score-tracker", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ userId }),
      });

      if (!response.ok) throw new Error("Failed to receive scores");

      const result = await response.json();

      setScore(result.score);
      setScorePercentage(result.percentage);
    } catch (error) {
      console.error("Error receiving scores:", error);
    }
  }

  // Fetch scores when user signs in
  useEffect(() => {
    if (session?.user?.id) {
      fetchScores(session.user.id);
    }
  }, [session]);

  return (
    <ScoreContext.Provider value={{ score, scorePercentage, fetchScores }}>
      {children}
    </ScoreContext.Provider>
  );
}

// Custom hook to use ScoreContext
export function useScore() {
  const context = useContext(ScoreContext);
  if (!context) {
    throw new Error("useScore must be used within a ScoreProvider");
  }
  return context;
}
