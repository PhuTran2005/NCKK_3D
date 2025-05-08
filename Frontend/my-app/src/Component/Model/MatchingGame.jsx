import React, { useState } from "react";
import "./Model.scss";

const matchingPairs = [
  { id: 1, type: "text", content: "CPU", pairId: 101 },
  { id: 2, type: "text", content: "Central Processing Unit", pairId: 101 },
  { id: 3, type: "image", content: "/images/ram.png", pairId: 102 },
  { id: 4, type: "text", content: "RAM", pairId: 102 },
  { id: 5, type: "text", content: "ROM", pairId: 103 },
  { id: 6, type: "text", content: "Read Only Memory", pairId: 103 },
  { id: 7, type: "image", content: "/images/harddisk.png", pairId: 104 },
  { id: 8, type: "text", content: "Hard Disk", pairId: 104 },
  // Thêm cặp khác nếu muốn
];

function shuffle(array) {
  const arr = [...array];
  for (let i = arr.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [arr[i], arr[j]] = [arr[j], arr[i]];
  }
  return arr;
}

const MatchingGame = () => {
  const [cards, setCards] = useState(() => shuffle(matchingPairs));
  const [selected, setSelected] = useState([]); // [{index, card}]
  const [matchedIds, setMatchedIds] = useState([]); // pairId
  const [wrongPair, setWrongPair] = useState([]); // index[]

  const handleSelect = (card, idx) => {
    if (
      selected.length === 2 ||
      matchedIds.includes(card.pairId) ||
      selected.find((s) => s.index === idx)
    )
      return;
    const newSelected = [...selected, { card, index: idx }];
    setSelected(newSelected);
    if (newSelected.length === 2) {
      if (newSelected[0].card.pairId === newSelected[1].card.pairId) {
        setTimeout(() => {
          setMatchedIds((ids) => [...ids, card.pairId]);
          setSelected([]);
          setWrongPair([]);
        }, 400);
      } else {
        setWrongPair([newSelected[0].index, newSelected[1].index]);
        setTimeout(() => {
          setSelected([]);
          setWrongPair([]);
        }, 700);
      }
    }
  };

  return (
    <div className="matching-grid">
      {cards.map((card, idx) => {
        const isMatched = matchedIds.includes(card.pairId);
        const isSelected = selected.find((s) => s.index === idx);
        const isWrong = wrongPair.includes(idx);
        return (
          <div
            key={idx}
            className={`matching-card${isMatched ? " matched" : ""}${
              isSelected ? " selected" : ""
            }${isWrong ? " wrong" : ""}`}
            onClick={() => !isMatched && handleSelect(card, idx)}
          >
            {card.type === "image" ? (
              <img
                src={card.content}
                alt="matching"
                style={{ maxWidth: 80, maxHeight: 80 }}
              />
            ) : (
              <span>{card.content}</span>
            )}
          </div>
        );
      })}
    </div>
  );
};

export default MatchingGame;
