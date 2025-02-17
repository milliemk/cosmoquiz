// app/api/questions/route.js
import { NextResponse } from "next/server";
import { GoogleGenerativeAI } from "@google/generative-ai";

export async function POST(req: Request) {
  try {
    const { numQuestions, topic, difficulty } = await req.json();
    const apiKey = process.env.GEMINI_API_KEY;
    if (!apiKey)
      return NextResponse.json({ error: "API key missing" }, { status: 500 });
    console.log("route component");
    const genAI = new GoogleGenerativeAI(apiKey);
    const model = genAI.getGenerativeModel({
      model: "gemini-1.5-flash",
    });

    /* const prompt = `
Generate ${numQuestions} multiple-choice questions about ${topic} and make it on ${difficulty} level. Question title length maximum 120 characters.

Each question must follow this JSON format:
{
  "question": "string",
  "answers": ["string", "string", "string", "string"],
  "correctIndex": integer
}

- Ensure each question is unique and not repeated from previous responses.
- Use varied wording and difficulty levels for diversity.
- Do not include explanations, just return the JSON array of questions.

Return ONLY the JSON array, without any additional text.
`; */

    const prompt = `
Generate ${numQuestions} multiple-choice questions about ${topic} and make them at the ${difficulty} level. The question title length must be a maximum of 120 characters.

Each question must follow this JSON format:
{
  "question": "string",
  "answers": ["string", "string", "string", "string"],
  "correctIndex": integer,
  "hint": "string"
}

- Ensure each question is unique and not repeated from previous responses.
- Use varied wording and difficulty levels for diversity.
- Provide a **hint** for each question, but **do not include any of the answer options** in the hint.
- The hint should give additional context or guidance but should not reveal the correct answer directly.
- Do not include explanations, just return the JSON array of questions.

Return ONLY the JSON array, without any additional text.
`;

    //const result = await model.generateContent(prompt);

    const result = await model.generateContent({
      contents: [
        {
          role: "user",
          parts: [
            {
              text: prompt,
            },
          ],
        },
      ],
      generationConfig: {
        temperature: 0.8,
        topK: 40, // Consider top 40 possible words
        topP: 0.8, // Use top 80% probable words
      },
    });

    const textResponse = result.response.text().trim();
    // console.log("textResponse", textResponse);

    // Extract JSON safely
    const jsonMatch = textResponse.match(/```json\n([\s\S]+)\n```/);
    // console.log("array index 0", jsonMatch[0]);
    // console.log("array index 1", jsonMatch[1]);
    const jsonString = jsonMatch ? jsonMatch[1] : textResponse;
    const questions = JSON.parse(jsonString);
    // console.log("questions", questions);
    // NextResponse - Produce a response with the given JSON body
    // https://nextjs.org/docs/app/api-reference/functions/next-response
    return NextResponse.json(questions);
  } catch (error) {
    return NextResponse.json({ error: "Error has occured" }, { status: 500 });
  }
}
