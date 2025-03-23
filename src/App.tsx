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
        <button onClick={() => setCarouselCount((prev) => prev + 1)}>
          追加
        </button>
        <button
          onClick={() => setCarouselCount((prev) => Math.max(1, prev - 1))}
        >
          削除
        </button>
      </div>
      {Array.from({ length: carouselCount }).map((_, index) => (
        <div key={index} style={{ marginTop: "20px" }}>
          <FlickScrollCarousel dragThreshold={20} />
        </div>
      ))}
    </div>
  );
}
