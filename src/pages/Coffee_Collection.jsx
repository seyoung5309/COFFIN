import { useEffect, useState } from 'react';
import "../styles/Coffee_Collection.css";
import iimg from "../assets/ExCoffee.svg";

// 화면 폭에 따라 한 번에 보여줄 카드 개수 (Coffee_Collection.css의 미디어 쿼리와 같은 기준)
const MOBILE_QUERY = '(max-width: 700px)';
const TABLET_QUERY = '(max-width: 1100px)';
const getVisibleSlides = () => {
  if (window.matchMedia(MOBILE_QUERY).matches) return 1;
  if (window.matchMedia(TABLET_QUERY).matches) return 2;
  return 3;
};

function useVisibleSlides() {
  const [visibleSlides, setVisibleSlides] = useState(getVisibleSlides);

  // 창 크기가 바뀌면 다시 계산한다 (값이 같으면 React가 다시 그리지 않음)
  useEffect(() => {
    const update = () => setVisibleSlides(getVisibleSlides());
    window.addEventListener('resize', update);
    return () => window.removeEventListener('resize', update);
  }, []);

  return visibleSlides;
}

function Coffee_Collection() {
  const mockDrinks = [
    { id: 1, name: '망고 스무디', img: iimg },
    { id: 2, name: '딸기 라떼', img: iimg },
    { id: 3, name: '초코 말차', img: iimg },
    { id: 4, name: '바닐라 라떼', img: iimg },
    { id: 5, name: '카페 모카', img: iimg },
    { id: 6, name: '아메리카노', img: iimg },
  ];

  // 한 번에 보여줄 카드 개수
  const visibleSlides = useVisibleSlides();

  // 최대 슬라이드 위치
  const maxSlide = mockDrinks.length - visibleSlides;

  // 현재 슬라이드 위치 (화면이 넓어져 maxSlide가 줄면 그 안으로 맞춘다)
  const [slideState, setCurrentSlide] = useState(0);
  const currentSlide = Math.min(slideState, maxSlide);

  // 이전 슬라이드
  const handlePrev = () => {
    setCurrentSlide(currentSlide === 0 ? maxSlide : currentSlide - 1);
  };

  // 다음 슬라이드
  const handleNext = () => {
    setCurrentSlide(currentSlide === maxSlide ? 0 : currentSlide + 1);
  };

  return (
    <div className="coffee-collection">

      {/* 왼쪽 화살표 */}
      <button
        className="nav-button"
        onClick={handlePrev}
      >
        &lt;
      </button>

      <div className="slider-container">

        {/* 왼쪽 텍스트 */}
        <div className="text-section">
          <h2 className="coffee-collection__title">
            당 땡길때 먹어야하는
            <br />
            커피 모음
          </h2>

          {/* 페이지네이션 */}
          <div className="pagination">
            {Array.from({ length: maxSlide + 1 }).map((_, index) => (
              <span
                key={index}
                className={`dot ${
                  currentSlide === index ? 'active' : ''
                }`}
                onClick={() => setCurrentSlide(index)}
              />
            ))}
          </div>
        </div>

        {/* 오른쪽 슬라이드 */}
        <div className="image-section-wrapper">
          <div
            className="image-section"
            style={{
              // 한 칸 = (영역 너비 + 간격) / 보이는 카드 수
              '--visible': visibleSlides,
              transform: `translateX(calc(-${currentSlide} * (100% + var(--drink-gap)) / var(--visible)))`,
            }}
          >
            {mockDrinks.map((drink) => (
              <div
                key={drink.id}
                className="drink-card"
              >
                <img
                  src={drink.img}
                  className="drink-image"
                />

              </div>
            ))}
          </div>
        </div>

      </div>

      {/* 오른쪽 화살표 */}
      <button
        className="nav-button"
        onClick={handleNext}
      >
        &gt;
      </button>

    </div>
  );
}

export default Coffee_Collection;