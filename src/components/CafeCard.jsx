import "../styles/CafeCard.css";

const Icon = ({ children }) => (
  <svg className="cafe-card-icon" width="18" height="18" viewBox="0 0 24 24" fill="none">
    {children}
  </svg>
);

function CafeCard({ cafe }) {
  const copyPhone = () => navigator.clipboard?.writeText(cafe.phone);

  return (
    <div className="cafe-card">
      <div className="cafe-card-image" />

      <div className="cafe-card-actions">
        <button type="button">
          <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="#666" strokeWidth="1.6" strokeLinejoin="round">
            <path d="M12 3l2.7 5.6 6.1.9-4.4 4.3 1 6.1L12 17l-5.4 2.9 1-6.1L3.2 9.5l6.1-.9z" />
          </svg>
          <span>리뷰</span>
        </button>
        <button type="button">
          <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="#666" strokeWidth="1.6" strokeLinecap="round">
            <path d="M5 8h14M5 12h14M5 16h14" />
          </svg>
          <span>메뉴</span>
        </button>
        <button type="button">
          <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="#666" strokeWidth="1.6" strokeLinejoin="round">
            <path d="M7 4h10v16l-5-4-5 4z" />
          </svg>
          <span>저장</span>
        </button>
      </div>

      <div className="cafe-card-info">
        <h3>{cafe.name}</h3>
        <p className="cafe-card-category">{cafe.category}</p>
        {/* 카카오 API는 별점/리뷰/영업시간/편의시설을 주지 않아 임시 값 */}
        <p className="cafe-card-rating">★ 4.8 방문자 리뷰 6,767,676</p>

        <ul>
          <li>
            <Icon><path d="M12 22s7-6.5 7-12a7 7 0 10-14 0c0 5.5 7 12 7 12z" fill="#aaa" /><circle cx="12" cy="10" r="2.5" fill="#fff" /></Icon>
            <span>{cafe.address}</span>
          </li>
          <li>
            <Icon><circle cx="12" cy="12" r="10" fill="#aaa" /><path d="M12 6v6l4 2" stroke="#fff" strokeWidth="2" strokeLinecap="round" /></Icon>
            <span>영업중 · 22:00에 영업종료</span>
          </li>
          {cafe.phone && (
            <li>
              <Icon><path d="M6 3l3 5-2 2c1.2 2.6 3.4 4.8 6 6l2-2 5 3-1 3c-9 1-17-7-16-16z" fill="#aaa" /></Icon>
              <span>{cafe.phone}</span>
              <button type="button" className="cafe-card-copy" onClick={copyPhone}>복사</button>
            </li>
          )}
          <li>
            <Icon><path d="M3 10l2-6h14l2 6v2H3zM5 14h14v6H5z" fill="#aaa" /></Icon>
            <span>포장, 무선 인터넷, 대기공간, 단체 이용 가능</span>
          </li>
        </ul>
      </div>
    </div>
  );
}

export default CafeCard;
