import "../styles/Cafe_Details.css";
import Header from "../components/Header";
import Footer from "../components/Footer";
import Cafe_Slider from "../components/Cafe_Slider";
import mc1 from "../assets/MoreCoffee1.svg";
import mc2 from "../assets/MoreCoffee2.svg";

function ArrowButton() {
    return (
        <svg width="13" height="24" viewBox="0 0 24 40" fill="none">
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
                <ArrowButton/>
                <p id="searchResult"><span id="result">'0000'</span> 카페 검색 결과</p>
            </div>


            <div className="cafe_moreCoffee">
                <p id="p-moreCoffee">대표 커피 보러가기</p>
                <Cafe_Slider coffees={moreCoffee} />
            </div>


            <Footer />
        </div>
    )
}

export default Cafe_Details