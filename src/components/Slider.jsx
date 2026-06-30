import { Swiper, SwiperSlide } from "swiper/react";
import { Navigation, Pagination, Autoplay } from "swiper/modules";

import "swiper/css";
import "swiper/css/navigation";
import "swiper/css/pagination";

import "../styles/Slider.css";

import banner1 from "../assets/Banner_img.svg";
import banner2 from "../assets/Banner_img.svg";
import banner3 from "../assets/Banner_img.svg";

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
        <SwiperSlide>
          <img src={banner1} alt="banner1" />
        </SwiperSlide>

        <SwiperSlide>
          <img src={banner2} alt="banner2" />
        </SwiperSlide>

        <SwiperSlide>
          <img src={banner3} alt="banner3" />
        </SwiperSlide>
      </Swiper>
    </section>
  );
}

export default Slider;