import { Link } from "react-router-dom";
import "../css/navbar.css";
import { useEffect } from "react";

const NavBar = () => {
  const toggleNav = () => {
    const navLinks = document.querySelector(".navBar-nav");
    const navToggle = document.querySelector(".navBar-toggle");
    const backdrop = document.querySelector(".navBar-backdrop");
    
    navLinks?.classList.toggle("show");
    navToggle?.classList.toggle("toggle-active");
    backdrop?.classList.toggle("show");
  };

  const closeNav = () => {
    const navLinks = document.querySelector(".navBar-nav");
    const navToggle = document.querySelector(".navBar-toggle");
    const backdrop = document.querySelector(".navBar-backdrop");
    
    navLinks?.classList.remove("show");
    navToggle?.classList.remove("toggle-active");
    backdrop?.classList.remove("show");
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

  // Close mobile menu when clicking outside
  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      const navBar = document.querySelector(".navBar");
      const navLinks = document.querySelector(".navBar-nav");
      
      if (navBar && navLinks && navLinks.classList.contains("show")) {
        const target = event.target as Element;
        if (!navBar.contains(target)) {
          closeNav();
        }
      }
    };

    document.addEventListener("click", handleClickOutside);
    return () => {
      document.removeEventListener("click", handleClickOutside);
    };
  }, []);

  // Close mobile menu when navigating
  const handleNavLinkClick = () => {
    closeNav();
  };

  return (
    <>
      <div className="navBar-backdrop" onClick={closeNav}></div>
      <div className="navBar">
        <div className="navBar-brand">
          <Link to="/">
            <img src="/logo.svg" alt="Yo Spotify" className="navBar-logo" />
          </Link>
          <h2 className="navBar-heading">Hello User</h2>
        </div>
        <div className="navBar-nav">
          <Link to="/" className="nav-link" onClick={handleNavLinkClick}>
            Home
          </Link>
          <Link to="/liked" className="nav-link" onClick={handleNavLinkClick}>
            Liked Songs
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
    </>
  );
};

export default NavBar;
