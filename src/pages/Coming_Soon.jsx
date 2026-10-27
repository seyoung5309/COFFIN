import { Link } from "react-router-dom";
import "../styles/Coming_Soon.css";
import Header from "../components/Header";
import Footer from "../components/Footer";

// 아직 만들지 않은 페이지와 없는 주소(404)에 보여주는 임시 화면
function Coming_Soon({ title = "준비 중인 페이지예요", desc = "조금만 기다려 주세요." }) {
  return (
    <>
      <Header />
      <section className="coming-soon">
        <h2 className="coming-soon__title">{title}</h2>
        <p className="coming-soon__desc">{desc}</p>
        <Link to="/" className="coming-soon__button">홈으로 →</Link>
      </section>
      <Footer />
    </>
  );
}

export default Coming_Soon;
