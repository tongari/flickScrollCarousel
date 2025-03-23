import { FlickScrollCarousel } from "./FlickScrollCarousel";
import { ScrollCarousel } from "./ScrollCarousel";
import "./styles.css";

export default function App() {
  return (
    <div className="App">
      <h1>ScrollCarousel</h1>
      {/* <ScrollCarousel /> */}
      <FlickScrollCarousel dragThreshold={10} />
    </div>
  );
}
