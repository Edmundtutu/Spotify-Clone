import { Link } from "react-router-dom";
import "../css/navbar.css";
const NavBar = () => {
    const toggleNav = () => {
        const navBar = document.querySelector(".navBar");
        navBar?.classList.toggle("navBar-open");
    };
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
      </div>
    <button className="navBar-toggle" onClick={toggleNav}>
      <span>.</span>
      <span>.</span>
      <span>.</span>
    </button>
    </div>
  );
};

export default NavBar;
