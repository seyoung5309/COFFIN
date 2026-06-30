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

  const handleSearch = (e) => {
    if (e.key === "Enter" && query.trim()) {
      navigate(`/caffeine-chart?q=${encodeURIComponent(query.trim())}`);
      setQuery("");
    }
  };

  const menus = [
    { name: "홈", path: "/" },
    { name: "지도", path: "/map-page" },
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
                className={location.pathname === menu.path ? "active" : ""}
              >
                {menu.name}
              </Link>
            ))}
          </nav>
        </div>

        <div className="Header-right">
          <div className="search-box">
            <img src={Search_icon} alt="검색" />

            <input
              type="text"
              placeholder="검색어를 입력하세요"
              value={query}
              onChange={(e) => setQuery(e.target.value)}
              onKeyDown={handleSearch}
            />
          </div>

          <img className="profile" src={profile} alt="프로필" />
        </div>
      </header>
    </>
  );
}

export default Header;