import { db, quizResults } from "@/db/schema";
import { NextResponse } from "next/server";
import { eq, sql } from "drizzle-orm";

export async function POST(req: Request) {
  try {
    const { userId, score, totalQuestions, maxScorePerQuiz } = await req.json();

    if (
      !userId ||
      score === undefined ||
      totalQuestions === undefined ||
      maxScorePerQuiz === undefined
    ) {
      return NextResponse.json({ error: "Missing fields" }, { status: 400 });
    }

    // We work with transaction, because we have more than one operation with db
    // Combine multiple requests into one atomic operation.
    await db.transaction(async (trx) => {
      // Checking, is there a record in quizResults DB for this user
      const existingResult = await trx
        .select()
        .from(quizResults)
        .where(eq(quizResults.userId, userId))
        .limit(1);

      if (existingResult.length === 0) {
        // If the record wasn't found → we create new one
        await trx.insert(quizResults).values({
          userId,
          score,
          totalQuestions,
          maxScorePerQuiz,
        });
      } else {
        await trx
          .update(quizResults)
          //sql'' operator performs operation adding on db side
          .set({
            score: sql`${quizResults.score} + ${score}`,
            totalQuestions: sql`${quizResults.totalQuestions} + ${totalQuestions}`,
            maxScorePerQuiz: sql`${quizResults.maxScorePerQuiz} + ${maxScorePerQuiz}`,
          })
          .where(eq(quizResults.userId, userId));
      }
    });

    return NextResponse.json({ success: true }, { status: 201 });
  } catch (error) {
    console.error("Error saving quiz result:", error);
    return NextResponse.json(
      { error: "Internal Server Error" },
      { status: 500 }
    );
  }
}
