import { Link } from "react-router-dom";
import { Swiper, SwiperSlide } from "swiper/react";
import { Navigation, Pagination, Autoplay } from "swiper/modules";

import "swiper/css";
import "swiper/css/navigation";
import "swiper/css/pagination";

import "../styles/Slider.css";

import banner1 from "../assets/Banner_img.svg";
import banner2 from "../assets/Banner_img.svg";
import banner3 from "../assets/Banner_img.svg";

// 배너를 누르면 link로 이동한다.
const banners = [
  { img: banner1, alt: "프로모션 바로가기", link: "/promotion" },
  { img: banner2, alt: "지도 바로가기", link: "/map" },
  { img: banner3, alt: "카페인 차트 바로가기", link: "/caffeine-chart" },
];

function Slider() {
  return (
    <section className="hero-slider">
      <Swiper
        modules={[Navigation, Pagination, Autoplay]}
        navigation
        pagination={{ clickable: true }}
        autoplay={{
          delay: 3000,
          disableOnInteraction: false,
        }}
        loop
      >
        {banners.map((banner) => (
          <SwiperSlide key={banner.link}>
            <Link to={banner.link}>
              <img src={banner.img} alt={banner.alt} />
            </Link>
          </SwiperSlide>
        ))}
      </Swiper>
    </section>
  );
}

export default Slider;