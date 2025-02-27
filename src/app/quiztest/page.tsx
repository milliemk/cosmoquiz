"use client";
import Modal from "@/components/Modal";
import { useState } from "react";
import styles from "@/styles/modals.module.css";

function page() {
  const [isOpen, setIsOpen] = useState(true);
  const [score, setScore] = useState(2);

  const getQuizResult = () => {
    if (score === 0) {
      return {
        rank: "Starship Rookie",
        message:
          "Every great explorer has to start somewhere! Better luck next time!",
      };
    } else if (score > 0 && score < 4) {
      return {
        rank: "Astral Navigator",
        message: "You're on your way! Keep reaching for the stars!",
      };
    } else {
      return {
        rank: "Galactic Commander",
        message: "Incredible! The universe bows to your knowledge!",
      };
    }
  };

  const { rank, message } = getQuizResult();
  return (
    <>
      <div>
        <button className={styles.button} onClick={() => setIsOpen(true)}>
          Finish Test
        </button>
        <Modal
          isOpen={isOpen}
          onClose={() => setIsOpen(false)}
          rank={rank}
          score={score}
          message={message}
        />{" "}
      </div>
    </>
  );
}

export default page;
