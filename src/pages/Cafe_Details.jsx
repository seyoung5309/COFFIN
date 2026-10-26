import { useEffect, useState } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import "../styles/Cafe_Details.css";
import Header from "../components/Header";
import Footer from "../components/Footer";
import Cafe_Slider from "../components/Cafe_Slider";
import CafeCard from "../components/CafeCard";
import { searchCafes } from "../services/kakaoService";
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

function Cafe_Details() {
    const location = useLocation();
    const searchQuery = location.state?.searchQuery;
    // 결과가 어떤 검색어의 것인지 함께 저장해 로딩 상태를 계산한다.
    const [result, setResult] = useState({ query: null, cafes: [], error: false });
    const loading = Boolean(searchQuery) && result.query !== searchQuery;
    const cafes = result.query === searchQuery ? result.cafes : [];

    useEffect(() => {
        if (!searchQuery) return;
        let ignore = false;
        searchCafes(searchQuery)
            .then((cafes) => !ignore && setResult({ query: searchQuery, cafes, error: false }))
            .catch((e) => {
                console.error(e);
                if (!ignore) setResult({ query: searchQuery, cafes: [], error: true });
            });
        return () => { ignore = true; };
    }, [searchQuery]);
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

            <div className="cafe_searchResult">
                <ArrowButton />
                <p id="searchResult"><span id="result">'{searchQuery}'</span> 카페 검색 결과</p>
            </div>

            {loading && <p className="cafe-card-status">검색 중...</p>}
            {!loading && result.error && <p className="cafe-card-status">검색에 실패했어요. 잠시 후 다시 시도해 주세요.</p>}
            {!loading && !result.error && searchQuery && cafes.length === 0 && <p className="cafe-card-status">검색 결과가 없어요.</p>}
            {cafes.map((cafe) => <CafeCard key={cafe.id} cafe={cafe} />)}

            <div className="cafe_moreCoffee">
                <p id="p-moreCoffee">대표 커피 보러가기</p>
                <Cafe_Slider coffees={moreCoffee} />
            </div>


            <Footer />
        </div>
    )
}

export default Cafe_Details