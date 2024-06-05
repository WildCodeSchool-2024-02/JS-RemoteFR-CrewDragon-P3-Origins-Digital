// Import react
import { useState } from "react";

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
          <li>Accueil</li>
          <li>Catégories</li>
          <li>Sous-Catégories</li>
          <li>Admin</li>
          <li>pourquoi pas s'abonner ?</li>
          <li>se connecter</li>
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
