// Import react
import { useState } from "react";
import { Link } from "react-router-dom";

// Import des images
import LOGO from "../assets/images/origindigital.svg";
import MENU from "../assets/images/images-header/menu.svg";
import CROSS from "../assets/images/images-header/cross.svg";
import videoMenuBurger from "../assets/images/images-header/videoMenuBurger.mov";
import videohomepage from "../assets/images/images-header/videohomepage.mp4";

function Header() {
  const [menuOpen, setMenuOpen] = useState(false);

  const toggleMenu = () => {
    setMenuOpen(!menuOpen);
  };

  return (
    <div className="header">
      <div className="filter-video" />
      <video className="video-header" autoPlay muted loop>
        <source src={videohomepage} type="video/mp4" />
      </video>
      <img className="logo" src={LOGO} alt="logo" />
      <div className={menuOpen ? "sidenav active" : "sidenav"}>
        <video autoPlay muted loop className="background-video">
          <source src={videoMenuBurger} type="video/mp4" />
        </video>
        <button type="button" className="close" onClick={toggleMenu}>
          <img className="logo-cross" src={CROSS} alt="fermer" />
        </button>
        <ul>
          <Link to="/">Accueil</Link>
          <Link to="/Categories">Catégories</Link>
          <Link to="/SousCategories">Sous-Catégories</Link>
          <Link to="/Contenue">Contenue</Link>
          <Link to="/Admin">Admin</Link>
          <Link to="/error404">pourquoi pas s'abonner ?</Link>
          <Link to="/error404">se connecter</Link>
        </ul>
      </div>
      <button type="button" id="openBtn" onClick={toggleMenu}>
        <span className="burger-icon">
          <img className="logo-burger" src={MENU} alt="menu burger" />
        </span>
      </button>
    </div>
  );
}

export default Header;
