import "../styles/Footer.css";
import logo from '../assets/COFFIN_logo_Black.svg';
import instagram from '../assets/Instagram_logo.svg';
import naver from '../assets/Naver_logo.svg';
import kakao from '../assets/KakaoTalk_logo.svg';
function Footer() {
  return (
    <div className="footer">
      <div className="footer-top">
        <div className="footer-title">
          <img src={logo} alt="COFFIN Logo" />
          <p>더 건강하고 합리적인 커피 선택을 위한 플랫폼</p>
        </div>
        <div className="footer-links">
          <a href="https://www.instagram.com" target="_blank" rel="noopener noreferrer">
            <img src={instagram} alt="Instagram" />
          </a>
          <a href="https://www.naver.com" target="_blank" rel="noopener noreferrer">
            <img src={naver} alt="Naver" />
          </a>
          <a href="https://www.kakaocorp.com" target="_blank" rel="noopener noreferrer">
            <img src={kakao} alt="KakaoTalk" />
          </a>
        </div>
      </div>

      <div className="footer-sections">
        <div className="footer-left-section">
          <h4>어바웃 커핀</h4>
          <a href="/">웹 소개</a>
          <a href="/">비즈니스 소개</a>
          <a href="/">지속 가능성</a>
          <a href="/">뉴스룸</a>
          <a href="/">채용 정보</a>
        </div>
        <div className="footer-left-section">
          <h4>서비스</h4>
          <a href="/">홈</a>
          <a href="/">지도</a>
          <a href="/">프로모션</a>
          <a href="/">카페인 차트</a>
        </div>
        <div className="footer-left-section">
          <h4>파트너 지원</h4>
          <a href="/">입점 문의</a>
          <a href="/">광고/제휴 문의</a>
          <a href="/">협찬 문의</a>
          <a href="/">이미지/저작권 문의</a>
        </div>
        <div className="footer-left-section">
          <h4>고객 지원</h4>
          <a href="/">1:1 문의하기</a>
          <a href="/">FAQ 자주 묻는 질문</a>
          <a href="/">안전 거래 센터</a>
        </div>
      

        <div className="footer-right">
          <div className="footer-right-section">
            <h4>Address</h4>
            <p>서울특별시 관악구 호암로 546, 3층</p>
          </div>
          <div className="footer-right-section">
            <h4>Customer Center</h4>
            <p>고객센터 : 1577-6767</p>
          </div>
          <div className="footer-right-section">
            <p>(주) 커핀 | 대표 홍길동 | 사업자등록번호 676-67-67676</p>
            <p>이메일 coffin@coffin.com</p>
          </div>
        </div>
      </div>
      <p className="footer-copy">© Coffin | Better Coffee, Better Choice</p>
    </div>
  )
}

export default Footer