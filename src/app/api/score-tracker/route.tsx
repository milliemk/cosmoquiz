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
      .select()
      .from(quizResults)
      .where(eq(quizResults.userId, userId));

    console.log("result FROM DB:>> ", result);

    return NextResponse.json(
      {
        score: result.score,
        totalQuestions: result.totalQuestions,
        maxScorePerQuiz: result.maxScorePerQuiz,
      },
      { status: 201 }
    );
  } catch (error) {
    console.error("Error receiving scores from DB:", error);
    return NextResponse.json(
      { error: "Internal Server Error" },
      { status: 500 }
    );
  }
}
