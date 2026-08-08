import "../styles/About_Page.css";
import logo from "../assets/Logo.svg"
import coffee1 from "../assets/coffee1.svg"
import coffee2 from "../assets/coffee2.svg"
import coffee3 from "../assets/coffee3.svg"
function About_Page() {
  return(
    <>
    <section className="about-page">
      <div className="about-page__top">
        <img className="about-page__logo" src={logo} alt="COFFIN logo" />
        <p className="about-page__title">COFFIN</p>
        <p className="about-page__subtitle">더 건강하고 합리적인 카페인 선택을 위한 플랫폼</p>
      </div>

      <div className="about-page__hero">
        <div className="about-page__gallery" aria-hidden="true">
          <img className="about-page__image about-page__image--left" src={coffee1} alt="" />
          <img className="about-page__image about-page__image--center" src={coffee2} alt="" />
          <img className="about-page__image about-page__image--right" src={coffee3} alt="" />
        </div>

        <div className="about-page__card">
          <img className="about-page__card-logo" src={logo} alt="" aria-hidden="true" />
          <p className="about-page__card-title">C O F F I N</p>
          <p className="about-page__card-text">
            다양한 프랜차이즈 커피의 카페인 함량을 비교하고<br />
            실제 사용자 리뷰까지 한 곳에서 확인할 수 있습니다.
          </p>
        </div>

        <button className="about-page__button" type="button">
          더 알아보기 →
        </button>
      </div>
    </section>
      
    </>
  )
}
export default About_Page