import React, { useState } from "react";
import { Form, Button, Card } from "react-bootstrap";

type GameType = "standard" | "nine";
type MissPenalty = "ხიშტი" | "200" | "500" | "200/500" | "x100";
type RuleOption = "with" | "without";

const NewGame: React.FC = () => {
  // მოთამაშეები
  const [players, setPlayers] = useState(["", "", "", ""]);

  // თამაშის ტიპი
  const [gameType, setGameType] = useState<GameType>("standard");

  // ხიშტი
  const [xishti, setXishti] = useState<MissPenalty>("ხიშტი");

  // წყვილები
  const [pairs, setPairs] = useState(false);

  // მოშლა toggle
  const [moshla, setMoshla] = useState(false);

  // დამატებითი ველები (მოშლა ჩართულია თუ არა)
  const [sxvebsEshlebat, setSxvebsEshlebat] = useState<RuleOption>("without");
  const [bolo, setBolo] = useState(true);

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
      xishti,
      pairs,
      moshla,
      sxvebsEshlebat,
      bolo,
    });
    // შემდეგ ეტაპზე აქ შეგვიძლია ცხრილის გენერაცია
  };

  return (
    <Card className="p-4">
      <h2 className="mb-5 text-center">ახალი თამაში</h2>
      <Form onSubmit={handleSubmit}>
        {/* მოთამაშეები */}
        {players.map((player, idx) => (
          <Form.Group className="mb-3" key={idx}>
            {/* <Form.Label>მოთამაშე {idx + 1}</Form.Label> */}
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
          {/* <Form.Label>თამაშის ტიპი</Form.Label> */}
          <Form.Select
            value={gameType}
            onChange={(e) => setGameType(e.target.value as GameType)}
          >
            <option value="standard">სტანდარტული</option>
            <option value="nine">ცხრიანები</option>
          </Form.Select>
        </Form.Group>

        {/* ხიშტი */}
        <Form.Group className="mb-4">
          {/* <Form.Label>ხიშტი</Form.Label> */}
          <Form.Select
            value={xishti}
            onChange={(e) => setXishti(e.target.value as MissPenalty)}
          >
            <option value="ხიშტი">ხიშტი</option>
            <option value="200">200</option>
            <option value="500">500</option>
            <option value="200/500">200 / 500</option>
            <option value="x100">x100</option>
          </Form.Select>
        </Form.Group>        

        {/* წყვილები  toggle */}
        <Form.Group className="ps-2 mb-3 d-flex align-items-center justify-content-between">
          <Form.Label className="mb-0">წყვილები </Form.Label>
          <Form.Check
            type="switch"
            checked={pairs}
            onChange={(e) => setPairs(e.target.checked)}
          />
        </Form.Group>

        {/* მოშლა toggle */}
        <Form.Group className="ps-2 mb-3 d-flex align-items-center justify-content-between">
          <Form.Label className="mb-0">მოშლა</Form.Label>
          <Form.Check
            type="switch"
            id="erasure-switch"
            checked={moshla}
            onChange={(e) => setMoshla(e.target.checked)}
          />
        </Form.Group>

        {/* დამატებითი ველები თუ მოშლა ჩართულია */}
        {moshla && (
          <div className="p-3 border rounded bg-light mb-3">
            <p className="fw-bold">თუ პრემიაზე გავიდა 2 ან მეტი:</p>
            <Form.Check
              type="radio"
              id="rule-with"
              name="sxvebsEshlebat"
              label="სხვებს ეშლებათ"
              value="1"
              checked={sxvebsEshlebat === "with"}
              onChange={(e) => setSxvebsEshlebat(e.target.value as RuleOption)}
              className="mb-2"
            />
            <Form.Check
              type="radio"
              id="rule-without"
              name="rule"
              label="სხვებს არ ეშლებათ"
              value="0"
              checked={sxvebsEshlebat === "without"}
              onChange={(e) => setSxvebsEshlebat(e.target.value as RuleOption)}
              className="mb-2"
            />
            <Form.Check
              type="checkbox"
              label="ბოლო წაღებული იშლება"
              checked={bolo}
              onChange={(e) => setBolo(e.target.checked)}
            />
          </div>
        )}

        <Button type="submit" variant="success" className="mt-3 w-100 p-3">
          დაწყება
        </Button>
      </Form>
    </Card>
  );
};

export default NewGame;
