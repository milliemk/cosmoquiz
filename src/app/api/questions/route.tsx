// app/api/questions/route.js
import { NextResponse } from "next/server";
import { GoogleGenerativeAI } from "@google/generative-ai";

export async function POST(req: Request) {
  try {
    const { numQuestions, topic } = await req.json();
    const apiKey = process.env.GEMINI_API_KEY;
    if (!apiKey)
      return NextResponse.json({ error: "API key missing" }, { status: 500 });

    const genAI = new GoogleGenerativeAI(apiKey);
    const model = genAI.getGenerativeModel({ model: "gemini-1.5-flash" });

    const prompt = `
      Generate ${numQuestions} multiple-choice questions about ${topic}.
      Each question should have:
      - A "question" field (string)
      - An "answers" field (array of 4 options)
      - A "correctIndex" field (integer, indicating the index of the correct answer)
      Provide the response in valid JSON format as an array.
    `;

    const result = await model.generateContent(prompt);
    const textResponse = result.response.text().trim();

    // Extract JSON safely
    const jsonMatch = textResponse.match(/```json\n([\s\S]+)\n```/);
    // console.log("array index 0", jsonMatch[0]);
    // console.log("array index 1", jsonMatch[1]);
    const jsonString = jsonMatch ? jsonMatch[1] : textResponse;
    const questions = JSON.parse(jsonString);
    // NextResponse - Produce a response with the given JSON body
    // https://nextjs.org/docs/app/api-reference/functions/next-response
    return NextResponse.json(questions);
  } catch (error) {
    return NextResponse.json({ error: "Error has occured" }, { status: 500 });
  }
}
