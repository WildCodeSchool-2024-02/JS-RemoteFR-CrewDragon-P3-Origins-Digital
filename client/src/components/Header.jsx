import HeroSlider, { Overlay, Slide, MenuNav } from "hero-slider";
import { useState, useEffect, useContext } from "react";
import { Link, useNavigate } from "react-router-dom";
import { AuthContext } from "../contexte/AuthContext";

import LOGO from "../assets/images/origindigital.svg";
import MENU from "../assets/images/images-header/menu.svg";
import CROSS from "../assets/images/images-header/cross.svg";
import videoMenuBurger from "../assets/images/images-header/videoMenuBurger.mov";
import videohomepage from "../assets/images/images-header/videohomepage.mp4";
import videohomepage1 from "../assets/images/images-header/videohomepage1.mp4";
import videohomepage2 from "../assets/images/images-header/videohomepage2.mp4";
import videohomepage3 from "../assets/images/images-header/videohomepage3.mp4";
import videohomepage4 from "../assets/images/images-header/videohomepage4.mp4";
import videohomepage5 from "../assets/images/images-header/videohomepage5.mp4";

function Header() {
  const [menuOpen, setMenuOpen] = useState(false);
  const [theme, setTheme] = useState("light");
  const navigate = useNavigate();
  const { isAuthenticated, isAdmin, logout } = useContext(AuthContext);

  const toggleMenu = () => {
    setMenuOpen(!menuOpen);
  };

  const toggleTheme = () => {
    setTheme(theme === "light" ? "dark" : "light");
  };

  useEffect(() => {
    document.body.className = theme;
  }, [theme]);

  const goToProfile = () => {
    if (isAuthenticated) {
      const token = localStorage.getItem("token");
      try {
        const decodedToken = JSON.parse(atob(token.split(".")[1]));
        const { userId } = decodedToken;
        navigate(`/profil/${userId}`);
      } catch (error) {
        console.error("Erreur lors du décodage du token :", error);
      }
    }
  };

  useEffect(() => {}, [isAuthenticated, isAdmin]);

  return (
    <div className="header">
      <div className="filter-video" />
      <HeroSlider
        height={0}
        controller={{
          initialSlide: 1,
          slidingDuration: 0,
          slidingDelay: 0,
        }}
      >
        {/* Slide 1 */}
        <Slide>
          <Overlay>
            <div className="text-hero-slider">
              <h1>
                Héberger vos <span className="span-decoration">Vidéos</span>
              </h1>
              <p>
                Partagez vos moments précieux en toute simplicité. Notre
                plateforme sécurisée vous offre une expérience de diffusion sans
                compromis.
              </p>
            </div>
          </Overlay>
          <video className="video-header" autoPlay muted loop>
            <source src={videohomepage1} type="video/mp4" />
          </video>
        </Slide>

        {/* Slide 2 */}
        <Slide>
          <Overlay>
            <div className="text-hero-slider">
              <h1>
                Retrouvez le meilleur du{" "}
                <span className="span-decoration">Sport</span>
              </h1>
              <p>
                Afin de suivre vos vidéos favorites de divers sports disponibles
                sur notre plateforme
              </p>
            </div>
          </Overlay>
          <video className="video-header" autoPlay muted loop>
            <source src={videohomepage} type="video/mp4" />
          </video>
        </Slide>

        {/* Slide 3 */}
        <Slide>
          <Overlay>
            <div className="text-hero-slider">
              <h1>
                Retrouvez les{" "}
                <span className="span-decoration">Actualités</span>
              </h1>
              <p>
                Afin de suivre vos vidéos favorites de divers sports disponibles
                sur notre plateforme
              </p>
            </div>
          </Overlay>
          <video className="video-header" autoPlay muted loop>
            <source src={videohomepage3} type="video/mp4" />
          </video>
        </Slide>

        {/* Slide 4 */}
        <Slide>
          <Overlay>
            <div className="text-hero-slider">
              <h1>
                Retrouvez la scène compétitive{" "}
                <span className="span-decoration">E-Sport</span>
              </h1>
              <p>Vous trouverez des vidéos E-Sport de tout genre</p>
            </div>
          </Overlay>
          <video className="video-header" autoPlay muted loop>
            <source src={videohomepage2} type="video/mp4" />
          </video>
        </Slide>

        {/* Slide 5 */}
        <Slide>
          <Overlay>
            <div className="text-hero-slider">
              <h1>
                Retrouvez du contenu pour{" "}
                <span className="span-decoration">Juniors</span>
              </h1>
              <p>
                Nos vidéos sont soigneusement sélectionnées pour garantir une
                expérience sûre et enrichissante pour les plus jeunes.
              </p>
            </div>
          </Overlay>
          <video className="video-header" autoPlay muted loop>
            <source src={videohomepage4} type="video/mp4" />
          </video>
        </Slide>

        {/* Slide 6 */}
        <Slide>
          <Overlay>
            <div className="text-hero-slider">
              <h1>
                Retrouvez la catégorie{" "}
                <span className="span-decoration">Informatique</span>
              </h1>
              <p>
                Découvrez des vidéos amusantes et éducatives sur la
                programmation et les technologies modernes dans un environnement
                sûr.
              </p>
            </div>
          </Overlay>
          <video className="video-header" autoPlay muted loop>
            <source src={videohomepage5} type="video/mp4" />
          </video>
        </Slide>

        <MenuNav />
      </HeroSlider>

      <img className="logo" src={LOGO} alt="logo" />

      <div className="theme">
        <button type="button" onClick={toggleTheme}>
          Changer de thème
        </button>
      </div>

      <div className={menuOpen ? "sidenav active" : "sidenav"}>
        <video autoPlay muted loop className="background-video">
          <source src={videoMenuBurger} type="video/mp4" />
        </video>
        <button type="button" className="close" onClick={toggleMenu}>
          <img className="logo-cross" src={CROSS} alt="fermer" />
        </button>

        <ul>
          <li>
            <Link className="glitch" data-glitch="Accueil" to="/">
              Accueil
            </Link>
          </li>
          <li>
            <Link className="glitch" data-glitch="Catégories" to="/categories">
              Catégories
            </Link>
          </li>
          <li>
            <Link className="glitch" data-glitch="Contenue" to="/contenue">
              Contenu
            </Link>
          </li>
          {isAdmin() && (
            <li>
              <Link className="glitch" data-glitch="Admin" to="/admin">
                Admin
              </Link>
            </li>
          )}
          <li>
            <Link
              className="glitch"
              data-glitch="pourquoi pas s'abonner ?"
              to="/abo"
            >
              Pourquoi s'abonner ?
            </Link>
          </li>
          {isAuthenticated ? (
            <>
              <li>
                <button
                  className="button-profil"
                  type="button"
                  onClick={goToProfile}
                >
                  Mon Profil
                </button>
              </li>
              <li>
                <button
                  className="button-profil"
                  type="button"
                  onClick={logout}
                >
                  Déconnexion
                </button>
              </li>
            </>
          ) : (
            <li>
              <Link className="glitch" data-glitch="se connecter" to="/login">
                Se connecter
              </Link>
            </li>
          )}
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
