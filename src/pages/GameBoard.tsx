import React, { useEffect, useState } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import type { GameConfig } from "../utils/types";

const GameBoard: React.FC = () => {
  const location = useLocation();
  const navigate = useNavigate();
  const state = location.state as GameConfig | undefined;

  useEffect(() => {
    if (!state) navigate("/", { replace: true });
  }, [state, navigate]);

  if (!state) return null;

  const {
    players,
    gameType,
    xishti,
    pairs,
    moshla,
    sxvebsEshlebat,
    boloIshleba,
  } = state;

  // 24 დარიგება
  const deals = [
    1, 2, 3, 4, 5, 6, 7, 8, 9, 9, 9, 9, 8, 7, 6, 5, 4, 3, 2, 1, 9, 9, 9, 9,
  ];

  const roundEndIndexes = [8, 12, 20, 24];

  // მოთამაშეთა ქულების მდგომარეობა
  const [scores, setScores] = useState(
    Array.from({ length: players.length }, () =>
      Array.from({ length: deals.length }, () => ({ said: "", took: "" }))
    )
  );

  const [totals, setTotals] = useState<number[][]>(
    Array.from({ length: players.length }, () => [0, 0, 0, 0])
  );

  // ქულების განახლება
  const handleChange = (
    playerIdx: number,
    roundIdx: number,
    field: "said" | "took",
    value: string
  ) => {
    const newScores = [...scores];
    newScores[playerIdx][roundIdx][field] = value;
    setScores(newScores);
  };

  // ავტომატური დაჯამება
  useEffect(() => {
    const newTotals = players.map((_, playerIdx) => {
      let roundSums = [0, 0, 0, 0];
      let currentRound = 0;
      deals.forEach((_, i) => {
        const s = Number(scores[playerIdx][i].said) || 0;
        const t = Number(scores[playerIdx][i].took) || 0;
        const points = s === t ? 10 + s : -Math.abs(s - t) * 5; // მარტივი ფორმულა
        roundSums[currentRound] += points;
        if (roundEndIndexes.includes(i + 1)) currentRound++;
      });
      return roundSums;
    });
    setTotals(newTotals);
  }, [scores]);

  return (
    <div className="container py-3">
      {/* --- ზემო ინფორმაცია --- */}
      <div className="mb-3 p-3 rounded border bg-light small text-center text-md-start">
        <div className="row g-1">
          <div className="col-6 col-md-3">
            🎲 <strong>ტიპი:</strong>{" "}
            {gameType === "standard" ? "სტანდარტული" : "ცხრიანები"}
          </div>
          <div className="col-6 col-md-3">
            🏆 <strong>ხიშტი:</strong>{" "}
            <span className="text-danger">-{xishti}</span>
          </div>
          <div className="col-6 col-md-3">
            👥 <strong>წყვილები:</strong> {pairs ? "კი" : "არა"}
          </div>
          <div className="col-6 col-md-3">
            🧹 <strong>მოშლა:</strong> {moshla ? "კი" : "არა"}
          </div>
          {moshla && (
            <>
              <div className="col-6 col-md-3">
                🗑️ <strong>სხვებს ეშლებათ:</strong>{" "}
                {sxvebsEshlebat ? "კი" : "არა"}
              </div>
              <div className="col-6 col-md-3">
                💥 <strong>ბოლო იშლება:</strong> {boloIshleba ? "კი" : "არა"}
              </div>
            </>
          )}
        </div>
      </div>

      {/* --- ცხრილი --- */}
      <div className="table-responsive">
        <table
          className="table table-bordered text-center align-middle table-sm"
          style={{ fontSize: "0.85rem" }}
        >
          <thead className="table-dark small">
            <tr>
              <th style={{ width: "25px", padding: "2px" }}>#</th>
              {players.map((p, i) => (
                <th
                  key={i}
                  colSpan={2}
                  style={{ minWidth: "55px", padding: "2px" }}
                >
                  {p}
                </th>
              ))}
            </tr>
            {/* <tr className="table-secondary">
              <th style={{ padding: "2px" }}></th>
              {players.map((_, i) => (
                <React.Fragment key={i}>
                  <th style={{ width: "35px", padding: "2px" }}>თქვა</th>
                  <th style={{ width: "45px", padding: "2px" }}>წაიღო</th>
                </React.Fragment>
              ))}
            </tr> */}
          </thead>
          <tbody>
            {deals.map((deal, idx) => (
              <React.Fragment key={idx}>
                <tr
                  style={{
                    backgroundColor: roundEndIndexes.includes(idx + 1)
                      ? "#f8f9fa"
                      : "transparent",
                  }}
                >
                  <td style={{ padding: "2px" }}>{deal}</td>
                  {players.map((_, pIdx) => (
                    <React.Fragment key={pIdx}>
                      <td style={{ padding: "1px" }}>
                        <input
                          type="number"
                          min={0}
                          className="form-control form-control-sm text-center"
                          style={{
                            maxWidth: "40px",
                            margin: "0 auto",
                            padding: "1px",
                          }}
                          value={scores[pIdx][idx].said}
                          onChange={(e) =>
                            handleChange(pIdx, idx, "said", e.target.value)
                          }
                        />
                      </td>
                      <td style={{ padding: "1px" }}>
                        <input
                          type="number"
                          min={0}
                          className="form-control form-control-sm text-center"
                          style={{
                            maxWidth: "45px",
                            margin: "0 auto",
                            padding: "1px",
                          }}
                          value={scores[pIdx][idx].took}
                          onChange={(e) =>
                            handleChange(pIdx, idx, "took", e.target.value)
                          }
                        />
                      </td>
                    </React.Fragment>
                  ))}
                </tr>

                {/* --- ჯამის სტრიქონები --- */}
                {roundEndIndexes.includes(idx + 1) && (
                  <tr className="table-secondary fw-bold small">
                    <td style={{ padding: "2px" }}>
                      {idx + 1 === 8 && ""}
                      {idx + 1 === 12 && ""}
                      {idx + 1 === 20 && ""}
                      {idx + 1 === 24 && "🏁"}
                    </td>
                    {players.map((_, i) => (
                      <React.Fragment key={i}>
                        <td></td>
                        <td style={{ padding: "2px" }}>
                          <input
                            type="number"
                            readOnly
                            className="form-control form-control-sm text-center bg-light fw-bold"
                            style={{
                              maxWidth: "55px",
                              margin: "0 auto",
                              padding: "1px",
                            }}
                            value={
                              totals[i][
                                idx + 1 === 8
                                  ? 0
                                  : idx + 1 === 12
                                  ? 1
                                  : idx + 1 === 20
                                  ? 2
                                  : 3
                              ]
                            }
                          />
                        </td>
                      </React.Fragment>
                    ))}
                  </tr>
                )}
              </React.Fragment>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default GameBoard;
