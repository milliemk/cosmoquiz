import { db, quizResults, users } from "@/db/schema";
import { NextResponse } from "next/server";
import { eq, sql } from "drizzle-orm";

export async function POST() {
  try {
    const topUsers = await db
      .select({
        userName: users.name,
        totalScore: sql<number>`SUM(${quizResults.score})`,
      })
      .from(quizResults)
      .innerJoin(users, eq(quizResults.userId, users.id))
      .groupBy(users.id, users.name)
      // Sort by total score (highest first)
      .orderBy(sql`SUM(${quizResults.score}) DESC`)
      .limit(5);

    //console.log("Top 5 Users:", topUsers);
    return NextResponse.json({ result: topUsers }, { status: 201 });
  } catch (error) {
    console.error("Error receiving scores from DB:", error);
  }
}
