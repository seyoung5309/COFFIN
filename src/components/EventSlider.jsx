import { useState, useEffect } from 'react';
import PromotionCard from '../components/PromotionCard';

function EventSlider({ title, icon, events }) {
  if (!events || events.length === 0) return null;

  // 1. 무한 루프를 위해 배열을 3 세트로 확장 [이전 복사본, 원본, 다음 복사본]
  const extendedEvents = [
    ...events.map((item) => ({ ...item, _key: `prev-${item.id}` })),
    ...events.map((item) => ({ ...item, _key: `origin-${item.id}` })),
    ...events.map((item) => ({ ...item, _key: `next-${item.id}` })),
  ];

  // 원본 데이터가 시작하는 중앙 인덱스 위치
  const startIndex = events.length;

  const [currentIndex, setCurrentIndex] = useState(startIndex);
  const [isTransitioning, setIsTransitioning] = useState(true);

  /* 카드 너비(320px) + 간격(20px) = 340px */
  const CARD_WIDTH = 320;
  const GAP = 20;
  const STEP = CARD_WIDTH + GAP;

  // 카테고리 변경 등으로 events가 바뀔 때 위치 초기화
  useEffect(() => {
    setIsTransitioning(false);
    setCurrentIndex(events.length);
  }, [events]);

  // 이전 버튼
  const handlePrev = () => {
    setIsTransitioning(true);
    setCurrentIndex((prev) => prev - 1);
  };

  // 다음 버튼
  const handleNext = () => {
    setIsTransitioning(true);
    setCurrentIndex((prev) => prev + 1);
  };

  // 2. 슬라이드 애니메이션이 끝난 후 눈속임 리셋
  const handleTransitionEnd = () => {
    // 오른쪽 복사본 영역으로 진입했을 때 -> 중앙 원본 위치로 순간이동
    if (currentIndex >= startIndex + events.length) {
      setIsTransitioning(false);
      setCurrentIndex(currentIndex - events.length);
    }
    // 왼쪽 복사본 영역으로 진입했을 때 -> 중앙 원본 위치로 순간이동
    else if (currentIndex < startIndex) {
      setIsTransitioning(false);
      setCurrentIndex(currentIndex + events.length);
    }
  };

  return (
    <div className="event-slider-block">
      {/* 섹션 타이틀 */}
      <div className="card-title">
        {icon}
        <h3>{title}</h3>
      </div>

      {/* 슬라이더 영역 */}
      <div className="slider-outer-wrapper">
        {/* 좌측 화살표 */}
        <button className="circle-nav-btn prev" onClick={handlePrev} aria-label="이전">
          <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="white" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
            <polyline points="15 18 9 12 15 6"></polyline>
          </svg>
        </button>

        {/* 중앙 카드 표시 영역 */}
        <div className="slider-viewport">
          <div
            className="card-track"
            onTransitionEnd={handleTransitionEnd}
            style={{
              transform: `translateX(-${currentIndex * STEP}px)`,
              // 눈속임 이동(순간이동) 시에는 transition을 잠시 끕니다.
              transition: isTransitioning ? 'transform 0.4s cubic-bezier(0.25, 1, 0.5, 1)' : 'none'
            }}
          >
            {extendedEvents.map((event) => (
              <div className="card-item" key={event._key}>
                <PromotionCard
                  title={event.title}
                  brand={event.brand}
                />
              </div>
            ))}
          </div>
        </div>

        {/* 우측 화살표 */}
        <button className="circle-nav-btn next" onClick={handleNext} aria-label="다음">
          <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="white" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
            <polyline points="9 18 15 12 9 6"></polyline>
          </svg>
        </button>
      </div>
    </div>
  );
}

export default EventSlider;