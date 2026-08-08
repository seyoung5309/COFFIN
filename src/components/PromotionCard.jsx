import '../styles/PromotionCard.css';
import dimg from "../assets/coffeeData.svg"
export default function PromotionCard({
  imageSrc = dimg, // 임시 이미지
  title = "[7월 한달 간] 텀브커피 우아한 할인 아메리카노 1500원",
  brand = "텀브커피"
}) {
  return (
    <article className="promotion-card">
      {/* 1. 상단 이미지 영역 */}
      <div className="promotion-card__image-wrapper">
        <img src={imageSrc} alt={title} className="promotion-card__image" />
      </div>

      {/* 2. 하단 텍스트 영역 */}
      <div className="promotion-card__content">
        <h3 className="promotion-card__title">{title}</h3>
        <span className="promotion-card__brand">{brand}</span>
      </div>
    </article>
  );
}