// Import react

import { useState, useEffect } from "react";
import { useLoaderData, Link, Form } from "react-router-dom";
import YouTube from "react-youtube";

// Import des SVG
import OPENMENU from "../assets/images/svg-admin/openmenu.svg";
import CROSSADMIN from "../assets/images/svg-admin/crossadmin.svg";
import FOLDER from "../assets/images/svg-admin/folder.svg";
import MODIFY from "../assets/images/svg-admin/pen.svg";
import BIN from "../assets/images/svg-admin/bin.svg";

function Admin() {
  const videos = useLoaderData();
  const [menuOpen, setMenuOpen] = useState(false);

  const [selectAll, setSelectAll] = useState(false);
  const [selectedVideos, setSelectedVideos] = useState([]);

  const toggleMenu = () => {
    setMenuOpen(!menuOpen);
  };

  // Handle pour selectionner toutes les checkbox
  const handleSelectAll = () => {
    setSelectAll(!selectAll);
    if (!selectAll) {
      setSelectedVideos(videos.map((video) => video.id));
    } else {
      setSelectedVideos([]);
    }
  };

  // Handle pour checkbox individuel
  const handleCheckboxChange = (id) => {
    if (selectedVideos.includes(id)) {
      setSelectedVideos(selectedVideos.filter((videoId) => videoId !== id));
    } else {
      setSelectedVideos([...selectedVideos, id]);
    }
    console.info(handleCheckboxChange);
  };

  useEffect(() => {
    window.scrollBy({
      top: window.innerHeight,
      behavior: "smooth",
    });
  }, []);

  return (
    <body>
      <div className="container-admin-action">
        <button type="button" id="openBtn" onClick={toggleMenu}>
          <img className="logo-arrow" src={OPENMENU} alt="menu burger" />{" "}
        </button>
        <div className="svg-folder-container">
          <button className="button-admin" type="button">
            <img className="svg-folder" src={FOLDER} alt="svg-fichier" />
            <p className="text-admin">ajouter</p>
          </button>
        </div>
        <div className="svg-modify-container">
          <button className="button-admin" type="button">
            <img className="svg-modify" src={MODIFY} alt="svg-modify" />
            <p className="text-admin">modifier</p>
          </button>
        </div>
        <div className="svg-bin-container">
          <Form method="delete">
            <button className="button-admin" type="button">
              <img className="svg-bin" src={BIN} alt="svg-bin" />
              <p className="text-admin">supprimer</p>{" "}
            </button>
          </Form>
        </div>
      </div>
      <h2>Ajouter une nouvelle vidéo</h2>
      <Form method="post">
        <div>
          <label htmlFor="title">Titre</label>
          <input type="text" id="title" name="title" required />
        </div>
        <div>
          <label htmlFor="description">Description</label>
          <textarea id="description" name="description" required />
        </div>
        <div>
          <label htmlFor="url">URL</label>
          <input type="text" id="url" name="url" required />
        </div>
        <div>
          <label htmlFor="date">Date</label>
          <input type="text" id="date" name="date" required />
        </div>
        <div>
          <label>
            <input type="checkbox" name="grille" />
            Grille
          </label>
        </div>
        <div>
          <label>
            <input type="checkbox" name="hero" />
            Hero
          </label>
        </div>
        <div>
          <label>
            <input type="checkbox" name="carouStatique" />
            Carrousel Statique
          </label>
        </div>
        <div>
          <label>
            <input type="checkbox" name="carouDynamique" />
            Carrousel Dynamique
          </label>
        </div>
        <div>
          <label>
            <input type="checkbox" name="freemium" />
            Freemium
          </label>
        </div>
        <div>
          <label htmlFor="miniature">Miniature</label>
          <input type="text" id="miniature" name="miniature" required />
        </div>
        <button type="submit">Ajouter</button>
      </Form>
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
              <p>Tout sélectionner</p>
              <input
                className="checkbox-style1"
                type="checkbox"
                checked={selectAll}
                onChange={handleSelectAll}
              />
            </div>
            <span className="container-align-text">
              <p>Catégorie</p>
            </span>
            <p>Date</p>
          </div>
          <div className="container-admin-videos">
            {videos.map((video) => (
              <div key={video.id}>
                <div className="player-wrapper-admin">
                  <div className="video-checkbox-container">
                    <div className="video-date-categorie-container">
                      <YouTube
                        className="player-admin"
                        videoId={video.url.split("v=")[1]}
                        opts={{
                          height: "120",
                          width: "150",
                        }}
                      />
                      <p>{video.categorie}</p>
                      <p>{video.date}</p>
                    </div>
                    <input
                      className="checkbox-style"
                      type="checkbox"
                      checked={selectedVideos.includes(video.id)}
                      onChange={() => handleCheckboxChange(video.id)}
                    />
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
