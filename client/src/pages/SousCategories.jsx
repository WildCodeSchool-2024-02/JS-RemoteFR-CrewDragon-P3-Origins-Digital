import { useEffect, useState, useContext } from "react";
import { useParams, Link } from "react-router-dom";
import YouTube from "react-youtube";
import Slider from "react-slick";
import axios from "axios";
import { AuthContext } from "../contexte/AuthContext";

import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";

function SousCategories() {
  const { categoryId } = useParams();
  const [subCategories, setSubCategories] = useState([]);
  const [videos, setVideos] = useState([]);
  const [selectedCategory, setSelectedCategory] = useState(null);
  const { abonnementId } = useContext(AuthContext); // Accéder à l'ID d'abonnement de l'utilisateur

  useEffect(() => {
    window.scrollBy({
      top: window.innerHeight,
      behavior: "smooth",
    });

    const fetchCategoryData = async () => {
      try {
        // Récupérer la catégorie sélectionnée
        const categoryResponse = await axios.get(
          `${import.meta.env.VITE_API_URL}/api/categories/${categoryId}`
        );
        const category = categoryResponse.data;
        setSelectedCategory(category);

        // Récupérer toutes les sous-catégories
        const sousCategoriesResponse = await axios.get(
          `${import.meta.env.VITE_API_URL}/api/souscats`
        );
        const allSubCategories = sousCategoriesResponse.data;

        const videosResponse = await axios.get(
          `${import.meta.env.VITE_API_URL}/api/videos`
        );

        const allVideos = videosResponse.data;

        // Filtrer les sous-catégories pour celles qui correspondent à la catégorie sélectionnée
        const filteredSubCategories = allSubCategories.filter(
          (sousCategorie) =>
            sousCategorie.categories_id === categoryResponse.data.id
        );
        setSubCategories(filteredSubCategories);

        // Mettre à jour les vidéos pour inclure uniquement celles accessibles par l'utilisateur
        const filteredVideos = allVideos.filter(
          (video) =>
            abonnementId === 2 ||
            (abonnementId === 1 && video.abonnementsid === 1)
        );
        setVideos(filteredVideos);
      } catch (error) {
        console.error("Erreur lors du chargement des données :", error);
      }
    };

    fetchCategoryData();
  }, [categoryId, abonnementId]); // Inclure `abonnementId` comme dépendance

  const settings = {
    arrows: true,
    dots: false,
    infinite: true,
    fade: true,
    adaptiveHeight: true,
    speed: 500,
    slidesToShow: 1,
    slidesToScroll: 1,
  };

  const opts = {
    playerVars: {
      autoplay: 0,
    },
  };

  return (
    <>
      <h1 className="title-h1">
        {selectedCategory ? selectedCategory.name : "Chargement..."}
      </h1>
      {subCategories.map((sousCategorie) => (
        <div key={sousCategorie.id}>
          <h2 className="title-sous-categorie">{sousCategorie.name}</h2>
          <Slider
            arrows={settings.arrows}
            dots={settings.dots}
            infinite={settings.infinite}
            fade={settings.fade}
            adaptiveHeight={settings.adaptiveHeight}
            speed={settings.speed}
            slidesToShow={settings.slidesToShow}
            slidesToScroll={settings.slidesToScroll}
          >
            {videos
              .filter((video) => video.souscats_id === sousCategorie.id)
              .map((filteredVideo) => (
                <div key={filteredVideo.id}>
                  <YouTube
                    className="container-sous-categorie"
                    videoId={filteredVideo.url.split("v=")[1]}
                    opts={opts}
                  />
                  <div className="button-container">
                    <Link
                      to={`/video/${filteredVideo.url.split("v=")[1]}`}
                      state={{
                        title: filteredVideo.title,
                        description: filteredVideo.description,
                        date: filteredVideo.date,
                        duration: filteredVideo.duration,
                        categories: sousCategorie.name,
                      }}
                    >
                      <button className="button-style" type="button">
                        voir plus
                      </button>
                    </Link>
                  </div>
                </div>
              ))}
          </Slider>
        </div>
      ))}
    </>
  );
}

export default SousCategories;
