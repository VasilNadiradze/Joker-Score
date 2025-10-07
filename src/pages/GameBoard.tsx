import React, { useEffect } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import type { GameConfig } from "../utils/types";

const GameBoard: React.FC = () => {
  const location = useLocation();
  const navigate = useNavigate();

  // location.state შეიძლება იყოს any — გავაკეთოთ ტაიპქასტი
  const state = location.state as GameConfig | undefined;

  useEffect(() => {
    if (!state) {
      // თუ არ გვაქვს კონფიგი, გადაგვიყვანე NewGame-ზე
      navigate("/", { replace: true });
    }
  }, [state, navigate]);

  if (!state) {
    // მოკლე fallback სანამ navigate დაბრუნებს
    return null;
  }

  const {
    players,
    gameType,
    xishti,
    pairs,
    moshla,
    sxvebsEshlebat,
    boloIshleba,
  } = state;

  return (
    <div className="container py-4">
      <h2 className="text-center mb-4">თამაში — Scoreboard</h2>

      <div className="mb-3">
        <strong>თამაშის ტიპი:</strong> {gameType}
      </div>
      <div className="mb-3">
        <strong>ხიშტი:</strong> {xishti || "არუჩეული"}
      </div>
      <div className="mb-3">
        <strong>წყვილები:</strong> {pairs ? "კი" : "არა"}
      </div>
      <div className="mb-3">
        <strong>მოშლა:</strong> {moshla ? "ჩართულია" : "გამორთულია"}
      </div>

      <h4 className="mt-4">მოთამაშეები</h4>
      <ul>
        {players.map((p, idx) => (
          <li key={idx}>{p}</li>
        ))}
      </ul>

      <div className="mt-5 p-3 border rounded bg-light">
        <p className="text-center">
          ცხრილი და ქულების ჩაწერის UI აქ დაემატება (გვერდი მზადაა)
        </p>
      </div>
    </div>
  );
};

export default GameBoard;
