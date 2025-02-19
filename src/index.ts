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
  /*  const user = {
    id: crypto.randomUUID(), // Ensure ID is generated correctly
    name: "Manuela",
    email: "manuela@example.com",
    emailVerified: null,
    image: null,
  };

  await db.insert(users).values(user);
  console.log("New user created!"); */

  const allUsers = await db.select().from(users);
  console.log("Getting all users from the database:", allUsers);

  /*   await db.update(users)
    .set({ name: "John Doe" })
    .where(eq(users.email, user.email));

  console.log("User info updated!"); */
}

main();
