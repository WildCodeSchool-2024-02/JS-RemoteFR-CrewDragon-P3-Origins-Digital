import { useState } from "react";
import { useLoaderData } from "react-router-dom";
import axios from "axios";

export default function FormCatSousCat() {
  const [isPopupAddOpen, setIsPopupAddOpen] = useState(false);
  const [isPopupUpdateOpen, setIsPopupUpdateOpen] = useState(false);
  const [isPopupDeleteOpen, setIsPopupDeleteOpen] = useState(false);
  const [categorieName, setCategorieName] = useState("");
  const [sousCategorieName, setSousCategorieName] = useState("");
  const [image, setImage] = useState("");
  const [categoriesId, setCategoriesId] = useState("");
  const { categories, souscats } = useLoaderData();

  // Route pour ajouté une catégorie
  const handleAddCategorie = async (event) => {
    event.preventDefault();

    try {
      await axios.post(`${import.meta.env.VITE_API_URL}/api/categories`, {
        name: categorieName,
        image,
      });

      setIsPopupAddOpen(false);
    } catch (error) {
      console.error("Erreur lors de l'ajout de la catégorie:", error);
    }
    setCategorieName(event.data);
  };

  // Route pour ajouté une souscatégorie
  const handleAddSouscat = async (event) => {
    event.preventDefault();

    try {
      await axios.post(`${import.meta.env.VITE_API_URL}/api/souscats`, {
        name: sousCategorieName,
        categories_id: categoriesId,
      });

      setIsPopupAddOpen(false);
    } catch (error) {
      console.error("Erreur lors de l'ajout de la catégorie:", error);
    }
    setSousCategorieName(event.data);
  };

  return (
    <div className="formcatsouscat-container">
      <h1>Ajouter, Modifier, Supprimer vos catégories / sous-catégories</h1>
      <div className="button-container">
        <button type="button" onClick={() => setIsPopupAddOpen(true)}>
          Ajouter
        </button>
        <button type="button" onClick={() => setIsPopupUpdateOpen(true)}>
          Modifier
        </button>
        <button type="button" onClick={() => setIsPopupDeleteOpen(true)}>
          Supprimer
        </button>
      </div>
      {/* Popup pour Ajouter  */}
      {isPopupAddOpen && (
        <div className="popup-add-container">
          <div className="popup-categorie">
            <form method="post" onSubmit={handleAddCategorie}>
              <div className="button-container">
                <button
                  type="button"
                  className="close-button-categorie"
                  onClick={() => setIsPopupAddOpen(false)}
                >
                  ❌
                </button>
              </div>
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
                  onChange={(e) => setImage(e.target.value)}
                />
              </div>
              <div className="button-container-catsouscats">
                <button type="submit">Ajouter</button>
              </div>
            </form>
          </div>
          <form method="post" onSubmit={handleAddSouscat}>
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
                />{" "}
                <br />
              </div>
              <p>Liée à la Catégorie</p>
              <div className="list-container">
                <select
                  name="categories_id"
                  id="categories_id"
                  onChange={(e) => setCategoriesId(e.target.value)}
                >
                  {categories.map((categorie) => (
                    <option value={categorie.id} key={categorie.id}>
                      {categorie.name}
                    </option>
                  ))}
                </select>
              </div>
              <div className="button-container-catsouscats">
                <button type="submit">Ajouter</button>
              </div>
            </div>
          </form>
        </div>
      )}
      {/* Popup pour modifier  */}
      {isPopupUpdateOpen && (
        <div className="popup-update-container">
          <div className="popup-categorie">
            <div className="button-container">
              <button
                type="button"
                className="close-button-categorie"
                onClick={() => setIsPopupUpdateOpen(false)}
              >
                ❌
              </button>
            </div>
            <h2>Modifier une Catégorie ou Sous-Catégorie</h2>
            <label>
              Choisissez une catégorie : <br />
              <select name="Categorie-list">
                {categories.map((categorie) => (
                  <option value={categorie.id} key={categorie.id}>
                    {categorie.name}
                  </option>
                ))}
              </select>
            </label>
            <label>
              {" "}
              <br />
              Choisissez une Sous-catégorie : <br />
              <select name="Souscategorie-list">
                {souscats.map((souscat) => (
                  <option value={souscat.id} key={souscat.id}>
                    {souscat.name}
                  </option>
                ))}
              </select>
            </label>
          </div>
        </div>
      )}
      {/* Popup pour supprimer  */}
      {isPopupDeleteOpen && (
        <div className="popup-delete-container">
          <div className="popup-categorie">
            <div className="button-container">
              <button
                type="button"
                className="close-button-categorie"
                onClick={() => setIsPopupDeleteOpen(false)}
              >
                ❌
              </button>
            </div>
            <h2>Supprimer une Catégorie ou Sous-Catégorie</h2>
            <p>Supprimer une catégorie</p>
            <p>Supprimer une sous-catégorie</p>
          </div>
        </div>
      )}
    </div>
  );
}
