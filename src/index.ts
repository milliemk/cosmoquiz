import "dotenv/config";
import postgres from "postgres";
import { drizzle } from "drizzle-orm/postgres-js";
import { users } from "./db/schema";
import { eq } from "drizzle-orm";

// Initialize database connection
const connectionString = process.env.DATABASE_URL!;
const pool = postgres(connectionString, { max: 1 });
const db = drizzle(pool);

async function main() {
  const allUsers = await db.select().from(users);
  console.log("Getting all users from the database:", allUsers);
}

main();
