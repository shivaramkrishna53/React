import { useState } from "react";
import "./FlashCard.css";
export default function FlashCard() {
  const questions = [
    {
      id: 3457,
      question: "What language is React based on?",
      answer: "JavaScript",
    },
    {
      id: 7336,
      question: "What are the building blocks of React apps?",
      answer: "Components",
    },
    {
      id: 8832,
      question:
        "What's the name of the syntax we use to describe a UI in React?",
      answer: "JSX",
    },
    {
      id: 1297,
      question: "How to pass data from parent to child components?",
      answer: "Props",
    },
    {
      id: 9103,
      question: "How to give components memory?",
      answer: "useState hook",
    },
    {
      id: 2002,
      question:
        "What do we call an input element that is completely synchronised with state?",
      answer: "Controlled element",
    },
  ];
  const [selectedid, setSelectedid] = useState(null);

  function handleClick(id) {
    setSelectedid(id === selectedid ? null : id);
  }
  return (
    <div className="flashcards">
      {questions.map((x) => (
        <div
          className={x.id === selectedid ? "selected" : ""}
          onClick={() => handleClick(x.id)}
        >
          <p>{x.id === selectedid ? x.answer : x.question}</p>
        </div>
      ))}
    </div>
  );
}
