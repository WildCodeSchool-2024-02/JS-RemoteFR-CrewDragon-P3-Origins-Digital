// Import react

import { useState, useEffect } from "react";
import { useLoaderData, Link } from "react-router-dom";
import YouTube from "react-youtube";
import axios from "axios";
import toast, { Toaster } from "react-hot-toast";
// Import des SVG
import OPENMENU from "../assets/images/svg-admin/openmenu.svg";
import CROSSADMIN from "../assets/images/svg-admin/crossadmin.svg";
import FOLDER from "../assets/images/svg-admin/folder.svg";
import MODIFY from "../assets/images/svg-admin/pen.svg";
import BIN from "../assets/images/svg-admin/bin.svg";

function Admin() {
  // Message de Toastify Ajoutée
  const notifyAdd = () => toast("La vidéo à bien été ajoutée");

  // Message de Toastify Delete
  const notifyDelete = () => toast("La vidéo à bien été supprimée");

  // useState Popup pour ajouter une vidéo
  const [isPopupAddOpen, setIsPopupAddOpen] = useState(false);

  const { videos, categories, souscats } = useLoaderData();

  const [videoAdmin, setVideoAdmin] = useState(videos);

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
  };

  // Fonction pour supprimer les vidéos sélectionnées
  const handleDeleteVideos = async () => {
    try {
      // Utilisation de Promise.all pour supprimer
      await Promise.all(
        selectedVideos.map((id) => {
          axios.delete(`http://localhost:3310/api/videos/${id}`);
          // ici, je vais supprimer ma vidéo de mon tableau de vidéo
          return setVideoAdmin(
            videos.filter((video) => !selectedVideos.includes(video.id))
          );
        })
      );

      console.info("Vidéos supprimées avec succès !");
    } catch (error) {
      console.error("Erreur lors de la suppression des vidéos :", error);
    }
  };

  // Fonction pour ajouter une vidéos et la mettre a jour sur le front
  const handleAddVideos = async (e) => {
    e.preventDefault();
    const form = e.target;

    const formData = new FormData(form);

    const formJson = Object.fromEntries(formData.entries());

    await axios.post(`http://localhost:3310/api/videos/`, formJson);
    const response = await axios.get("http://localhost:3310/api/videos");
    setVideoAdmin(response.data);
    notifyAdd();
    setIsPopupAddOpen(false);
  };
  useEffect(() => {
    window.scrollBy({
      top: window.innerHeight,
      behavior: "smooth",
    });
  }, []);

  return (
    <div>
      <div className="container-admin-action">
        <button type="button" id="openBtn" onClick={toggleMenu}>
          <img className="logo-arrow" src={OPENMENU} alt="menu burger" />{" "}
        </button>
        <div className="svg-folder-container">
          <button
            className="button-admin"
            type="button"
            onClick={() => setIsPopupAddOpen(true)}
          >
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
          <button
            className="button-admin"
            type="button"
            onClick={() => {
              handleDeleteVideos();
              notifyDelete();
            }}
          >
            <img className="svg-bin" src={BIN} alt="svg-bin" />
            <p className="text-admin">supprimer</p>{" "}
          </button>
          <Toaster />
        </div>
      </div>
      {isPopupAddOpen && (
        <div className="popup-add">
          <div className="button-position">
            <button type="button" onClick={() => setIsPopupAddOpen(false)}>
              ❌
            </button>
          </div>
          <h2>Ajouter une nouvelle vidéo</h2>
          <form method="post" onSubmit={handleAddVideos}>
            <div className="popup-position">
              <label htmlFor="title">Titre</label>
              <input type="text" id="title" name="title" required />
            </div>
            <div className="popup-position">
              <label htmlFor="description">Description</label>
              <textarea id="description" name="description" required />
            </div>
            <div className="popup-position">
              <label htmlFor="url">URL</label>
              <input type="text" id="url" name="url" required />
            </div>
            <div className="popup-position">
              <label htmlFor="date">Date</label>
              <input type="text" id="date" name="date" required />
            </div>
            <div className="popup-position">
              <label>
                <input type="checkbox" name="grille" />
                Grille
              </label>
            </div>
            <div className="popup-position">
              <label>
                <input type="checkbox" name="hero" />
                Hero
              </label>
            </div>
            <div className="popup-position">
              <label>
                <input type="checkbox" name="carouStatique" />
                Carrousel Statique
              </label>
            </div>
            <div className="popup-position">
              <label>
                <input type="checkbox" name="carouDynamique" />
                Carrousel Dynamique
              </label>
            </div>
            <div className="popup-position">
              <label>
                <input type="checkbox" name="freemium" />
                Freemium
              </label>
            </div>
            <div className="popup-position">
              <label htmlFor="miniature">Miniature</label>
              <input type="text" id="miniature" name="miniature" required />
            </div>
            <label htmlFor="categories_id"> Choisissez une catégorie :</label>{" "}
            <br />
            <select name="categories_id" id="categories">
              {categories.map((categorie) => (
                <option key={categorie.id} value={categorie.id}>
                  {categorie.name}
                </option>
              ))}
              ;
            </select>{" "}
            <br />
            <label htmlFor="souscats_id">
              {" "}
              Choisissez une sous-catégorie :
            </label>{" "}
            <br />
            <select name="souscats_id" id="souscats">
              {souscats.map((souscat) => (
                <option key={souscat.id} value={souscat.id}>
                  {souscat.name}
                </option>
              ))}
              ;
            </select>{" "}
            <br />
            <button type="submit">Ajouter</button>
            <Toaster />
          </form>
        </div>
      )}
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
              <p>Catégorie / Sous-Catégorie</p>
            </span>
            <p>Date</p>
          </div>
          <div className="container-admin-videos">
            {videoAdmin &&
              videoAdmin.map((video) => (
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
                        <p>
                          {video.categories.name} /{video.souscats.name}
                        </p>
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
    </div>
  );
}

export default Admin;
