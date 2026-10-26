import Header from "../components/Header";
import Map_Card from "../components/Map_Card";
import "../styles/Map.css";
import Search_icon from "../assets/Search_icon.svg";
import speaker from "../assets/speaker.svg";
import map_background from "../assets/map_result_back.svg";
import { useEffect, useRef, useState } from "react";
import { loadKakaoMap } from "../lib/kakaoMap";
import { searchCafes } from "../services/kakaoService";

function Map() {
    const [query, setQuery] = useState("");
    const [isOpen, setIsOpen] = useState(true);
    const [searched, setSearched] = useState("");
    const [cafes, setCafes] = useState([]);
    const [message, setMessage] = useState("카페를 검색해 보세요.");
    const [mapReady, setMapReady] = useState(false);
    const mapEl = useRef(null);
    const mapRef = useRef(null);

    // 지도 생성 (처음에는 한양대 ERICA 근처)
    useEffect(() => {
        let ignore = false;
        loadKakaoMap()
            .then((kakao) => {
                if (ignore) return;
                mapRef.current = new kakao.maps.Map(mapEl.current, {
                    center: new kakao.maps.LatLng(37.2966, 126.835),
                    level: 5,
                });
                setMapReady(true);
            })
            .catch((e) => {
                console.error(e);
                if (!ignore) setMessage("지도를 불러오지 못했어요.");
            });
        return () => { ignore = true; };
    }, []);

    // 검색 결과가 바뀌면 마커를 다시 그리고 결과가 다 보이게 지도를 맞춘다.
    useEffect(() => {
        if (!mapReady || cafes.length === 0) return;
        const { kakao } = window;
        const map = mapRef.current;
        const bounds = new kakao.maps.LatLngBounds();
        const markers = cafes.map((cafe) => {
            const position = new kakao.maps.LatLng(cafe.lat, cafe.lng);
            bounds.extend(position);
            return new kakao.maps.Marker({ map, position, title: cafe.name });
        });
        map.setBounds(bounds);
        return () => markers.forEach((m) => m.setMap(null));
    }, [cafes, mapReady]);

    const handleSearch = async (e) => {
        if (e.key !== "Enter" || !query.trim()) return;
        const keyword = query.trim();
        setSearched(keyword);
        setMessage("검색 중...");
        setCafes([]);
        try {
            const result = await searchCafes(keyword, 15);
            setCafes(result);
            setMessage(result.length === 0 ? "검색 결과가 없어요." : "");
        } catch (err) {
            console.error(err);
            setMessage("검색에 실패했어요. 잠시 후 다시 시도해 주세요.");
        }
    };

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
                    <h3 className="result-place">{searched ? `'${searched}' 검색 결과` : "카페 검색"}</h3>

                    {/* 할인/공지 배너 */}
                    <div className="sale-banner">
                        <img src={speaker} alt="스피커" className="speaker-icon" />
                        <span>[7월 한달 간] 텀브커피 우아한 할인 아메리카...</span>
                    </div>

                    {/* 스크롤 가능한 검색 결과 리스트 */}
                    <div className="search-result">
                        {message && <p>{message}</p>}
                        {cafes.map((cafe) => (
                            <Map_Card
                                key={cafe.id}
                                pic={map_background}
                                name={cafe.name}
                                place={cafe.address}
                                review={cafe.phone}
                                meter=""
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
                    <div ref={mapEl} style={{ width: "100%", height: "100%" }} />
                </div>
            </div>
        </div>
    );
}

export default Map;