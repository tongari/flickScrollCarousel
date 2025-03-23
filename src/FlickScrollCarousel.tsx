// Flick comparison between translateX and scrollLeft (React)
import { useRef, useEffect, useState } from "react";
import "./styles.css";

export const FlickScrollCarousel = ({
  dragThreshold = 20,
}: {
  dragThreshold?: number;
}) => {
  const containerRef = useRef<any>(null);
  const startX = useRef(0);
  const scrollLeft = useRef(0);
  const isDragging = useRef(false);
  const dragStartX = useRef(0);

  // スライド画像の配列を定義
  const slides = [
    { src: "/img/1114_water_hamon_9514.jpg", alt: "スライド1" },
    {
      src: "/img/aerial-shot-megapolis-with-illuminated-high-buildings.jpg",
      alt: "スライド2",
    },
    { src: "/img/beautiful-rainbow-nature.jpg", alt: "スライド3" },
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
    const container = containerRef.current;
    if (!container) return;

    const slides = container.querySelectorAll(".carousel-slide");
    if (slides.length === 0) return;

    const firstSlide = slides[0];

    // 初期スクロール位置の補正を DOM レンダリング後に行う
    requestAnimationFrame(() => {
      const containerCenter = container.offsetWidth / 2;
      const firstSlideCenter =
        firstSlide.offsetLeft + firstSlide.offsetWidth / 2;
      const initialScrollLeft = firstSlideCenter - containerCenter;
      container.scrollLeft = initialScrollLeft;
    });

    const handleMouseDown = (e: any) => {
      isDragging.current = true;
      startX.current = e.pageX - container.offsetLeft;
      dragStartX.current = e.pageX;
      scrollLeft.current = container.scrollLeft;
    };

    const handleMouseMove = (e: any) => {
      if (!isDragging.current) return;
      e.preventDefault();
      const x = e.pageX - container.offsetLeft;
      const dx = x - startX.current;
      // フリック量を調整（1:1の比率に）
      container.scrollLeft = scrollLeft.current - dx;
      startX.current = x; // 現在位置を更新
    };

    const handleMouseUp = () => {
      isDragging.current = false;

      const dragDistance = startX.current - dragStartX.current;

      if (Math.abs(dragDistance) < dragThreshold) {
        container.scrollTo({
          left: scrollLeft.current,
          behavior: "smooth",
        });
        return;
      }

      const containerCenter = container.scrollLeft + container.offsetWidth / 2;
      let closestSlide: any = null;
      let minDistance = Infinity;

      slides.forEach((slide: any) => {
        const slideCenter = slide.offsetLeft + slide.offsetWidth / 2;
        const distance = Math.abs(slideCenter - containerCenter);
        if (distance < minDistance) {
          minDistance = distance;
          closestSlide = slide;
        }
      });

      if (closestSlide) {
        const slideWidth = closestSlide.offsetWidth;
        const currentIndex = Math.round(container.scrollLeft / slideWidth);
        let targetIndex = currentIndex;

        // ドラッグ方向に基づいてインデックスを調整
        if (dragDistance < 0 && currentIndex < slides.length - 1) {
          targetIndex = currentIndex + 1;
        } else if (dragDistance > 0 && currentIndex > 0) {
          targetIndex = currentIndex - 1;
        }

        const targetScrollLeft = targetIndex * slideWidth;
        container.scrollTo({ left: targetScrollLeft, behavior: "smooth" });
      }
    };

    container.addEventListener("mousedown", handleMouseDown);
    container.addEventListener("mousemove", handleMouseMove);
    container.addEventListener("mouseup", handleMouseUp);
    container.addEventListener("mouseleave", handleMouseUp);

    // タッチイベントのハンドラーを追加
    const handleTouchStart = (e: TouchEvent) => {
      isDragging.current = true;
      startX.current = e.touches[0].pageX - container.offsetLeft;
      dragStartX.current = e.touches[0].pageX;
      scrollLeft.current = container.scrollLeft;
    };

    const handleTouchMove = (e: TouchEvent) => {
      if (!isDragging.current) return;
      e.preventDefault();
      const x = e.touches[0].pageX - container.offsetLeft;
      const dx = x - startX.current;
      container.scrollLeft = scrollLeft.current - dx;
      startX.current = x;
    };

    const handleTouchEnd = () => {
      if (!isDragging.current) return;
      handleMouseUp(); // 既存のマウスアップハンドラーを再利用
    };

    // タッチイベントリスナーを追加
    container.addEventListener("touchstart", handleTouchStart);
    container.addEventListener("touchmove", handleTouchMove);
    container.addEventListener("touchend", handleTouchEnd);
    container.addEventListener("touchcancel", handleTouchEnd);

    return () => {
      container.removeEventListener("mousedown", handleMouseDown);
      container.removeEventListener("mousemove", handleMouseMove);
      container.removeEventListener("mouseup", handleMouseUp);
      container.removeEventListener("mouseleave", handleMouseUp);

      // タッチイベントリスナーの削除
      container.removeEventListener("touchstart", handleTouchStart);
      container.removeEventListener("touchmove", handleTouchMove);
      container.removeEventListener("touchend", handleTouchEnd);
      container.removeEventListener("touchcancel", handleTouchEnd);
    };
  }, [dragThreshold]);

  return (
    <div className="carousel-container scroll" ref={containerRef}>
      <div className="carousel-track">
        {slides.map((slide, index) => (
          <div className="carousel-slide" key={index}>
            <img src={slide.src} alt={slide.alt} draggable="false" />
          </div>
        ))}
      </div>
    </div>
  );
};
