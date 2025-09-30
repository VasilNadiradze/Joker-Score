import React, { useState } from "react";
import { Form, Button, Row, Col, Card } from "react-bootstrap";

type GameType = "standard" | "nine";
type MissPenalty = "200" | "500" | "200/500" | "x100";

const NewGame: React.FC = () => {
  // მოთამაშეები
  const [players, setPlayers] = useState(["", "", "", ""]);

  // თამაშის ტიპი
  const [gameType, setGameType] = useState<GameType>("standard");

  // ხიშტი
  const [missPenalty, setMissPenalty] = useState<MissPenalty>("200");

  // checkbox-ები
  const [pairs, setPairs] = useState(false);
  const [erasure, setErasure] = useState(false);

  // მოთამაშის სახელის ცვლილება
  const handlePlayerChange = (index: number, value: string) => {
    const copy = [...players];
    copy[index] = value;
    setPlayers(copy);
  };

  // ფორმის გაგზავნა
  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    console.log({
      players,
      gameType,
      missPenalty,
      pairs,
      erasure,
    });
    // შემდეგ ეტაპზე აქ შეგვიძლია ცხრილის გენერაცია
  };

  return (
    <Card className="p-4">
      <h2 className="mb-4">ახალი თამაში</h2>
      <Form onSubmit={handleSubmit}>
        {/* მოთამაშეები */}
        {players.map((player, idx) => (
          <Form.Group className="mb-3" key={idx}>
            <Form.Label>მოთამაშე {idx + 1}</Form.Label>
            <Form.Control
              type="text"
              placeholder={`მოთამაშე ${idx + 1}`}
              value={player}
              onChange={(e) => handlePlayerChange(idx, e.target.value)}
              required
            />
          </Form.Group>
        ))}

        {/* თამაშის ტიპი */}
        <Form.Group className="mb-3">
          <Form.Label>თამაშის ტიპი</Form.Label>
          <Form.Select
            value={gameType}
            onChange={(e) => setGameType(e.target.value as GameType)}
          >
            <option value="standard">სტანდარტული</option>
            <option value="nine">ცხრიანები</option>
          </Form.Select>
        </Form.Group>

        {/* ხიშტი */}
        <Form.Group className="mb-3">
          <Form.Label>ხიშტი</Form.Label>
          <Form.Select
            value={missPenalty}
            onChange={(e) => setMissPenalty(e.target.value as MissPenalty)}
          >
            <option value="200">200</option>
            <option value="500">500</option>
            <option value="200/500">200 / 500</option>
            <option value="x100">x100</option>
          </Form.Select>
        </Form.Group>

        {/* წყვილები checkbox */}
        <Form.Group className="mb-3">
          <Form.Check
            type="checkbox"
            label="წყვილები"
            checked={pairs}
            onChange={(e) => setPairs(e.target.checked)}
          />
        </Form.Group>

        {/* მოშლა checkbox */}
        <Form.Group className="mb-3">
          <Form.Check
            type="checkbox"
            label="მოშლა"
            checked={erasure}
            onChange={(e) => setErasure(e.target.checked)}
          />
        </Form.Group>

        <Button type="submit" variant="primary">
          თამაში დაიწყე
        </Button>
      </Form>
    </Card>
  );
};

export default NewGame;
