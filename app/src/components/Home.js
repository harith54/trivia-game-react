// src/components/Home.js
import React from "react";
import { useNavigate } from "react-router-dom";
import { Button } from "react-bootstrap";
import { GiStarSwirl } from "react-icons/gi";

function Home() {
  const navigate = useNavigate();

  return (
    <div className="text-center">
      <h1 className="mb-3">Anime Trivia Challenge</h1>
      <p>Test your knowledge in the anime universe!</p>
      <Button
        variant="dark"
        size="lg"
        onClick={() => navigate("/trivia")}
        style={{
          backgroundColor: "#1B263B",
          borderColor: "#E8C547",
          color: "#E8C547",
          fontWeight: "bold",
        }}
      >
        <GiStarSwirl /> Start Game
      </Button>
    </div>
  );
}

export default Home;
