import { db, quizResults, users } from "@/db/schema";
import { NextResponse } from "next/server";
import { eq, sql } from "drizzle-orm";

export async function POST() {
  try {
    const topUsersWithPercentage = await db
      .select({
        userId: users.id,
        userName: users.name,
        totalScore: sql<number>`SUM(${quizResults.score})`,
        percentage: sql<number>`ROUND(
      LEAST(
        (MAX(${quizResults.score})::FLOAT / MAX(${quizResults.totalQuestions})) * 
        (MAX(${quizResults.totalQuestions})::FLOAT / MAX(${quizResults.maxScorePerQuiz})) * 100, 
        100
      )::numeric, 1)`,
      })
      .from(quizResults)
      .innerJoin(users, eq(quizResults.userId, users.id))
      .groupBy(users.id, users.name)
      .orderBy(sql`SUM(${quizResults.score}) DESC`)
      .limit(5);
    return NextResponse.json(
      { result: topUsersWithPercentage },
      { status: 201 }
    );

  } catch (error) {
    console.error("Error receiving scores from DB:", error);
  }
}
