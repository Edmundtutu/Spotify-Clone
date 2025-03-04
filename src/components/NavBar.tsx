import { Link } from "react-router-dom";
import "../css/navbar.css";
import { useEffect } from "react";

const NavBar = () => {
  const toggleNav = () => {
    const navLinks = document.querySelector(".navBar-nav");
    const navToggle = document.querySelector(".navBar-toggle");
    navLinks?.classList.toggle("show");
    navToggle?.classList.toggle("toggle-active");
  };

  // Add offset to main content when navbar is fixed
  useEffect(() => {
    const navbar = document.querySelector(".navBar");
    const mainContent = document.querySelector("main");
    
    if (navbar && mainContent) {
      const navbarHeight = navbar.clientHeight;
      mainContent.style.marginTop = `${navbarHeight}px`;
    }
    
    return () => {
      if (mainContent) {
        mainContent.style.marginTop = '0';
      }
    };
  }, []);

  return (
    <div className="navBar">
      <div className="navBar-brand">
        <Link to="/">
          <img src="/logo.svg" alt="Yo Spotify" className="navBar-logo" />
        </Link>
        <h2 className="navBar-heading">Hello User</h2>
      </div>
      <div className="navBar-nav">
        <Link to="/" className="nav-link">
          Home
        </Link>
        <Link to="/liked" className="nav-link">
          Liked Songs
        </Link>
        <Link to='/list' className="nav-link">
          Test List 
        </Link>
        <div className="search-container">
          <input 
            type="text" 
            placeholder="Search..." 
            className="search-input" 
          />
          <button className="search-button">
            <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" viewBox="0 0 16 16">
              <path d="M11.742 10.344a6.5 6.5 0 1 0-1.397 1.398h-.001c.03.04.062.078.098.115l3.85 3.85a1 1 0 0 0 1.415-1.414l-3.85-3.85a1.007 1.007 0 0 0-.115-.1zM12 6.5a5.5 5.5 0 1 1-11 0 5.5 5.5 0 0 1 11 0z"/>
            </svg>
          </button>
        </div>
      </div>
      <button className="navBar-toggle" onClick={toggleNav}>
        <span></span>
        <span></span>
        <span></span>
      </button>
    </div>
  );
};

export default NavBar;
