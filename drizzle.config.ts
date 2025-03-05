import "dotenv/config";
import { defineConfig } from "drizzle-kit";

console.log("process.env.DATABASE_URL", process.env.DATABASE_URL);

export default defineConfig({
  out: "./drizzle",
  schema: "./src/db/schema.ts",
  dialect: "postgresql",
  dbCredentials: {
    // url: process.env.DATABASE_URL!,
    url: process.env.NEXT_PUBLIC_DATABASE_URL!,
  },
});
