import { useState } from "react";
import { useLoaderData, Link } from "react-router-dom";
import axios from "axios";
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
    } catch (error) {
      console.error("Erreur lors de l'ajout de la catégorie:", error);
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
    } catch (error) {
      console.error("Erreur lors de l'ajout de la sous-catégorie:", error);
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
    } catch (error) {
      console.error("Erreur lors de la modification de la catégorie:", error);
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
    } catch (error) {
      console.error(
        "Erreur lors de la modification de la sous-catégorie:",
        error
      );
    }
  };

  const handleDeleteCategorie = async () => {
    try {
      await axios.delete(
        `${import.meta.env.VITE_API_URL}/api/categories/${deleteCategorieId}`
      );
      setDeleteCategorieId("");
      setIsDeleteMode(false);
    } catch (error) {
      console.error("Erreur lors de la suppression de la catégorie:", error);
    }
  };

  const handleDeleteSousCats = async () => {
    try {
      await axios.delete(
        `${import.meta.env.VITE_API_URL}/api/souscats/${deleteSousCatsId}`
      );
      setDeleteSousCatsId("");
      setIsDeleteMode(false);
    } catch (error) {
      console.error(
        "Erreur lors de la suppression de la sous-catégorie:",
        error
      );
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
              <p>Ajouter une image à la catégorie (format URL)</p>
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
              <div className="add-sous-categorie-container">
                <h3>Ajouter une sous-catégorie</h3>
                <p>Nom de la Sous-catégorie</p>
                <div className="input-container">
                  <input
                    type="text"
                    name="name"
                    id="name"
                    value={sousCategorieName}
                    onChange={(e) => setSousCategorieName(e.target.value)}
                  />
                </div>
                <p>Liée à la Catégorie</p>
                <div className="list-container">
                  <select
                    name="categories_id"
                    id="categories_id"
                    value={categoriesId}
                    onChange={(e) => setCategoriesId(e.target.value)}
                  >
                    <option value="">Sélectionner une catégorie</option>
                    {categories.map((categorie) => (
                      <option key={categorie.id} value={categorie.id}>
                        {categorie.name}
                      </option>
                    ))}
                  </select>
                </div>
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
              <p>Sélectionner une Catégorie à modifier</p>
              <div className="list-container">
                <select
                  name="selectedCategorieId"
                  id="selectedCategorieId"
                  value={selectedCategorieId}
                  onChange={(e) => setSelectedCategorieId(e.target.value)}
                >
                  <option value="">Sélectionner une catégorie</option>
                  {categories.map((categorie) => (
                    <option key={categorie.id} value={categorie.id}>
                      {categorie.name}
                    </option>
                  ))}
                </select>
              </div>
              <p>Nom de la Catégorie</p>
              <div className="input-container">
                <input
                  type="text"
                  id="name"
                  name="name"
                  placeholder="Nom de la Catégorie"
                />
              </div>
              <p>Ajouter une image à la catégorie (format URL)</p>
              <div className="input-container">
                <input
                  type="text"
                  id="image"
                  name="image"
                  placeholder="URL de l'image"
                />
              </div>
              <div className="button-container">
                <button type="submit" className="submit-add">
                  Modifier
                </button>
              </div>
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
              <div className="update-sous-categorie-container">
                <h3>Modifier une sous-catégorie</h3>
                <p>Sélectionner une Sous-catégorie à modifier</p>
                <div className="list-container">
                  <select
                    name="selectedSousCatsId"
                    id="selectedSousCatsId"
                    value={selectedSousCatsId}
                    onChange={(e) => setSelectedSousCatsId(e.target.value)}
                  >
                    <option value="">Sélectionner une sous-catégorie</option>
                    {souscats.map((souscategorie) => (
                      <option key={souscategorie.id} value={souscategorie.id}>
                        {souscategorie.name}
                      </option>
                    ))}
                  </select>
                </div>
                <p>Nom de la Sous-catégorie</p>
                <div className="input-container">
                  <input
                    type="text"
                    id="name"
                    name="name"
                    placeholder="Nom de la sous-catégorie"
                  />
                </div>
                <p>Liée à la Catégorie</p>
                <div className="list-container">
                  <select
                    name="categories_id"
                    id="categories_id"
                    value={categoriesId}
                    onChange={(e) => setCategoriesId(e.target.value)}
                  >
                    <option value="">Sélectionner une catégorie</option>
                    {categories.map((categorie) => (
                      <option key={categorie.id} value={categorie.id}>
                        {categorie.name}
                      </option>
                    ))}
                  </select>
                </div>
              </div>
              <div className="button-container">
                <button type="submit" className="submit-add">
                  Modifier
                </button>
              </div>
            </form>
          </>
        )}
        {isDeleteMode && (
          <>
            <form className="form-content" onSubmit={handleDeleteCategorie}>
              <button
                className="close-button"
                onClick={() => setIsDeleteMode(false)}
                type="button"
              >
                <img src={CROSSADMIN} alt="fermer" />
              </button>
              <h2>Supprimer une Catégorie</h2>
              <p>Sélectionner une Catégorie à supprimer</p>
              <div className="list-container">
                <select
                  name="deleteCategorieId"
                  id="deleteCategorieId"
                  value={deleteCategorieId}
                  onChange={(e) => setDeleteCategorieId(e.target.value)}
                >
                  <option value="">Sélectionner une catégorie</option>
                  {categories.map((categorie) => (
                    <option key={categorie.id} value={categorie.id}>
                      {categorie.name}
                    </option>
                  ))}
                </select>
              </div>
              <div className="button-container">
                <button type="submit" className="submit-add">
                  Supprimer
                </button>
              </div>
            </form>
            <form className="form-content" onSubmit={handleDeleteSousCats}>
              <button
                className="close-button"
                onClick={() => setIsDeleteMode(false)}
                type="button"
              >
                <img src={CROSSADMIN} alt="fermer" />
              </button>
              <h2>Supprimer une Sous-catégorie</h2>
              <p>Sélectionner une Sous-catégorie à supprimer</p>
              <div className="list-container">
                <select
                  name="deleteSousCatsId"
                  id="deleteSousCatsId"
                  value={deleteSousCatsId}
                  onChange={(e) => setDeleteSousCatsId(e.target.value)}
                >
                  <option value="">Sélectionner une sous-catégorie</option>
                  {souscats.map((souscategorie) => (
                    <option key={souscategorie.id} value={souscategorie.id}>
                      {souscategorie.name}
                    </option>
                  ))}
                </select>
              </div>
              <div className="button-container">
                <button type="submit" className="submit-add">
                  Supprimer
                </button>
              </div>
            </form>
          </>
        )}
      </div>
    </div>
  );
}
