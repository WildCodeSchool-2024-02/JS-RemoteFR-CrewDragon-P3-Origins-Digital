// Import des images
import { Link } from "react-router-dom";
import LOGO from "../assets/images/origindigital.svg";

function Footer() {
  return (
    <footer className="footer-container">
      <div className="logo-text-container">
        <p className="text-footer">
          CONÇUE POUR VOUS <br /> Découvrez notre solution d'hébergement vidéo
        </p>
        <div className="responsive-container">
          <p className="text-footer1">
            Nous espérons que vous apprécierez votre expérience sur Origin
            Digital et que notre site deviendra votre destination de choix pour
            la découverte de vidéos de qualité sur YouTube. Bon visionnage !
          </p>
          <img className="logo-footer" src={LOGO} alt="logo origin digital" />
        </div>
        <div className="footer-nav-container">
          <div className="nav-container">
            <p className="footer-nav">Mentions légales</p>
            <p className="footer-nav">Conditions d'utilisation</p>
            <p className="footer-nav">
              <Link className="linkContact" to="/Contact">
                Nous Contacter{" "}
              </Link>
            </p>
            <p className="footer-nav">© 2024 Origin Digital, inc</p>
          </div>
          <div className="credits-container">
            <p className="team-credits">Crédits :</p>
            <p className="team-credits">Sacha Darras</p>
            <p className="team-credits">Aurélien Chetot</p>
            <p className="team-credits">Jeviraj Jeyaratnam</p>
            <p className="team-credits">Franck Herpoux</p>
          </div>
        </div>
      </div>
    </footer>
  );
}

export default Footer;
