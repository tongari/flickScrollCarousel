import { FlickScrollCarousel } from "./FlickScrollCarousel";
import { useState } from "react";
import "./styles.css";

export default function App() {
  const [carouselCount, setCarouselCount] = useState(1);

  return (
    <div className="App">
      <h1>ScrollCarousel</h1>
      <div>
        <p>カルーセルの数: {carouselCount}</p>
        <div
          style={{
            display: "flex",
            justifyContent: "center",
            gap: "20px",
          }}
        >
          <button
            onClick={() => setCarouselCount((prev) => prev + 1)}
            style={{
              padding: "10px 20px",
              fontSize: "16px",
              cursor: "pointer",
            }}
          >
            追加
          </button>
          <button
            onClick={() => setCarouselCount((prev) => Math.max(1, prev - 1))}
            style={{
              padding: "10px 20px",
              fontSize: "16px",
              cursor: "pointer",
            }}
          >
            削除
          </button>
        </div>
      </div>
      {Array.from({ length: carouselCount }).map((_, index) => (
        <div key={index} style={{ marginTop: "20px" }}>
          <FlickScrollCarousel dragThreshold={20} />
        </div>
      ))}
    </div>
  );
}
