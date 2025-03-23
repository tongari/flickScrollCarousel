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
        <select
          value={carouselCount}
          onChange={(e) => setCarouselCount(Number(e.target.value))}
          style={{
            fontSize: "1.2rem",
            padding: "8px",
            width: "200px",
            height: "40px",
          }}
        >
          <option value="1">1</option>
          {[...Array(9)].map((_, i) => (
            <option key={`ten-${i}`} value={(i + 1) * 10}>
              {(i + 1) * 10}
            </option>
          ))}
          {[...Array(9)].map((_, i) => (
            <option key={`hundred-${i}`} value={(i + 1) * 100}>
              {(i + 1) * 100}
            </option>
          ))}
          <option value="1000">1000</option>
        </select>
      </div>
      {Array.from({ length: carouselCount }).map((_, index) => (
        <div key={index} style={{ marginTop: "20px" }}>
          <FlickScrollCarousel dragThreshold={20} />
        </div>
      ))}
    </div>
  );
}
