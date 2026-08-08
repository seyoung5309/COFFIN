import { useState } from 'react';
import "../styles/Promotion.css";
import Header from "../components/Header";
import Footer from "../components/Footer";
import Slider from "../components/Slider";
import EventSlider from "../components/EventSlider";
import CoffinLogo from "../assets/COFFIN_logo.svg";

// 1. 마감임박 이벤트 데이터
const DEADLINE_EVENTS = [
  { id: 1, category: '이벤트', title: '[6.5~6.7] 빽다방 아이스 카페라떼 1000원', brand: '빽다방' },
  { id: 2, category: '이벤트', title: '[7월 한달 간] 텀브커피 우아한 할인 아메리카노 1500원', brand: '텀브커피' },
  { id: 3, category: '신메뉴', title: '[3.14~3.31] 봉명동내커피 두바이 시리즈 출시 기념 이벤트', brand: 'BMDNC' },
  { id: 4, category: '신규오픈', title: '달콤커피 신규 매장 오픈 기념 할인 행사', brand: '달콤커피' },
];

// 2. SNS 이벤트 데이터
const SNS_EVENTS = [
  { id: 101, category: '이벤트', title: '[6.5~6.7] 빽다방 아이스 카페라떼 1000원', brand: '빽다방' },
  { id: 102, category: '이벤트', title: '[7월 한달 간] 텀브커피 우아한 할인 아메리카노 1500원', brand: '텀브커피' },
  { id: 103, category: '신메뉴', title: '[3.14~3.31] 봉명동내커피 두바이 시리즈 출시 기념 이벤트', brand: 'BMDNC' },
  { id: 104, category: '신규오픈', title: '달콤커피 신규 매장 오픈 기념 할인 행사', brand: '달콤커피' },
];

function Promotion() {
  const [activeCategory, setActiveCategory] = useState('전체');
  const categories = ['전체', '이벤트', '신메뉴', '신규오픈'];

  // 카테고리 필터링 적용 함수
  const filterEvents = (data) => {
    if (activeCategory === '전체') return data;
    return data.filter(event => event.category === activeCategory);
  };

  return (
    <>
      <Header />
      <Slider />

      <section className="event-section">
        <div className="event-content-container">
          {/* 상단 제목 및 설명 */}
          <div className="event-header">
            <p className="event-subtitle">할인, 증정, 한정 프로모션 소식을 확인해보세요.</p>
            <h2 className="event-title">지금 진행 중인 카페 이벤트</h2>
          </div>

          {/* 카테고리 탭 */}
          <div className="category-tabs">
            {categories.map((category) => (
              <button
                key={category}
                className={`tab-btn ${activeCategory === category ? 'active' : ''}`}
                onClick={() => setActiveCategory(category)}
              >
                {category}
              </button>
            ))}
          </div>
        </div>

        {/* 1. 마감임박 이벤트 슬라이더 */}
        <EventSlider
          title="마감임박 이벤트"
          events={filterEvents(DEADLINE_EVENTS)}
          icon={
            <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none">
              <path d="M12 2C17.523 2 22 6.477 22 12C22 17.523 17.523 22 12 22C6.477 22 2 17.523 2 12C2 6.477 6.477 2 12 2ZM12 4C9.87827 4 7.84344 4.84285 6.34315 6.34315C4.84285 7.84344 4 9.87827 4 12C4 14.1217 4.84285 16.1566 6.34315 17.6569C7.84344 19.1571 9.87827 20 12 20C14.1217 20 16.1566 19.1571 17.6569 17.6569C19.1571 16.1566 20 14.1217 20 12C20 9.87827 19.1571 7.84344 17.6569 6.34315C16.1566 4.84285 14.1217 4 12 4ZM12 6C12.2449 6.00003 12.4813 6.08996 12.6644 6.25272C12.8474 6.41547 12.9643 6.63975 12.993 6.883L13 7V11.586L15.707 14.293C15.8863 14.473 15.9905 14.7144 15.9982 14.9684C16.006 15.2223 15.9168 15.4697 15.7488 15.6603C15.5807 15.8508 15.3464 15.9703 15.0935 15.9944C14.8406 16.0185 14.588 15.9454 14.387 15.79L14.293 15.707L11.293 12.707C11.1376 12.5514 11.0378 12.349 11.009 12.131L11 12V7C11 6.73478 11.1054 6.48043 11.2929 6.29289C11.4804 6.10536 11.7348 6 12 6Z" fill="black"/>
            </svg>
          }
        />

        {/* 2. SNS 이벤트 슬라이더 */}
        <EventSlider
          title="SNS 이벤트"
          events={filterEvents(SNS_EVENTS)}
        />
      </section>

      
      <div className="register">
        <img src={CoffinLogo} alt="COFFIN 로고" className="register-logo" />
        <h2>당신의 카페를 더 많은 사람들에게</h2>
        <p>신메뉴, 이벤트, 신규 오픈 소식을 사용자들에게 직접 알릴 수 있습니다.</p>
        <button>프로모션 등록하기 →</button>
      </div>


      <Footer/>
    </>
  );
}

export default Promotion;