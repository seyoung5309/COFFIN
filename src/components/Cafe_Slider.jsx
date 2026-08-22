import { useRef, useState, useEffect } from "react";
import "../styles/Cafe_Slider.css";

// 화살표는 이미지가 아니라 SVG로 그립니다. 색/크기를 자유롭게 바꿀 수 있어요.
function ArrowIcon({ direction = "right" }) {
  return (
    <svg
      width="18"
      height="18"
      viewBox="0 0 24 24"
      fill="none"
      style={{ transform: direction === "left" ? "rotate(180deg)" : "none" }}
    >
      <path
        d="M9 6l6 6-6 6"
        stroke="currentColor"
        strokeWidth="2.2"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </svg>
  );
}


export default function Cafe_Slider({ coffees = [] }) {
  const trackRef = useRef(null);
  const [canScrollLeft, setCanScrollLeft] = useState(false);
  const [canScrollRight, setCanScrollRight] = useState(true);

  // 스크롤 위치에 따라 화살표 버튼 활성/비활성 상태 갱신
  const updateArrows = () => {
    const el = trackRef.current;
    if (!el) return;
    setCanScrollLeft(el.scrollLeft > 4);
    setCanScrollRight(el.scrollLeft + el.clientWidth < el.scrollWidth - 4);
  };

  useEffect(() => {
    updateArrows();
  }, [coffees]);

  const scrollByCard = (dir) => {
    const el = trackRef.current;
    if (!el) return;
    const cardWidth = el.firstChild?.offsetWidth ?? 260;
    el.scrollBy({ left: dir * (cardWidth + 16), behavior: "smooth" });
  };

  return (
    <div className="cafe-slider">
      {/* 왼쪽 화살표 버튼 */}
      <button
        aria-label="이전"
        onClick={() => scrollByCard(-1)}
        disabled={!canScrollLeft}
        className="cafe-slider-arrow cafe-slider-arrow--left"
      >
        <ArrowIcon direction="left" />
      </button>

      {/* 카드가 나열되는 트랙 - overflow-x + scroll-snap 조합 */}
      <div ref={trackRef} onScroll={updateArrows} className="cafe-slider-track">
        {coffees.map((c, i) => (
          // 데이터에 고유 id가 없어서 index를 key로 사용했습니다.
          // moreCoffee 배열에 id 필드를 추가할 수 있다면 그걸 key로 쓰는 게 더 안전해요.
          <div key={i} className="cafe-card">
            <div className="cafe-card-image">
              <img src={c.img} alt={c.name} />
            </div>
            <div className="cafe-card-info">
              <div className="cafe-card-brand">{c.brands}</div>
              <div className="cafe-card-caffeine">카페인 함량 {c.caffeine} (mg)</div>
              <div className="cafe-card-name">
                {c.name}&nbsp;&nbsp;{c.price.toLocaleString()}원
              </div>
            </div>
          </div>
        ))}
      </div>

      {/* 오른쪽 화살표 버튼 */}
      <button
        aria-label="다음"
        onClick={() => scrollByCard(1)}
        disabled={!canScrollRight}
        className="cafe-slider-arrow cafe-slider-arrow--right"
      >
        <ArrowIcon direction="right" />
      </button>
    </div>
  );
}