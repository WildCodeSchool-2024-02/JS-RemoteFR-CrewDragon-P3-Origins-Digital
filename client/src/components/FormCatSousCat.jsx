import { useState } from "react";
import { useLoaderData, Link } from "react-router-dom";
import axios from "axios";
import toast, { Toaster } from "react-hot-toast";
import OPENMENU from "../assets/images/svg-admin/openmenu.svg";
import CROSSADMIN from "../assets/images/svg-admin/crossadmin.svg";
import FOLDER from "../assets/images/svg-admin/folder.svg";
import MODIFY from "../assets/images/svg-admin/pen.svg";
import BIN from "../assets/images/svg-admin/bin.svg";

export default function FormCatSousCat() {
  const [isAddMode, setIsAddMode] = useState(true);
  const [isUpdateMode, setIsUpdateMode] = useState(false);
  const [isDeleteMode, setIsDeleteMode] = useState(false);
  const [categorieName, setCategorieName] = useState("");
  const [sousCategorieName, setSousCategorieName] = useState("");
  const [image, setImage] = useState("");
  const [categoriesId, setCategoriesId] = useState("");
  const [selectedCategorieId, setSelectedCategorieId] = useState("");
  const [selectedSousCatsId, setSelectedSousCatsId] = useState("");
  const [deleteCategorieId, setDeleteCategorieId] = useState("");
  const [deleteSousCatsId, setDeleteSousCatsId] = useState("");
  const [menuOpen, setMenuOpen] = useState(false);
  const { categories, souscats } = useLoaderData();

  const toggleMenu = () => {
    setMenuOpen(!menuOpen);
  };

  const handleAddCategorie = async (event) => {
    event.preventDefault();
    try {
      await axios.post(`${import.meta.env.VITE_API_URL}/api/categories`, {
        name: categorieName,
        image,
      });
      setCategorieName("");
      setImage("");
      setIsAddMode(false);
      toast.success("Catégorie ajoutée avec succès !");
    } catch (error) {
      console.error("Erreur lors de l'ajout de la catégorie:", error);
      toast.error("Erreur lors de l'ajout de la catégorie.");
    }
  };

  const handleAddSouscat = async (event) => {
    event.preventDefault();
    try {
      await axios.post(`${import.meta.env.VITE_API_URL}/api/souscats`, {
        name: sousCategorieName,
        categories_id: categoriesId,
      });
      setSousCategorieName("");
      setCategoriesId("");
      setIsAddMode(false);
      toast.success("Sous-catégorie ajoutée avec succès !");
    } catch (error) {
      console.error("Erreur lors de l'ajout de la sous-catégorie:", error);
      toast.error("Erreur lors de l'ajout de la sous-catégorie.");
    }
  };

  const handleUpdateCategorie = async (e) => {
    e.preventDefault();
    const formData = new FormData(e.target);
    const updates = {};
    formData.forEach((value, key) => {
      if (value) {
        updates[key] = value;
      }
    });
    try {
      await axios.put(
        `${import.meta.env.VITE_API_URL}/api/categories/${selectedCategorieId}`,
        updates
      );
      setSelectedCategorieId("");
      setIsUpdateMode(false);
      toast.success("Catégorie modifiée avec succès !");
    } catch (error) {
      console.error("Erreur lors de la modification de la catégorie:", error);
      toast.error("Erreur lors de la modification de la catégorie.");
    }
  };

  const handleUpdateSousCats = async (e) => {
    e.preventDefault();
    const formData = new FormData(e.target);
    const updates = {};
    formData.forEach((value, key) => {
      if (value) {
        updates[key] = value;
      }
    });
    try {
      await axios.put(
        `${import.meta.env.VITE_API_URL}/api/souscats/${selectedSousCatsId}`,
        updates
      );
      setSelectedSousCatsId("");
      setIsUpdateMode(false);
      toast.success("Sous-catégorie modifiée avec succès !");
    } catch (error) {
      console.error(
        "Erreur lors de la modification de la sous-catégorie:",
        error
      );
      toast.error("Erreur lors de la modification de la sous-catégorie.");
    }
  };

  const handleDeleteCategorie = async () => {
    try {
      await axios.delete(
        `${import.meta.env.VITE_API_URL}/api/categories/${deleteCategorieId}`
      );
      setDeleteCategorieId("");
      setIsDeleteMode(false);
      toast.success("Catégorie supprimée avec succès !");
    } catch (error) {
      console.error("Erreur lors de la suppression de la catégorie:", error);
      toast.error("Erreur lors de la suppression de la catégorie.");
    }
  };

  const handleDeleteSousCats = async () => {
    try {
      await axios.delete(
        `${import.meta.env.VITE_API_URL}/api/souscats/${deleteSousCatsId}`
      );
      setDeleteSousCatsId("");
      setIsDeleteMode(false);
      toast.success("Sous-catégorie supprimée avec succès !");
    } catch (error) {
      console.error(
        "Erreur lors de la suppression de la sous-catégorie:",
        error
      );
      toast.error("Erreur lors de la suppression de la sous-catégorie.");
    }
  };

  return (
    <div className="container-admin">
      <div className="container-admin-action">
        <div className="management-header">
          <button type="button" id="openBtn" onClick={toggleMenu}>
            <img className="logo-arrow" src={OPENMENU} alt="menu burger" />
          </button>
          <h1>Gestion des Catégories et Sous-catégories</h1>
        </div>

        <div className="button-group">
          <button
            className="button-admin"
            type="button"
            onClick={() => setIsAddMode(true)}
          >
            <img className="svg-folder" src={FOLDER} alt="svg-fichier" />
            <p className="text-admin">Ajouter</p>
          </button>
        </div>
        <div className="button-group">
          <button
            className="button-admin"
            type="button"
            onClick={() => setIsUpdateMode(true)}
          >
            <img className="svg-modify" src={MODIFY} alt="svg-modify" />
            <p className="text-admin">Modifier</p>
          </button>
        </div>
        <div className="button-group">
          <button
            className="button-admin"
            type="button"
            onClick={() => setIsDeleteMode(true)}
          >
            <img className="svg-bin" src={BIN} alt="svg-bin" />
            <p className="text-admin">Supprimer</p>
          </button>
        </div>
      </div>
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
          <Link className="admin-link" to="/categories">
            Catégories
          </Link>
          <Link className="admin-link" to="/admin/catsouscats">
            Modifier Catégorie / Sous-catégorie
          </Link>
          <Link className="admin-link" to="/contenue">
            Contenu
          </Link>
          <Link className="admin-link" to="/login">
            Déconnexion
          </Link>
        </ul>
      </div>
      <div className="form-container">
        {isAddMode && (
          <>
            <form
              method="post"
              onSubmit={handleAddCategorie}
              className="form-content"
            >
              <button
                className="close-button"
                onClick={() => setIsAddMode(false)}
                type="button"
              >
                <img src={CROSSADMIN} alt="fermer" />
              </button>
              <h2>Ajouter une Catégorie</h2>
              <p>Nom de la Catégorie</p>
              <div className="input-container">
                <input
                  type="text"
                  id="categorieName"
                  name="name"
                  value={categorieName}
                  onChange={(e) => setCategorieName(e.target.value)}
                />
              </div>
              <p>Image de la Catégorie (format URL)</p>
              <div className="input-container">
                <input
                  type="text"
                  id="image"
                  name="image"
                  value={image}
                  onChange={(e) => setImage(e.target.value)}
                />
              </div>
              <div className="button-container">
                <button type="submit" className="submit-add">
                  Ajouter
                </button>
              </div>
            </form>
            <form
              method="post"
              onSubmit={handleAddSouscat}
              className="form-content"
            >
              <button
                className="close-button"
                onClick={() => setIsAddMode(false)}
                type="button"
              >
                <img src={CROSSADMIN} alt="fermer" />
              </button>
              <h2>Ajouter une Sous-catégorie</h2>
              <p>Nom de la Sous-catégorie</p>
              <div className="input-container">
                <input
                  type="text"
                  id="sousCategorieName"
                  name="name"
                  value={sousCategorieName}
                  onChange={(e) => setSousCategorieName(e.target.value)}
                />
              </div>
              <p>Choisissez une Catégorie</p>
              <div className="input-container">
                <select
                  id="categoriesId"
                  name="categories_id"
                  value={categoriesId}
                  onChange={(e) => setCategoriesId(e.target.value)}
                >
                  <option value="">Sélectionner une catégorie</option>
                  {categories.map((cat) => (
                    <option key={cat.id} value={cat.id}>
                      {cat.name}
                    </option>
                  ))}
                </select>
              </div>
              <div className="button-container">
                <button type="submit" className="submit-add">
                  Ajouter
                </button>
              </div>
            </form>
          </>
        )}

        {isUpdateMode && (
          <>
            <form
              method="post"
              onSubmit={handleUpdateCategorie}
              className="form-content"
            >
              <button
                className="close-button"
                onClick={() => setIsUpdateMode(false)}
                type="button"
              >
                <img src={CROSSADMIN} alt="fermer" />
              </button>
              <h2>Modifier une Catégorie</h2>
              <p>Choisissez une Catégorie</p>
              <div className="input-container">
                <select
                  id="selectedCategorieId"
                  name="id"
                  value={selectedCategorieId}
                  onChange={(e) => setSelectedCategorieId(e.target.value)}
                >
                  <option value="">Sélectionner une catégorie</option>
                  {categories.map((cat) => (
                    <option key={cat.id} value={cat.id}>
                      {cat.name}
                    </option>
                  ))}
                </select>
              </div>
              {selectedCategorieId && (
                <>
                  <p>Nom de la Catégorie</p>
                  <div className="input-container">
                    <input type="text" id="updateCategorieName" name="name" />
                  </div>
                  <p>Image de la Catégorie (format URL)</p>
                  <div className="input-container">
                    <input type="text" id="updateImage" name="image" />
                  </div>
                  <div className="button-container">
                    <button type="submit" className="submit-update">
                      Modifier
                    </button>
                  </div>
                </>
              )}
            </form>
            <form
              method="post"
              onSubmit={handleUpdateSousCats}
              className="form-content"
            >
              <button
                className="close-button"
                onClick={() => setIsUpdateMode(false)}
                type="button"
              >
                <img src={CROSSADMIN} alt="fermer" />
              </button>
              <h2>Modifier une Sous-catégorie</h2>
              <p>Choisissez une Sous-catégorie</p>
              <div className="input-container">
                <select
                  id="selectedSousCatsId"
                  name="id"
                  value={selectedSousCatsId}
                  onChange={(e) => setSelectedSousCatsId(e.target.value)}
                >
                  <option value="">Sélectionner une sous-catégorie</option>
                  {souscats.map((scat) => (
                    <option key={scat.id} value={scat.id}>
                      {scat.name}
                    </option>
                  ))}
                </select>
              </div>
              {selectedSousCatsId && (
                <>
                  <p>Nom de la Sous-catégorie</p>
                  <div className="input-container">
                    <input
                      type="text"
                      id="updateSousCategorieName"
                      name="name"
                    />
                  </div>
                  <p>Catégorie Associée</p>
                  <div className="input-container">
                    <select id="updateCategoriesId" name="categories_id">
                      <option value="">Sélectionner une catégorie</option>
                      {categories.map((cat) => (
                        <option key={cat.id} value={cat.id}>
                          {cat.name}
                        </option>
                      ))}
                    </select>
                  </div>
                  <div className="button-container">
                    <button type="submit" className="submit-update">
                      Modifier
                    </button>
                  </div>
                </>
              )}
            </form>
          </>
        )}

        {isDeleteMode && (
          <form
            method="post"
            onSubmit={(e) => {
              e.preventDefault();
              if (deleteCategorieId) {
                handleDeleteCategorie();
              } else if (deleteSousCatsId) {
                handleDeleteSousCats();
              }
            }}
            className="form-content"
          >
            <button
              className="close-button"
              onClick={() => setIsDeleteMode(false)}
              type="button"
            >
              <img src={CROSSADMIN} alt="fermer" />
            </button>
            <h2>Supprimer</h2>
            <p>Choisissez une Catégorie à supprimer</p>
            <div className="input-container">
              <select
                id="deleteCategorieId"
                name="id"
                value={deleteCategorieId}
                onChange={(e) => setDeleteCategorieId(e.target.value)}
              >
                <option value="">Sélectionner une catégorie</option>
                {categories.map((cat) => (
                  <option key={cat.id} value={cat.id}>
                    {cat.name}
                  </option>
                ))}
              </select>
            </div>
            <p>Choisissez une Sous-catégorie à supprimer</p>
            <div className="input-container">
              <select
                id="deleteSousCatsId"
                name="id"
                value={deleteSousCatsId}
                onChange={(e) => setDeleteSousCatsId(e.target.value)}
              >
                <option value="">Sélectionner une sous-catégorie</option>
                {souscats.map((scat) => (
                  <option key={scat.id} value={scat.id}>
                    {scat.name}
                  </option>
                ))}
              </select>
            </div>
            <div className="button-container">
              <button type="submit" className="submit-delete">
                Supprimer
              </button>
            </div>
          </form>
        )}
      </div>
      <Toaster />
    </div>
  );
}
