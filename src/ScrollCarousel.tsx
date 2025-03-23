import { useEffect, useRef } from "react";

export const ScrollCarousel = () => {
  const containerRef = useRef<HTMLDivElement>(null);

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
        <div className="carousel-slide">A</div>
        <div className="carousel-slide">B</div>
        <div className="carousel-slide">C</div>
      </div>
    </div>
  );
};
