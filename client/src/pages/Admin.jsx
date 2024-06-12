// import { useEffect } from "react";
import { useState } from "react";
import { Link } from "react-router-dom";

import YouTube from "react-youtube";

// Import data
import AdminHomePage from "../Data/AdminPageData";

// Import des SVG
import OPENMENU from "../assets/images/svg-admin/openmenu.svg";
import CROSSADMIN from "../assets/images/svg-admin/crossadmin.svg";
import FOLDER from "../assets/images/svg-admin/folder.svg";
import MODIFY from "../assets/images/svg-admin/pen.svg";
import BIN from "../assets/images/svg-admin/bin.svg";

function Admin() {
  const [menuOpen, setMenuOpen] = useState(false);

  const toggleMenu = () => {
    setMenuOpen(!menuOpen);
  };
  // useEffect(() => {
  //   window.scrollBy({
  //     top: window.innerHeight,
  //     behavior: "smooth",
  //   });
  // }, []);

  return (
    <body>
      <div className="container-admin-action">
        <button type="button" id="openBtn" onClick={toggleMenu}>
          <img className="logo-arrow" src={OPENMENU} alt="menu burger" />{" "}
        </button>
        <div className="svg-folder-container">
          <img className="svg-folder" src={FOLDER} alt="svg-fichier" />
          <p className="text-admin">ajouter</p>
        </div>
        <div className="svg-modify-container">
          <img className="svg-modify" src={MODIFY} alt="svg-modify" />
          <p className="text-admin">modifier</p>
        </div>
        <div className="svg-bin-container">
          <img className="svg-bin" src={BIN} alt="svg-bin" />
          <p className="text-admin">supprimer</p>
        </div>
      </div>
      <div className="admin-container">
        <div className={menuOpen ? "sideadmin active" : "sideadmin"}>
          <button type="button" className="close" onClick={toggleMenu}>
            <img className="cross-admin" src={CROSSADMIN} alt="fermer" />
          </button>
          <ul>
            <h2>
              Bienvenue <br />
              <span className="admin-color">Admin</span>
            </h2>
            <Link className="admin-link" to="/">
              Accueil
            </Link>
            <Link className="admin-link" to="/Categories">
              Catégories
            </Link>
            <Link className="admin-link" to="/SousCategories">
              Sous-Catégories
            </Link>
            <Link className="admin-link" to="/Contenue">
              Contenue
            </Link>
            <Link className="admin-link" to="/Login">
              Déconnexion
            </Link>
          </ul>
        </div>
        <div className="container-video-information-responsive">
          <div className="grid-date-category">
            <div className="flex-checkbox">
              <p>Vidéos séléctionnées</p>
              <input className="checkbox-style1" type="checkbox" />
            </div>
            <span className="container-align-text">
              <p>Catégorie</p>
            </span>
            <p>Date</p>
          </div>
          <div className="container-admin-videos">
            {AdminHomePage.map((video) => (
              <div key={video.id} className="">
                <div className="player-wrapper-admin">
                  <div className="video-checkbox-container">
                    <div className="video-date-categorie-container">
                      <YouTube
                        className="player-admin"
                        videoId={video.url1.split("v=")[1]}
                        opts={{
                          height: "120",
                          width: "150",
                        }}
                      />
                      <p>{video.categorie}</p>
                      <p>{video.date}</p>
                    </div>
                    <input className="checkbox-style" type="checkbox" />
                  </div>
                  <div className="title-text-container">
                    <h3 className="title-admin">Titre :</h3>
                    <p className="text-admin">{video.title}</p>
                    <h4 className="title-admin">Description :</h4>
                    <p className="text-admin">{video.description}</p>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </body>
  );
}

export default Admin;
