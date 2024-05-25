import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import "../../assets/styles/header/header.css";

export default function Header() {
  const [user, setUser] = useState("");
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [isMobile, setIsMobile] = useState(window.innerWidth <= 1000);

  const toggleMenu = () => {
    setIsMenuOpen(!isMenuOpen);
    console.log(isMenuOpen);
  };

  const handleResize = () => {
    setIsMobile(window.innerWidth <= 1000);
    if (window.innerWidth > 1000) {
      setIsMenuOpen(false);
    }
  };

  useEffect(()=>{
    window.addEventListener('resize', handleResize);
  },[]);

  useEffect(() => {
    const name = sessionStorage.getItem("userName");
    console.log(name);
    if (name) {
      setUser(name);
    }
  }, [user]);

  return (
    <header>
      <div>
        <h2>{user}</h2>
      </div>
      {isMobile && (
        <div className="menu__hamburger" >
          <h2 onClick={toggleMenu}>☰</h2>
        </div>
      )}
      {isMenuOpen && (
        <div className="links__responsive" onClick={toggleMenu}>
          <Link to="/popular">Popular</Link>
          <Link to="/toprated">Top Rated</Link>
          <Link to="/logout">Logout</Link>
        </div>
      )}

      <div className="links">
        <Link to="/popular">Popular</Link>
        <Link to="/toprated">Top Rated</Link>
        <Link to="/logout">Logout</Link>
      </div>
    </header>
  );
}
