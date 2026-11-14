import { useEffect, useState } from "react";
import { useLocation, useNavigate, useParams } from "react-router-dom";
import Header from "../components/Header";
import Footer from "../components/Footer";
import DrinkSlider from "../components/DrinkSlider";
import {
  getCoffeeDetail,
  getRelatedCoffeeForDetail,
} from "../services/coffeeService";
import "../styles/Coffee_Detail.css";

// 영양 정보 표시 순서와 단위
const NUTRITION = [
  { key: "sugar", label: "당류", unit: "g" },
  { key: "saturated_fat", label: "포화지방", unit: "g" },
  { key: "natrium", label: "나트륨", unit: "mg" },
  { key: "protein", label: "단백질", unit: "g" },
];

function Coffee_Detail() {
  const { id } = useParams();
  const navigate = useNavigate();
  const location = useLocation();
  // status: "loading" | "done" | "error"
  const [result, setResult] = useState({
    id: null,
    status: "loading",
    detail: null,
    related: [],
  });

  useEffect(() => {
    window.scrollTo(0, 0);
    let ignore = false;

    const load = async () => {
      const { data, error } = await getCoffeeDetail(Number(id));
      if (ignore) return;
      if (error || !data) {
        console.error(error);
        setResult({ id, status: "error", detail: null, related: [] });
        return;
      }
      // 상세 정보를 먼저 보여주고, 연관 커피는 도착하는 대로 채운다
      setResult({ id, status: "done", detail: data, related: [] });

      const { data: related } = await getRelatedCoffeeForDetail(
        data.id,
        data.name,
      );
      if (ignore) return;
      setResult((prev) => ({ ...prev, related: related ?? [] }));
    };

    load();
    return () => {
      ignore = true;
    };
  }, [id]);

  // 연관 커피를 눌러 다른 id로 이동한 직후에는 이전 결과를 숨기고 로딩으로 본다
  const status = result.id === id ? result.status : "loading";
  const { detail, related } = result;

  // 주소로 바로 들어온 경우(이전 페이지가 없는 경우)에는 차트 목록으로 보낸다
  const handleBack = () => {
    if (location.key === "default") navigate("/caffeine-chart");
    else navigate(-1);
  };

  const relatedCoffees = related.map((c) => ({
    ...c,
    brand: c.franchise?.name ?? "",
  }));

  return (
    <>
      <Header />

      <main className="coffee-detail">
        <button
          type="button"
          className="coffee-detail__back"
          onClick={handleBack}
          aria-label="이전 페이지로 돌아가기"
        >
          &#10094;
        </button>

        {status === "loading" && (
          <p className="coffee-detail__status">커피 정보를 불러오는 중...</p>
        )}

        {status === "error" && (
          <p className="coffee-detail__status">
            커피 정보를 불러오지 못했어요. 주소가 맞는지 확인하고 다시 시도해
            주세요.
          </p>
        )}

        {status === "done" && (
          <>
            <article className="coffee-detail__card">
              <div className="coffee-detail__image">
                <img src={detail.img} alt={detail.name} />
              </div>

              <div className="coffee-detail__info">
                {detail.franchise && (
                  <p className="coffee-detail__brand">{detail.franchise.name}</p>
                )}
                <h1 className="coffee-detail__name">{detail.name}</h1>
                <p className="coffee-detail__price">
                  {detail.price?.toLocaleString()}원
                </p>
                <p className="coffee-detail__caffeine">
                  카페인 함량 {detail.caffeine} (mg)
                </p>

                {detail.franchise && (
                  <button
                    type="button"
                    className="coffee-detail__franchise-btn"
                    onClick={() =>
                      navigate(`/caffeine-chart?franchise=${detail.franchise.id}`)
                    }
                  >
                    {detail.franchise.name} 메뉴 더 보기 →
                  </button>
                )}

                {detail.intro && (
                  <p className="coffee-detail__intro">{detail.intro}</p>
                )}

                <dl className="coffee-detail__nutrition">
                  {NUTRITION.map(({ key, label, unit }) => (
                    <div key={key} className="coffee-detail__nutrition-row">
                      <dt>{label}</dt>
                      <dd>
                        {detail[key]}
                        {unit}
                      </dd>
                    </div>
                  ))}
                </dl>
              </div>
            </article>

            {relatedCoffees.length > 0 && (
              <section className="coffee-detail__related">
                <h2>연관 커피 보러가기</h2>
                <DrinkSlider
                  coffees={relatedCoffees}
                  onCardClick={(coffee) => navigate(`/coffee/${coffee.id}`)}
                />
              </section>
            )}
          </>
        )}
      </main>

      <Footer />
    </>
  );
}

export default Coffee_Detail;