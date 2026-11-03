import { useEffect, useRef, useState } from "react";
import { useNavigate } from "react-router-dom";
import DrinkCard from "../components/DrinkCard";
import { getRandomCoffee } from "../services/chartService";
import "../styles/Caffeine_chart.css";

function Caffeine_chart() {
  const navigate = useNavigate();
  const listRef = useRef(null);
  // status: "loading" | "done" | "error"
  const [result, setResult] = useState({ status: "loading", coffees: [] });

  // 오늘의 추천 커피: 랜덤 10개
  useEffect(() => {
    let ignore = false;
    getRandomCoffee(10).then(({ data, error }) => {
      if (ignore) return;
      if (error) {
        console.error(error);
        setResult({ status: "error", coffees: [] });
        return;
      }
      const coffees = data.map((c) => ({ ...c, brand: c.franchise?.name ?? "" }));
      setResult({ status: "done", coffees });
    });
    return () => { ignore = true; };
  }, []);

  // 지금 화면에 다 보이는 카드 수만큼 넘긴다 (화면 폭에 따라 1~4개)
  const scrollPage = (dir) => {
    const list = listRef.current;
    if (!list?.firstElementChild) return;
    const cardWidth = list.firstElementChild.offsetWidth;
    const gap = parseFloat(getComputedStyle(list).columnGap) || 0;
    const perPage = Math.max(1, Math.floor((list.clientWidth + gap) / (cardWidth + gap)));
    list.scrollBy({ left: dir * perPage * (cardWidth + gap), behavior: "smooth" });
  };

  const handleNext = () => scrollPage(1);
  const handlePrev = () => scrollPage(-1);

  return (
    <section className="caffeine-chart">
      <div className="caffeine-chart__title">
        <h1>CAFFEINE CHART</h1>
        <p>당신에게 맞는 커피 정보를 확인해 보세요</p>
      </div>

      <div className="ment">
        <p>정신 바짝 차릴 때 한 잔</p>
        <h2>오늘의 추천 커피</h2>
      </div>

      <div className="caffeine-chart__slider">

        <button className="arrow left" onClick={handlePrev}>
          &#10094;
        </button>

        <div className="coffee-list" ref={listRef}>
          {result.status === "loading" && <p className="caffeine-chart__status">커피를 불러오는 중...</p>}
          {result.status === "error" && <p className="caffeine-chart__status">커피 정보를 불러오지 못했어요.</p>}
          {result.coffees.map((coffee) => (
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