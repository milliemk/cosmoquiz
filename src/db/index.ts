import "dotenv/config";
import { drizzle } from "drizzle-orm/node-postgres";
drizzle(process.env.DATABASE_URL!);
