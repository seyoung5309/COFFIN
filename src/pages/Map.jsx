import Header from "../components/Header";
import Map_Card from "../components/Map_Card";
import "../styles/Map.css";
import Search_icon from "../assets/Search_icon.svg";
import speaker from "../assets/speaker.svg";
import map_background from "../assets/map_result_back.svg";
import { useNavigate } from "react-router-dom";
import { useState } from "react";

function Map() {
    const [query, setQuery] = useState("");
    const [isOpen, setIsOpen] = useState(true);
    const navigate = useNavigate();

    const handleSearch = (e) => {
        if (e.key === "Enter" && query.trim()) {
            navigate("/cafe-details");
            setQuery("");
        }
    };

    const dummyList = [1, 2, 3, 4, 5, 6];

    return (
        <div className="map-page">
            <Header />
            <div className="map-body">
                {/* 좌측 검색 패널 */}
                <div className={`search-panel ${isOpen ? "" : "closed"}`}>
                    {/* 검색창 */}
                    <div className="search-box">
                        <img src={Search_icon} alt="검색" className="search-icon" />
                        <input
                            type="text"
                            placeholder="음료&카페 검색"
                            value={query}
                            onChange={(e) => setQuery(e.target.value)}
                            onKeyDown={handleSearch}
                        />
                    </div>

                    {/* 지역명 */}
                    <h3 className="result-place">관악구 신림동</h3>

                    {/* 할인/공지 배너 */}
                    <div className="sale-banner">
                        <img src={speaker} alt="스피커" className="speaker-icon" />
                        <span>[7월 한달 간] 텀브커피 우아한 할인 아메리카...</span>
                    </div>

                    {/* 스크롤 가능한 검색 결과 리스트 */}
                    <div className="search-result">
                        {dummyList.map((_, i) => (
                            <Map_Card
                                key={i}
                                pic={map_background}
                                name="성수동 대림창고 갤러리"
                                place="서울특별시 성동구 성수이로 78"
                                review="리뷰 5,000"
                                meter="1.4km"
                            />
                        ))}
                    </div>

                    {/* 패널 경계선의 슬라이드 핸들 버튼 */}
                    <button className="panel-handle" onClick={() => setIsOpen(!isOpen)}>
                        <div className="handle-bar"></div>
                    </button>
                </div>

                {/* 지도 영역 */}
                <div className="map-container">
                    {/* 네이버 지도 API 영역 */}
                </div>
            </div>
        </div>
    );
}

export default Map;