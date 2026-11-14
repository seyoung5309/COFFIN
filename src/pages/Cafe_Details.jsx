import { useEffect, useState } from "react";
import { Link, useLocation, useNavigate, useSearchParams } from "react-router-dom";
import "../styles/Cafe_Details.css";
import Header from "../components/Header";
import Footer from "../components/Footer";
import Cafe_Slider from "../components/Cafe_Slider";
import CafeCard from "../components/CafeCard";
import DrinkCard from "../components/DrinkCard";
import { searchCafes } from "../services/kakaoService";
import { getAllCoffee, searchCoffee } from "../services/chartService";
import mc1 from "../assets/MoreCoffee1.svg";
import mc2 from "../assets/MoreCoffee2.svg";

function ArrowButton() {
    const navigate = useNavigate();
    const location = useLocation();

    // 이전 페이지가 없으면(직접 접속 등) 홈으로 이동
    const goBack = () => {
        if (location.key === "default") navigate("/");
        else navigate(-1);
    };

    return (
        <svg
            onClick={goBack}
            style={{ cursor: "pointer" }}
            width="13"
            height="24"
            viewBox="0 0 24 40"
            fill="none"
        >
            <path
                d="M18 4L6 20L18 36"
                stroke="black"
                strokeWidth="4"
                strokeLinecap="round"
                strokeLinejoin="round"
            />
        </svg>
    );
}

function CafeResults({ searchQuery, coffeeSearch, showAllCoffee }) {
    // 결과가 어떤 검색어의 것인지 함께 저장해 로딩 상태를 계산한다.
    const [result, setResult] = useState({ query: null, items: [], error: false });
    const loading = (Boolean(searchQuery) || showAllCoffee) && result.query !== searchQuery;
    const items = result.query === searchQuery ? result.items : [];

    useEffect(() => {
        if (!searchQuery && !showAllCoffee) return;
        let ignore = false;
        const request = coffeeSearch
            ? (showAllCoffee ? getAllCoffee() : searchCoffee(searchQuery)).then(({ data, error }) => {
                if (error) throw error;
                return data;
            })
            : searchCafes(searchQuery);
        request
            .then((items) => !ignore && setResult({ query: searchQuery, items, error: false }))
            .catch((e) => {
                console.error(e);
                if (!ignore) setResult({ query: searchQuery, items: [], error: true });
            });
        return () => { ignore = true; };
    }, [searchQuery, coffeeSearch, showAllCoffee]);
    const moreCoffee = [
        { brands: "스타벅스", name: "민트 콜드 브루", caffeine: 415, price: 5500, img: mc1 },
        { brands: "스타벅스", name: "민트 콜드 브루", caffeine: 415, price: 5500, img: mc2 },
        { brands: "스타벅스", name: "민트 콜드 브루", caffeine: 415, price: 5500, img: mc1 },
        { brands: "스타벅스", name: "민트 콜드 브루", caffeine: 415, price: 5500, img: mc1 },
        { brands: "스타벅스", name: "민트 콜드 브루", caffeine: 415, price: 5500, img: mc1 },
    ];
    return (
        <div>
            <Header />

            <div className={`cafe_searchResult ${coffeeSearch ? "cafe_searchResult--coffee" : ""}`}>
                <ArrowButton />
                <h1 id="searchResult">
                    {showAllCoffee ? "카페인 차트" : <><span id="result">'{searchQuery}'</span> {coffeeSearch ? "커피" : "카페"} 검색 결과</>}
                </h1>
            </div>

            {!searchQuery && !showAllCoffee && <p className="cafe-card-status">검색어를 입력해 주세요.</p>}
            {loading && <p className="cafe-card-status" role="status">검색 중...</p>}
            {!loading && result.error && <p className="cafe-card-status" role="alert">검색에 실패했어요. 잠시 후 다시 시도해 주세요.</p>}
            {!loading && !result.error && searchQuery && items.length === 0 && <p className="cafe-card-status">검색 결과가 없어요.</p>}
            {!loading && !result.error && showAllCoffee && items.length === 0 && <p className="cafe-card-status">등록된 커피가 없어요.</p>}
            {coffeeSearch ? (
                <div className="coffee-search-results">
                    {items.map((coffee) => (
                        <Link key={coffee.id} to={`/coffee/${coffee.id}`} className="coffee-search-results__link">
                            <DrinkCard coffee={{ ...coffee, brand: coffee.franchise?.name ?? "" }} />
                        </Link>
                    ))}
                </div>
            ) : items.map((cafe) => <CafeCard key={cafe.id} cafe={cafe} />)}

            {!coffeeSearch && <div className="cafe_moreCoffee">
                <p id="p-moreCoffee">대표 커피 보러가기</p>
                <Cafe_Slider coffees={moreCoffee} />
            </div>}


            <Footer />
        </div>
    )
}

function Cafe_Details() {
    const location = useLocation();
    const [params] = useSearchParams();
    const coffeeSearch = location.pathname === "/caffeine-chart" || params.has("q");
    const searchQuery = (coffeeSearch ? params.get("q") : location.state?.searchQuery)?.trim() ?? "";
    const showAllCoffee = location.pathname === "/caffeine-chart" && !searchQuery;

    return <CafeResults key={`${coffeeSearch}:${showAllCoffee}:${searchQuery}`} searchQuery={searchQuery} coffeeSearch={coffeeSearch} showAllCoffee={showAllCoffee} />;
}

export default Cafe_Details
