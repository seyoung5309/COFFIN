import React, { useState } from 'react';
import "../styles/Coffee_Collection.css";
import iimg from "../assets/ExCoffee.svg";

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
  const visibleSlides = 3;

  // 현재 슬라이드 위치
  const [currentSlide, setCurrentSlide] = useState(0);

  // 최대 슬라이드 위치
  const maxSlide = mockDrinks.length - visibleSlides;

  // 이전 슬라이드
  const handlePrev = () => {
    setCurrentSlide((prev) =>
      prev === 0 ? maxSlide : prev - 1
    );
  };

  // 다음 슬라이드
  const handleNext = () => {
    setCurrentSlide((prev) =>
      prev === maxSlide ? 0 : prev + 1
    );
  };

  return (
    <div className="slider-wrapper">

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
          <h2 className="title">
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
              transform: `translateX(-${currentSlide * 150}px)`,
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