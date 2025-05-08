import React, { useState } from "react";
import "./Model.scss";

const matchingPairs = [
  { id: 1, type: "text", content: "CPU", pairId: 101 },
  { id: 2, type: "text", content: "Central Processing Unit", pairId: 101 },

  { id: 3, type: "image", content: "https://www.euston96.com/wp-content/uploads/2019/09/RAM.jpg", pairId: 102 },
  { id: 4, type: "text", content: "RAM", pairId: 102 },

  { id: 5, type: "text", content: "ROM", pairId: 103 },
  { id: 6, type: "text", content: "Read Only Memory", pairId: 103 },

  { id: 7, type: "image", content: "https://upload.wikimedia.org/wikipedia/commons/9/90/Hard_Drive_(11644419853).jpg", pairId: 104 },
  { id: 8, type: "text", content: "Hard Disk", pairId: 104 },

  { id: 9, type: "image", content: "https://i0.wp.com/www.beyondphototips.com/wp-content/uploads/2020/06/NVMe-SATA-SSDs-scaled.jpg?ssl=1", pairId: 105 },
  { id: 10, type: "text", content: "SSD", pairId: 105 },

  { id: 11, type: "text", content: "GPU", pairId: 106 },
  { id: 12, type: "text", content: "Graphics Processing Unit", pairId: 106 },

  { id: 13, type: "image", content: "https://www.pcgamesn.com/wp-content/uploads/2017/08/how-to-install-graphics-card.jpg", pairId: 107 },
  { id: 14, type: "text", content: "Graphics Card", pairId: 107 },

  { id: 15, type: "text", content: "Motherboard", pairId: 108 },
  { id: 16, type: "image", content: "https://news-cdn.softpedia.com/images/news2/Gigabyte-Adds-3TB-HDD-Support-to-the-Its-Motherboards-2.jpg", pairId: 108 },

  { id: 17, type: "text", content: "Power Supply", pairId: 109 },
  { id: 18, type: "image", content: "https://ae01.alicdn.com/kf/HTB1DfDub_J_SKJjSZPixh63LpXal/High-Quality-1000W-Computer-PC-Power-Supply-for-CPU-Active-PFC-Efficient-2-PCIE-LED-Fan.jpeg", pairId: 109 },

  { id: 19, type: "text", content: "Heatsink", pairId: 110 },
  { id: 20, type: "image", content: "https://data.embeddedcomputing.com/uploads/resize/1256/756/external/data.embeddedcomputing.com/uploads/articles/wp/574803020/5dcc1fc36d911-thumbnail_Ultra-Cool+Fanless+Heat+Sink+from+ATS.jpg", pairId: 110 },

  { id: 21, type: "text", content: "Keyboard", pairId: 111 },
  { id: 22, type: "image", content: "https://thetechhacker.com/wp-content/uploads/2016/12/What-is-Keyboard.jpg", pairId: 111 },

  { id: 23, type: "text", content: "Mouse", pairId: 112 },
  { id: 24, type: "image", content: "https://www.thoughtco.com/thmb/HeEciMxijX-Exgd-_B-h5z9DRDY=/3679x2709/filters:fill(auto,1)/GettyImages-160078233-56b008595f9b58b7d01f9c27.jpg", pairId: 112 }
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
