// src/components/Trivia.js
import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { Card, Button, Alert } from "react-bootstrap";
import Question from "./Question";
import { GiStarSwirl } from "react-icons/gi";

function Trivia() {
  const [questions, setQuestions] = useState([]);
  const [currentQuestionIndex, setCurrentQuestionIndex] = useState(0);
  const [score, setScore] = useState(0);
  const [loading, setLoading] = useState(true);
  const [showCorrectAnswer, setShowCorrectAnswer] = useState(false);
  const [feedback, setFeedback] = useState(null);
  const navigate = useNavigate();

  useEffect(() => {
    fetchQuestions();
  }, []);

  const fetchQuestions = async () => {
    setLoading(true);
    try {
      const response = await fetch(
        "https://opentdb.com/api.php?amount=25&category=31&difficulty=hard&type=multiple"
      );
      const data = await response.json();
      if (data.results && data.results.length > 0) {
        setQuestions(data.results);
      }
    } catch (error) {
      console.error("Error fetching questions:", error);
    }
    setLoading(false);
  };

  const handleAnswer = (isCorrect, correctAnswer) => {
    setFeedback(isCorrect ? "Correct!" : "Incorrect!");
    setTimeout(() => setFeedback(null), 1000);

    if (isCorrect) {
      setScore(score + 100);
      setShowCorrectAnswer(false);
      setCurrentQuestionIndex(currentQuestionIndex + 1);
    } else {
      setShowCorrectAnswer(correctAnswer);
    }
  };

  const handleNextQuestion = () => {
    setShowCorrectAnswer(false);
    setCurrentQuestionIndex(currentQuestionIndex + 1);
  };

  if (loading) return <div>Loading questions...</div>;
  if (currentQuestionIndex >= questions.length) {
    navigate("/results", { state: { score, total: questions.length * 100 } });
    return null;
  }

  return (
    <div className="text-center">
      <h2>
        Score: {score} <GiStarSwirl style={{ color: "#E8C547" }} />
      </h2>
      <h4>
        Question {currentQuestionIndex + 1} of {questions.length}
      </h4>
      {feedback && (
        <h3
          style={{
            color: feedback === "Correct!" ? "#4CAF50" : "#FF6A6A", // Green for correct, red for incorrect
            fontWeight: "bold",
            animation: "flash 1s ease",
            marginBottom: "10px",
          }}
        >
          {feedback}
        </h3>
      )}
      <Card
        className="mb-4"
        style={{ borderColor: "#E8C547", backgroundColor: "#1B263B" }}
      >
        <Card.Body>
          <Question
            questionData={questions[currentQuestionIndex]}
            handleAnswer={handleAnswer}
          />
        </Card.Body>
      </Card>
      {showCorrectAnswer && (
        <Alert variant="info">
          Incorrect! The correct answer was: {showCorrectAnswer}
        </Alert>
      )}
      <Button
        variant="secondary"
        onClick={handleNextQuestion}
        disabled={!showCorrectAnswer}
        style={{
          backgroundColor: showCorrectAnswer ? "#E8C547" : "#1B263B",
          borderColor: "#E8C547",
          color: "white",
        }}
      >
        Next Question
      </Button>
    </div>
  );
}

export default Trivia;
