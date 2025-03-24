import { useEffect, useRef } from "react";

export const ScrollCarousel = () => {
  const containerRef = useRef<HTMLDivElement>(null);

  // スライド画像の配列を定義
  const slides = [
    { src: "/img/beautiful-rainbow-nature.jpg", alt: "スライド1" },
    {
      src: "/img/aerial-shot-megapolis-with-illuminated-high-buildings.jpg",
      alt: "スライド2",
    },
    { src: "/img/1114_water_hamon_9514.jpg", alt: "スライド3" },
    {
      src: "/img/pexels-ryutaro-tsukata-6249250.jpeg",
      alt: "スライド4",
    },
    {
      src: "/img/photo-1718287888958-efa8b9c8375a.jpeg",
      alt: "スライド5",
    },
  ];

  useEffect(() => {
    let rafId: number;

    const scroll = () => {
      const el = containerRef.current;
      if (el) {
        el.scrollLeft += 1;
        if (el.scrollLeft >= el.scrollWidth - el.clientWidth) {
          el.scrollLeft = 0;
        }
      }
      rafId = requestAnimationFrame(scroll);
    };

    rafId = requestAnimationFrame(scroll);

    return () => cancelAnimationFrame(rafId);
  }, []);

  return (
    <div className="carousel-container" ref={containerRef}>
      <div className="carousel-track">
        {/* 末尾のスライドを先頭に追加 */}
        {slides.slice(-1).map((slide, index) => (
          <div className="carousel-slide" key={`pre-${index}`}>
            <img src={slide.src} alt={slide.alt} draggable="false" />
          </div>
        ))}

        {/* メインのスライド */}
        {slides.map((slide, index) => (
          <div className="carousel-slide" key={index}>
            <img src={slide.src} alt={slide.alt} draggable="false" />
          </div>
        ))}

        {/* 先頭のスライドを末尾に追加 */}
        {slides.slice(0, 1).map((slide, index) => (
          <div className="carousel-slide" key={`post-${index}`}>
            <img src={slide.src} alt={slide.alt} draggable="false" />
          </div>
        ))}
      </div>
    </div>
  );
};
