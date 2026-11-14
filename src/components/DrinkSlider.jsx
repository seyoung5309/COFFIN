import { useRef } from "react";
import DrinkCard from "./DrinkCard";
import "../styles/DrinkSlider.css";

// DrinkCard를 가로로 나열하고 화살표로 넘기는 슬라이더
// coffees: [{ id, name, img, price, caffeine, brand, ... }]
// onCardClick: (coffee) => void
function DrinkSlider({ coffees, onCardClick }) {
  const listRef = useRef(null);

  // 지금 화면에 다 보이는 카드 수만큼 넘긴다 (화면 폭에 따라 1~4개)
  const scrollPage = (dir) => {
    const list = listRef.current;
    if (!list?.firstElementChild) return;
    const cardWidth = list.firstElementChild.offsetWidth;
    const gap = parseFloat(getComputedStyle(list).columnGap) || 0;
    const perPage = Math.max(
      1,
      Math.floor((list.clientWidth + gap) / (cardWidth + gap)),
    );
    list.scrollBy({
      left: dir * perPage * (cardWidth + gap),
      behavior: "smooth",
    });
  };

  return (
    <div className="drink-slider">
      <button
        type="button"
        className="drink-slider__arrow drink-slider__arrow--left"
        onClick={() => scrollPage(-1)}
        aria-label="이전 커피 보기"
      >
        &#10094;
      </button>

      <div className="drink-slider__list" ref={listRef}>
        {coffees.map((coffee) => (
          <DrinkCard
            key={coffee.id}
            coffee={coffee}
            onClick={() => onCardClick(coffee)}
          />
        ))}
      </div>

      <button
        type="button"
        className="drink-slider__arrow drink-slider__arrow--right"
        onClick={() => scrollPage(1)}
        aria-label="다음 커피 보기"
      >
        &#10095;
      </button>
    </div>
  );
}

export default DrinkSlider;