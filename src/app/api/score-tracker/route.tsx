import { db, quizResults } from "@/db/schema";
import { NextResponse } from "next/server";
import { eq, sql } from "drizzle-orm";

export async function POST(req: Request) {
  try {
    const { userId } = await req.json();

    if (!userId) {
      return NextResponse.json({ error: "Missing fields" }, { status: 400 });
    }

    const [result] = await db
      .select({
        userId: quizResults.userId,
        totalScore: quizResults.score,
        totalQuestions: quizResults.totalQuestions,
        maxScorePerQuiz: quizResults.maxScorePerQuiz,
        percentage: sql<number>`ROUND(
      LEAST(
        (${quizResults.score}::FLOAT / ${quizResults.totalQuestions}) * 
        (${quizResults.totalQuestions}::FLOAT / ${quizResults.maxScorePerQuiz}) * 100, 
        100
      )::numeric, 1)`,
      })
      .from(quizResults)
      .where(eq(quizResults.userId, userId))
      .limit(1);

    //console.log("RESULT FROM DB CALCULATION :>> ", result);

    if (result) {
      return NextResponse.json(
        {
          score: result.totalScore,
          totalQuestions: result.totalQuestions,
          maxScorePerQuiz: result.maxScorePerQuiz,
          percentage: result.percentage,
        },
        { status: 201 }
      );
    } else {
      console.log("THERE IS ANY DATA IN DB ABOUT QUIZ RESULT");
      return NextResponse.json(
        {
          score: 0,
          totalQuestions: 0,
          maxScorePerQuiz: 0,
          percentage: 0,
        },
        { status: 201 }
      );
    }
  } catch (error) {
    console.error("Error receiving scores from DB:", error);
    return NextResponse.json(
      { error: "Internal Server Error" },
      { status: 500 }
    );
  }
}
