import "../styles/DrinkCard.css";

function DrinkCard({ coffee, onClick }) {
  return (
    <div className="coffee-card" onClick={onClick}>
      <div className="coffee-card__image">
        <img src={coffee.img} alt={coffee.name} />
      </div>

      <div className="coffee-card__info">
        <p className="coffee-card__brand">{coffee.brand}</p>

        <h3 className="coffee-card__caffeine">
          카페인 함량 {coffee.caffeine} (mg)
        </h3>

        <div className="coffee-card__bottom">
          <span className="coffee-card__name">{coffee.name}</span>
          <span className="coffee-card__price">
            {coffee.price.toLocaleString()}원
          </span>
        </div>
      </div>
    </div>
  );
}

export default DrinkCard;