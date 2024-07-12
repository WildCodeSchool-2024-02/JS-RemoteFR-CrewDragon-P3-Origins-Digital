import { useEffect, useState } from "react";
import axios from "axios";

import "../style/Categories.scss";

function Categories() {
  const [categories, setCategories] = useState([]);
  useEffect(() => {
    window.scrollBy({
      top: window.innerHeight,
      behavior: "smooth",
    });
  }, []);

  useEffect(() => {
    const fetchCategories = async () => {
      try {
        const response = await axios.get(
          `${import.meta.env.VITE_API_URL}/api/categories`
        );
        setCategories(response.data);
      } catch (error) {
        console.error("Erreur lors du chargement des categories :", error);
      }
    };

    fetchCategories();
  }, []);

  return (
    <div>
      <h1 className="choose-categorie">
        Veuillez choisir une <span>catégorie</span>
      </h1>
      <div className="layout">
        {categories.map((categorie) => (
          <div key={categorie} className="image-container">
            <div className="text-categorie-container">
              <h2 className="text-categorie">{categorie.name}</h2>
            </div>
            <img
              className="image-categorie"
              src={categorie.image}
              alt="images-categories"
            />
          </div>
        ))}
        ;
      </div>
    </div>
  );
}
export default Categories;
