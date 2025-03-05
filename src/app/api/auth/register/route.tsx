import { NextResponse } from "next/server";
import { encryptPassword } from "../../../../../utils/passwordServices";
import { db, users } from "@/db/schema";
import { eq } from "drizzle-orm";

export async function POST(req: Request) {
  try {
    const { name, email, password } = await req.json();
    // Check, does the user exist in db?
    const existingUser = await db
      .select()
      .from(users)
      .where(eq(users.email, email))
      .limit(1)
      .execute();

    if (existingUser.length > 0) {
      console.log("User already exists.");
      return NextResponse.json(
        { message: "User already exists." },
        { status: 409 }
      );
    }

    const hashPassword = await encryptPassword(password);

    const [newUser] = await db
      .insert(users)
      .values({
        name: name,
        email: email,
        password: hashPassword,
      })
      .returning();

    // Successful registratio
    return NextResponse.json(
      { message: "User registered successfully." },
      { status: 200 }
    );
  } catch (error) {
    console.error("Registration error:", error);
    return NextResponse.json(
      { message: "Internal server error." },
      { status: 500 }
    );
  }
}
