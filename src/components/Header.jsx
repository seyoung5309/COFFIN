import { useState } from "react";
import "../styles/Header.css";
import { Link, useNavigate, useLocation } from "react-router-dom";
import logo from "../assets/COFFIN_logo.svg";
import Search_icon from "../assets/Search_icon.svg";
import profile from "../assets/profile.svg";

function Header() {
  const [query, setQuery] = useState("");
  const navigate = useNavigate();
  const location = useLocation();
  const activeMenuPath =
    location.pathname === "/cafe-details" && new URLSearchParams(location.search).has("q")
      ? "/caffeine-chart"
      : location.pathname;

  const handleSearch = (e) => {
    e.preventDefault();
    const keyword = query.trim();
    if (!keyword) return;

    navigate(`/cafe-details?${new URLSearchParams({ q: keyword })}`);
    setQuery("");
  };

  const menus = [
    { name: "홈", path: "/" },
    { name: "지도", path: "/map" },
    { name: "프로모션", path: "/promotion" },
    { name: "카페인 차트", path: "/caffeine-chart" },
  ];

  return (
    <>
      <div className="green-bar"></div>

      <header className="Header">
        <div className="Header-left">
          <Link to="/">
            <img className="logo" src={logo} alt="logo" />
          </Link>

          <nav className="nav-links">
            {menus.map((menu) => (
              <Link
                key={menu.path}
                to={menu.path}
                className={activeMenuPath === menu.path ? "active" : ""}
              >
                {menu.name}
              </Link>
            ))}
          </nav>
        </div>

        <div className="Header-right">
          <form className="search-box" role="search" onSubmit={handleSearch}>
            <button type="submit" aria-label="커피 검색">
              <img src={Search_icon} alt="" />
            </button>

            <input
              type="search"
              aria-label="커피 검색어"
              placeholder="검색어를 입력하세요"
              value={query}
              onChange={(e) => setQuery(e.target.value)}
            />
          </form>

          <img className="profile" src={profile} alt="프로필" />
        </div>
      </header>
    </>
  );
}

export default Header;
