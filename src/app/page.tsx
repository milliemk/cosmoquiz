import Image from "next/image";
import styles from "./page.module.css";
import { GoogleGenerativeAI } from "@google/generative-ai";
import { Righteous, Quicksand } from "next/font/google";

const righteous = Righteous({
  weight: ["400"],
  subsets: ["latin"],
});

const quicksand = Quicksand({
  weight: ["400"],
  subsets: ["latin"],
});

export default async function Home() {
  /* const apiKEy = process.env.GEMINI_API_KEY;
   const genAI = new GoogleGenerativeAI(`${apiKEy}`);
  const model = genAI.getGenerativeModel({ model: "gemini-1.5-flash" });

  const prompt =
    "ask me a question about space with 4 alternative answers, 1 correct and 3 false";

  const result = await model.generateContent(prompt);
  console.log(result.response.text()); */

  return (
    <div className={styles.page}>
      <div className={styles.welcome}>
        <div
          style={{
            textAlign: "center",
            display: "flex",
            flexDirection: "column",
            justifyContent: "center",
            alignItems: "center",
            gap: 40,
          }}
        >
          <p className={quicksand.className}>
            What’s up, space cadet? Galaxy Gus here to guide you through a
            cosmic quiz. Let’s see if you’ve got what it takes to be a true
            space explorer. Ready for lift-off?
          </p>
          <button
            style={{
              width: 100,
              padding: 8,
              borderRadius: 10,
              backgroundColor: "black",
              fontSize: 17,
            }}
            className={righteous.className}
          >
            Launch!
          </button>
        </div>
        <Image
          src="/image1-removebg.png"
          alt="astronaut"
          height={300}
          width={300}
        ></Image>
      </div>
    </div>
  );
}
