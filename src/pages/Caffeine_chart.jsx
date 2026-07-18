import { useRef } from "react";
import { useNavigate } from "react-router-dom";
import DrinkCard from "../components/DrinkCard";
import cimg from "../assets/COFFIN_logo.svg";
import "../styles/Caffeine_chart.css";

function Caffeine_chart() {
  const navigate = useNavigate();
  const listRef = useRef(null);

  const coffeeData = [
    { id: 1, brand: "스타벅스", name: "민트 콜드 브루", caffeine: 415, price: 5500, img: cimg },
    { id: 2, brand: "스타벅스", name: "아메리카노", caffeine: 150, price: 4500, img: cimg },
    { id: 3, brand: "스타벅스", name: "카페라떼", caffeine: 75, price: 5000, img: cimg },
    { id: 4, brand: "메가커피", name: "바닐라라떼", caffeine: 200, price: 3900, img: cimg },
    { id: 5, brand: "컴포즈", name: "콜드브루", caffeine: 260, price: 4300, img: cimg },
    { id: 6, brand: "빽다방", name: "원조커피", caffeine: 330, price: 3000, img: cimg },
  ];

  const handleNext = () => {
    listRef.current.scrollBy({
      left: 1216, // 카드4개
      behavior: "smooth",
    });
  };

  const handlePrev = () => {
    listRef.current.scrollBy({
      left: -1216,
      behavior: "smooth",
    });
  };

  return (
    <section className="caffeine-chart">
      <div className="title">
        <h1>CAFFEINE CHART</h1>
        <p>당신에게 맞는 커피 정보를 확인해 보세요</p>
      </div>

      <div className="ment">
        <p>정신 바짝 차릴 때 한 잔</p>
        <h2>오늘의 추천 커피</h2>
      </div>

      <div className="slider-wrapper">

        <button className="arrow left" onClick={handlePrev}>
          &#10094;
        </button>

        <div className="coffee-list" ref={listRef}>
          {coffeeData.map((coffee) => (
            <DrinkCard
              key={coffee.id}
              coffee={coffee}
              onClick={() => navigate(`/coffee/${coffee.id}`)}
            />
          ))}
        </div>

        <button className="arrow right" onClick={handleNext}>
          &#10095;
        </button>

      </div>

      <button
        className="more-btn"
        onClick={() => navigate("/caffeine-chart")}
      >
        더 알아보기 →
      </button>
    </section>
  );
}

export default Caffeine_chart;