// src/components/Question.js
import React from "react";
import { Button, ButtonGroup } from "react-bootstrap";

function Question({ questionData, handleAnswer }) {
  const { question, correct_answer, incorrect_answers } = questionData;

  const answers = [...incorrect_answers, correct_answer].sort(
    () => Math.random() - 0.5
  );

  return (
    <div
      style={{
        backgroundColor: "#28334A",
        padding: "20px",
        borderRadius: "8px",
        color: "#E8C547",
        fontWeight: "bold",
        marginBottom: "10px",
      }}
    >
      <h5 dangerouslySetInnerHTML={{ __html: question }} />
      <ButtonGroup vertical>
        {answers.map((answer, index) => (
          <Button
            key={index}
            variant="outline-info"
            className="my-1"
            onClick={() =>
              handleAnswer(answer === correct_answer, correct_answer)
            }
            style={{
              color: "#E8C547",
              fontWeight: "bold",
              borderColor: "#E8C547",
              backgroundColor: "#1B263B",
            }}
            dangerouslySetInnerHTML={{ __html: answer }}
          />
        ))}
      </ButtonGroup>
    </div>
  );
}

export default Question;
