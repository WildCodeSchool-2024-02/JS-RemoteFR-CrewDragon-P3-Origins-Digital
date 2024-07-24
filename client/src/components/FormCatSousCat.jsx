import { useState } from "react";
import { useLoaderData } from "react-router-dom";
import toast, { Toaster } from "react-hot-toast";
import axios from "axios";

export default function FormCatSousCat() {
  const [isPopupAddOpen, setIsPopupAddOpen] = useState(false);
  const [isPopupUpdateOpen, setIsPopupUpdateOpen] = useState(false);
  const [isPopupDeleteOpen, setIsPopupDeleteOpen] = useState(false);
  const [categorieName, setCategorieName] = useState(null);
  const [sousCategorieName, setSousCategorieName] = useState(null);
  const [image, setImage] = useState("");
  const [categoriesId, setCategoriesId] = useState(1);
  const [selectedCategorieId, setSelectedCategorieId] = useState("");
  const [selectedSousCatsId, setSelectedSousCatsId] = useState("");
  const [deleteCategorieId, setDeleteCategorieId] = useState("");
  const [deleteSousCatsId, setDeleteSousCatsId] = useState("");
  const { categories, souscats } = useLoaderData();

  // Message de Toastify Ajouter une catégorie
  const notifyAddCategorie = () =>
    toast("La Catégorie à bien été ajoutée !", {
      style: {
        border: "solid 2px #000000",
        backgroundColor: "#FF7105",
        color: "#ffffff",
      },
    });
  // Message de Toastify Ajouter une sous-catégorie
  const notifyAddSousCats = () =>
    toast("La Sous-Catégorie à bien été ajoutée !", {
      style: {
        border: "solid 2px #000000",
        backgroundColor: "#FF7105",
        color: "#ffffff",
      },
    });
  // // Message de Toastify modifier une catégorie
  const notifyUpdateCategorie = () =>
    toast("La Catégorie à bien été modifiée  !", {
      style: {
        border: "solid 2px #000000",
        backgroundColor: "#FF7105",
        color: "#ffffff",
      },
    });
  // Message de Toastify modifier une sous-catégorie
  const notifyUpdateSousCats = () =>
    toast("La Catégorie à bien été modifiée  !", {
      style: {
        border: "solid 2px #000000",
        backgroundColor: "#FF7105",
        color: "#ffffff",
      },
    });
  // Message de Toastify supprimer une catégorie
  const notifyDeleteCategorie = () =>
    toast("La Catégorie à bien été supprimée !", {
      style: {
        border: "solid 2px #000000",
        backgroundColor: "#FF7105",
        color: "#ffffff",
      },
    });

  // Message de Toastify supprimer une sous-catégorie
  const notifyDeleteSousCats = () =>
    toast("La Sous-Catégorie à bien été supprimée !", {
      style: {
        border: "solid 2px #000000",
        backgroundColor: "#FF7105",
        color: "#ffffff",
      },
    });
  // Message de Toastify Ajouter une sous-catégorie
  const notifyErrorCategories = () =>
    toast("La catégories a une sous-catégorie liée. Veuillez la supprimer", {
      style: {
        border: "solid 2px #000000",
        backgroundColor: "#FF7105",
        color: "#ffffff",
      },
    });
  // Message de Toastify Ajouter une sous-catégorie
  const notifyErrorSousCats = () =>
    toast("Cette sous catégorie à des vidéos liées. Veuillez les supprimer", {
      style: {
        border: "solid 2px #000000",
        backgroundColor: "#FF7105",
        color: "#ffffff",
      },
    });
  // Message de Toastify pour les champs non remplis
  const notifyFill = () =>
    toast("Veuillez remplir les champs", {
      style: {
        border: "solid 2px #000000",
        backgroundColor: "#FF7105",
        color: "#ffffff",
      },
    });
  // Message de Toastify pour les champs non remplis
  const notifyFillCategories = () =>
    toast("Veuillez ajouter au moins un nouveau nom à votre catégorie", {
      style: {
        border: "solid 2px #000000",
        backgroundColor: "#FF7105",
        color: "#ffffff",
      },
    });
  // Message de Toastify pour les champs non remplis
  const notifyFillSousCats = () =>
    toast("Veuillez ajouter le nouveau nom de votre sous-catégories", {
      style: {
        border: "solid 2px #000000",
        backgroundColor: "#FF7105",
        color: "#ffffff",
      },
    });
  // Route pour ajouté une catégorie
  const handleAddCategorie = async (event) => {
    event.preventDefault();

    try {
      await axios.post(`${import.meta.env.VITE_API_URL}/api/categories`, {
        name: categorieName,
        image,
      });
      notifyAddCategorie();
      setIsPopupAddOpen(false);
    } catch (error) {
      notifyFill();
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
      notifyAddSousCats();
      setIsPopupAddOpen(false);
    } catch (error) {
      notifyFill();
      console.error("Erreur lors de l'ajout de la sous-catégorie:", error);
    }
    setSousCategorieName(event.data);
  };

  // Route pour modifier une catégorie
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
      notifyUpdateCategorie();
      setIsPopupAddOpen(false);
    } catch (error) {
      notifyFillCategories();
      console.error("Erreur lors de la modification de la catégorie:", error);
    }
    setCategorieName(e.data);
  };
  // Route pour modifier une sous-catégorie
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
      notifyUpdateSousCats();
      setIsPopupAddOpen(false);
    } catch (error) {
      notifyFillSousCats();
      console.error(
        "Erreur lors de la modification de la sous-catégorie:",
        error
      );
    }
    setSousCategorieName(e.data);
  };
  // Route pour supprimer une catégorie
  const handleDeleteCategorie = async () => {
    try {
      await axios.delete(
        `${import.meta.env.VITE_API_URL}/api/categories/${deleteCategorieId}`
      );

      notifyDeleteCategorie();
      setIsPopupAddOpen(false);
    } catch (error) {
      notifyErrorCategories();
      console.error("Erreur lors de la suppression de la catégorie:", error);
    }
  };
  // Route pour supprimer une sous-catégorie
  const handleDeleteSousCats = async () => {
    try {
      await axios.delete(
        `${import.meta.env.VITE_API_URL}/api/souscats/${deleteSousCatsId}`
      );
      notifyDeleteSousCats();
      setIsPopupAddOpen(false);
    } catch (error) {
      notifyErrorSousCats();
      console.error("Erreur lors de la suppression de la catégorie:", error);
    }
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
      <Toaster />
      {/* Popup pour Ajouter  */}
      {isPopupAddOpen && (
        <div className="popup-add-container">
          <div className="popup-categorie">
            {/* Formulaire pour catégorie  */}
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
                <button type="submit" onSubmit={notifyAddCategorie}>
                  Ajouter
                </button>
              </div>
            </form>
          </div>
          {/* Formulaire pour souscategories  */}
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
            {/* Formulaire pour catégorie  */}
            <form method="put" onSubmit={handleUpdateCategorie}>
              <label>
                Choisissez une catégorie : <br />
                <select
                  name="categories.id"
                  onChange={(e) => setSelectedCategorieId(e.target.value)}
                >
                  {categories.map((categorie) => (
                    <option value={categorie.id} key={categorie.id}>
                      {categorie.name}
                    </option>
                  ))}
                </select>
              </label>
              <p>Nouveau nom de la Catégorie</p>
              <div className="input-container">
                <input
                  type="text"
                  id="categorieName"
                  name="name"
                  value={categorieName}
                  onChange={(e) => setCategorieName(e.target.value)}
                />
              </div>
              <p>Nouvelle image de la catégorie (format URL)</p>
              <div className="input-container">
                <input
                  type="text"
                  id="image"
                  name="image"
                  onChange={(e) => setImage(e.target.value)}
                />
              </div>
              <button type="submit">Modifier</button>
            </form>
            {/* Formulaire pour souscategories  */}
            <form method="put" onSubmit={handleUpdateSousCats}>
              <label>
                {" "}
                <br />
                Choisissez une Sous-catégorie : <br />
                <select
                  name="souscats.id"
                  onChange={(e) => setSelectedSousCatsId(e.target.value)}
                >
                  {souscats.map((souscat) => (
                    <option value={souscat.id} key={souscat.id}>
                      {souscat.name}
                    </option>
                  ))}
                </select>
              </label>
              <p>Nouveau nom de la sous-catégorie</p>
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
              <p>
                Liée à la nouvelle Catégorie / Selectionner la catégorie
                actuelle
              </p>
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
              <button type="submit">Modifier</button>
            </form>
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
            {/* Formulaire pour catégorie  */}
            <p>Supprimer une catégorie</p>
            <label>
              Choisissez une catégorie : <br />
              <select
                name="categories.id"
                onChange={(e) => setDeleteCategorieId(e.target.value)}
              >
                {categories.map((categorie) => (
                  <option value={categorie.id} key={categorie.id}>
                    {categorie.name}
                  </option>
                ))}
              </select>
            </label>
            <button
              type="button"
              onClick={() => {
                handleDeleteCategorie();
              }}
            >
              Supprimer
            </button>
            {/* Formulaire pour souscategories  */}
            <p>Supprimer une sous-catégorie</p>
            <label>
              {" "}
              <br />
              Choisissez une Sous-catégorie : <br />
              <select
                name="souscats.id"
                onChange={(e) => setDeleteSousCatsId(e.target.value)}
              >
                {souscats.map((souscat) => (
                  <option value={souscat.id} key={souscat.id}>
                    {souscat.name}
                  </option>
                ))}
              </select>
            </label>
            <button
              type="button"
              onClick={() => {
                handleDeleteSousCats();
              }}
            >
              Supprimer
            </button>
          </div>
        </div>
      )}
    </div>
  );
}
