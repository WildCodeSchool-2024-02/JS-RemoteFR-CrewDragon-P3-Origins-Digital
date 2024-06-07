// Import react
import HeroSlider, { Overlay, Slide, MenuNav } from "hero-slider";
import { useState } from "react";
import { Link } from "react-router-dom";

// Import des images
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

  const toggleMenu = () => {
    setMenuOpen(!menuOpen);
  };

  return (
    <div className="header">
      <div className="filter-video" />
      <HeroSlider
        height={0}
        // autoplay
        controller={{
          initialSlide: 1,
          slidingDuration: 0,
          slidingDelay: 0,
          onSliding: (nextSlide) =>
            console.info("onSliding(nextSlide): ", nextSlide),
          onBeforeSliding: (previousSlide, nextSlide) =>
            console.info(
              "onBeforeSliding(previousSlide, nextSlide): ",
              previousSlide,
              nextSlide
            ),
          onAfterSliding: (nextSlide) =>
            console.info("onAfterSliding(nextSlide): ", nextSlide),
        }}
      >
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
        <Slide>
          <Overlay>
            <div className="text-hero-slider">
              <h1>
                Retrouvez les{" "}
                <span className="span-decoration">Actualitées</span>
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
        <Slide>
          <Overlay>
            <div className="text-hero-slider">
              <h1>
                Retrouvez du contenu pour{" "}
                <span className="span-decoration">Jeune âge</span>
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
      <div className={menuOpen ? "sidenav active" : "sidenav"}>
        <video autoPlay muted loop className="background-video">
          <source src={videoMenuBurger} type="video/mp4" />
        </video>
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
