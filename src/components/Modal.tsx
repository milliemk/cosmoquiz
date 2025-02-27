"use client";
import styles from "@/styles/modals.module.css";
import Head from "next/head";
import Link from "next/link";

// e.stopPropagation = Prevents the modal from closing when clicking inside it.

interface ModalProps {
  isOpen: boolean;
  onClose: () => void;
  rank: string;
  score: number;
  message: string;
}

function Modal({ isOpen, onClose, rank, score, message }: ModalProps) {
  if (!isOpen) return null;
  return (
    <>
      <div className={styles.modal} onClick={onClose}>
        <div
          className={styles.modalContent}
          onClick={(e) => e.stopPropagation()}
        >
          <button className={styles.closeButton} onClick={onClose}>
            ×
          </button>
          <h2 className={styles.rank}>Rank Achieved: {rank}</h2>
          <p className={styles.score}>You scored {score} points!</p>
          <p className={styles.message}>{message}</p>
          <Link href="/rankings">
            <button className={styles.buttonRank}>
              Check out the rankings{" "}
              <svg
                xmlns="http://www.w3.org/2000/svg"
                width="16"
                height="16"
                fill="currentColor"
                className="bi bi-bar-chart-fill"
                viewBox="0 0 16 16"
              >
                <path d="M1 11a1 1 0 0 1 1-1h2a1 1 0 0 1 1 1v3a1 1 0 0 1-1 1H2a1 1 0 0 1-1-1zm5-4a1 1 0 0 1 1-1h2a1 1 0 0 1 1 1v7a1 1 0 0 1-1 1H7a1 1 0 0 1-1-1zm5-5a1 1 0 0 1 1-1h2a1 1 0 0 1 1 1v12a1 1 0 0 1-1 1h-2a1 1 0 0 1-1-1z" />
              </svg>
            </button>
          </Link>
        </div>
      </div>
    </>
  );
}

export default Modal;
