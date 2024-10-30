// src/components/Results.js
import React from "react";
import { useNavigate, useLocation } from "react-router-dom";
import { Button } from "react-bootstrap";

function Results() {
  const navigate = useNavigate();
  const location = useLocation();
  const { score, total } = location.state || { score: 0, total: 0 };

  return (
    <div className="text-center">
      <h1>Game Over!</h1>
      <h2 style={{ color: "#FF6A00" }}>
        Your Score: {score} / {total}
      </h2>
      <Button
        variant="dark"
        size="lg"
        onClick={() => navigate("/")}
        style={{
          backgroundColor: "#333333",
          borderColor: "#FF6A00",
          color: "#FF6A00",
        }}
      >
        Play Again
      </Button>
    </div>
  );
}

export default Results;
